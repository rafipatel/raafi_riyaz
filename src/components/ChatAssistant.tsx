import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { chatService, ChatMessage } from "@/lib/chatService";
import { Button } from "@/components/ui/button";

const QUICK_QUESTIONS = [
    "What's his experience with AI/ML?",
    "Tell me about his recent projects",
    "What are his technical skills?",
];

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Welcome message when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    role: "assistant",
                    content: "I can answer questions about Raafi's experience, projects, skills, and background. What would you like to know?",
                    timestamp: new Date(),
                },
            ]);
        }
    }, [isOpen]);

    const handleSendMessage = async (message?: string) => {
        const messageToSend = message || inputValue;
        if (!messageToSend.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            role: "user",
            content: messageToSend,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await chatService.sendMessage(messageToSend);
            const assistantMessage: ChatMessage = {
                role: "assistant",
                content: response.content,
                timestamp: new Date(),
                provider: response.provider,
                model: response.model
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = {
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again or reach out to Raafi directly via LinkedIn.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickQuestion = (question: string) => {
        handleSendMessage(question);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            >
                <AnimatePresence>
                    {!isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.8, rotate: -2 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -5, 0],
                                    scale: 1,
                                    rotate: [-2, 0, -2]
                                }}
                                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                transition={{
                                    delay: 2,
                                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                    default: { duration: 0.5 }
                                }}
                                className="absolute bottom-full right-0 mb-5 w-52 bg-gradient-to-br from-white/95 to-purple-50/95 dark:from-zinc-800/95 dark:to-zinc-900/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-primary/20 z-50 pointer-events-none"
                            >
                                <div className="relative z-10">
                                    <p className="text-xs font-medium text-foreground/90 leading-relaxed">
                                        ✨ Discover why <span className="text-primary font-bold bg-primary/10 px-1 py-0.5 rounded">Raafi</span> is the perfect fit for your team!
                                    </p>
                                </div>

                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/50 to-transparent"
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                                    style={{ opacity: 0.5 }}
                                />

                                {/* Speech bubble arrow */}
                                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-purple-50 dark:bg-zinc-900 transform rotate-45 border-r border-b border-primary/20" />
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, y: [0, -8, 0] }}
                                exit={{ scale: 0 }}
                                transition={{
                                    scale: { type: "spring", stiffness: 260, damping: 20 },
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="relative"
                            >
                                {/* Ripple Effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-primary/30 z-0"
                                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-accent/20 z-0"
                                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                />

                                <Button
                                    onClick={toggleChat}
                                    size="lg"
                                    className="h-16 w-16 rounded-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 shadow-[var(--shadow-elegant)] group relative overflow-hidden z-10 border-2 border-white/20"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-white/20"
                                        animate={{
                                            rotate: [0, 360],
                                        }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        style={{ transformOrigin: "center" }}
                                    />

                                    <motion.div
                                        animate={{
                                            rotate: [0, -10, 10, -10, 10, 0],
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <MessageCircle className="h-7 w-7 relative z-10 text-white fill-white/20" />
                                    </motion.div>

                                    <motion.div
                                        className="absolute top-2 right-3 h-3 w-3 bg-secondary rounded-full border-2 border-white"
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                </Button>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md"
                    >
                        <div className="glass rounded-2xl shadow-[var(--shadow-elegant)] overflow-hidden flex flex-col h-[600px] max-h-[80vh]">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <Sparkles className="h-5 w-5 text-white" />
                                        </div>
                                        <motion.div
                                            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border-2 border-white"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">👋 Hello! I'm Rafa</h3>
                                        <p className="text-xs text-white/80">Ask me anything about Raafi</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={toggleChat}
                                    className="h-8 w-8 p-0 text-white hover:bg-white/20"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50 backdrop-blur-sm">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${message.role === "user"
                                                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                                                : "glass border border-primary/20"
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                                {(() => {
                                                    const content = message.content;
                                                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                                                    const parts = content.split(urlRegex);

                                                    return parts.map((part, i) => {
                                                        if (part.match(urlRegex)) {
                                                            return (
                                                                <a
                                                                    key={i}
                                                                    href={part}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="underline underline-offset-2 hover:text-primary transition-colors font-medium break-all"
                                                                >
                                                                    {part}
                                                                </a>
                                                            );
                                                        }
                                                        return part;
                                                    });
                                                })()}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Quick Questions - Only show after welcome message and before any user interaction */}
                                {messages.length === 1 && messages[0].role === "assistant" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.2 }}
                                        className="space-y-2"
                                    >
                                        <p className="text-xs text-muted-foreground text-center mb-2">Quick questions:</p>
                                        {QUICK_QUESTIONS.map((question, index) => (
                                            <motion.button
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                                whileHover={{ scale: 1.02, x: 4 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleQuickQuestion(question)}
                                                disabled={isLoading}
                                                className="w-full glass border border-primary/30 hover:border-primary/50 rounded-xl px-4 py-3 text-left text-sm transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Sparkles className="h-3.5 w-3.5 text-primary/60 group-hover:text-primary transition-colors" />
                                                    <span className="text-foreground/80 group-hover:text-foreground transition-colors">{question}</span>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}

                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="glass border border-primary/20 rounded-2xl px-4 py-2.5">
                                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
                                <div className="flex gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask me anything about Raafi..."
                                        className="flex-1 px-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        onClick={() => handleSendMessage()}
                                        disabled={!inputValue.trim() || isLoading}
                                        size="sm"
                                        className="px-4 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <Send className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 text-center">
                                    Powered by {(() => {
                                        const lastAssistantMessage = [...messages].reverse().find(m => m.role === "assistant" && m.provider);
                                        if (lastAssistantMessage) {
                                            return `${lastAssistantMessage.provider} • ${lastAssistantMessage.model}`;
                                        }
                                        return "Pollinations AI • Amazon Nova Micro";
                                    })()}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatAssistant;
