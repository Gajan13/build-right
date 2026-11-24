import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NavLink } from "@/components/ui/nav-link";
import { TileReveal } from "@/components/ui/tile-reveal";
import type { Link, Photo } from "@/content/types";

type Props = {
  eyebrow: string;
  localName: string;
  title: string[];
  text: string;
  primary: Link;
  secondary: Link;
  photo: Photo;
  blueprint: Photo;
  focus: { x: number; y: number };
  revealLabels: { show: string; hide: string };
};

export function Hero({ eyebrow, localName, title, text, primary, secondary, photo, blueprint, focus, revealLabels }: Props) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-blueprint text-white">
      <TileReveal base={blueprint} reveal={photo} focus={focus} labels={revealLabels}>
        <div className="shell pt-28 pb-24">
          <div className="rise flex max-w-4xl flex-col items-start gap-6">
            {/* A feathered scrim with no edges, so amber text stays readable over tiles without looking like a button. */}
            <div className="flex flex-wrap items-center gap-x-4 bg-blueprint/80 shadow-[0_0_18px_12px] shadow-blueprint/80">
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
              <span lang="ta" className="font-bold text-amber">
                {localName}
              </span>
            </div>
            <h1 id="hero-title" className="font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[1.02] font-extrabold tracking-tight uppercase">
              {title.map((line) => (
                <span key={line} className="block text-balance">
                  {line}{" "}
                </span>
              ))}
            </h1>
            <p className="max-w-lg text-lg text-sand md:text-2xl">{text}</p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 pt-2">
              <ButtonLink {...primary} />
              <NavLink href={secondary.href} className="py-2 font-semibold underline underline-offset-8">
                {secondary.label}
              </NavLink>
            </div>
          </div>
        </div>
      </TileReveal>
    </section>
  );
}
