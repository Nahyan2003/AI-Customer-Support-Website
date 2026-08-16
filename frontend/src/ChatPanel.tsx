import { useEffect, useRef, useState } from "react";
import { askQuestion, needsEscalation } from "@/lib/chat-api";
import { ChatMessage, type ChatMessageData } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";

const WELCOME: ChatMessageData = {
  id: "welcome",
  role: "assistant",
  content: "Hi! 👋 I'm your AI Customer Support Assistant. How can I help you today?",
};

const SUGGESTIONS = [
  "Can I get a refund after 20 days?",
  "How long does shipping take?",
  "How do I cancel my order?",
];

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessageData[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function handleSend(question: string) {
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content: question },
    ]);
    setLoading(true);

    try {
      const res = await askQuestion(question);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: res.answer || "I couldn't find a confident answer for that request.",
          confidence: res.confidence,
          source: res.source,
          escalated: needsEscalation(res),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content: "I couldn't reach the support service right now. Please try again in a moment.",
          escalated: true,
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="glass-panel-lg mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem]">
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        <p className="text-sm font-medium text-foreground">Support Session</p>
        <p className="text-xs text-muted-foreground">Powered by RAG + AI</p>
      </div>

      <div className="h-[52vh] max-h-[560px] min-h-[340px] space-y-5 overflow-y-auto px-4 py-6 sm:px-6">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <div className="space-y-3 border-t border-border/60 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              disabled={loading}
              onClick={() => handleSend(s)}
              className="glass-chip rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </section>
  );
}
