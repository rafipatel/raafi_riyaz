import type { ReactNode } from "react";

/*
 * Turns the light markup used in portfolioData.ts into elements:
 *   **words**     highlighted (style chosen by the caller)
 *   [label](url)  link
 *   ==words==     accent colour
 */

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|==[^=]+==)/g;

interface Classes {
  strong?: string;
  link?: string;
  accent?: string;
}

const DEFAULTS: Required<Classes> = {
  strong: "font-semibold text-ro-fg",
  link: "font-semibold text-ro-acc-text underline-offset-4 hover:underline",
  accent: "text-ro-acc-text",
};

export const richText = (text: string, classes: Classes = {}): ReactNode[] => {
  const cls = { ...DEFAULTS, ...classes };
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className={cls.strong}>
          {part.slice(2, -2)}
        </span>
      );
    }
    if (part.startsWith("==") && part.endsWith("==")) {
      return (
        <span key={i} className={cls.accent}>
          {part.slice(2, -2)}
        </span>
      );
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      const ext = href.startsWith("http");
      return (
        <a key={i} href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={cls.link}>
          {label}
        </a>
      );
    }
    return part;
  });
};

/** The same text with the markup removed, for the chatbot and alt text. */
export const plainText = (text: string) =>
  text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/==([^=]+)==/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
