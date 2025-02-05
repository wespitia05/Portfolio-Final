import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { NextResponse } from 'next/server';

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;

export async function GET(req) {
    return NextResponse.json({
        message: 'Hello World'
    });
}

// AI Chatbot API Route
export async function POST(req) {
    try {
        const { message } = await req.json();

        // Connect to Azure OpenAI API
        const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
        const response = await client.getChatCompletions(model, [{ role: "user", content: message }]);

        return NextResponse.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        return NextResponse.json({ reply: "Sorry, I’m having trouble processing your request." }, { status: 500 });
    }
}
