import type { StaticImageData } from "next/image";

export type Photo = { src: StaticImageData; alt: string };
export type Link = { label: string; href: string };
export type Stat = { value: string; qualifier?: string; label: string };
export type Item = { title: string; text: string };
export type IconName = "plan" | "family" | "level" | "talk" | "house" | "roof" | "trowel" | "tiles" | "drop" | "bolt" | "sun";
export type Principle = Item & { icon: IconName };
export type NavItem = Link & { children?: Link[] };
export type ServiceId =
  | "new-house"
  | "roof-replacement"
  | "repair-work"
  | "tile-work"
  | "plumbing"
  | "electrical"
  | "solar-panels";
export type Service = Item & {
  /** Also the page's folder in app/services, so a new service needs an id and a folder. */
  id: ServiceId;
  advice: string;
  points: string[];
  photo: Photo;
  icon: IconName;
  /** The hero headline, one entry per line. */
  tagline: [string, string];
  /** A wide photo, with the point to keep in view as it crops. */
  hero: { photo: Photo; focus: string };
  intro: string;
  steps: Item[];
  questions: Item[];
};
export type ProjectId = "courtyard-house" | "bungalow-roof" | "timber-stone" | "brick-tile" | "blue-bungalow";
export type Project = {
  /** Also the page's folder in app/projects, so a new project needs an id and a folder. */
  id: ProjectId;
  title: string;
  service: ServiceId;
  area: string;
  homeType: "Single storey" | "Two storey";
  summary: string;
  /** Two paragraphs for the project page. */
  brief: [string, string];
  rooms: string;
  /** Month and year, for example "Nov 2025". */
  started: string;
  size: string;
  onSite: string;
  /** Month and year, for example "Oct 2026". */
  completed: string;
  photo: Photo;
  /** Where to keep the photo in view when the hero crops it, for example "50% 0%". */
  focus?: string;
};
export type PostId = "checking-your-land" | "building-approvals" | "ready-for-the-monsoon" | "reading-an-estimate" | "building-from-abroad";
export type Post = {
  /** Also the page's folder in app/blog, so a new post needs an id and a folder. */
  id: PostId;
  title: string;
  topic: string;
  /** For example "12 Nov 2026". */
  date: string;
  minutes: number;
  excerpt: string;
  photo: Photo;
  sections: { heading: string; paragraphs: string[] }[];
};
export type Heading = { eyebrow: string; title: string; text: string };

export type Contact = {
  /** International format, for example +94 21 000 0000. */
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  /** For example "Mon–Fri 8:00–17:00, Sat 8:00–13:00". */
  hours: string | null;
};
