import type { Metadata } from "next";
import { Invitation } from "@/components/sections/invitation";
import { PostList } from "@/components/sections/post-list";
import { PageHero } from "@/components/sections/page-hero";
import * as content from "@/content/blog";
import { images } from "@/content/images";

export const metadata: Metadata = {
  ...content.metadata,
  // Draft articles stay out of search results until the owner approves them.
  ...(content.isExample && { robots: { index: false, follow: true } }),
};

export default function BlogPage() {
  const { posts, intro, labels } = content;
  const stats = [
    { label: labels.stats.posts, value: String(posts.length) },
    { label: labels.stats.topics, value: String(new Set(posts.map((post) => post.topic)).size) },
    { label: labels.stats.latest, value: posts[0]?.date ?? "" },
  ];

  return (
    <>
      <PageHero {...intro} current={content.metadata.title} stats={stats} notice={content.isExample ? intro.notice : undefined} />
      <PostList posts={posts} labels={labels} isExample={content.isExample} />
      <Invitation
        title="Have a question about your build?"
        text="Ask us about your land, your plans or a problem with your house. No question is too early."
        link={labels.contact}
        photo={images.fort}
      />
    </>
  );
}
