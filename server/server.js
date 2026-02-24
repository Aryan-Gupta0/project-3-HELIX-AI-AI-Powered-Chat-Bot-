import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    console.log("Received question:", question);

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: question }],
          },
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});