// ============================================================================
// THE FEEDHIRE DIAGRAM ("What I've built", after its "Click to explore").
// The Feedhire name, link, tagline and description are in portfolioData.ts.
// Feedhire is closed source: this is a high-level picture, no code or internals.
// ============================================================================

import { Database, Filter, Megaphone, Radar, ShieldCheck } from "lucide-react";
import type { PipelineProduct } from "@/components/sections/PipelineFlow";

/** The one number shown before the diagram is opened. */
export const FEEDHIRE_STATS = [{ value: "200+", label: "registered users" }];

/** How a job post becomes a Feedhire listing (the pipeline plays itself). */
export const FEEDHIRE_PRODUCTS: Record<"jobs", PipelineProduct> = {
  jobs: {
    name: "Job pipeline",
    blurb: "From scattered posts to structured, searchable jobs.",
    steps: [
      { icon: Radar, title: "Watch sources", tech: "Telegram · Reddit · GitHub", detail: "Scrapers watch job channels and threads, and pick up only the posts that are new since the last run." },
      { icon: Filter, title: "Extract", tech: "multi-stage LLM", detail: "A multi-stage LLM pipeline pulls each job's details out of messy, free-form posts." },
      { icon: ShieldCheck, title: "Fallback chain", tech: "Groq → Bedrock → Ollama", detail: "If one model provider fails or hits a rate limit, the next one takes over, so extraction keeps running." },
      { icon: Database, title: "Structured jobs", tech: "feedhire.me", detail: "Clean, structured listings that people can search and filter on feedhire.me." },
      { icon: Megaphone, title: "Promote", tech: "LinkedIn · Discord", detail: "AI-written posts share new roles on LinkedIn and Discord." },
    ],
  },
};

/** The layer underneath. */
export const FEEDHIRE_INFRA = {
  heading: "Dockerised FastAPI microservices",
  badge: "closed source",
  models: [
    { kind: "Backend", names: "FastAPI microservices" },
    { kind: "Deployment", names: "Docker" },
    { kind: "Language models", names: "Groq · AWS Bedrock · Ollama" },
    { kind: "Data", names: "Gold-standard pairs for distillation" },
  ],
};

/** The button that opens the diagram. */
export const FEEDHIRE_EXPLORE = {
  label: "Click to explore how Feedhire works",
  sub: "the job pipeline · the stack",
};
