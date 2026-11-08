import type { ReactNode } from "react";

interface Props {
  kicker: string;
  title: string;
  sub?: ReactNode;
  right?: ReactNode;
}

/** Shared section heading: a mono "file name" kicker, a bold title and an optional line underneath. */
const SectionHeading = ({ kicker, title, sub, right }: Props) => (
  <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
    <div className="flex max-w-[680px] flex-col gap-3">
      <p className="font-mono text-xs text-ro-acc-text">{kicker}</p>
      <h2 className="text-[32px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[42px]">{title}</h2>
      {sub && <p className="text-[17px] leading-relaxed text-ro-body">{sub}</p>}
    </div>
    {right}
  </div>
);

export default SectionHeading;
