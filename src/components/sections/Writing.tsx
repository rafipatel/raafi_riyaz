import { ArrowUpRight, GitPullRequest, Mic, PenLine, Star } from "lucide-react";
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

type Contribution = (typeof openSourceContributions)[number];

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

// Open-source PRs: pull the repo, PR number and star count out of the data.
const openSource = openSourceContributions
  .filter((c) => c.link.includes("github.com") && c.link.includes("/pull/"))
  .map((c) => {
    const [, owner, repo, , pr] = new URL(c.link).pathname.split("/");
    return {
      ...c,
      name: c.title.replace(/\s*\(.*\)$/, ""),
      stars: /\(([^)]*?)\s*stars?\)/i.exec(c.title)?.[1] ?? "",
      repo: `${owner}/${repo}`,
      pr,
    };
  });

const writingAndTalks = openSourceContributions.filter((c) => !openSource.some((o) => o.link === c.link));

const kindOf = (c: Contribution) => (/speaker|talk/i.test(c.role) ? { icon: Mic, label: "Talk" } : { icon: PenLine, label: "Writing" });

const Writing = () => (
  <section id="writing" data-state="writing" className="mx-auto max-w-[1240px] scroll-mt-20 border-t border-ro-line px-4 py-20 sm:px-8">
    <SectionHeading kicker="contributions/" title="Open source, writing & talks" />

    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
      {/* Open source: merged PRs into large repos, led by the star count */}
      <div className="flex flex-col gap-8">
        <p className="font-mono text-xs text-ro-muted">open source · merged pull requests</p>
        {openSource.map((c, i) => (
          <Observed key={c.link} label={`pr[${i}]`} delay={i * 0.12}>
            <a
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-ro-line bg-ro-surface p-6 transition-colors hover:border-ro-acc"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="truncate font-mono text-xs text-ro-muted">{c.repo}</span>
                  <h3 className="text-2xl font-bold tracking-[-0.02em]">{c.name}</h3>
                </div>
                {c.stars && (
                  <div className="flex shrink-0 flex-col items-end">
                    <span className="flex items-center gap-1.5 text-3xl font-bold tracking-[-0.03em] text-ro-acc-text">
                      <Star className="h-5 w-5 fill-current" aria-hidden />
                      {c.stars}
                    </span>
                    <span className="font-mono text-[11px] text-ro-muted">GitHub stars</span>
                  </div>
                )}
              </div>
              <p className="max-w-[46ch] text-[15px] leading-relaxed text-ro-body">{withBold(c.description)}</p>
              <div className="flex items-center justify-between gap-3 border-t border-ro-line pt-3 font-mono text-xs">
                <span className="flex items-center gap-1.5 text-ro-pass">
                  <GitPullRequest className="h-3.5 w-3.5" aria-hidden />
                  PR #{c.pr}
                </span>
                <span className="flex items-center gap-1 text-ro-muted">
                  {c.role} · {c.date}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ro-acc-text" aria-hidden />
                </span>
              </div>
            </a>
          </Observed>
        ))}
      </div>

      {/* Writing & talks: a quiet, editorial list */}
      <div className="flex flex-col gap-8">
        <p className="font-mono text-xs text-ro-muted">writing & talks</p>
        <Observed label="publications" delay={0.15}>
          <ul className="flex flex-col border-t border-ro-line">
            {writingAndTalks.map((c) => {
              const kind = kindOf(c);
              const Icon = kind.icon;
              return (
                <li key={c.link} className="border-b border-ro-line">
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className="group flex gap-4 py-5 transition-colors">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ro-inset text-ro-acc-text transition-colors group-hover:bg-ro-acc group-hover:text-ro-acc-ink">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-3 font-mono text-[11px] text-ro-muted">
                        <span>
                          {kind.label} · {host(c.link)}
                        </span>
                        <span>{c.date}</span>
                      </span>
                      <span className="flex items-start gap-1.5 text-[17px] font-semibold leading-snug group-hover:text-ro-acc-text">
                        {c.title}
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                      </span>
                      <span className="text-[15px] leading-relaxed text-ro-body">{withBold(c.description)}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Observed>
      </div>
    </div>
  </section>
);

export default Writing;
