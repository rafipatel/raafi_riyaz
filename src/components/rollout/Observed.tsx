import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
 * As the visitor scrolls, the agent "observes" each element: a scan line sweeps
 * down it, the content is revealed behind the scan, and a small mono tag names the observation. Decorative only; the content itself
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

const Observed = ({ label, reward, delay = 0, className = "", children }: Props) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

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
