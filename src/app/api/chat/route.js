import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { fetchAllProducts } from "../serapapi/route"
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message)
      return NextResponse.json({ success: false, error: "Missing message" });

    console.log("💬 User asked:", message);

    // 1️⃣ Try to find relevant products from Supabase
    const { data: products } = await supabase
      .from("products")
      .select("*")
      .ilike("title", `%${message}%`)
      .limit(5);

    let relevant = products || [];

    // 2️⃣ Fetch live from SerpApi if no cache
    if (relevant.length === 0) {
      console.log("🧠 Cache miss → fetching via SerpApi");
      relevant = await fetchAllProducts(message);
    }

    // 3️⃣ Generate AI response via Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const productList = relevant
      .slice(0, 5)
      .map(
        (p, i) =>
          `${i + 1}. ${p.title} (${p.source}) - $${p.extracted_price || p.price || "N/A"}`
      )
      .join("\n");

    const prompt = `
User is asking about: ${message}
Here are some products we found:
${productList}

Recommend the best option, explaining briefly why (based on price and rating).
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({
      success: true,
      data: { response: responseText, products: relevant },
    });
  } catch (err) {
    console.error("❌ Chat API error:", err.message);
    return NextResponse.json({ success: false, error: err.message });
  }
}
