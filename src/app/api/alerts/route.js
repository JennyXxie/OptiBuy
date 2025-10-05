import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const user_id = searchParams.get("user_id")

  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ success: false, error })
  return NextResponse.json({ success: true, data })
}

export async function POST(req) {
  const body = await req.json()
  const { data, error } = await supabase
    .from("alerts")
    .insert([
      {
        user_id: body.userId,
        product_name: body.alertName,
        target_price: body.targetPrice || null,
        platform: body.platform || "amazon",
        current_price: body.currentPrice || 0,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ])
    .select()

  if (error) return NextResponse.json({ success: false, error })
  return NextResponse.json({ success: true, data: data[0] })
}
