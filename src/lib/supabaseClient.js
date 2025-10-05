import { createClient } from "@supabase/supabase-js";

// ✅ Use Next.js-style environment variables
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);
