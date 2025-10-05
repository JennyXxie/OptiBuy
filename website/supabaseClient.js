import { createClient } from "@supabase/supabase-js";

// Load from .env.local
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
