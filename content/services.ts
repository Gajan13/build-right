import { homes, years } from "./facts";
import { images } from "./images";
import type { Service, Stat } from "./types";

// The seven services come from docs/client-brief.md. The points under each are general advice for homeowners,
// as are each page's intro, steps and questions,
// so don't turn them into promises, inclusions or qualifications without the owner's approval.
export const metadata = {
  title: "Services",
  description:
    "Home building and repair services from Build Right in Jaffna: new houses, roof replacement, repairs, tiling, plumbing, electrical work and solar panel fitting.",
};

export const banner = {
  breadcrumb: [{ label: "Home", href: "/" }],
  eyebrow: "Our services",
  title: "From first foundation to finishing touch",
  text: "Building, repairing and improving homes, from our base in Jaffna.",
  link: { label: "Get in touch", href: "/contact" },
  photo: images.servicesSunset,
};

export const overview = {
  eyebrow: "What we do",
  title: "Seven ways we can help",
  text: "Choose the work you have in mind, and see what is worth thinking about before we talk.",
};

export const servicePage = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ],
  badge: "Home builders in Jaffna",
  more: "See how it works",
  intro: "About this work",
  steps: "How the work usually goes",
  questions: "Common questions",
  note: "This is general guidance. The right approach depends on your home and the condition it is in.",
  sidebar: "Our services",
  help: { title: "Not sure what you need?", text: "Describe the problem and we can talk about where to start." },
  contact: { label: "Get in touch", href: "/contact" },
  previous: "Previous service",
  next: "Next service",
};

export const services: Service[] = [
  {
    id: "new-house",
    title: "Constructing a new house",
    text: "A new home on your land, built up stage by stage from the foundations to the finishes.",
    advice: "Before you start",
    points: [
      "Have your deed, survey plan and boundaries ready.",
      "Allow time for drawings and local authority approval.",
      "Agree payment stages and how changes will be priced.",
    ],
    photo: images.newHouse,
    icon: "house",
    tagline: ["From bare ground", "to your front door"],
    hero: { photo: images.heroNewHouse, focus: "50% 70%" },
    intro:
      "A house is thousands of decisions made in the right order. Settling the layout, structure, budget and materials before the first trench is dug leaves fewer surprises later, when changes cost the most.",
    steps: [
      { title: "Land and brief", text: "Look at the plot, its levels and access, and list what the household needs now and later." },
      { title: "Plans and approvals", text: "Prepare drawings and an estimate, then obtain approval from the local authority." },
      { title: "Foundations and structure", text: "Set out the house, cast the foundations, then raise columns, walls, beams and the roof." },
      { title: "Services and finishes", text: "Run pipes and wiring before plastering, then complete floors, joinery and paint." },
    ],
    questions: [
      { title: "How long does it take to build a house?", text: "It depends on size, design, finishes, weather and how quickly decisions and payments are made. Ask for a programme broken into stages." },
      { title: "What paperwork matters at the end?", text: "Keep the approved drawings and ask your local authority about the certificate of conformity needed before you occupy the house." },
    ],
  },
  {
    id: "roof-replacement",
    title: "Roof replacement",
    text: "A new roof for a home whose old one can no longer keep out the sun and the monsoon.",
    advice: "Signs to look for",
    points: [
      "Leaks that return every rainy season.",
      "Sagging lines, rotten timber or slipping tiles.",
      "Old cement sheets, which may contain asbestos. Don't cut or break them.",
    ],
    photo: images.roofReplacement,
    icon: "roof",
    tagline: ["Off with the old,", "on with the new"],
    hero: { photo: images.heroRoof, focus: "48% 22%" },
    intro:
      "In Jaffna a roof faces months of hard sun followed by heavy north-east monsoon rain. When patching stops working, replacing the covering also gives a chance to check the timber or steel underneath.",
    steps: [
      { title: "Inspect", text: "Check the covering, frame, gutters and the tops of the walls for damage and damp." },
      { title: "Choose the covering", text: "Compare weight, heat, noise, pitch and upkeep before settling on tiles or sheets." },
      { title: "Strip and strengthen", text: "Remove the old covering safely and repair any weak part of the frame." },
      { title: "Cover and drain", text: "Fix the new covering, seal ridges and junctions, and see that rainwater runs clear." },
    ],
    questions: [
      { title: "When is the best time to replace a roof?", text: "The drier months are easier. If work cannot wait until after the rains, plan temporary cover for each day." },
      { title: "What if my old sheets contain asbestos?", text: "Leave them undisturbed until people with the right protection can remove and dispose of them. Never saw, drill or sweep them dry." },
    ],
  },
  {
    id: "repair-work",
    title: "Repair work",
    text: "Putting worn and damaged parts of a house right, before small faults grow into large ones.",
    advice: "Signs to look for",
    points: [
      "Cracks that are widening or run diagonally from openings.",
      "Damp patches, or plaster that sounds hollow.",
      "Rust stains or concrete breaking away from the steel.",
    ],
    photo: images.repair,
    icon: "trowel",
    tagline: ["Find the cause,", "then fix it well"],
    hero: { photo: images.heroRepair, focus: "60% 65%" },
    intro:
      "A good repair deals with the cause as well as the mark it leaves. Fresh plaster over a leak or a moving crack will soon fail, so it pays to find out why the damage happened first.",
    steps: [
      { title: "Look closely", text: "Record where the damage is, when it appeared and whether it is growing." },
      { title: "Find the cause", text: "Trace water, movement, rust or rot back to where it starts." },
      { title: "Agree the repair", text: "Settle what will be opened up, replaced and left in place." },
      { title: "Repair and finish", text: "Fix the cause, let materials cure and dry, then match the surrounding finish." },
    ],
    questions: [
      { title: "Which cracks are serious?", text: "Cracks that widen, pass through a wall, or come with sloping floors and sticking doors should be seen by an engineer promptly." },
      { title: "Why does damp return after painting?", text: "Paint hides moisture without stopping it. The source, such as a leak, splashing rain or rising ground moisture, has to be dealt with first." },
    ],
  },
  {
    id: "tile-work",
    title: "Tile work",
    text: "Tiled surfaces laid level and neatly finished, so they look good and stand up to daily use.",
    advice: "Worth deciding early",
    points: [
      "Slip-resistant tiles for wet areas.",
      "The direction water should drain.",
      "Spare tiles from the same batch for later repairs.",
    ],
    photo: images.tiling,
    icon: "tiles",
    tagline: ["Level underfoot,", "neat to the edge"],
    hero: { photo: images.heroTiling, focus: "52% 45%" },
    intro:
      "The finish you see depends on the surface below it. A sound, level base, the right fall towards drains and a planned layout make the difference between tiles that last and tiles that crack or hold water.",
    steps: [
      { title: "Measure and choose", text: "Measure each area and pick a tile that suits how wet and busy it will be." },
      { title: "Prepare the base", text: "Remove loose material, correct the levels and waterproof wet areas." },
      { title: "Set out and lay", text: "Plan the cuts, then bed each tile fully with even joints." },
      { title: "Grout and cure", text: "Fill the joints, clean the surface and keep off it until it has set." },
    ],
    questions: [
      { title: "How many extra tiles should I buy?", text: "About one in ten is a common allowance for cuts and breakage. Diagonal layouts and patterns need more." },
      { title: "Can new tiles go over old ones?", text: "Sometimes, if the old tiles are firm, flat and dry and the added height will not block doors or drains. Loose tiles should come out." },
    ],
  },
  {
    id: "plumbing",
    title: "Plumbing work",
    text: "Pipework that brings clean water to where you need it and carries waste safely away.",
    advice: "Worth checking",
    points: [
      "A falling tank level or a pump that starts by itself.",
      "Shut-off valves that you can reach easily.",
      "A safe distance between the well and any septic system.",
    ],
    photo: images.plumbing,
    icon: "drop",
    tagline: ["Clean water in,", "waste safely out"],
    hero: { photo: images.heroPlumbing, focus: "62% 50%" },
    intro:
      "Good plumbing is easy to forget, because it simply works. In a place that depends so much on groundwater, how fresh water is stored and how waste is carried away matter as much as the taps you can see.",
    steps: [
      { title: "Map the system", text: "Follow water from the source and tank to each tap, and waste to where it ends." },
      { title: "Plan the routes", text: "Keep runs short, give drains a steady fall and leave valves within reach." },
      { title: "Install", text: "Fit pipes, joints and fixtures, supporting them so they cannot sag or knock." },
      { title: "Test", text: "Check for leaks, flow and free drainage before anything is covered up." },
    ],
    questions: [
      { title: "How can I tell if there is a hidden leak?", text: "Close every tap and watch the meter, tank level or pump. Movement with nothing in use points to a leak." },
      { title: "Why does well and septic placement matter?", text: "Jaffna's limestone lets waste travel into groundwater. Ask the local health or planning authority about the distances that apply to your plot." },
    ],
  },
  {
    id: "electrical",
    title: "Electrical work",
    text: "Wiring, switches and sockets planned around the way your household uses power.",
    advice: "Don't ignore",
    points: [
      "A burning smell, warm sockets or flickering lights.",
      "A trip switch that keeps going off.",
      "Missing earthing, or old and brittle cables.",
    ],
    photo: images.electrical,
    icon: "bolt",
    tagline: ["Safe power,", "planned room by room"],
    hero: { photo: images.heroElectrical, focus: "40% 30%" },
    intro:
      "Electrical work is safest when it is planned as a whole: what each room will power, how circuits are divided and how faults are cut off. Testing and installation are jobs for a qualified electrician.",
    steps: [
      { title: "List what you need", text: "Note lights, fans, pumps, kitchen appliances and anything planned for later." },
      { title: "Plan the circuits", text: "Size cables and breakers for the load, with earthing and leakage protection." },
      { title: "Install safely", text: "Switch off and prove the supply dead, then fit wiring, boards and accessories." },
      { title: "Test and label", text: "Test every circuit and label the board so anyone can switch off the right one." },
    ],
    questions: [
      { title: "What should I do if I smell burning?", text: "Switch off the main supply if you can reach it safely and do not use it again until it has been checked. If there is smoke or fire, get out and call for help." },
      { title: "When should old wiring be checked?", text: "Before adding large appliances or solar, after water damage, and whenever breakers trip often or sockets become warm." },
    ],
  },
  {
    id: "solar-panels",
    title: "Solar panel fitting",
    text: "Panels fitted to your roof, putting Jaffna's long hours of sunshine to work.",
    advice: "Before fitting",
    points: [
      "Make sure the roof is sound enough to carry the panels.",
      "Check for shade from trees, tanks and nearby buildings.",
      "Ask your electricity provider about connection approval.",
    ],
    photo: images.solar,
    icon: "sun",
    tagline: ["Put the Jaffna sun", "to work"],
    hero: { photo: images.heroSolar, focus: "56% 40%" },
    intro:
      "A solar installation depends on three things: a sound roof, clear sunlight and a system sized to the power you use. Looking at your electricity bills and your roof together is the place to start.",
    steps: [
      { title: "Assess", text: "Review past bills, roof strength, direction, shade and the existing wiring." },
      { title: "Design and apply", text: "Size the panels and inverter, and seek approval from the electricity provider." },
      { title: "Mount and connect", text: "Fix the panels without opening paths for rain, then make the electrical connections." },
      { title: "Test and hand over", text: "Check the output and safety cut-offs, and explain monitoring and cleaning." },
    ],
    questions: [
      { title: "Will solar work during a power cut?", text: "A grid-tied system normally shuts down for safety. Backup power needs a battery or hybrid system designed for it." },
      { title: "Should I repair the roof first?", text: "Yes. Panels can stay in place for decades, and lifting them later to replace a worn roof adds cost." },
    ],
  },
];

// The strip along each hero. Only confirmed facts: no durations, prices, deposits or warranties until the owner gives them.
export const heroFacts: Stat[] = [
  { label: "Experience", value: `${years.value} years` },
  { label: "Homes constructed", value: `Nearly ${homes.value}` },
  { label: "Based in", value: "Jaffna, Sri Lanka" },
  { label: "Under one company", value: `${services.length} home services` },
];

export const invitation = {
  title: "Tell us what needs doing",
  text: "A whole house or a single repair, it starts with a conversation.",
  link: { label: "Get in touch", href: "/contact" },
  photo: images.verandah,
};
