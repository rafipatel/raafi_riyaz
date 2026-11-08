import Observed from "@/components/rollout/Observed";
import SectionHeading from "./SectionHeading";
import { about, certifications, education, toolbox } from "@/data/portfolioData";
import { richText } from "@/lib/richText";
import aiukPhoto from "@/components/photos/aiuk2025.png";

const About = () => (
  <section id="about" data-state="about" className="mx-auto max-w-[1240px] scroll-mt-20 border-t border-ro-line px-4 py-20 sm:px-8">
    <SectionHeading kicker="about.md" title="A bit more about me" />

    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
      <div className="flex flex-col gap-10 self-start">
      <Observed label="observe(photo)">
        <figure className="flex flex-col gap-3">
          <img
            src={aiukPhoto}
            alt={about.photoAlt}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl border border-ro-line object-cover"
          />
          <figcaption className="font-mono text-xs text-ro-muted">
            {about.photoCaption}
          </figcaption>
        </figure>
      </Observed>

        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-xs text-ro-acc-text">toolbox</h3>
          <div className="flex flex-col gap-3">
            {toolbox.map((t) => (
              <div key={t.group} className="flex flex-wrap items-center gap-1.5">
                <span className="w-full shrink-0 text-sm text-ro-muted">{t.group}</span>
                {t.items.map((it) => (
                  <span key={it} className="rounded-full border border-ro-line2 px-3 py-1 text-[13px]">
                    {it}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ro-body">
          {about.paragraphs.map((p) => (
            <p key={p}>{richText(p, { strong: "text-ro-fg" })}</p>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs text-ro-acc-text">education</h3>
            <ul className="flex flex-col gap-4">
              {education.map((e) => (
                <li key={e.title} className="flex flex-col gap-0.5">
                  <span className="font-semibold leading-snug">{e.title}</span>
                  <span className="text-[15px] text-ro-body">{e.institution}</span>
                  <span className="font-mono text-xs text-ro-muted">{e.date}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs text-ro-acc-text">certifications</h3>
            <ul className="flex flex-col gap-3">
              {certifications.map((c) => (
                <li key={c.title} className="flex flex-col gap-0.5">
                  <span className="font-semibold leading-snug">{c.title}</span>
                  <span className="font-mono text-xs text-ro-muted">
                    {c.organization} · {c.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
