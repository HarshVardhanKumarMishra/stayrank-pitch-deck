import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userText = (req.body?.message ?? "").toString().slice(0, 4000);
    if (!userText) return res.status(400).json({ error: "message required" });

    // Use the Gemini API
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }]
      })
    });

    if (!resp.ok) {
      const err = await resp.text();
      return res.status(500).json({ error: "Gemini error", detail: err });
    }

    const data = await resp.json();
    let text = "Sorry, I couldn't generate a reply.";
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      text = data.candidates[0].content.parts[0].text;
    }
    res.json({ reply: text });
  } catch (e) {
    res.status(500).json({ error: "server error", detail: String(e) });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Voice backend on http://localhost:${PORT}`));