import { images } from "./images";
import { services } from "./services";
import { contact } from "./site";

// Wording only. The contact values themselves live in content/site.ts and are still TODO in docs/client-brief.md.
export const metadata = {
  title: "Contact",
  description: "Get in touch with Build Right, home builders in Jaffna, Sri Lanka, about a new house, a repair or any other work.",
};

export const intro = {
  breadcrumb: [{ label: "Home", href: "/" }],
  eyebrow: "Contact",
  title: "Start your home, or just ask",
  text: "Tell us about your land, your house or the problem you have noticed. Every question is welcome, however early your plans are.",
  pending: "Coming soon",
  link: { label: "Send a request", href: "#request" },
  photo: images.contactDoorway,
  channelsTitle: "Ways to reach us",
};

export const channels = [
  { label: "Call", value: contact.phone, href: contact.phone && `tel:${contact.phone.replace(/[^\d+]/g, "")}`, note: "Speak to us directly" },
  {
    label: "WhatsApp",
    value: contact.whatsapp,
    href: contact.whatsapp && `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`,
    note: "Photos of the house or problem are welcome",
  },
  { label: "Email", value: contact.email, href: contact.email && `mailto:${contact.email}`, note: "Drawings and documents are welcome" },
  { label: "Address", value: contact.address, href: null, note: "Jaffna, Sri Lanka" },
  { label: "Hours", value: contact.hours, href: null, note: null },
];

// The form's choices. The server action only accepts these.
export const enquiryNeeds = [...services.map(({ title }) => title), "Something else"];

export const form = {
  title: "Send us a request",
  fields: {
    name: "Name",
    phone: "Phone",
    email: "Email",
    area: "Area or town",
    need: "What do you need?",
    message: "Tell us more",
  },
  optional: "optional",
  submit: "Send request",
  sending: "Sending…",
  privacy: "We use your details only to reply to this request.",
  closed: {
    title: "Online requests open soon",
    text: "This form will start sending once our contact details are confirmed. Please check back shortly.",
  },
  invalid: "Please check the highlighted fields.",
  failed: "Sorry, your request could not be sent. Please try again in a few minutes.",
  sent: { title: "Thank you, your request has been sent", text: "We will be in touch using the details you gave us." },
};

// General steps only: no reply times, visit lengths or price validity until the owner confirms them.
export const nextSteps = {
  eyebrow: "What happens next",
  title: "After you send a request",
  text: "The same simple steps, whether you are planning a whole house or fixing a single leak.",
  steps: [
    { label: "Step 1", title: "We get in touch", text: "We contact you to talk through what you need and answer your first questions." },
    { label: "Step 2", title: "We look at the site", text: "Where it helps, we visit your land or house to see the work for ourselves." },
    { label: "Step 3", title: "You get clear advice", text: "We explain what we found and the options, in plain words." },
    { label: "Step 4", title: "You decide", text: "If you want to go ahead, we agree the work, the cost and the timing with you." },
  ],
};
