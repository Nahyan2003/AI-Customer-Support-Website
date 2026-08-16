import { Bot, LifeBuoy, User } from "lucide-react";
import { sourceLabel } from "@/lib/chat-api";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { cn } from "@/lib/utils";

export type ChatMessageData = {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  source?: string;
  escalated?: boolean;
  error?: boolean;
};

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full animate-message-in items-end gap-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="glass-avatar grid size-9 shrink-0 place-items-center rounded-2xl">
          <Bot className="size-4 text-primary" aria-hidden />
        </div>
      )}

      <div className={cn("max-w-[85%] space-y-2 sm:max-w-[72%]", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-soft sm:text-[0.95rem]",
            isUser
              ? "rounded-br-md bg-bubble-user text-primary-foreground"
              : "glass-panel rounded-bl-md text-foreground",
            message.error && "border-destructive/40 text-destructive",
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {!isUser && (message.source || typeof message.confidence === "number") && (
          <div className="flex animate-fade-up flex-wrap items-center gap-2 pl-1">
            {message.source && (
              <span className="glass-chip rounded-full px-3 py-1 text-[0.7rem] font-medium tracking-wide text-accent">
                {sourceLabel(message.source)}
              </span>
            )}
            {typeof message.confidence === "number" && (
              <ConfidenceMeter value={message.confidence} />
            )}
          </div>
        )}

        {message.escalated && (
          <div className="glass-panel animate-fade-up flex gap-3 rounded-2xl border-accent/30 p-4">
            <span className="grid size-9 shrink-0 animate-pulse-soft place-items-center rounded-xl bg-accent/15">
              <LifeBuoy className="size-4 text-accent" aria-hidden />
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">
                Your question requires additional assistance.
              </p>
              <p className="text-xs text-muted-foreground">
                Your request has been forwarded for further review.
              </p>
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="glass-avatar grid size-9 shrink-0 place-items-center rounded-2xl">
          <User className="size-4 text-accent" aria-hidden />
        </div>
      )}
    </div>
  );
}
