import type { Stat } from "@/content/types";
import { CountUp } from "./count-up";

export function StatValue({ value, qualifier }: Omit<Stat, "label">) {
  return (
    <>
      {qualifier && (
        <span className="mr-2 text-[0.4em] font-semibold tracking-wide uppercase">
          {qualifier}
        </span>
      )}
      <CountUp text={value} />
    </>
  );
}
