import { fetchAllProducts } from "./serpapi.js";

(async () => {
  try {
    const results = await fetchAllProducts("wireless headphones");
    console.log(`✅ Got ${results.length} products total`);
    console.log("First 5:", results.slice(0, 5));
  } catch (err) {
    console.error("❌ Error running test:", err.message);
  }
})();
