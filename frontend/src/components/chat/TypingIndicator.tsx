import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex animate-message-in items-end gap-3">
      <div className="glass-avatar grid size-9 shrink-0 place-items-center rounded-2xl">
        <Bot className="size-4 animate-pulse-soft text-primary" aria-hidden />
      </div>
      <div className="glass-panel flex items-center gap-1.5 rounded-3xl rounded-bl-md px-4 py-4">
        <span className="size-2 animate-typing rounded-full bg-primary" />
        <span className="size-2 animate-typing rounded-full bg-primary [animation-delay:0.15s]" />
        <span className="size-2 animate-typing rounded-full bg-primary [animation-delay:0.3s]" />
      </div>
    </div>
  );
}
