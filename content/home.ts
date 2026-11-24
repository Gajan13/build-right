import { homes, years } from "./facts";
import { images } from "./images";

// Company facts come from docs/client-brief.md. The rest is general guidance, not claims about the company.

export const hero = {
  eyebrow: "Home builders",
  localName: "யாழ்ப்பாணம்",
  title: ["Homes built right,", "rooted in Jaffna"],
  text: "A home construction company with 15 years of experience and nearly 60 homes built.",
  primary: { label: "Start your home", href: "#contact" },
  secondary: { label: "See how a home is built", href: "#build" },
  photo: images.hero,
  blueprint: images.heroBlueprint,
  focus: { x: 0.7, y: 0.3 },
  revealLabels: { show: "Show finished home", hide: "Show blueprint" },
};

export const about = {
  eyebrow: "About us",
  title:
    "We are a Jaffna home construction company, turning plots of land into places where families gather, grow and put down roots.",
  text: "A home is one of the biggest decisions a family makes. We bring fifteen years of building experience to yours.",
  stats: [years, homes],
  link: { label: "More about us", href: "/about" },
  photo: images.louvres,
  principles: [
    { title: "Your land", text: "Every good plan starts with the plot, its soil and its access." },
    { title: "Your family", text: "Rooms should suit how you live now and in the years ahead." },
    { title: "Our climate", text: "Shade, airflow and drainage matter from the first drawing." },
    { title: "Built to stay", text: "The parts you never see decide how long a home will last." },
  ],
};

export const build = {
  eyebrow: "The build",
  title: "What goes into a home",
  text: "Six stages take a home from an empty plot to an open front door.",
  stages: [
    { title: "Plans", text: "Rooms, levels and structure, settled on paper first.", photo: images.planning },
    { title: "Foundations", text: "Footings and slabs matched to the ground beneath.", photo: images.foundation },
    { title: "Walls & structure", text: "Blockwork, columns and beams that carry the home.", photo: images.masonry },
    { title: "Roofing", text: "The shelter against strong sun and monsoon rain.", photo: images.roof },
    { title: "Plaster & finishes", text: "Smooth walls, floors and paint that bring it to life.", photo: images.plaster },
    { title: "Doors & joinery", text: "Timber details you will touch every single day.", photo: images.joinery },
  ],
};

export const record = {
  title: "Right from the ground up.",
  text: "Fifteen years of experience, nearly 60 homes and one simple truth: a lasting house starts below the ground.",
  link: { label: "Plan your build", href: "#guide" },
  stats: [years, homes, { value: "Jaffna", label: "Where we are based" }],
  photo: images.timberStone,
};

export const inspiration = {
  eyebrow: "Design inspiration",
  title: "Picture your future home",
  text: "Traditional or modern, one storey or two. Find a starting point for the conversation.",
  notice: "These are inspiration photos, not homes built by Build Right.",
  ideas: [
    { title: "Tropical heritage", text: "Tiled roofs, verandahs and gardens", photo: images.verandah },
    { title: "Tropical modern", text: "Wide eaves over generous glass", photo: images.hippedRoof },
    { title: "Light-filled living", text: "Open rooms with natural airflow", photo: images.interior },
  ],
};

export const process = {
  eyebrow: "The process",
  title: "Your path home",
  text: "Three steps from an idea to a house you can walk through.",
  photo: images.planning,
  steps: [
    { title: "Talk", text: "Start with your land, your family's needs and the budget you have in mind." },
    { title: "Plan", text: "Settle drawings, approvals, materials and costs before any work begins." },
    { title: "Build", text: "Raise the home stage by stage, from foundations through to finishes." },
  ],
};

export const craft = {
  eyebrow: "Built with care",
  title: "The strongest part of a home is the part you never see",
  text: "Steel, concrete, curing and levels. Get these right and everything above them follows.",
  photo: images.slab,
};

export const jaffna = {
  eyebrow: "Rooted in Jaffna",
  title: "A home that belongs here",
  text: "The peninsula has its own light, wind, water and way of living. A house here should answer to all four.",
  photos: [images.nallur, images.fort, images.causeway],
  considerations: [
    { title: "Heat", text: "Deep eaves, verandahs and cross-ventilation keep rooms cooler through the long dry months." },
    { title: "Monsoon", text: "Plinth height, roof falls and drainage need to be ready for the October to January rains." },
    { title: "Salt air", text: "Near the coast, steel needs proper concrete cover and metal fittings need protection." },
    { title: "Groundwater", text: "Limestone lets waste travel, so wells and septic systems need careful placement." },
  ],
};

export const guide = {
  eyebrow: "Planning guide",
  title: "Before you build",
  text: "Good questions to settle early, whoever you build with.",
  photo: images.joinery,
  questions: [
    {
      title: "What should I check about my land?",
      text: "Confirm the deed and survey plan, the boundaries, road access, water and electricity. Look at where rainwater collects after heavy rain.",
    },
    {
      title: "Which approvals will I need?",
      text: "Building plans normally need approval from your Municipal Council, Urban Council or Pradeshiya Sabha. Coastal and heritage areas can need more, so ask before you finalise drawings.",
    },
    {
      title: "What should a building estimate include?",
      text: "Look for quantities, material grades, labour, what is excluded, payment stages and how changes will be priced. Keep some budget aside for the unexpected.",
    },
    {
      title: "Can I plan the build from overseas?",
      text: "Decide who can sign and make decisions locally, how you will see progress and how payments link to completed stages. Put all three in writing.",
    },
    {
      title: "When is a good time to start?",
      text: "Many owners aim to finish groundwork and roofing outside the heaviest rains. Allow time for drawings and approvals before that.",
    },
  ],
};

export const closing = {
  title: "Let's build it right",
  text: "Have land, a drawing or just an idea? That is enough to begin.",
  pending: "Our phone, WhatsApp and email details will be published here soon.",
  photo: images.fort,
};
