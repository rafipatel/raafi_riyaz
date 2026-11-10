import { useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Network } from "lucide-react";
import Observed from "@/components/rollout/Observed";
import { venturesSection, videoVoice } from "@/data/portfolioData";
import { EXPLORE, GPU, STATS } from "@/data/videoVoice";
import VideoVoiceFlow from "./VideoVoiceFlow";
import VideoVoiceOrgChart from "./VideoVoiceOrgChart";

// The blue dashed outline that marks each of the three parts (team, pipeline, GPUs).
const PART_BOX = "rounded-xl border border-dashed border-ro-acc px-4 py-2.5";

/** The base layer: open-source models on Hugging Face's GPU infrastructure. */
const GpuInfra = () => (
  <div className={PART_BOX}>
    <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-2">
      <span className="text-sm font-semibold">{GPU.heading}</span>
      <span className="font-mono text-xs text-ro-muted">{GPU.badge}</span>
    </div>
    <ul className="grid grid-cols-2 gap-2 lg:grid-cols-[1fr_1.2fr_1fr_2fr]">
      {GPU.models.map((m) => (
        <li key={m.kind} className="flex min-w-0 flex-col gap-0.5 rounded-lg bg-ro-inset px-3 py-2">
          <span className="font-mono text-[11px] text-ro-muted">{m.kind}</span>
          <span className="text-[15px] font-semibold leading-snug text-ro-acc-text">{m.names}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * What Raafi has built: VideoVoice. Two columns that start and end together:
 * the story on the left, and how it works on the right (the AI team that runs it,
 * then the product pipeline), so the whole section fits on one screen when the
 * hero's "Built VideoVoice" link jumps here.
 */
// Particles that fly out of the button when it bursts.
const BURST = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  const r = 140 + (i % 3) * 70;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.7, d: (i % 4) * 0.03 };
});

const PARTS = [
  <div key="org" className={PART_BOX}><VideoVoiceOrgChart /></div>,
  <div key="c1" aria-hidden className="mx-auto h-3 w-px bg-ro-acc" />,
  <div key="flow" className={PART_BOX}><VideoVoiceFlow /></div>,
  <div key="c2" aria-hidden className="mx-auto h-3 w-px bg-ro-acc" />,
  <GpuInfra key="gpu" />,
];

/** VideoVoice in a few lines: name, link, what it's for, who runs it. */
const Story = ({ centred = false }: { centred?: boolean }) => (
  <motion.div layoutId="vv-story" layout="position" transition={{ type: "spring", stiffness: 120, damping: 20 }} className={`flex flex-col gap-4 ${centred ? "max-w-[720px] items-center text-center" : ""}`}>
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
      <span className="rounded bg-ro-tool-bg px-2 py-0.5 text-ro-tool-fg">{videoVoice.role}</span>
      <span className="text-ro-muted">since {videoVoice.since}</span>
    </div>
    <h3 className="text-4xl font-bold tracking-[-0.02em]">{videoVoice.name}</h3>
    <a
      href={videoVoice.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit min-h-[42px] items-center gap-1.5 rounded-full bg-ro-acc px-4 text-sm font-semibold text-ro-acc-ink hover:opacity-90"
    >
      videovoice.pages.dev
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </a>
    <p className={`font-medium leading-snug ${centred ? "text-2xl" : "text-xl"}`}>
      {videoVoice.tagline} <span className="text-ro-acc-text">{videoVoice.taglineAccent}</span>
    </p>
    <p className="text-[17px] leading-relaxed text-ro-body">
      {videoVoice.description}{" "}
      <a href={videoVoice.teamUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ro-acc-text underline-offset-4 hover:underline">
        {videoVoice.teamLinkLabel} ↗
      </a>
    </p>
  </motion.div>
);

/**
 * The right column. The team, pipeline and GPU layer stay laid out (invisible) so
 * the page doesn't jump. Until the visitor clicks, the VideoVoice story and a
 * button sit on top; clicking moves the story to the left column, bursts the
 * button into particles and flies the pieces in, one after another.
 */
const InfraReveal = ({ open }: { open: boolean }) => {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-w-0">
      <div className={`flex flex-col ${open ? "" : "pointer-events-none select-none"}`} aria-hidden={!open}>
        {PARTS.map((part, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={open ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : { opacity: 0.4, scale: 0.97, y: 0, filter: "blur(2.5px)" }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 18, delay: open ? 0.35 + i * 0.12 : 0 }}
          >
            {part}
          </motion.div>
        ))}
      </div>

    </div>
  );
};

const Heading = ({ className = "" }: { className?: string }) => (
  <motion.div layoutId="vv-heading" layout="position" transition={{ type: "spring", stiffness: 120, damping: 20 }} className={className}>
    <p className="font-mono text-xs text-ro-acc-text">ventures/</p>
    <h2 className="mt-1 text-[44px] font-bold leading-[0.98] tracking-[-0.04em] sm:text-[60px]">{venturesSection.title}</h2>
  </motion.div>
);

const Ventures = () => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  return (
    <section id="building" data-state="building" className="mx-auto flex min-h-[100svh] max-w-[1240px] scroll-mt-0 flex-col justify-center overflow-x-clip border-t border-ro-line px-4 py-6 sm:px-8">
      <Observed label="open(videovoice)">
        <LayoutGroup>
          {/* Before the click the heading is one line across the top; after it,
              it slides into the left column and wraps to two lines. */}
          {!open && <Heading className="mb-4" />}
          <div className="relative">
          {/* On phones the diagram only appears after the click; on desktop it shows blurred behind */}
          <div className={`${open ? "grid" : "hidden lg:grid"} gap-10 lg:grid-cols-[340px_minmax(0,1fr)]`}>
            <div className="flex flex-col gap-4">
              {open && (
                <>
                  <Heading />
                  <div className="mt-4">
                    <Story />
                  </div>
                </>
              )}
            </div>

            {/* How it works: the story and a button until clicked, then the infrastructure */}
            <InfraReveal open={open} />
          </div>

          {/* Before the click: the story and the button, centred across the section */}
          {!open && (
            <div className="flex flex-col items-center gap-7 py-4 lg:absolute lg:inset-0 lg:justify-center lg:bg-[radial-gradient(ellipse_at_center,var(--ro-bg)_35%,transparent_72%)] lg:py-0">
              <Story centred />
              <ul className="flex flex-wrap justify-center gap-2">
                {STATS.map((st) => (
                  <li key={st.label} className="flex items-baseline gap-1.5 rounded-full border border-ro-line2 bg-ro-surface px-4 py-1.5">
                    <span className="text-lg font-bold text-ro-acc-text">{st.value}</span>
                    <span className="text-sm text-ro-body">{st.label}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex w-fit items-center gap-4 rounded-2xl border border-ro-acc bg-ro-tool-bg px-6 py-4 text-left transition-transform hover:scale-[1.03]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ro-acc text-ro-acc-ink">
                  <Network className="h-5 w-5" aria-hidden />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-lg font-bold text-ro-tool-fg">{EXPLORE.label}</span>
                  <span className="font-mono text-xs text-ro-muted">{EXPLORE.sub}</span>
                </span>
              </button>
            </div>
          )}

          {/* The burst: particles flying out from the middle as it opens */}
          {open && !reduce && (
            <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {BURST.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute h-2.5 w-2.5 rounded-sm bg-ro-acc"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1.4, rotate: 0 }}
                  animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3, rotate: 180 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: p.d }}
                />
              ))}
            </div>
          )}
          </div>
        </LayoutGroup>
      </Observed>
    </section>
  );
};

export default Ventures;
