import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES: { text: string; ok?: boolean }[] = [
  { text: "$ env.reset(task=\"evaluate_raafi\")" },
  { text: "loading environment · long-horizon", ok: true },
  { text: "mounting tools · read_file, open, submit", ok: true },
  { text: "grader online · reward hacking checks armed", ok: true },
  { text: "agent ready. visitor is the observer." },
];

const LINE_MS = 260;
const HOLD_MS = 450;

/** The boot intro plays on every page load, except for visitors who prefer reduced motion. */
export const shouldBoot = () =>
  typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A short terminal "environment boot" that plays every time the page loads,
 * then lifts away to reveal the page. Click or press any key to skip.
 */
const BootIntro = ({ onDone }: { onDone: () => void }) => {
  const [shown, setShown] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timers = LINES.map((_, i) => window.setTimeout(() => setShown(i + 1), (i + 1) * LINE_MS));
    timers.push(window.setTimeout(() => setVisible(false), LINES.length * LINE_MS + HOLD_MS));
    const skip = () => setVisible(false);
    window.addEventListener("keydown", skip);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", skip);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="boot"
          role="status"
          aria-label="Loading"
          onClick={() => setVisible(false)}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] flex cursor-pointer items-center justify-center bg-ro-bg px-6"
        >
          <div className="w-full max-w-[560px] font-mono text-[13px] leading-7 sm:text-sm">
            {LINES.slice(0, shown).map((line, i) => (
              <motion.div
                key={line.text}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 ${i === 0 ? "text-ro-fg" : i === LINES.length - 1 ? "text-ro-acc-text" : "text-ro-body"}`}
              >
                <span className="min-w-0 flex-1">{line.text}</span>
                {line.ok && <span className="text-ro-pass">ok</span>}
              </motion.div>
            ))}
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-ro-acc" aria-hidden />
            <p className="mt-6 text-xs text-ro-muted">click or press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootIntro;
