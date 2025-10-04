// supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// ✅ Load .env for Node
dotenv.config();

// ✅ Support both Node + Vite
const supabaseUrl =
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Missing Supabase credentials in .env file");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
