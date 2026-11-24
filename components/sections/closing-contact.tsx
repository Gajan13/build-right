import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import type { Contact, Photo } from "@/content/types";
import { getContactLinks } from "@/lib/contact";

type Props = { title: string; text: string; pending: string; photo: Photo; contact: Contact };

export function ClosingContact({ title, text, pending, photo, contact }: Props) {
  const links = getContactLinks(contact);
  return (
    <section id="contact" aria-labelledby="contact-title" className="shell pb-20 md:pb-28">
      <div className="relative isolate flex min-h-96 items-end overflow-hidden rounded bg-night text-white md:min-h-128">
        <Image src={photo.src} alt="" fill sizes="(min-width: 768px) 100vw, 180vw" className="-z-20 object-cover object-[60%_60%]" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-night/95 via-night/65 to-night/15" />
        <div className="reveal flex max-w-2xl flex-col items-start gap-5 p-6 md:p-12">
          <h2 id="contact-title" className="title">
            {title}
          </h2>
          <p className="text-lg text-sand">{text}</p>
          {links.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <ButtonLink key={link.href} {...link} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-sand/85">{pending}</p>
          )}
          {contact.address && <address className="text-sand not-italic">{contact.address}</address>}
        </div>
      </div>
    </section>
  );
}
