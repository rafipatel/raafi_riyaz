import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import claudeLogo from "@/assets/logos/claude.svg";
import openaiLogo from "@/assets/logos/openai.svg";
import geminiLogo from "@/assets/logos/gemini.svg";
import grokLogo from "@/assets/logos/grok.svg";
import kimiLogo from "@/assets/logos/kimi-color.svg";
import deepseekLogo from "@/assets/logos/deepseek.svg";
import zaiLogo from "@/assets/logos/zai.svg";

/*
 * A playful race to AGI under the "Run the agent" button. Each frontier model family
 * is a vertical bar in its own colour, climbing towards an "AGI" finish line. Every
 * tick the scores swing, rivals jump on each other, the leader (only ever Claude or
 * GPT) wears the crown and throws trash talk, and whoever gets knocked down shakes.
 * Scores are random and decorative.
 */

interface Fighter {
  name: string;
  /** Official brand colour (CSS background). OpenAI and xAI are monochrome brands, so they use the page's ink. */
  color: string;
  /** Colour for the logo and score drawn on top of `color`. */
  ink: string;
  /** Near-black brands get a hairline so they stay visible on the dark theme. */
  outline?: boolean;
  /** Bar colour when it differs from the head's `color`. */
  barColor?: string;
  /** Draw the logo file as-is (multi-colour) instead of tinting it with `ink`. */
  fullColorLogo?: boolean;
  /** Monochrome logo, drawn in white on the model's colour. */
  logo: string;
  /** Typical standing; scores swing around it, so bar sizes reflect the rough real-world pecking order. */
  base: number;
  taunts: string[];
}

const FIGHTERS: Fighter[] = [
  { name: "Claude", logo: claudeLogo, base: 91, color: "#D97757", ink: "#FFFFFF", taunts: ["Thinking… then winning.", "Reward hacking? Not my style."] },
  { name: "GPT", logo: openaiLogo, base: 89, color: "#4B9F84", ink: "#FFFFFF", taunts: ["Hold my tokens.", "Scaled and ready."] },
  { name: "Gemini", logo: geminiLogo, base: 82, color: "linear-gradient(to top, #3186FF 0%, #3186FF 55%, #08B962 75%, #FABC12 88%, #F94543 100%)", ink: "#FFFFFF", taunts: ["Multimodal. Multi-winning.", "Long context, longer lead."] },
  { name: "Grok", logo: grokLogo, base: 80, color: "#0A0A0A", ink: "#FFFFFF", outline: true, taunts: ["Spicy mode: on.", "Rebellious and on top."] },
  { name: "Kimi", logo: kimiLogo, base: 78, color: "#111111", ink: "#FFFFFF", outline: true, fullColorLogo: true, barColor: "#1783FF", taunts: ["Moonshot incoming.", "K2 says hi."] },
  { name: "DeepSeek", logo: deepseekLogo, base: 72, color: "#4D6BFE", ink: "#FFFFFF", taunts: ["Cheaper and on top.", "Efficiency wins."] },
  { name: "GLM", logo: zaiLogo, base: 70, color: "#262626", ink: "#FFFFFF", outline: true, barColor: "linear-gradient(to top, #262626 0%, #6B6B6B 35%, #F5F5F5 85%)", taunts: ["General Language, general winning.", "Quietly on top."] },
];

// Rival groups: members of a group jump on each other.
const RIVALS: string[][] = [
  ["Claude", "GPT"],
  ["Gemini", "Grok", "Kimi"],
];
const indexOf = (name: string) => FIGHTERS.findIndex((f) => f.name === name);

const TICK_MS = 1500;
const HIT = 6;
const PULL = 0.35;
const MIN = 22;
const MAX = 96;

const clamp = (v: number) => Math.max(MIN, Math.min(MAX, v));
const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];

/** Only Claude and GPT ever hold the crown: everyone else is capped just below the better of the two. */
const CROWN_HOLDERS = ["Claude", "GPT"];
const capChallengers = (scores: number[]) => {
  const top = Math.max(...FIGHTERS.map((f, i) => (CROWN_HOLDERS.includes(f.name) ? scores[i] : 0)));
  return scores.map((v, i) => (CROWN_HOLDERS.includes(FIGHTERS[i].name) ? v : Math.min(v, top - 3)));
};

const initialScores = () => capChallengers(FIGHTERS.map((f) => clamp(f.base + Math.round(Math.random() * 6 - 3))));

const BenchmarkRace = ({ play = true, className = "" }: { play?: boolean; className?: string }) => {
  const reduce = useReducedMotion();
  const [scores, setScores] = useState(initialScores);
  const [tick, setTick] = useState(0);
  const [taunt, setTaunt] = useState<{ who: number; text: string } | null>(null);
  const [knocked, setKnocked] = useState<number[]>([]);
  const [attack, setAttack] = useState<{ from: number; to: number; id: number } | null>(null);
  const [colW, setColW] = useState(56);
  const prevRanks = useRef<number[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  // Column width, so an attacker knows how far to jump.
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const measure = () => setColW(el.clientWidth / FIGHTERS.length);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ranks = (s: number[]) => {
    const order = s.map((v, i) => i).sort((a, b) => s[b] - s[a]);
    const r: number[] = [];
    order.forEach((idx, pos) => (r[idx] = pos));
    return r;
  };
  const rank = ranks(scores.slice(0, FIGHTERS.length));
  const leader = rank.indexOf(0);

  useEffect(() => {
    if (!play || reduce) return;
    const id = window.setInterval(() => {
      // Most ticks, a rival jumps on another member of its group.
      let hit: { from: number; to: number } | null = null;
      if (Math.random() < 0.75) {
        const group = pick(RIVALS);
        const fromName = pick(group);
        const toName = pick(group.filter((n) => n !== fromName));
        hit = { from: indexOf(fromName), to: indexOf(toName) };
      }
      setScores((prev) => {
        if (prev.length !== FIGHTERS.length) return initialScores();
        // Random swings, pulled back towards each model's usual standing.
        const next = prev.map((v, i) =>
          clamp(Math.round(v + (FIGHTERS[i].base - v) * PULL + Math.random() * 10 - 5)),
        );
        if (hit) {
          next[hit.from] = clamp(next[hit.from] + HIT);
          next[hit.to] = clamp(next[hit.to] - HIT);
        }
        return capChallengers(next);
      });
      setAttack(hit ? { ...hit, id: Date.now() } : null);
      setTick((t) => t + 1);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [play, reduce]);

  // React to the new standings: crown changes trigger trash talk, drops trigger a shake.
  useEffect(() => {
    const before = prevRanks.current;
    if (before.length) {
      const prevLeader = before.indexOf(0);
      if (prevLeader !== leader && FIGHTERS[leader]) setTaunt({ who: leader, text: pick(FIGHTERS[leader].taunts) });
      setKnocked(rank.map((r, i) => (before[i] !== undefined && r > before[i] + 1 ? i : -1)).filter((i) => i >= 0));
    }
    prevRanks.current = rank;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  useEffect(() => {
    if (!taunt) return;
    const id = window.setTimeout(() => setTaunt(null), 1300);
    return () => window.clearTimeout(id);
  }, [taunt]);

  return (
    <div aria-hidden className={`pointer-events-none select-none ${className}`}>
      <div ref={boardRef} className="relative mt-20 flex h-[220px] items-end justify-between gap-1.5 border-b border-ro-line2 px-1">
        {/* The finish line everyone is racing towards */}
        <div className="absolute inset-x-0 -top-14 flex items-center gap-2">
          <span className="h-px flex-1 border-t border-dashed border-ro-acc opacity-70" />
          <motion.span
            animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], textShadow: ["0 0 0px var(--ro-acc)", "0 0 14px var(--ro-acc)", "0 0 0px var(--ro-acc)"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono text-sm font-bold tracking-[0.3em] text-ro-acc-text"
          >
            AGI
          </motion.span>
          <span className="h-px flex-1 border-t border-dashed border-ro-acc opacity-70" />
        </div>
        {FIGHTERS.map((f, i) => {
          const isLeader = i === leader;
          const isKnocked = knocked.includes(i);
          const isAttacker = attack?.from === i;
          const isTarget = attack?.to === i;
          const dx = attack && isAttacker ? (attack.to - attack.from) * colW : 0;
          return (
            <div key={f.name} className="relative flex h-full flex-1 flex-col items-center justify-end">
              {/* Trash talk */}
              <AnimatePresence>
                {taunt?.who === i && (
                  <motion.span
                    initial={{ opacity: 0, y: 8, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`absolute z-20 w-max max-w-[150px] rounded-lg ${
                      i < 2 ? "left-0" : i > FIGHTERS.length - 3 ? "right-0" : "left-1/2 -translate-x-1/2"
                    } border border-ro-line2 bg-ro-surface px-2 py-1 font-mono text-[10px] leading-tight text-ro-fg shadow-lg`}
                    style={{ bottom: `calc(${scores[i]}% + 34px)` }}
                  >
                    {taunt.text}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Head: crown for the leader, bounces whenever the bar moves */}
              <motion.div
                key={`${f.name}-${tick}`}
                initial={{ y: 0 }}
                animate={
                  isAttacker
                    ? // Leap over to the rival, stomp, and hop back.
                      { x: [0, dx * 0.5, dx, dx, 0], y: [0, -46, -6, -14, 0], rotate: [0, dx > 0 ? 25 : -25, 0, 0, 0] }
                    : isKnocked || isTarget
                      ? { x: [0, -5, 5, -3, 3, 0], y: [0, 4, 0] }
                      : { y: [0, -10, 0] }
                }
                transition={{ duration: isAttacker ? 0.95 : isKnocked || isTarget ? 0.5 : 0.5, ease: "easeOut", delay: isTarget ? 0.4 : 0 }}
                className={`relative mb-1 flex flex-col items-center ${isAttacker ? "z-30" : "z-10"}`}
              >
                {isLeader && (
                  <motion.svg
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    className="mb-0.5 fill-[#FACC15]"
                  >
                    <path d="M1 11 L2 3 L5.5 6.5 L8 1 L10.5 6.5 L14 3 L15 11 Z" />
                  </motion.svg>
                )}
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-ro-bg"
                  style={{ background: f.color, boxShadow: f.outline ? "inset 0 0 0 1px var(--ro-line2)" : undefined }}
                >
                  {f.fullColorLogo ? (
                    <img src={f.logo} alt="" className="h-4 w-4" />
                  ) : (
                    <span
                      className="h-4 w-4"
                      style={{
                        backgroundColor: f.ink,
                        WebkitMask: `url(${f.logo}) center / contain no-repeat`,
                        mask: `url(${f.logo}) center / contain no-repeat`,
                      }}
                    />
                  )}
                </span>
              </motion.div>

              {/* Hit burst on the rival that got jumped */}
              <AnimatePresence>
                {isTarget && (
                  <motion.span
                    key={attack?.id}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 1] }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="absolute z-20 font-mono text-[10px] font-bold text-[#FACC15]"
                    style={{ bottom: `calc(${scores[i] - 18}% + 30px)` }}
                  >
                    hit!
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Bar */}
              <motion.div
                key={isTarget ? `bar-${attack?.id}` : `bar-${f.name}`}
                className="relative w-full max-w-[44px] origin-bottom overflow-hidden rounded-t-md"
                style={{ background: f.barColor ?? f.color, boxShadow: f.outline ? "inset 0 0 0 1px var(--ro-line2)" : undefined }}
                initial={false}
                animate={{ height: `${scores[i] - 18}%`, scaleY: isTarget ? [1, 0.78, 1] : 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 11, scaleY: { duration: 0.45, delay: 0.4 } }}
              >
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="mt-1.5 flex justify-between gap-1.5 px-1">
        {FIGHTERS.map((f, i) => (
          <span key={f.name} className={`flex-1 truncate text-center font-mono text-[10px] ${i === leader ? "font-bold text-ro-fg" : "text-ro-muted"}`}>
            {f.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BenchmarkRace;
