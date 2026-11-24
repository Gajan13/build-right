import Image from "next/image";
import { Arrow } from "@/components/ui/arrow";
import { NavLink } from "@/components/ui/nav-link";
import type { Post } from "@/content/types";
import { getPostHref } from "@/lib/routes";

type Props = { posts: Post[]; labels: { read: string; minutes: string; example: string }; isExample: boolean };

export function PostList({ posts, labels, isExample }: Props) {
  return (
    <section aria-label="Articles" className="shell pt-12 pb-20 md:pt-16 md:pb-28">
      <ul className="reveal-each grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id} className="group relative flex flex-col">
            <div className="relative aspect-3/2 overflow-hidden rounded-xl">
              <Image
                src={post.photo.src}
                alt=""
                fill
                sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-md bg-paper px-3 py-1.5 text-sm font-semibold text-ink shadow-sm">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                {post.topic}
              </span>
            </div>
            <p className="mt-5 text-sm text-muted">
              {isExample && <span className="font-semibold text-accent">{labels.example} · </span>}
              {post.date} · {post.minutes} {labels.minutes}
            </p>
            <h2 className="mt-2 font-display text-2xl leading-tight font-bold text-balance">
              {/* The whole card is clickable through this link, which keeps one link per card for screen readers. */}
              <NavLink href={getPostHref(post.id)} className="after:absolute after:inset-0">
                {post.title}
              </NavLink>
            </h2>
            <p className="mt-3 text-pretty text-muted">{post.excerpt}</p>
            <span aria-hidden="true" className="mt-5 inline-flex items-center gap-2.5 font-semibold underline decoration-line underline-offset-8 group-hover:decoration-ink">
              {labels.read}
              <Arrow className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
