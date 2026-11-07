import { ArrowUpRight } from "lucide-react";
import Observed from "@/components/rollout/Observed";
import SectionHeading from "./SectionHeading";
import { openSourceContributions } from "@/data/portfolioData";

/** Render the data's **bold** markers as <strong>. */
const withBold = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-semibold text-ro-fg">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );

const Writing = () => (
  <section id="writing" data-state="writing" className="mx-auto max-w-[1240px] scroll-mt-20 border-t border-ro-line px-4 py-20 sm:px-8">
    <SectionHeading kicker="contributions/" title="Open source, writing & talks" />

    <ul className="grid gap-x-3 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
      {openSourceContributions.map((c, i) => (
        <li key={c.title} className="flex">
          <Observed label={`contribution[${i}]`} delay={(i % 3) * 0.12} className="w-full">
            <a
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-2 rounded-2xl border border-ro-line bg-ro-surface p-5 transition-colors hover:border-ro-acc"
            >
              <div className="flex items-center justify-between gap-2 font-mono text-xs">
                <span className="text-ro-acc-text">{c.role}</span>
                <span className="text-ro-muted">{c.date}</span>
              </div>
              <h3 className="flex items-start justify-between gap-2 text-lg font-semibold leading-snug">
                {c.title}
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ro-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ro-acc-text" aria-hidden />
              </h3>
              <p className="text-[15px] leading-relaxed text-ro-body">{withBold(c.description)}</p>
            </a>
          </Observed>
        </li>
      ))}
    </ul>
  </section>
);

export default Writing;
