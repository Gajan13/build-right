import type { Metadata } from "next";
import Image from "next/image";
import { Invitation } from "@/components/sections/invitation";
import { NavLink } from "@/components/ui/nav-link";
import { intro, isExample, labels, posts } from "@/content/blog";
import { images } from "@/content/images";
import { site } from "@/content/site";
import type { PostId } from "@/content/types";
import { getPostHref } from "@/lib/routes";

// One folder per post, like app/projects: with Cache Components a [slug] route caches unknown addresses,
// and on a case-insensitive disk a wrong-case address could then break a real page.
function findPost(id: PostId) {
  const index = posts.findIndex((post) => post.id === id);
  if (index < 0) throw new Error(`content/blog.ts has no post "${id}"`);
  return { index, post: posts[index] };
}

export function getPostMetadata(id: PostId): Metadata {
  const { post } = findPost(id);
  return {
    title: post.title,
    description: `${post.excerpt} ${site.name}, ${site.location}.`,
    ...(isExample && { robots: { index: false, follow: true } }),
  };
}

/** The common template for every blog post. */
export function PostPage({ id }: { id: PostId }) {
  const { index, post } = findPost(id);
  const neighbours = [
    { post: posts[index - 1], label: labels.previous },
    { post: posts[index + 1], label: labels.next },
  ];

  return (
    <>
      <article aria-labelledby={`${post.id}-title`} className="shell pt-28 md:pt-36">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2.5 text-sm font-semibold">
            {[...intro.breadcrumb, { label: labels.back, href: "/blog" }].map((item) => (
              <li key={item.href} className="flex items-center gap-2.5">
                <NavLink href={item.href} className="inline-flex min-h-11 items-center text-muted underline-offset-4 hover:underline">
                  {item.label}
                </NavLink>
                <span aria-hidden="true" className="text-muted">
                  /
                </span>
              </li>
            ))}
            <li>
              <span aria-current="page">{post.title}</span>
            </li>
          </ol>
        </nav>

        <header className="rise mx-auto mt-10 max-w-3xl text-center md:mt-14">
          <p className="text-sm font-semibold text-accent">
            {isExample && `${labels.example} · `}
            {post.topic}
          </p>
          <h1 id={`${post.id}-title`} className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] font-semibold tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-pretty text-muted md:text-xl">{post.excerpt}</p>
          <p className="mt-5 text-sm text-muted">
            <time>{post.date}</time> · {post.minutes} {labels.minutes}
          </p>
        </header>

        <div className="reveal relative mt-10 aspect-video overflow-hidden rounded-2xl md:mt-14 lg:aspect-[21/9]">
          <Image src={post.photo.src} alt={post.photo.alt} fill preload sizes="(min-width: 1600px) 1500px, 100vw" className="object-cover" />
        </div>

        <div className="reveal-each mx-auto max-w-2xl py-14 md:py-20">
          {isExample && (
            <div role="note" className="mb-12 flex gap-4 rounded-lg border border-accent/40 bg-surface p-5">
              <span aria-hidden="true" className="mt-1.5 size-2.5 shrink-0 rounded-full bg-accent" />
              <div>
                <p className="font-display text-lg font-bold">{intro.notice.title}</p>
                <p className="mt-1 text-muted">{intro.notice.text}</p>
              </div>
            </div>
          )}
          {post.sections.map((section) => (
            <section key={section.heading} className="not-first:mt-12">
              <h2 className="font-display text-2xl font-bold md:text-3xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-lg leading-relaxed text-pretty">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <p className="mt-12 border-t border-line pt-6 text-sm text-muted">{labels.disclaimer}</p>

          <nav aria-label={`${labels.previous}, ${labels.next}`} className="mt-10 flex flex-wrap justify-between gap-x-8 gap-y-5">
            {neighbours.map(({ post: other, label }, side) =>
              other ? (
                <NavLink key={label} href={getPostHref(other.id)} className={`group block py-1 ${side ? "ml-auto text-right" : ""}`}>
                  <span className="block text-sm text-muted">{label}</span>
                  <span className="font-display text-lg font-bold underline-offset-8 group-hover:underline">{other.title}</span>
                </NavLink>
              ) : null,
            )}
          </nav>
        </div>
      </article>

      <Invitation
        title="Have a question about your build?"
        text="Ask us about your land, your plans or a problem with your house. No question is too early."
        link={labels.contact}
        photo={images.fort}
      />
    </>
  );
}
