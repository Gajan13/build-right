import type { Contact, Link } from "@/content/types";

export function getContactLinks({ phone, whatsapp, email }: Contact): Link[] {
  const links: Link[] = [];
  if (whatsapp) links.push({ label: "Message on WhatsApp", href: `https://wa.me/${whatsapp.replace(/\D/g, "")}` });
  if (phone) links.push({ label: `Call ${phone}`, href: `tel:${phone.replace(/[^\d+]/g, "")}` });
  if (email) links.push({ label: "Send an email", href: `mailto:${email}` });
  return links;
}
