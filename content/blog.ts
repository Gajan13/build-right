import { images } from "./images";
import type { Post } from "./types";

// EXAMPLE DRAFTS. The owner asked for example posts until Build Right writes or approves its own.
// They are general guidance, not company claims: keep them that way, and have someone who knows local rules review them.
// When the owner approves the articles, set isExample to false.
export const isExample = true;

export const metadata = {
  title: "Blog",
  description: "Practical guides for building, repairing and looking after a home in Jaffna and the north of Sri Lanka.",
};

export const intro = {
  breadcrumb: [{ label: "Home", href: "/" }],
  eyebrow: "Our blog",
  title: "Notes from the building site",
  text: "Plain guides to land, approvals, weather and budgets, for anyone planning a home in the north.",
  link: { label: "Ask us a question", href: "/contact" },
  photo: images.planning,
  notice: {
    title: "Example articles",
    text: "These five articles are drafts that show how the blog will look. They give general guidance only and will be reviewed by Build Right before they are published.",
  },
};

export const labels = {
  example: "Draft",
  read: "Read the article",
  minutes: "min read",
  stats: { posts: "Articles", topics: "Topics", latest: "Latest" },
  back: "Blog",
  previous: "Previous article",
  next: "Next article",
  contact: { label: "Ask us a question", href: "/contact" },
  disclaimer: "General guidance only. Rules and costs change, so check the details for your own plot and project.",
};

// Newest first.
export const posts: Post[] = [
  {
    id: "checking-your-land",
    title: "Checking your land before you build",
    topic: "Land",
    date: "12 Nov 2026",
    minutes: 5,
    excerpt: "A good house starts with a good plot. Here is what to look at before you buy land or start drawings.",
    photo: images.foundation,
    sections: [
      {
        heading: "Start with the papers",
        paragraphs: [
          "Before anything else, make sure the deed is clear and matches the survey plan. Check that the boundaries on paper are the boundaries on the ground, and that nobody else has a claim to part of the plot.",
          "If the land has been passed down through a family, it is worth confirming that every owner agrees to the sale or the build. Problems here are much harder to fix once work has started.",
        ],
      },
      {
        heading: "Walk the plot in the rain",
        paragraphs: [
          "A dry plot in August can look very different in November. Visit after heavy rain and see where water collects, which way it runs and whether neighbouring land drains onto yours.",
          "Low spots are not always a problem, but they affect how high the floor needs to sit and how much drainage you will need.",
        ],
      },
      {
        heading: "Access, water and power",
        paragraphs: [
          "Think about how a lorry will deliver sand, blocks and steel. A narrow lane can add cost to every load.",
          "Find out where the nearest electricity connection is, whether there is a well or pipe-borne water, and how deep good water is likely to be. These answers shape the budget long before the first wall goes up.",
        ],
      },
    ],
  },
  {
    id: "building-approvals",
    title: "What to expect from building approvals",
    topic: "Approvals",
    date: "28 Oct 2026",
    minutes: 4,
    excerpt: "Most new houses need plan approval before work begins. A little preparation keeps the process moving.",
    photo: images.planning,
    sections: [
      {
        heading: "Who approves your plans",
        paragraphs: [
          "Building plans are normally approved by your local authority: the Municipal Council, Urban Council or Pradeshiya Sabha for the area your plot is in. Some areas, such as places near the coast or protected sites, may need further approvals.",
          "Ask the local authority office early what they need for your plot. Requirements can differ from one area to the next.",
        ],
      },
      {
        heading: "Prepare your documents",
        paragraphs: [
          "Expect to provide drawings, a copy of the deed, the survey plan and the application forms. Keep copies of everything you hand in and note the date.",
          "Clear, complete drawings make the review faster. Missing details are one of the most common reasons for delays.",
        ],
      },
      {
        heading: "Plan the time",
        paragraphs: [
          "Leave time for the approval in your schedule, especially if you want groundwork finished before the rains. Starting before approval can lead to costly changes or demolition orders.",
          "When the house is finished, ask the local authority about the certificate needed before you move in.",
        ],
      },
    ],
  },
  {
    id: "ready-for-the-monsoon",
    title: "Getting a house ready for the monsoon",
    topic: "Weather",
    date: "9 Oct 2026",
    minutes: 4,
    excerpt: "The north-east monsoon brings most of the year's rain in a few months. A few checks before October save a lot of trouble.",
    photo: images.roof,
    sections: [
      {
        heading: "Look up at the roof",
        paragraphs: [
          "Check for cracked, slipped or missing tiles and for gaps along the ridges. Inside, look for stains on ceilings, which often show where water has already found a way in.",
          "Do not walk on clay tiles yourself. They break easily and roofs are dangerous, so leave close inspection to someone with the right equipment.",
        ],
      },
      {
        heading: "Clear the way for water",
        paragraphs: [
          "Gutters, downpipes and drains should be free of leaves and silt. Make sure water is led away from the walls rather than pooling at their base.",
          "Garden soil banked against a wall can carry damp into the house. Keep a gap between soil and plaster where you can.",
        ],
      },
      {
        heading: "Protect the inside",
        paragraphs: [
          "Check that windows close tightly and that seals around frames are intact. Move anything valuable away from walls that have been damp before.",
          "If you notice a new leak during the rains, contain it and note where it appears. That record helps find the cause when the weather clears.",
        ],
      },
    ],
  },
  {
    id: "reading-an-estimate",
    title: "How to read a building estimate",
    topic: "Budget",
    date: "18 Sep 2026",
    minutes: 5,
    excerpt: "Two estimates for the same house can look very different. Here is how to compare them fairly.",
    photo: images.slab,
    sections: [
      {
        heading: "Look for quantities, not just totals",
        paragraphs: [
          "A useful estimate lists the main quantities: concrete, steel, blocks, roofing, plaster and finishes. Without them, it is hard to see what the price really includes.",
          "Check the material grades too. A cheaper estimate sometimes assumes lighter steel or lower-grade materials.",
        ],
      },
      {
        heading: "Find what is left out",
        paragraphs: [
          "Ask what is excluded. Common gaps include plumbing and electrical fittings, boundary walls, water connections, approvals and site clearing.",
          "If two estimates exclude different things, add the missing items before comparing them.",
        ],
      },
      {
        heading: "Agree how money moves",
        paragraphs: [
          "Payments are usually tied to stages of work. Make sure each stage is clearly defined, so it is obvious when it is finished.",
          "Agree in writing how changes will be priced, and keep some of the budget aside for the unexpected. Very few builds go exactly to plan.",
        ],
      },
    ],
  },
  {
    id: "building-from-abroad",
    title: "Building a home from overseas",
    topic: "Planning",
    date: "30 Aug 2026",
    minutes: 4,
    excerpt: "Many families build in Jaffna while living abroad. Clear arrangements make the distance much easier.",
    photo: images.verandah,
    sections: [
      {
        heading: "Choose who decides locally",
        paragraphs: [
          "Someone will need to make decisions on site, sign for deliveries and meet officials. Decide early who that is and what they can approve without asking you.",
          "Put this in writing, including any limits on spending, so everyone knows where they stand.",
        ],
      },
      {
        heading: "Agree how you will see progress",
        paragraphs: [
          "Regular photos and short video calls help you follow the work. Ask for them at key moments, such as before concrete is poured, when steel is still visible.",
          "Visit in person at the stages that matter most to you if you can, for example when the plan is set out on the ground.",
        ],
      },
      {
        heading: "Link payments to finished work",
        paragraphs: [
          "Pay against stages that can be checked, rather than against dates. Keep receipts and a simple record of what has been paid and when.",
          "Clear records protect everyone, and they make it much easier to sort out questions later.",
        ],
      },
    ],
  },
];
