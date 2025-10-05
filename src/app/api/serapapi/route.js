import axios from "axios";
import { supabase } from "@/lib/supabaseClient";

const SOURCES = [
  { engine: "google_shopping", label: "Google Shopping", param: "q" },
  { engine: "walmart", label: "Walmart", param: "query" },
  { engine: "ebay", label: "eBay", param: "_nkw" },
];

const EXCLUDED_SOURCES = ["home depot", "etsy", "aliexpress"];

async function fetchSourceProducts(engine, label, param, query, apiKey) {
  try {
    const { data } = await axios.get("https://serpapi.com/search.json", {
      params: { engine, [param]: query, api_key: apiKey },
      timeout: 7000,
    });

    let results =
      data.shopping_results || data.organic_results || data.products || [];
    if (!Array.isArray(results)) results = [];

    return results
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
      }));
  } catch (err) {
    console.error(`❌ ${label} fetch failed:`, err.message);
    return [];
  }
}

export async function fetchAllProducts(query) {
  const serpApiKey = process.env.SERPAPI_KEY;

  const { data: cache } = await supabase
    .from("product_cache")
    .select("*")
    .eq("query", query)
    .single();

  if (cache && cache.products?.length) {
    console.log("🧠 Cache hit!");
    return cache.products;
  }

  let all = [];
  for (const s of SOURCES) {
    const items = await fetchSourceProducts(
      s.engine,
      s.label,
      s.param,
      query,
      serpApiKey
    );
    all.push(...items);
  }

  const unique = [...new Map(all.map((p) => [p.title, p])).values()];

  await supabase.from("product_cache").upsert({
    query,
    products: unique,
    created_at: new Date(),
  });

  if (unique.length > 0) {
    const { error } = await supabase
      .from("products")
      .upsert(unique, { onConflict: "title" });
    if (error) console.error("⚠️ Supabase insert error:", error.message);
  }

  return unique;
}
