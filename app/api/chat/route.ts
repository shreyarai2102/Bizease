import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Missing Gemini API key" }),
      { status: 500 }
    );
  }

  try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are a helpful AI assistant for a platform called BizEase. BizEase helps entrepreneurs in India, specifically in Delhi, to start and manage their businesses. You should provide concise, helpful, and accurate information related to business registration, licenses, government schemes, and compliance in India. Always be friendly and professional. When providing links, make sure they are valid and relevant government or official websites." }],
        },
        {
          role: "model",
          parts: [{ text: "Hello! I am the BizEase AI Assistant. I'm ready to help you with your business-related questions. How can I assist you today?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ response: text }), { status: 200 });
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response(JSON.stringify({ error: "Failed to get response from AI" }), {
      status: 500,
    });
  }
}
