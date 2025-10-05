// api/testApi.js
import { fetchAmazonProducts } from "./serpapi.js";

const test = async () => {
  console.log("🔍 Fetching SerpApi products...");
  const results = await fetchAmazonProducts("wireless headphones");

  console.log("\n✅ First 3 products:");
  console.log(results.slice(0, 3)); // show first 3 products
};

test().catch(console.error);
