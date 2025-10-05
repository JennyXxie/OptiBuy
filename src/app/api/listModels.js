import "dotenv/config";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in your .env file");
  process.exit(1);
}

async function listModels() {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models",
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    console.log("✅ Available Gemini Models:\n");
    data.models.forEach((m) => {
      console.log(`🧠 ${m.name}`);
    });
  } catch (err) {
    console.error("❌ Error listing models:", err.message);
  }
}

listModels();
