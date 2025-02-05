require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

// Load Azure OpenAI credentials from .env
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-05-01-preview";

// Test API Route
app.get("/api", (req, res) => {
    res.json({ message: "Hello World" });
});

// AI Chatbot API Route
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        // Prepare request payload
        const requestData = {
            messages: [{ role: "user", content: message }],
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
        console.error("Error communicating with OpenAI:", error.response ? error.response.data : error.message);
        res.status(500).json({ reply: "Sorry, I’m having trouble processing your request." });
    }
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
