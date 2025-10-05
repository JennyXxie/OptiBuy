import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function TestConnection() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from("products").select("*").limit(1);
        if (error) throw error;

        if (data && data.length > 0) {
          setStatus(`✅ Connected! Found ${data.length} product(s): ${data[0].name}`);
        } else {
          setStatus("✅ Connected, but no data found in 'products' table");
        }
      } catch (err) {
        setStatus(`❌ Connection failed: ${err.message}`);
      }
    }

    testConnection();
  }, []);

  return (
    <div style={{ fontFamily: "monospace", padding: "20px" }}>
      <h2>Supabase Connection Test</h2>
      <p>{status}</p>
    </div>
  );
}
