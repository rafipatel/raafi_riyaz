import { ArrowUpRight } from "lucide-react";
import Observed from "@/components/rollout/Observed";
import { videoVoice } from "@/data/siteContent";
import VideoVoiceFlow from "./VideoVoiceFlow";
import VideoVoiceOrgChart from "./VideoVoiceOrgChart";

// The open-source models VideoVoice runs, all on Hugging Face ZeroGPU
// (from the model cards linked to its Hugging Face Spaces).
const MODELS = [
  { kind: "Language model", names: "Gemma 3 12B" },
  { kind: "Video model", names: "Wan 2.2" },
  { kind: "Image model", names: "Z-Image-Turbo" },
  { kind: "Text-to-speech", names: "Chatterbox · OmniVoice · Qwen3-TTS · Dramabox" },
];

/** The base layer: open-source models on Hugging Face's GPU infrastructure. */
const GpuInfra = () => (
  <div className="rounded-xl border border-dashed border-ro-line2 px-4 py-3">
    <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-2">
      <span className="text-sm font-semibold">Open-source models on Hugging Face GPU infrastructure</span>
      <span className="font-mono text-xs text-ro-muted">ZeroGPU</span>
    </div>
    <ul className="grid grid-cols-2 gap-2 lg:grid-cols-[1fr_1.2fr_1fr_2fr]">
      {MODELS.map((m) => (
        <li key={m.kind} className="flex min-w-0 flex-col gap-0.5 rounded-lg bg-ro-inset px-3 py-2">
          <span className="font-mono text-[10px] text-ro-muted">{m.kind}</span>
          <span className="text-[13px] font-semibold leading-snug text-ro-acc-text">{m.names}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * What Raafi is building: VideoVoice. Two columns that start and end together:
 * the story on the left, and how it works on the right (the AI team that runs it,
 * then the product pipeline), so the whole section fits on one screen when the
 * hero's "Building VideoVoice" link jumps here.
 */
const Ventures = () => (
  <section id="building" data-state="building" className="mx-auto flex min-h-[100svh] max-w-[1240px] scroll-mt-0 flex-col justify-center border-t border-ro-line px-4 py-10 sm:px-8">
    <Observed label="open(videovoice)">
      <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* Story */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs text-ro-acc-text">ventures/</p>
          <h2 className="text-[32px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">What I'm building</h2>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
            <span className="rounded bg-ro-tool-bg px-2 py-0.5 text-ro-tool-fg">{videoVoice.role}</span>
            <span className="text-ro-muted">since {videoVoice.since}</span>
          </div>
          <h3 className="text-3xl font-bold tracking-[-0.02em]">{videoVoice.name}</h3>
          <a
            href={videoVoice.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit min-h-[42px] items-center gap-1.5 rounded-full bg-ro-acc px-4 text-sm font-semibold text-ro-acc-ink hover:opacity-90"
          >
            videovoice.pages.dev
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <p className="text-lg font-medium leading-snug">
            {videoVoice.tagline} <span className="text-ro-acc-text">How far can we go?</span>
          </p>
          <p className="leading-relaxed text-ro-body">
            {videoVoice.description}{" "}
            <a href={videoVoice.teamUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ro-acc-text underline-offset-4 hover:underline">
              See the team log ↗
            </a>
          </p>
        </div>

        {/* How it works: the team that runs it, then what the product does */}
        <div className="flex min-w-0 flex-col">
          <VideoVoiceOrgChart />
          <div aria-hidden className="mx-auto h-6 w-px bg-ro-line2" />
          <VideoVoiceFlow />
          <div aria-hidden className="mx-auto h-5 w-px bg-ro-line2" />
          <GpuInfra />
        </div>
      </div>
    </Observed>
  </section>
);

export default Ventures;
