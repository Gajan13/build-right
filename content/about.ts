import { homes, years } from "./facts";
import { images } from "./images";
import type { Link, Principle } from "./types";

// Company facts come from docs/client-brief.md, where the owner also approved the wording of "story" and "principles".
// The trades are general information, not a list of staff or services.
export const metadata = {
  title: "About Us",
  description:
    "About Build Right, a home construction company based in Jaffna, Sri Lanka, with 15 years of experience and nearly 60 homes constructed.",
};

const contactLink: Link = { label: "Start your home", href: "/contact" };

export const banner = {
  breadcrumb: [{ label: "Home", href: "/" }],
  eyebrow: "About Build Right",
  title: "Good homes begin with good groundwork",
  text: "15 years of experience. Nearly 60 homes. One place we call home: Jaffna.",
  link: contactLink,
  photo: images.siteDusk,
};

export const story = {
  eyebrow: "Who we are",
  title:
    "We are home builders based in Jaffna. We believe a house should suit its land, stand up to its weather and feel like it has always belonged to the family inside.",
  text: "Building a home means trusting someone with your savings, your land and years of hopes. It deserves patience at the drawing table and care on site, from the first trench to the last coat of paint.",
  facts: ["Home construction", "Based in Jaffna, Sri Lanka", "15 years of experience", "Nearly 60 homes constructed"],
  link: { label: "Contact us", href: "/contact" },
  photo: images.houseProgress,
};

const values: Principle[] = [
  { icon: "plan", title: "Think before digging", text: "A question settled on paper costs far less than one settled in concrete." },
  { icon: "family", title: "Begin with the family", text: "How you cook, pray, rest and welcome guests should shape every room." },
  { icon: "level", title: "Respect the basics", text: "Straight, level and properly cured. Every finish depends on all three." },
  { icon: "talk", title: "Talk it through", text: "Decisions about cost, materials and changes are best made together, early." },
];

export const principles = {
  eyebrow: "What we believe",
  title: "Principles worth building on",
  text: "Four simple ideas behind a home that lasts.",
  values,
};

export const journey = {
  eyebrow: "Our journey",
  title: "Fifteen years, one home at a time",
  text: "Each home starts as bare ground and a family's plans. For us, that now adds up to fifteen years of experience and nearly 60 homes, from our base in Jaffna.",
  stats: [years, homes],
  photo: images.lagoon,
};

export const trades = {
  eyebrow: "Behind every home",
  title: "It takes many skilled hands",
  text: "From the first survey peg to the final coat of paint, these are some of the trades a home depends on.",
  notice: "Illustrative photos. The people shown are not Build Right staff.",
  items: [
    { title: "Surveyor", text: "Marks boundaries and levels", photo: images.surveyor },
    { title: "Draughtsperson", text: "Turns ideas into drawings", photo: images.drafting },
    { title: "Mason", text: "Raises walls straight and true", photo: images.mason },
    { title: "Steel fixer", text: "Sets the strength inside concrete", photo: images.steel },
    { title: "Carpenter", text: "Shapes roofs, doors and frames", photo: images.carpenter },
    { title: "Electrician", text: "Brings safe power to each room", photo: images.electrician },
    { title: "Painter", text: "Gives the home its final face", photo: images.painter },
  ],
  more: { text: "See how their work comes together, stage by stage.", label: "Explore the build", href: "/#build" },
};

export const invitation = {
  title: "Ready to build with us?",
  text: "Bring your land, a sketch or just a question. Every home starts with a conversation.",
  link: contactLink,
  photo: images.jaffnaRoad,
};
