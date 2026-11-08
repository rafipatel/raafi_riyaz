import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Loader2, Sparkles, X } from "lucide-react";
import { chatService, type ChatMessage } from "@/lib/chatService";
import { chatbot, contact } from "@/data/portfolioData";

const QUICK_QUESTIONS = [
  "What is Raafi working on right now?",
  "Tell me about VideoVoice",
  "What RL environment work has he done?",
  "I'll paste a job description: is he a fit?",
];

/** Turn bare URLs in a reply into links. */
const linkify = (text: string) =>
  text.split(/(https?:\/\/[^\s)]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all font-medium text-ro-acc-text underline underline-offset-2">
        {part}
      </a>
    ) : (
      part
    ),
  );

/** "Ask my agent": an LLM assistant that answers questions about Raafi from the site's own data. */
const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Whether a real reply has arrived yet: the first one is slow while the agent's server wakes up.
  const [hasReplied, setHasReplied] = useState(false);
  const [slow, setSlow] = useState(false);

  // For later replies, only mention the wait if it runs past a few seconds.
  useEffect(() => {
    if (!isLoading) {
      setSlow(false);
      return;
    }
    const id = window.setTimeout(() => setSlow(true), 5000);
    return () => window.clearTimeout(id);
  }, [isLoading]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Nudge once, a few seconds after landing, until the visitor opens the chat.
  useEffect(() => {
    const show = window.setTimeout(() => setShowHint(true), 6000);
    const hide = window.setTimeout(() => setShowHint(false), 16000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    setShowHint(false);
    inputRef.current?.focus();
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            chatbot.greeting,
          timestamp: new Date(),
        },
      ]);
    }
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, messages.length]);

  const send = async (text?: string) => {
    const content = (text ?? inputValue).trim();
    if (!content || isLoading) return;
    setMessages((prev) => [...prev, { role: "user", content, timestamp: new Date() }]);
    setInputValue("");
    setIsLoading(true);
    try {
      const res = await chatService.sendMessage(content);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.content, timestamp: new Date(), provider: res.provider, model: res.model },
      ]);
      setHasReplied(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I couldn't reach the model just now. Please try again, or contact Raafi directly at ${contact.email}.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const lastModel = [...messages].reverse().find((m) => m.role === "assistant" && m.provider);

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ delay: 0.2 }}
            className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6"
          >
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="relative hidden max-w-[240px] rounded-xl border border-ro-line2 bg-ro-surface px-3.5 py-2.5 text-[13px] leading-snug text-ro-body shadow-xl sm:block"
                >
                  Paste a job description and my agent will tell you whether I fit.
                  <button
                    type="button"
                    aria-label="Dismiss"
                    onClick={() => setShowHint(false)}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-ro-line2 bg-ro-surface text-ro-muted hover:text-ro-fg"
                  >
                    <X className="h-3 w-3" aria-hidden />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-ro-acc pl-4 pr-5 text-[15px] font-semibold text-ro-acc-ink shadow-lg transition-transform hover:scale-[1.03]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ro-acc-ink opacity-40 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ro-acc-ink" />
              </span>
              Ask my agent
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Chat with Raafi's agent"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-x-3 bottom-3 z-50 flex h-[min(640px,82svh)] flex-col overflow-hidden rounded-2xl border border-ro-line2 bg-ro-surface text-ro-fg shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[420px]"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-ro-line px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ro-tool-bg text-ro-tool-fg">
                  <Sparkles className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-[11px] text-ro-muted">agent.chat()</p>
                  <p className="font-semibold leading-tight">Ask about Raafi</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ro-line2 text-ro-muted hover:border-ro-acc hover:text-ro-fg"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed ${
                      m.role === "user" ? "rounded-br-md bg-ro-acc text-ro-acc-ink" : "rounded-bl-md border border-ro-line bg-ro-inset text-ro-fg"
                    }`}
                  >
                    {m.role === "assistant" ? linkify(m.content) : m.content}
                  </p>
                </motion.div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-col gap-2 pt-1">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      disabled={isLoading}
                      onClick={() => (q.startsWith("I'll paste") ? inputRef.current?.focus() : send(q))}
                      className="rounded-xl border border-ro-line2 px-3.5 py-2.5 text-left text-[13px] text-ro-body transition-colors hover:border-ro-acc hover:text-ro-fg disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="flex flex-col gap-1.5" aria-live="polite">
                  <div className="flex items-center gap-2 font-mono text-xs text-ro-muted">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                    agent is thinking…
                  </div>
                  {(!hasReplied || slow) && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-fit max-w-[90%] rounded-lg bg-ro-inset px-3 py-2 text-[13px] leading-snug text-ro-body"
                    >
                      {hasReplied ? chatbot.slowReplyNote : chatbot.firstReplyNote}
                    </motion.p>
                  )}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="shrink-0 border-t border-ro-line p-3">
              <div className="flex items-end gap-2 rounded-xl border border-ro-line2 bg-ro-inset p-1.5 focus-within:border-ro-acc">
                <label htmlFor="chat-input" className="sr-only">
                  Message
                </label>
                <textarea
                  id="chat-input"
                  ref={inputRef}
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask anything, or paste a job description…"
                  disabled={isLoading}
                  className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-[14px] placeholder:text-ro-muted focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Send"
                  onClick={() => send()}
                  disabled={!inputValue.trim() || isLoading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ro-acc text-ro-acc-ink disabled:opacity-40"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <ArrowUp className="h-4 w-4" aria-hidden />}
                </button>
              </div>
              <p className="mt-2 text-center font-mono text-[10px] text-ro-muted">
                {lastModel ? `${lastModel.provider} · ${lastModel.model}` : "answers come from this site's own data"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
