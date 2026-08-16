import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/chat/AmbientBackground";
import { CursorGlow } from "@/components/chat/CursorGlow";
import { Hero } from "@/components/chat/Hero";
import { ChatPanel } from "@/components/chat/ChatPanel";


const title = "AI Customer Support — Instant Answers with RAG";
const description =
  "Chat with an AI customer support assistant that answers refund, shipping, and cancellation questions using RAG-backed knowledge and policy checks.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen px-4 py-14 sm:py-20">
      <AmbientBackground />
      <CursorGlow />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <Hero />
        <div className="animate-fade-up [animation-delay:0.3s]">
          <ChatPanel />
        </div>
        <p className="animate-fade-up text-center text-xs text-muted-foreground [animation-delay:0.4s]">
          Connected to your support API at localhost:8000
        </p>
      </div>
    </main>
  );
}
