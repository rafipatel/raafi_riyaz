import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/videoVoice";

/*
 * How VideoVoice works, as one picture:
 *   middle → the two products on videovoice.pages.dev (Dubbing, Dramabox), step by step
 * The pipeline plays itself until the visitor clicks a step.
 */

type ProductId = keyof typeof PRODUCTS;

const STEP_MS = 1800;

const VideoVoiceFlow = () => {
  const reduce = useReducedMotion();
  const [product, setProduct] = useState<ProductId>("dubbing");
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const STEPS = PRODUCTS[product].steps;

  // The pipeline plays itself, step by step, until someone clicks a step.
  useEffect(() => {
    if (!auto || reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [auto, reduce, STEPS.length]);

  const step = STEPS[active];
  const switchProduct = (id: ProductId) => {
    setProduct(id);
    setActive(0);
    setAuto(true);
  };
  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <div className="flex flex-col gap-0">
      {/* 2 · The product pipeline */}
      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div role="tablist" aria-label="VideoVoice products" className="inline-flex rounded-full border border-ro-line2 p-1">
              {(Object.keys(PRODUCTS) as ProductId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={product === id}
                  onClick={() => switchProduct(id)}
                  className={`min-h-[34px] rounded-full px-4 text-sm font-semibold transition-colors ${
                    product === id ? "bg-ro-acc text-ro-acc-ink" : "text-ro-body hover:text-ro-fg"
                  }`}
                >
                  {PRODUCTS[id].name}
                </button>
              ))}
            </div>
            <span className="text-[15px] text-ro-body">{PRODUCTS[product].blurb}</span>
          </div>
          <span className="font-mono text-xs text-ro-muted">{auto && !reduce ? "playing · click a step" : "click a step"}</span>
        </div>

        <ol className={`grid grid-cols-2 gap-2 sm:grid-cols-3 ${STEPS.length === 6 ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const on = i === active;
            const done = i < active;
            return (
              <li key={`${product}-${s.title}`} className="relative">
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={on}
                  className={`flex h-full w-full flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors ${
                    on ? "border-ro-acc bg-ro-tool-bg" : done ? "border-ro-line2 bg-ro-inset" : "border-ro-line bg-ro-inset hover:border-ro-line2"
                  }`}
                >
                  <span className="flex w-full items-center justify-between">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        on ? "bg-ro-acc text-ro-acc-ink" : done ? "bg-ro-surface text-ro-acc-text" : "bg-ro-surface text-ro-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-mono text-[10px] text-ro-muted">{i + 1}</span>
                  </span>
                  <span className={`text-[15px] font-semibold leading-tight ${on ? "text-ro-tool-fg" : ""}`}>{s.title}</span>
                  {s.tech && <span className="font-mono text-[10px] leading-tight text-ro-muted">{s.tech}</span>}
                </button>
                {/* progress bar under each card */}
                <span aria-hidden className="absolute inset-x-3 -bottom-1 h-0.5 overflow-hidden rounded-full bg-ro-track">
                  {on && (
                    <motion.span
                      key={`${active}-${auto}`}
                      className="block h-full bg-ro-acc"
                      initial={{ width: auto && !reduce ? "0%" : "100%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: auto && !reduce ? STEP_MS / 1000 : 0, ease: "linear" }}
                    />
                  )}
                  {done && <span className="block h-full w-full bg-ro-acc opacity-40" />}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-3 flex min-h-[48px] items-start gap-3 px-1" aria-live="polite">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-ro-acc-text" aria-hidden />
          <AnimatePresence initial={false}>
            <motion.p
              key={`${product}-${active}`}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[16px] leading-relaxed text-ro-body"
            >
              <span className="font-semibold text-ro-fg">
                {active + 1}. {step.title}.
              </span>{" "}
              {step.detail}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default VideoVoiceFlow;
