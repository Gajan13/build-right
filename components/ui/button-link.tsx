import { NavLink } from "./nav-link";
import { Arrow } from "./arrow";

const tones = {
  amber: { link: "bg-amber text-night", icon: "bg-night text-amber" },
  ink: { link: "bg-ink text-paper", icon: "bg-paper text-ink" },
  white: { link: "bg-white text-night", icon: "bg-night text-white" },
};

type Props = { href: string; label: string; tone?: keyof typeof tones };

export function ButtonLink({ href, label, tone = "amber" }: Props) {
  return (
    <NavLink
      href={href}
      className={`lift group inline-flex min-h-11 max-w-full items-center gap-3 rounded py-1.5 pr-1.5 pl-4 font-semibold ${tones[tone].link}`}
    >
      {label}
      <span className={`grid size-8 shrink-0 place-items-center rounded-xs ${tones[tone].icon}`}>
        <Arrow className="size-4 -rotate-45 transition-transform motion-safe:group-hover:rotate-0" />
      </span>
    </NavLink>
  );
}
