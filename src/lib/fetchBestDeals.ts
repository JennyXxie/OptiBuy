import axios from "axios"

/**
 * Represents a single product offer returned by SerpAPI or your database.
 */
interface ShoppingResult {
  source?: string
  price?: string
  link?: string
  delivery?: string
}

/**
 * Represents the cleaned "retailer offer" returned to the frontend.
 */
export interface RetailerOffer {
  retailer: string
  price: number
  link: string
  delivery?: string
}

/**
 * Fetches best deals for a given alertId.
 * You can replace this logic later with Supabase queries
 * or combine it with your own product search aggregator.
 */
export async function getBestDealFromAPIs(alertId: string): Promise<RetailerOffer[]> {
  try {
    console.log("🔍 Fetching best deal for alert:", alertId)

    // Example call to SerpAPI — replace this with your own query logic
    const result = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: "wireless headphones", // TODO: dynamic search term
        api_key: process.env.SERP_API_KEY,
      },
    })

    const results: ShoppingResult[] = result.data.shopping_results ?? []

    // Convert SerpAPI results into clean RetailerOffer format
    const deals: RetailerOffer[] = results.slice(0, 3).map((r) => ({
      retailer: r.source || "Unknown",
      price: r.price ? parseFloat(r.price.replace("$", "")) : 0,
      link: r.link || "#",
      delivery: r.delivery || "Standard",
    }))

    return deals
  } catch (error) {
    console.error("❌ Error fetching deals:", error)
    return []
  }
}
