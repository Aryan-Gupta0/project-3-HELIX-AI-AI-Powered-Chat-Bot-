import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
console.log("Loaded KEY:", process.env.GEMINI_API_KEY);

const app = express();   // ✅ VERY IMPORTANT

app.use(cors());
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    console.log("Received question:", question);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
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
      }
    );

    const data = await response.json();

    console.log("Gemini response:", JSON.stringify(data, null, 2));

    res.json(data);

  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});