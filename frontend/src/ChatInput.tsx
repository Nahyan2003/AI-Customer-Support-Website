import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Loader2, SendHorizonal } from "lucide-react";

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (value: string) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState("");

  function submit(e?: FormEvent) {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) submit();
  }

  return (
    <form onSubmit={submit} className="glass-input flex items-center gap-2 rounded-full p-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me about refunds, shipping, cancellations..."
        aria-label="Your question"
        className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="group grid size-11 shrink-0 place-items-center rounded-full bg-send text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-glow-strong active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100"
        aria-label="Send message"
      >
        {disabled ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <SendHorizonal className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
      </button>
    </form>
  );
}
