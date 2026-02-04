// Pollinations.ai API Configuration

export const POLLEN_CONFIG = {
    apiKey: import.meta.env.POLLEN_API_KEY_SECONDARY || "",
    apiUrl: "https://gen.pollinations.ai/v1/chat/completions",
    model: "nova-fast", // Amazon Nova Micro
    temperature: 0.7,
};
