import { getServiceHref } from "@/lib/routes";
import { services } from "./services";
import type { Contact, NavItem } from "./types";

export const site = {
  name: "Build Right",
  descriptor: "Home builders in Jaffna",
  location: "Jaffna, Sri Lanka",
  title: "Build Right | Home Builders in Jaffna, Sri Lanka",
  description:
    "Build Right is a home construction company in Jaffna, Sri Lanka, with 15 years of experience and nearly 60 homes built.",
  imageNotice: "Photos and drawings are illustrative and do not show Build Right projects.",
};

// Fill these in from docs/client-brief.md. Contact buttons appear once a value is set.
export const contact: Contact = { phone: null, whatsapp: null, email: null, address: null, hours: null };

export const navigation: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map(({ id, title }) => ({ label: title, href: getServiceHref(id) })),
  },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// The footer keeps "The Build", which the owner removed from the header only.
// The owner trimmed the header to the pages above. The homepage sections stay reachable from the footer.
export const footerLinks: NavItem[] = [
  ...navigation,
  { label: "The Build", href: "/#build" },
  { label: "Inspiration", href: "/#inspiration" },
  { label: "Process", href: "/#process" },
  { label: "Jaffna", href: "/#jaffna" },
  { label: "Guide", href: "/#guide" },
];
