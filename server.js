require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

// Load Azure OpenAI credentials from .env
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-05-01-preview";

// Read resume data from a text file
const resumeFilePath = "resume.txt";
let resumeData = "William's resume information is not available.";

if (fs.existsSync(resumeFilePath)) {
    resumeData = fs.readFileSync(resumeFilePath, "utf-8");
    console.log("✅ Resume data loaded successfully!");
} else {
    console.log("⚠️ Resume file not found, using default response.");
}

// AI Chatbot API Route
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        // Enhanced prompt to enforce using only resume data
        const prompt = `
        You are JARVIS, a highly intelligent AI assistant for William Espitia.
        Only use the following resume data to answer questions—DO NOT rely on external knowledge.
        If you don't know the answer based on the resume, say: "I don't have that information."
        
        Resume Data:
        ${resumeData}
        
        User asked: "${message}"
        `;

        const requestData = {
            messages: [{ role: "user", content: prompt }],
            max_tokens: 800,
            temperature: 0.7,
        };

        // Make request to Azure OpenAI API
        const response = await axios.post(
            `${endpoint}/openai/deployments/${model}/chat/completions?api-version=${apiVersion}`,
            requestData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": apiKey,
                },
            }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        res.status(500).json({ reply: "Sorry, I’m having trouble processing your request." });
    }
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
