import type { Stat } from "./types";

// Confirmed in docs/client-brief.md. Never round "nearly 60" up.
export const years: Stat = { value: "15", label: "Years of experience" };
export const homes: Stat = { value: "60", qualifier: "nearly", label: "Homes constructed" };
