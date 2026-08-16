import { Bot } from "lucide-react";

export function Hero() {
  return (
    <header className="mx-auto max-w-3xl space-y-6 text-center">
      <div className="glass-chip mx-auto flex w-fit animate-fade-up items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-status opacity-70" />
          <span className="relative inline-flex size-2 rounded-full bg-status" />
        </span>
        AI Assistant Online
      </div>

      <div className="flex animate-fade-up flex-col items-center gap-4 [animation-delay:0.1s]">
        <span className="glass-avatar grid size-14 animate-float-soft place-items-center rounded-2xl shadow-glow">
          <Bot className="size-7 text-primary" aria-hidden />
        </span>
        <h1 className="text-balance bg-heading bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-6xl">
          AI Customer Support
        </h1>
      </div>

      <p className="animate-fade-up text-pretty text-base text-muted-foreground [animation-delay:0.2s] sm:text-lg">
        Intelligent answers powered by RAG and AI
      </p>
    </header>
  );
}
