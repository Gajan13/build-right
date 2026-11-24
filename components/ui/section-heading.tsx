import type { Heading } from "@/content/types";
import { Eyebrow } from "./eyebrow";

type Props = Heading & { id: string; align?: "start" | "center" };

export function SectionHeading({ id, eyebrow, title, text, align = "center" }: Props) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";
  return (
    <div className={`reveal flex flex-col gap-5 ${alignment}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="title max-w-3xl">
        {title}
      </h2>
      <p className="max-w-xl text-lg text-pretty text-muted">{text}</p>
    </div>
  );
}
