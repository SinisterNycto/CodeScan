import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const body = req.body; // Vercel auto-parses JSON

    if (!body?.prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: body.model || "gemini-2.5-flash",
      content: body.prompt, 
    });

    // Extract text safely
    const output =
      response.text ??
      response.candidates?.[0]?.content?.parts?.find(p => p.text)?.text ??
      null;

    return res.status(200).json({
      text: output || JSON.stringify(response, null, 2),
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({
      error: "Server error",
      details: String(err),
    });
  }
}
