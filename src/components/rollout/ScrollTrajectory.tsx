import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

/*
 * Scrolling the page is an episode. Each section is a state; reaching it is an
 * observation with a partial reward. A small HUD tracks t, the return G and the
 * last action (including clicks).
 */

export const HORIZON = 150;

export interface ScrollState {
  id: string;
  action: string;
  r: number;
}

export const SCROLL_STATES: ScrollState[] = [
  { id: "best", action: "observe(best_rollout)", r: 0.25 },
  { id: "rewards", action: "observe(rewards)", r: 0.25 },
  { id: "contact", action: "episode.end()", r: 0.5 },
];

const labelFor = (el: Element) => {
  const raw = el.getAttribute("aria-label") || el.textContent || el.tagName.toLowerCase();
  const clean = raw.replace(/\s+/g, " ").trim();
  return clean.length > 22 ? `${clean.slice(0, 21)}…` : clean;
};

/** Tracks which states the visitor has reached, the scroll timestep and the latest action. */
export function useScrollEpisode(trackRef: RefObject<HTMLElement>) {
  const [reached, setReached] = useState<Record<string, true>>({});
  const [event, setEvent] = useState("env.reset()");
  const [t, setT] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => setT(Math.round(v * HORIZON)));

  // Sections entering view are observations.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = (e.target as HTMLElement).dataset.state;
          const st = SCROLL_STATES.find((s) => s.id === id);
          if (!st) continue;
          setReached((r) => (r[st.id] ? r : { ...r, [st.id]: true }));
          setEvent(st.action);
        }
      },
      { threshold: 0.3 },
    );
    trackRef.current?.querySelectorAll("[data-state]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [trackRef]);

  // Every click is an action in the trajectory.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest("a, button");
      if (el) setEvent(`click("${labelFor(el)}")`);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const G = SCROLL_STATES.reduce((sum, s) => sum + (reached[s.id] ? s.r : 0), 0);
  return { reached, event, t, G, done: !!reached.contact };
}

/** Fixed HUD in the bottom-left corner: timestep, return and the last action. */
export const ScrollHUD = ({ t, G, event, done, visible }: { t: number; G: number; event: string; done: boolean; visible: boolean }) => {
  const prevG = useRef(G);
  const bumped = G > prevG.current;
  useEffect(() => {
    prevG.current = G;
  }, [G]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          aria-hidden
          className="fixed bottom-4 left-4 z-40 flex max-w-[calc(100vw-6.5rem)] items-center gap-3 rounded-full border border-ro-line2 bg-ro-surface px-4 py-2 font-mono text-xs shadow-lg"
        >
          <span className={`h-2 w-2 shrink-0 rounded-full ${done ? "bg-ro-pass" : "animate-pulse bg-ro-acc"}`} />
          <span className="text-ro-muted">
            t=<span className="tabular-nums text-ro-fg">{t}</span>/{HORIZON}
          </span>
          <motion.span key={G} initial={bumped ? { scale: 1.4 } : false} animate={{ scale: 1 }} className="tabular-nums text-ro-pass">
            G={G.toFixed(2)}
          </motion.span>
          <span className="hidden min-w-0 truncate text-ro-body sm:inline">{done ? "terminated=True" : event}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
