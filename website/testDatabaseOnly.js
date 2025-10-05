// testDatabaseOnly.js
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

console.log("🔍 Testing Supabase connection...");

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  try {
    // Try to fetch one row from 'products'
    const { data, error } = await supabase.from("products").select("*").limit(1);

    if (error) throw error;

    if (data && data.length > 0) {
      console.log(`✅ Connected! Found ${data.length} product(s):`);
      console.log(data[0]);
    } else {
      console.log("✅ Connected successfully, but no data found in 'products' table.");
    }
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  }
})();
