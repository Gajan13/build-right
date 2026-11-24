import type { Metadata } from "next";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { PageHero } from "@/components/sections/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  channels,
  enquiryNeeds,
  form,
  intro,
  metadata as pageMetadata,
  nextSteps,
} from "@/content/contact";
import { isEnquiryEmailReady } from "@/lib/server/enquiry";
import { submitEnquiry } from "./actions";

export const metadata: Metadata = pageMetadata;

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={intro.breadcrumb}
        current={pageMetadata.title}
        eyebrow={intro.eyebrow}
        title={intro.title}
        text={intro.text}
        link={intro.link}
        photo={intro.photo}
      />

      <section
        aria-labelledby="channels-title"
        className="shell py-20 md:py-28"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-20">
          <div>
            <h2
              id="channels-title"
              className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-tight"
            >
              {intro.channelsTitle}
            </h2>
            <dl className="reveal-each mt-8 border-t border-line">
              {channels.map((channel) => (
                <div
                  key={channel.label}
                  className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-line py-4 sm:grid-cols-[8rem_minmax(0,1fr)]"
                >
                  <dt className="pt-0.5 text-sm text-muted">{channel.label}</dt>
                  <dd>
                    {channel.value && channel.href ? (
                      <a
                        href={channel.href}
                        className="font-semibold underline-offset-4 hover:underline"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <span
                        className={
                          channel.value
                            ? "font-semibold"
                            : "font-semibold text-muted"
                        }
                      >
                        {channel.value ?? intro.pending}
                      </span>
                    )}
                    {channel.note && (
                      <span className="mt-0.5 block text-sm text-muted">
                        {channel.note}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The jump target stays still, so "Send a request" lands exactly here. */}
          <div id="request">
            <div className="reveal">
              <EnquiryForm
                action={submitEnquiry}
                needs={enquiryNeeds}
                isOpen={isEnquiryEmailReady()}
                labels={form}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="next-steps-title"
        className="shell pb-20 md:pb-28"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-20">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow>{nextSteps.eyebrow}</Eyebrow>
            <h2
              id="next-steps-title"
              className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight font-semibold tracking-tight text-balance"
            >
              {nextSteps.title}
            </h2>
          </div>
          <p className="text-pretty text-muted">{nextSteps.text}</p>
        </div>
        <ol className="reveal-each mt-10 border-t border-line">
          {nextSteps.steps.map((step) => (
            <li
              key={step.title}
              className="grid gap-1 border-b border-line py-5 md:grid-cols-[9rem_16rem_minmax(0,1fr)] md:gap-6"
            >
              <span className="text-sm text-muted">{step.label}</span>
              <h3 className="font-display text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
