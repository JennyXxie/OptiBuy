// api/serpapi.js
import axios from "axios";
import dotenv from "dotenv";
import { supabase } from "../supabaseClient.js";

dotenv.config();

const SERPAPI_KEY =
  process.env.SERPAPI_KEY || process.env.VITE_SERPAPI_KEY;

if (!SERPAPI_KEY) {
  throw new Error("❌ Missing SerpApi key in .env");
}

/**
 * Fetch products from SerpApi and cache results in Supabase.
 * Also saves each product to the 'products' table (deduped by URL).
 */
export async function fetchAmazonProducts(query) {
  // 1️⃣ Check cache first
  const { data: cache, error: cacheError } = await supabase
    .from("product_cache")
    .select("data, updated_at")
    .eq("query", query)
    .maybeSingle();

  if (cacheError) console.warn("⚠️ Cache lookup failed:", cacheError.message);

  if (cache && cache.data) {
    console.log("🧠 Cache hit for query:", query);
    return cache.data;
  }

  // 2️⃣ Fetch from SerpApi
  console.log("🌐 No cache found — calling SerpApi...");
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(
    query
  )}&engine=google_shopping&api_key=${SERPAPI_KEY}`;

  const res = await axios.get(url);
  const results = res.data.shopping_results || [];

  // 3️⃣ Save to product_cache
  const { error: cacheInsertError } = await supabase.from("product_cache").upsert({
    query,
    data: results,
    updated_at: new Date(),
  });

  if (cacheInsertError) {
    console.error("❌ Cache insert failed:", cacheInsertError.message);
  } else {
    console.log("✅ Cached result saved to product_cache.");
  }

  // 4️⃣ Save each product to 'products' table (avoid duplicates by URL)
  for (const product of results) {
    try {
      const { data: existing, error: findError } = await supabase
        .from("products")
        .select("id")
        .eq("url", product.product_link)
        .maybeSingle();

      if (findError) {
        console.warn(`⚠️ Skipped duplicate check error for ${product.title}:`, findError.message);
        continue;
      }

      if (!existing) {
        const { error: insertError } = await supabase.from("products").insert({
          name: product.title,
          price: product.extracted_price || null,
          source: product.source || "Unknown",
          url: product.product_link,
          image_url: product.thumbnail,
          rating: product.rating || null,
          reviews_count: product.reviews || 0,
          date_added: new Date(),
        });

        if (insertError)
          console.error(`❌ Failed to insert ${product.title}:`, insertError.message);
        else
          console.log(`🆕 Added product: ${product.title}`);
      } else {
        console.log(`⚡ Skipped duplicate: ${product.title}`);
      }
    } catch (err) {
      console.error(`❌ Error saving product "${product.title}":`, err.message);
    }
  }

  return results;
}
