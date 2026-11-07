import Observed from "@/components/rollout/Observed";
import SectionHeading from "./SectionHeading";
import { certifications, education } from "@/data/portfolioData";
import { toolbox } from "@/data/siteContent";
import aiukPhoto from "@/components/photos/aiuk2025.png";

const About = () => (
  <section id="about" data-state="about" className="mx-auto max-w-[1240px] scroll-mt-20 border-t border-ro-line px-4 py-20 sm:px-8">
    <SectionHeading kicker="about.md" title="A bit more about me" />

    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
      <Observed label="observe(photo)" className="self-start">
        <figure className="flex flex-col gap-3">
          <img
            src={aiukPhoto}
            alt="Raafi at the Harmony stand at AI UK 2025, The Alan Turing Institute"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl border border-ro-line object-cover"
          />
          <figcaption className="font-mono text-xs text-ro-muted">
            AI UK 2025, The Alan Turing Institute, presenting fine-tuned language models for Harmony.
          </figcaption>
        </figure>
      </Observed>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ro-body">
          <p>
            <span className="text-ro-fg">I came to AI through engineering.</span> A diploma in mechanical engineering, a BSc in IT in Mumbai, then
            computer vision on factory floors and AI for software testing in production, where I was promoted three months into an internship.
          </p>
          <p>
            An MSc in Artificial Intelligence in London pulled me towards research: lung cancer survival models, GANs, deep RL. Since then I've
            worked on the data and environments frontier models learn from, at Mercor and Tensium, and now on how agents scale at Eigent AI.
          </p>
          <p>
            Outside work I build products (VideoVoice, Feedhire), enter hackathons solo, write, and have given a talk introducing RL to final-year students. I speak English, Urdu,
            Hindi and Marathi.
          </p>
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
              <li className="flex flex-col gap-0.5">
                <span className="font-semibold leading-snug">Technical AI Safety</span>
                <span className="font-mono text-xs text-ro-muted">BlueDot Impact · May 2026</span>
              </li>
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

        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-xs text-ro-acc-text">toolbox</h3>
          <div className="flex flex-col gap-3">
            {toolbox.map((t) => (
              <div key={t.group} className="flex flex-wrap items-center gap-1.5">
                <span className="w-full shrink-0 text-sm text-ro-muted sm:mr-2 sm:w-[130px]">{t.group}</span>
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
    </div>
  </section>
);

export default About;
