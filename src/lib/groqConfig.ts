// Groq API Configuration
// Note: In production, use environment variables. For demo purposes, the key is embedded.

export const GROQ_CONFIG = {
    apiKey: import.meta.env.VITE_GROQ_API_KEY || "",
    // Tried in order. Each model has its own tokens-per-minute budget (8k on this
    // key, and one request with the system prompt is ~4.3k), so when one is
    // rate-limited the chat moves to the next instead of failing.
    models: ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.8-27b"],
    model: "openai/gpt-oss-120b",
    temperature: 0.7,
    maxTokens: 1024,
    topP: 1,
};
