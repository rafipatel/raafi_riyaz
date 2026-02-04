import Groq from "groq-sdk";
import { GROQ_CONFIG } from "./groqConfig";
import { POLLEN_CONFIG } from "./pollenConfig";
import { getSystemPrompt } from "./knowledge";

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    provider?: string;
    model?: string;
}

export interface ChatResponse {
    content: string;
    provider: string;
    model: string;
}

class ChatService {
    private groq: Groq | null = null;
    private conversationHistory: ChatMessage[] = [];
    private initializationPromise: Promise<void> | null = null;
    private lastProvider: string = "Groq";
    private lastModel: string = GROQ_CONFIG.model;

    constructor() {
        // Initialization happens on first request
    }

    private async getGroqClient(): Promise<Groq> {
        if (this.groq) return this.groq;

        // If initialization is already in progress, wait for it
        if (this.initializationPromise) {
            await this.initializationPromise;
            if (this.groq) return this.groq;
        }

        // Start initialization
        this.initializationPromise = (async () => {
            try {
                // Try getting from env first (local dev) or config
                let apiKey = GROQ_CONFIG.apiKey;

                // If no key in config (production deployment), fetch from backend
                if (!apiKey) {
                    try {
                        const response = await fetch("https://groq-proxy-2op1.onrender.com/get-key");
                        if (response.ok) {
                            const data = await response.json();
                            apiKey = data.api_key;
                        }
                    } catch (err) {
                        console.error("Failed to fetch API key from proxy:", err);
                    }
                }

                if (!apiKey) {
                    throw new Error("No API key available");
                }

                this.groq = new Groq({
                    apiKey: apiKey,
                    dangerouslyAllowBrowser: true,
                });
            } finally {
                this.initializationPromise = null;
            }
        })();

        await this.initializationPromise;
        if (!this.groq) throw new Error("Failed to initialize Groq client");
        return this.groq;
    }

    private async sendPollenMessage(messages: any[]): Promise<string> {
        if (!POLLEN_CONFIG.apiKey) {
            throw new Error("Pollinations API key not configured");
        }

        const response = await fetch(POLLEN_CONFIG.apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${POLLEN_CONFIG.apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: POLLEN_CONFIG.model,
                messages: messages,
                temperature: POLLEN_CONFIG.temperature,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Pollinations API error: ${response.status} ${error}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || "";
    }

    async sendMessage(userMessage: string): Promise<ChatResponse> {
        try {
            // Add user message to history
            this.conversationHistory.push({
                role: "user",
                content: userMessage,
                timestamp: new Date(),
            });

            // Keep only last 10 messages for context
            const recentHistory = this.conversationHistory.slice(-10);

            // Prepare messages
            const messages = [
                {
                    role: "system",
                    content: getSystemPrompt(),
                },
                ...recentHistory.map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                })),
            ];

            let assistantMessage = "";
            let provider = "Pollinations AI";
            let model = POLLEN_CONFIG.model;

            try {
                // Try Pollinations AI first
                assistantMessage = await this.sendPollenMessage(messages);
                this.lastProvider = provider;
                this.lastModel = model;
            } catch (pollenError) {
                console.error("Pollinations AI failed, falling back to Groq:", pollenError);

                // Fallback to Groq
                const groqClient = await this.getGroqClient();
                const chatCompletion = await groqClient.chat.completions.create({
                    messages: messages as any,
                    model: GROQ_CONFIG.model,
                    temperature: GROQ_CONFIG.temperature,
                    max_tokens: GROQ_CONFIG.maxTokens,
                    top_p: GROQ_CONFIG.topP,
                });

                assistantMessage = chatCompletion.choices[0]?.message?.content || "";
                provider = "Groq";
                model = GROQ_CONFIG.model;
                this.lastProvider = provider;
                this.lastModel = model;
            }

            if (!assistantMessage) {
                throw new Error("No response generated from any provider");
            }

            // Add assistant response to history
            this.conversationHistory.push({
                role: "assistant",
                content: assistantMessage,
                timestamp: new Date(),
                provider,
                model
            });

            return {
                content: assistantMessage,
                provider,
                model
            };
        } catch (error) {
            console.error("All AI providers failed:", error);
            const msg = error instanceof Error ? error.message : "Unknown error";
            throw new Error(`Failed to get response from AI: ${msg}`);
        }
    }

    getLastProviderInfo() {
        return {
            provider: this.lastProvider,
            model: this.lastModel
        };
    }

    clearHistory() {
        this.conversationHistory = [];
    }

    getHistory(): ChatMessage[] {
        return this.conversationHistory;
    }
}

// Export a singleton instance
export const chatService = new ChatService();
