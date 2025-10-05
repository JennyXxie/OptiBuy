import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { safeParseAIResponse } from "@/lib/parseAIResponse";
import pkg from "@google/generative-ai/package.json";

/* ======================================================
   🧩 Helper: Delay — used for rate-limiting SerpApi calls
====================================================== */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ======================================================
   🧩 Helper: Fetch products from SerpApi (multi-source)
   ⚙️ Limits to 30 items per store to reduce load/timeouts
====================================================== */
async function fetchAllProducts(query) {
  const apiKey = process.env.SERPAPI_KEY;
  const SOURCES = [
    { engine: "google_shopping", label: "Google Shopping", param: "q" },
    { engine: "walmart", label: "Walmart", param: "query" },
    { engine: "ebay", label: "eBay", param: "_nkw" },
  ];

  const results = await Promise.allSettled(
    SOURCES.map(async (src, i) => {
      try {
        // Stagger requests slightly to avoid hitting SerpApi limits
        if (i > 0) await delay(500);

        console.log(`🌐 Fetching from ${src.label}...`);
        const res = await axios.get("https://serpapi.com/search.json", {
          params: { engine: src.engine, [src.param]: query, api_key: apiKey },
          timeout: 12000,
        });

        const data =
          res.data.shopping_results ||
          res.data.organic_results ||
          res.data.products ||
          [];

        // ✅ Limit each source to 30 items
        const limited = Array.isArray(data) ? data.slice(0, 30) : [];
        console.log(`✅ ${src.label} returned ${limited.length} items`);

        return limited.map((p) => ({
          title: p.title || p.name || "Unknown",
          price:
            typeof p.price === "object"
              ? p.price?.extracted
              : p.extracted_price || p.price || null,
          source: src.label,
          rating: p.rating || null,
          link: p.link || p.url || null,
        }));
      } catch (err) {
        console.warn(`⚠️ ${src.label} fetch failed:`, err.message);
        return [];
      }
    })
  );

  // Flatten and return all successful results
  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
}

/* ======================================================
   🧠 Route: POST /api/chat
====================================================== */
export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message)
      return NextResponse.json({ success: false, error: "Missing message" });

    console.log("💬 User asked:", message);

    /* 1️⃣ Try cached products from Supabase */
    const { data: products, error: selectErr } = await supabase
      .from("products")
      .select("*")
      .ilike("title", `%${message}%`)
      .limit(5);

    if (selectErr) console.warn("⚠️ Supabase select error:", selectErr.message);

    let relevant = products || [];

    /* 2️⃣ Fetch via SerpApi if not found */
    if (relevant.length === 0) {
      console.log("🧠 Cache miss → fetching via SerpApi");
      relevant = await fetchAllProducts(message);

      // Cache into Supabase, skipping duplicates
      if (relevant.length > 0) {
        for (const p of relevant) {
          const title = p.title || "Untitled";
          const { data: existing } = await supabase
            .from("products")
            .select("id")
            .ilike("title", title)
            .limit(1);

          if (!existing || existing.length === 0) {
            const { error: insertErr } = await supabase.from("products").insert({
              title,
              price:
                typeof p.price === "object"
                  ? p.price?.extracted
                  : p.extracted_price || p.price || null,
              source: p.source || "Unknown",
              rating: Number(p.rating) || null,
              link: p.link || p.url || null,
            });
            if (insertErr)
              console.warn("⚠️ Supabase insert error:", insertErr.message);
          }
        }
      }
    }

    /* 3️⃣ Build clean product context */
    const context = (relevant || []).slice(0, 5).map((p) => ({
      title: p.title || "Unnamed Product",
      price:
        typeof p.price === "object"
          ? p.price?.extracted
          : p.extracted_price || p.price || "N/A",
      source: p.source || "Unknown",
      rating: p.rating || "N/A",
      url: p.link || p.url || "",
    }));

    if (context.length === 0) {
      console.warn("❌ No products found, skipping Gemini.");
      return NextResponse.json({
        success: false,
        error: "No products found.",
      });
    }

    /* 4️⃣ Check Gemini key */
    if (!process.env.GEMINI_API_KEY) {
      console.warn("⚠️ Missing GEMINI_API_KEY, skipping Gemini call.");
      return NextResponse.json({
        success: false,
        error: "Missing Gemini key.",
      });
    }

    /* 5️⃣ Gemini setup (v1 SDK — AI Studio compatible) */
    console.log("🧠 Using Gemini SDK version:", pkg.version);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are DealBot, a friendly AI that helps users compare products.

User query: "${message}"

Products found (JSON array):
${JSON.stringify(context, null, 2)}

Respond strictly in JSON:
{
  "ai_summary": "Brief, friendly summary for a normal shopper.",
  "recommendations": [
    { "title": "...", "price": "...", "reason": "...", "source": "...", "url": "..." }
  ]
}
`;

    /* 6️⃣ Gemini call */
    let text = "";
    try {
      const result = await model.generateContent(prompt);
      text = result.response.text();
      console.log("✅ Gemini response generated successfully");
    } catch (err) {
      console.error("❌ Gemini API error:", err.message);
      return NextResponse.json({
        success: false,
        error: "Gemini API unavailable — skipped to avoid token waste.",
      });
    }

    /* 7️⃣ Parse AI output safely */
    const parsed = safeParseAIResponse(text, {
      ai_summary:
        "I couldn’t find detailed reviews, but here are a few options that might interest you:",
      recommendations: context,
    });

    /* ✅ Final response */
    return NextResponse.json({
      success: true,
      data: parsed,
      products: context,
    });
  } catch (err) {
    console.error("❌ Chat API unexpected error:", err);
    return NextResponse.json({
      success: false,
      error: err.message || "Unknown server error",
    });
  }
}
