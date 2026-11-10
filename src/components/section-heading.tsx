import SplitText from "@/components/split-text";
import Reveal from "@/components/reveal";

export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  dark = false,
  className = "mb-14",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left"} ${className}`}>
      <Reveal direction="none">
        <span className={`eyebrow ${dark ? "eyebrow-dark" : "eyebrow-light"}`}>
          <span className="dot" aria-hidden />
          {eyebrow}
        </span>
      </Reveal>
      <SplitText
        text={title}
        delay={120}
        className={`mt-5 text-[32px] leading-[1.08] sm:text-[44px] ${dark ? "text-white" : "text-ink"}`}
      />
      {body && (
        <Reveal delay={0.3}>
          <p
            className={`mt-5 text-[16.5px] leading-relaxed ${dark ? "text-mist-soft" : "text-ink-soft"} ${
              align === "center" ? "mx-auto max-w-[58ch]" : "max-w-[58ch]"
            }`}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
