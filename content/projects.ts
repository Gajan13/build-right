import { images } from "./images";
import type { Project } from "./types";

// PLACEHOLDERS. The owner asked for five examples to show the layout until real projects arrive.
// None of these are Build Right jobs: every name, place, size and date is invented, and the photos are stock.
// Replace each entry with an approved project (see docs/client-brief.md), then set isExample to false.
export const isExample = true;

export const metadata = {
  title: "Projects",
  description: "Homes built, re-roofed and repaired by Build Right in and around Jaffna, Sri Lanka.",
};

export const intro = {
  breadcrumb: [{ label: "Home", href: "/" }],
  eyebrow: "Our projects",
  title: "Homes that carry our name",
  text: "New houses, new roofs and careful repairs. Each project shows the home, its size, the time on site and when it was finished.",
  link: { label: "Start your home", href: "/contact" },
  photo: images.projectsDusk,
  notice: {
    title: "Example projects",
    text: "These five projects only show how this page will look. They are not Build Right homes, and the photos are stock images. Real projects will replace them soon.",
  },
};

export const labels = {
  example: "Example",
  filters: { service: "Service", area: "Area", homeType: "Home type", all: "All" },
  clear: "Clear filters",
  empty: "No projects match these filters.",
  facts: { homeType: "Home type", size: "Size", onSite: "On site", completed: "Completed" },
  link: "Read the project notes",
  page: {
    projects: "Projects",
    contact: { label: "Start your home", href: "/contact" },
    more: "Read the brief",
    brief: "The brief",
    sheet: "Project sheet",
    sheetRows: { project: "Project", area: "Area", home: "Home", rooms: "Rooms", service: "Service", started: "Started", completed: "Completed" },
    previous: "Previous project",
    next: "Next project",
  },
  stats: { shown: "Projects shown", areas: "Areas", services: "Services", latest: "Latest" },
};

// Newest first.
export const projects: Project[] = [
  {
    id: "courtyard-house",
    rooms: "4 bedrooms, 3 bathrooms",
    started: "Nov 2025",
    brief: [
      "A family living abroad bought a corner plot near Kokuvil and wanted a house their parents could live in now and the whole family could gather in every holiday. Shade, privacy from the road and a garden at the centre were at the top of the list.",
      "The plan wraps two wings around the garden so every room looks onto green. Upstairs, deep eaves and timber screens cut the afternoon sun, and cross-ventilation keeps the bedrooms cool without running the air conditioning all day.",
    ],
    title: "A courtyard home with deep eaves",
    service: "new-house",
    area: "Kokuvil",
    homeType: "Two storey",
    summary: "A family home arranged around a shaded garden. Wide overhangs keep the afternoon sun off the glass and timber screens let the breeze through.",
    size: "3,400 sq ft",
    onSite: "11 months",
    completed: "Oct 2026",
    photo: images.projectCourtyard,
  },
  {
    id: "bungalow-roof",
    rooms: "3 bedrooms, 1 bathroom",
    started: "Jul 2026",
    brief: [
      "The owners called after water came through the hall ceiling for the third monsoon in a row. The bungalow was about forty years old, and earlier repairs had only replaced broken tiles where leaks appeared.",
      "Lifting the tiles showed rafters softened by years of damp and battens that no longer held a straight line. We replaced the damaged timber, treated the rest, reused every sound clay tile and made up the shortfall with matching ones.",
    ],
    title: "Clay tiles back on an old bungalow",
    service: "roof-replacement",
    area: "Nallur",
    homeType: "Single storey",
    summary: "The old roof leaked every monsoon. Rotten rafters were replaced, the timber was treated and the clay tiles were relaid with new ridges.",
    size: "1,650 sq ft",
    onSite: "3 weeks",
    completed: "Aug 2026",
    photo: images.projectBungalowRoof,
    focus: "50% 10%",
  },
  {
    id: "timber-stone",
    rooms: "4 bedrooms, 4 bathrooms",
    started: "Aug 2025",
    brief: [
      "A young family wanted a modern house that still felt warm, with room to grow and space to park out of the sun. The plot is long and narrow, so light and airflow had to come from the front and back.",
      "A double-height living room brings daylight deep into the plan, and a stone-clad entrance gives the street front some weight. The carport roof extends the porch, so arriving in the rain means a dry walk to the door.",
    ],
    title: "Timber, stone and a covered carport",
    service: "new-house",
    area: "Chunnakam",
    homeType: "Two storey",
    summary: "A two-storey house with a double-height living room, a stone-clad entrance and a carport that doubles as a shaded porch.",
    size: "2,900 sq ft",
    onSite: "10 months",
    completed: "Jun 2026",
    photo: images.projectTimberStone,
  },
  {
    id: "brick-tile",
    rooms: "3 bedrooms, 2 bathrooms",
    started: "Jun 2025",
    brief: [
      "The owners asked for a house that would age well with little upkeep. They liked the look of bare brick and wanted to avoid repainting the outside every few years in the salt air.",
      "Brick walls are left exposed inside and out, with concrete bands at each floor to tie the structure together. Clay roof tiles over a well-ventilated roof space keep the upper rooms cooler, and the porch roof shelters the front steps from rain.",
    ],
    title: "Exposed brick under a red tiled roof",
    service: "new-house",
    area: "Kopay",
    homeType: "Two storey",
    summary: "Laterite-style brick walls left bare inside and out, white concrete bands at each floor and a low porch roof over the front steps.",
    size: "2,200 sq ft",
    onSite: "9 months",
    completed: "Mar 2026",
    photo: images.projectBrickTile,
  },
  {
    id: "blue-bungalow",
    rooms: "3 bedrooms, 2 bathrooms",
    started: "Dec 2025",
    brief: [
      "Patches of damp kept returning along the lower walls of this bungalow, and the plaster had started to crack and come away. Two coats of new paint in two years had not stopped it.",
      "We traced the damp to a blocked drain and garden soil banked against the walls. Once the drainage was fixed and the walls had dried out, the loose plaster was hacked off, the walls were replastered and the house was repainted.",
    ],
    title: "Walls made sound and painted again",
    service: "repair-work",
    area: "Chavakachcheri",
    homeType: "Single storey",
    summary: "Damp walls and cracked plaster on a family bungalow. The cause was found and fixed, the walls were replastered and the house repainted.",
    size: "1,400 sq ft",
    onSite: "5 weeks",
    completed: "Jan 2026",
    photo: images.projectBlueBungalow,
  },
];
