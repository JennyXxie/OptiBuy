import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function DELETE(req, context) {
  const id = context.params.id
  const { error } = await supabase.from("alerts").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ success: false, error })
  }

  return NextResponse.json({ success: true })
}
