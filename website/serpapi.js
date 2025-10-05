// api/serpapi.js
import axios from "axios";
import dotenv from "dotenv";
import { supabase } from "../supabaseClient.js";

dotenv.config();

const SOURCES = [
  { engine: "google_shopping", label: "Google Shopping", param: "q" },
  { engine: "walmart", label: "Walmart", param: "query" },
  { engine: "ebay", label: "eBay", param: "_nkw" }, // ✅ fixed
];

const EXCLUDED_SOURCES = ["home depot", "etsy", "aliexpress"];

async function fetchSourceProducts(engine, label, param, query, apiKey) {
  try {
    console.log(`🌐 Fetching from ${label}...`);
    const url = "https://serpapi.com/search.json";
    const response = await axios.get(url, {
      params: {
        engine,
        [param]: query,
        api_key: apiKey,
      },
      timeout: 7000,
    });

    let results =
      response.data.shopping_results ||
      response.data.organic_results ||
      response.data.products ||
      [];

    if (!Array.isArray(results)) results = [];

    const cleaned = results
      .filter(
        (p) =>
          p.title &&
          !EXCLUDED_SOURCES.some((s) =>
            (p.source || "").toLowerCase().includes(s)
          )
      )
      .slice(0, 10)
      .map((p) => ({
        title: p.title,
        price: p.price || p.price_str,
        extracted_price: p.extracted_price || null,
        rating: p.rating || null,
        reviews: p.reviews || null,
        source: p.source || label,
        thumbnail: p.thumbnail || p.image || null,
        product_link: p.product_link || p.link || null,
        serpapi_product_api: p.serpapi_product_api || null,
      }));

    console.log(`✅ Got ${cleaned.length} items from ${label}`);
    return cleaned;
  } catch (err) {
    console.error(`❌ ${label} fetch failed:`, err.response?.statusText || err.message);
    return [];
  }
}

export async function fetchAllProducts(query) {
  console.log(`🔍 Fetching combined products for: ${query}`);
  const serpApiKey = process.env.SERPAPI_KEY;
  const cacheKey = `cache_${query.replace(/\s+/g, "_")}`;

  // 1️⃣ Try cache first
  const { data: cache } = await supabase
    .from("product_cache")
    .select("*")
    .eq("query", query)
    .single();

  if (cache && cache.products?.length) {
    console.log("🧠 Cache hit!");
    return cache.products;
  }

  // 2️⃣ Fetch live from each source
  let allProducts = [];
  for (const src of SOURCES) {
    const items = await fetchSourceProducts(
      src.engine,
      src.label,
      src.param,
      query,
      serpApiKey
    );
    allProducts.push(...items);
  }

  // 3️⃣ Deduplicate
  const unique = [...new Map(allProducts.map((p) => [p.title, p])).values()];

  console.log(`📦 Combined total: ${allProducts.length}`);
  console.log(`🧩 Unique products: ${unique.length}`);

  // 4️⃣ Cache results
  await supabase.from("product_cache").upsert({
    query,
    products: unique,
    created_at: new Date(),
  });

  // 5️⃣ Insert into 'products' table
  if (unique.length > 0) {
    const { error } = await supabase
      .from("products")
      .upsert(unique, { onConflict: "title" });
    if (error) console.error("⚠️ Supabase insert error:", error.message);
  }

  return unique;
}
