import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/*
 * As the visitor scrolls, the agent "observes" each element: a scan line sweeps
 * down it, the content is revealed behind the scan, a tracking box snaps around it
 * and a small mono tag names the observation. Decorative only; the content itself
 * is ordinary, accessible markup.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const SCAN = 0.75;

interface Props {
  label: string;
  reward?: number;
  delay?: number;
  className?: string;
  children: ReactNode;
}

const corner = (pos: string, from: { x: number; y: number }, delay: number): { cls: string; v: Variants } => ({
  cls: pos,
  v: {
    hidden: { opacity: 0, x: from.x, y: from.y },
    show: { opacity: [0, 1, 1, 0.35], x: 0, y: 0, transition: { duration: 1.3, delay, ease: EASE, times: [0, 0.3, 0.7, 1] } },
  },
});

const Observed = ({ label, reward, delay = 0, className = "", children }: Props) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const corners = [
    corner("left-0 top-0 border-l-2 border-t-2 rounded-tl-md", { x: -10, y: -10 }, delay),
    corner("right-0 top-0 border-r-2 border-t-2 rounded-tr-md", { x: 10, y: -10 }, delay),
    corner("bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md", { x: -10, y: 10 }, delay),
    corner("bottom-0 right-0 border-b-2 border-r-2 rounded-br-md", { x: 10, y: 10 }, delay),
  ];

  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} className={`relative ${className}`}>
      {/* Content revealed top-to-bottom behind the scan line. */}
      <motion.div
        className="h-full"
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.3 },
          show: { clipPath: "inset(0 0 0% 0)", opacity: 1, transition: { duration: SCAN, delay, ease: "easeInOut" } },
        }}
      >
        {children}
      </motion.div>

      <div aria-hidden className="pointer-events-none absolute -inset-2">
        {/* Scan line */}
        <motion.span
          className="absolute inset-x-0 h-[2px] bg-ro-acc shadow-[0_0_14px_2px_var(--ro-acc)]"
          variants={{
            hidden: { top: "0%", opacity: 0 },
            show: { top: ["0%", "100%"], opacity: [0, 1, 1, 0], transition: { duration: SCAN, delay, ease: "easeInOut", times: [0, 0.1, 0.85, 1] } },
          }}
        />
        {/* Tracking box corners */}
        {corners.map((c) => (
          <motion.span key={c.cls} variants={c.v} className={`absolute h-3.5 w-3.5 border-ro-acc ${c.cls}`} />
        ))}
        {/* Observation tag */}
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 4 },
            show: { opacity: [0, 1, 0.75], y: 0, transition: { duration: 0.9, delay: delay + SCAN * 0.6 } },
          }}
          className="absolute -top-5 left-2 whitespace-nowrap font-mono text-[11px] text-ro-acc-text"
        >
          {label}
          {reward !== undefined && <span className="ml-1.5 text-ro-pass">r=+{reward.toFixed(2)}</span>}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Observed;
