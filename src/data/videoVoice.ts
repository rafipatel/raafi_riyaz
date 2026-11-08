// ============================================================================
// THE VIDEOVOICE DIAGRAM ("What I'm building", after "Click to explore").
// The VideoVoice name, link, tagline and description are in portfolioData.ts.
// ============================================================================

import type { LucideIcon } from "lucide-react";
import { AudioLines, Captions, Clapperboard, Film, Languages, Mic, ScanEye, Send, Type, Upload } from "lucide-react";

/** The four numbers shown before the diagram is opened. */
export const STATS = [
  { value: "10", label: "AI agents run it" },
  { value: "2", label: "products" },
  { value: "600+", label: "languages" },
  { value: "7", label: "open-source models" },
];

// ---------------------------------------------------------------------------
// 1. The company: an AI CEO, then a CTO and a CMO, each with their agents.
// ---------------------------------------------------------------------------

export const ORG = {
  label: "the company · run by 10 AI agents",
  ceo: "CEO",
  branches: [
    { lead: "CTO", reports: ["ML Eng", "Growth Eng"] },
    { lead: "CMO", reports: ["SEO Lead", "Editor", "Producer", "Social Lead", "Partnerships"] },
  ],
};

// ---------------------------------------------------------------------------
// 2. The two products, step by step (the pipeline plays itself).
// ---------------------------------------------------------------------------

export interface PipelineStep {
  icon: LucideIcon;
  title: string;
  /** Small grey line under the title; leave "" for none. */
  tech: string;
  /** Shown under the steps when this one is active. */
  detail: string;
}

export const PRODUCTS: Record<"dubbing" | "dramabox", { name: string; blurb: string; steps: PipelineStep[] }> = {
  dubbing: {
    name: "Dubbing",
    blurb: "Your video, in 600+ languages, in your own voice.",
    steps: [
      { icon: Upload, title: "Your video", tech: "TikTok · Reel · YouTube", detail: "Upload a short, single-speaker video. That's all VideoVoice needs." },
      { icon: Mic, title: "Speech-to-text", tech: "", detail: "An open-source speech model transcribes what you say, with timestamps." },
      { icon: Languages, title: "Translate", tech: "", detail: "A language model translates idioms and sentence flow, not word for word, into 600+ languages." },
      { icon: AudioLines, title: "Your voice", tech: "", detail: "Voice cloning speaks the translation in your own voice: same pitch, pace and energy." },
      { icon: ScanEye, title: "Vision & subtitles", tech: "", detail: "Vision models work on the frames, and subtitles are burned in, timed to the dubbed audio." },
      { icon: Film, title: "Dubbed video", tech: "", detail: "A downloadable MP4 in the new language, in your voice, with the background music kept." },
    ],
  },
  dramabox: {
    name: "Dramabox",
    blurb: "Paste any text, get a short video with the most expressive speech.",
    steps: [
      { icon: Type, title: "Your text", tech: "", detail: "Paste any text: a script, a story or a post." },
      { icon: AudioLines, title: "Directed voice", tech: "", detail: "Dramabox performs it with directable, highly expressive speech, not a flat read." },
      { icon: Clapperboard, title: "Generate video", tech: "", detail: "An image model draws the frames and a video model animates them to go with the voice." },
      { icon: Captions, title: "Captions", tech: "", detail: "Captions are added, timed to the performance." },
      { icon: Send, title: "Ready to post", tech: "", detail: "A short-form video, voiced, captioned and ready to post, in seconds." },
    ],
  },
};

// ---------------------------------------------------------------------------
// 3. The open-source models underneath, all on Hugging Face ZeroGPU.
// ---------------------------------------------------------------------------

export const GPU = {
  heading: "Open-source models on Hugging Face GPU infrastructure",
  badge: "ZeroGPU",
  models: [
    { kind: "Language model", names: "Gemma 3 12B" },
    { kind: "Video model", names: "Wan 2.2" },
    { kind: "Image model", names: "Z-Image-Turbo" },
    { kind: "Text-to-speech", names: "Chatterbox · OmniVoice · Qwen3-TTS · Dramabox" },
  ],
};

/** The button that opens the diagram. */
export const EXPLORE = {
  label: "Click to explore VideoVoice's infrastructure",
  sub: "the AI team · the pipeline · the GPUs",
};
