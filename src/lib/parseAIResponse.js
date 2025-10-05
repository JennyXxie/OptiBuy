// src/lib/parseAIResponse.js

/**
 * Safely parses an AI response that may contain JSON mixed with plain text.
 * Prevents crashes if the model outputs invalid or extra text.
 */
export function safeParseAIResponse(text, fallback = {}) {
  try {
    // Find first and last braces to extract JSON portion
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      const jsonString = text.slice(jsonStart, jsonEnd + 1);
      return JSON.parse(jsonString); // ✅ Parsed successfully
    }

    // If no valid JSON found, return fallback
    return fallback;
  } catch {
    // Parsing failed — return fallback safely
    return fallback;
  }
}
