import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const body = req.body;

    if (!body || !body.prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: body.model || "gemini-2.5-flash",
      contents: [{ text: body.prompt }],
    });

    const output =
      response.text ??
      response.candidates?.[0]?.content?.parts?.[0]?.text ??
      JSON.stringify(response, null, 2);

    return res.status(200).json({ text: output });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({
      error: "Server error",
      details: String(err),
    });
  }
}
