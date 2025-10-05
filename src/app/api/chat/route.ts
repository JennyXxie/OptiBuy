import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Gemini API key missing" },
        { status: 400 }
      );
    }

    // ✅ use the valid model name
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

    const prompt = `
    User query: ${message}

    You are DealBot, an AI shopping assistant.
    Help users find the best deals, compare prices, and provide recommendations
    across Amazon, Temu, eBay, and Walmart.
    Respond conversationally, with markdown formatting if needed.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const mockProducts = [
      {
        name: "Wireless Bluetooth Headphones",
        price: 45.99,
        platform: "Temu",
        url: "https://temu.com/search?q=wireless+bluetooth+headphones",
        rating: 4.7,
        reviews: 3200,
        image: "https://img.kwcdn.com/product/open/2024-02-14/1707901234567_headphones.jpg",
      },
      {
        name: "Noise Canceling Headphones",
        price: 89.99,
        platform: "Amazon",
        url: "https://amazon.com/search?k=noise+canceling+headphones",
        rating: 4.6,
        reviews: 4800,
        image: "https://m.media-amazon.com/images/I/61T1qK3bA8L._AC_SL1500_.jpg",
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        response: text,
        products: mockProducts,
        sessionId: sessionId || Date.now().toString(),
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { success: false, error: "Error processing Gemini request" },
      { status: 500 }
    );
  }
}
