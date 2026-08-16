export type AskResponse = {
  question: string;
  answer: string;
  confidence: number;
  source: string;
};

export const API_URL = "http://localhost:8000/ask";

export async function askQuestion(question: string, signal?: AbortSignal): Promise<AskResponse> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
    signal: signal ?? null,
  });

  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

  const data = (await res.json()) as Partial<AskResponse>;
  return {
    question: data.question ?? question,
    answer: data.answer ?? "",
    confidence: typeof data.confidence === "number" ? data.confidence : 0,
    source: data.source ?? "rag",
  };
}

export function sourceLabel(source: string): string {
  switch (source) {
    case "policy_checker":
      return "Policy Checker";
    case "rag":
      return "Knowledge Base / RAG";
    default:
      return source.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

const ESCALATION_HINTS = [
  "i don't know",
  "i do not know",
  "not available",
  "unavailable",
  "no information",
  "cannot find",
  "can't find",
  "unable to answer",
  "not sure",
  "escalat",
  "human agent",
];

export function needsEscalation(res: AskResponse): boolean {
  const answer = res.answer.trim().toLowerCase();
  if (!answer) return true;
  if (res.confidence <= 0.3) return true;
  return ESCALATION_HINTS.some((hint) => answer.includes(hint));
}
