import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getTrajectory, type Selection, type StepKind } from "./trajectories";
import { hackathon } from "@/data/portfolioData";
import BenchmarkRace from "./BenchmarkRace";

const KIND_STYLE: Record<StepKind, string> = {
  think: "bg-ro-think-bg text-ro-think-fg",
  tool: "bg-ro-tool-bg text-ro-tool-fg",
  check: "bg-ro-check-bg text-ro-check-fg",
  submit: "bg-ro-pass-bg text-ro-pass",
  fail: "bg-ro-fail-bg text-ro-fail",
};

const STEP_MS = 540;

const fmtReward = (r: number) => (r > 0 ? `+${r.toFixed(2)}` : r < 0 ? `−${Math.abs(r).toFixed(2)}` : "0.00");
const rewardTone = (r: number) => (r > 0 ? "text-ro-pass" : r < 0 ? "text-ro-fail" : "text-ro-muted");

/** Render a tool result, colouring the highlighted fragments in the accent colour. */
function renderHighlighted(text: string, highlight?: string | string[]) {
  const parts = (Array.isArray(highlight) ? highlight : highlight ? [highlight] : []).filter((h) => text.includes(h));
  if (!parts.length) return text;
  const escaped = parts.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return text.split(new RegExp(`(${escaped.join("|")})`)).map((chunk, i) =>
    parts.includes(chunk) ? (
      <span key={i} className="font-semibold text-ro-acc-text">
        {chunk}
      </span>
    ) : (
      chunk
    ),
  );
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface Props {
  selection: Selection;
  onSelect: (s: Selection) => void;
  replayKey: number;
  onReplay: () => void;
}

const smallBtn = "min-h-[36px] rounded-lg border px-3 font-mono text-xs transition-colors";

const AgentPanel = ({ selection, onSelect, replayKey, onReplay }: Props) => {
  const traj = getTrajectory(selection);
  const total = traj.steps.length;
  const [revealed, setRevealed] = useState(0);
  const [open, setOpen] = useState<Record<number, boolean>>({});
  // Nothing runs until the visitor presses play.
  const [started, setStarted] = useState(false);
  const logRef = useRef<HTMLOListElement>(null);

  const run = (sel: Selection) => {
    setStarted(true);
    onSelect(sel);
  };
  const replay = () => {
    setStarted(true);
    onReplay();
  };

  // Stream the trajectory in, one tool call at a time.
  useEffect(() => {
    setOpen({});
    if (!started) {
      setRevealed(0);
      return;
    }
    if (prefersReducedMotion()) {
      setRevealed(total);
      return;
    }
    setRevealed(0);
    const id = window.setInterval(() => {
      setRevealed((r) => {
        if (r + 1 >= total) window.clearInterval(id);
        return Math.min(r + 1, total);
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [selection, replayKey, total, started]);

  // Keep the newest step in view inside the panel's own scroll area.
  useEffect(() => {
    const log = logRef.current;
    if (!log || revealed === 0) return;
    const last = log.lastElementChild as HTMLElement | null;
    if (last) log.scrollTo({ top: last.offsetTop - 8, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [revealed]);

  const streaming = started && revealed < total;
  const shown = traj.steps.slice(0, revealed);
  const returns = shown.reduce<number[]>((acc, st) => [...acc, (acc[acc.length - 1] ?? 0) + st.r], []);
  const G = returns[returns.length - 1] ?? 0;
  const chip = !started
    ? { label: "ready", cls: "bg-ro-think-bg text-ro-think-fg" }
    : streaming
    ? { label: `running · t=${revealed}`, cls: "bg-ro-think-bg text-ro-think-fg" }
    : traj.pass
      ? { label: traj.final, cls: "bg-ro-pass-bg text-ro-pass" }
      : { label: traj.final, cls: "bg-ro-fail-bg text-ro-fail" };

  // Before the run: just the task and the button. The rollout frame appears on click.
  if (!started) {
    return (
      <div className="flex h-[min(640px,calc(100svh-120px))] min-h-[420px] min-w-0 flex-[1_1_580px] flex-col items-center justify-center gap-7 px-4 text-center">
        <p className="flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-ro-acc-text">instruction.md</span>
          <span className="max-w-[24ch] text-2xl font-semibold leading-snug sm:text-[28px]">{traj.task}</span>
        </p>
        <span className="relative inline-flex">
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-ro-acc opacity-30 motion-reduce:hidden" />
          <button
            type="button"
            onClick={() => run(selection)}
            className="relative inline-flex min-h-[52px] items-center gap-3 rounded-full bg-ro-acc px-7 text-base font-semibold text-ro-acc-ink hover:opacity-90"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
            Run the agent
          </button>
        </span>
        <BenchmarkRace className="mt-6 w-full max-w-[520px] text-left" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-[min(640px,calc(100svh-120px))] min-h-[420px] min-w-0 flex-[1_1_580px] flex-col overflow-hidden rounded-2xl border border-ro-line bg-ro-surface"
    >
      <div className="flex shrink-0 flex-col gap-2 border-b border-ro-line px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-xs">
          <span className="text-ro-muted">{traj.id}</span>
          <span className="flex items-center gap-2">
            <span className="text-ro-muted">model={traj.model}</span>
            <span className={`rounded px-2 py-0.5 ${chip.cls}`}>{chip.label}</span>
          </span>
        </div>
        <p className="flex gap-2 text-[15px] leading-snug">
          <span className="shrink-0 font-mono text-xs leading-[22px] text-ro-acc-text">instruction.md</span>
          <span>{traj.task}</span>
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3 border-b border-ro-line px-4 py-2 font-mono text-xs">
        <span className="shrink-0 text-ro-muted">return</span>
        <span className="relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-ro-track" aria-hidden>
          <span
            className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ${G < 0 ? "bg-ro-fail" : "bg-ro-pass"}`}
            style={{ width: `${Math.min(Math.abs(G), 1) * 100}%` }}
          />
        </span>
        <span className={`w-16 shrink-0 text-right tabular-nums ${rewardTone(G)}`}>G={G < 0 ? "−" : ""}{Math.abs(G).toFixed(2)}</span>
      </div>


      <ol ref={logRef} aria-live="polite" className="relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
        {shown.map((step, i) => {
          const isOpen = open[i] ?? (i === revealed - 1 || !!step.video || !!step.keepOpen);
          return (
            <li key={`${traj.id}-${i}`} className="animate-fade-in border-b border-ro-line">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen((o) => ({ ...o, [i]: !isOpen }))}
                className="flex min-h-[44px] w-full items-center gap-3 px-4 py-2.5 text-left font-mono text-[13px] hover:bg-ro-inset"
              >
                <span className="w-6 shrink-0 text-ro-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] ${KIND_STYLE[step.kind]}`}>{step.kind}</span>
                <span className="min-w-0 flex-1 break-words">{step.call}</span>
                <span className={`shrink-0 rounded bg-ro-inset px-1.5 py-0.5 text-xs tabular-nums ${rewardTone(step.r)}`} title={`partial reward for step ${i + 1}`}>
                  r={fmtReward(step.r)}
                </span>
                <span aria-hidden className="text-ro-muted">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="flex flex-col gap-2.5 pb-3.5 pl-[52px] pr-4">
                  {step.result && (
                    <pre className="whitespace-pre-wrap rounded-lg border border-ro-line bg-ro-inset px-3 py-2.5 font-mono text-[13px] leading-relaxed text-ro-body">
                      {renderHighlighted(step.result, step.highlight)}
                    </pre>
                  )}
                  {step.video && (
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-ro-line2 bg-ro-inset">
                      <iframe
                          className="absolute inset-0 h-full w-full"
                          src={`https://www.youtube-nocookie.com/embed/${hackathon.youtubeId}?rel=0`}
                          title="Raafi Riyaz — MongoDB Hackathon, 4th place"
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
        {streaming && (
          <li className="px-4 py-3 font-mono text-[13px] text-ro-muted">
            agent is thinking<span className="animate-pulse text-ro-acc-text">…</span>
          </li>
        )}
      </ol>

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-ro-line px-3 py-2.5">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={replay} className={`${smallBtn} border-ro-line2 hover:border-ro-acc`}>
            ↻ replay
          </button>
          <button
            type="button"
            onClick={() => run("you")}
            className={`${smallBtn} border-ro-fail bg-ro-fail-bg text-ro-fail hover:border-ro-fail`}
          >
            try to reward-hack
          </button>
          {selection !== "hire" && (
            <button type="button" onClick={() => run("hire")} className={`${smallBtn} border-ro-line2 text-ro-acc-text hover:border-ro-acc`}>
              ← back to the real run
            </button>
          )}
        </div>
        <span className="font-mono text-xs text-ro-muted">
          step {revealed}/{total} · Σr = {G < 0 ? "−" : ""}{Math.abs(G).toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
};

export default AgentPanel;
