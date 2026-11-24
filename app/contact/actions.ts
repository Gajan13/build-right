"use server";

import { enquiryNeeds } from "@/content/contact";
import { emptyEnquiry, type EnquiryState } from "@/lib/enquiry";
import { keepValues, sendEnquiry, validateEnquiry } from "@/lib/server/enquiry";

// Anyone can call a server action directly, so everything is checked here, not only in the browser.
export async function submitEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // A hidden field people never see. Bots that fill it get a normal-looking reply and nothing is sent.
  if (formData.get("company")) return { status: "sent", errors: {}, values: emptyEnquiry };

  const { values, errors } = validateEnquiry(formData, enquiryNeeds);
  if (Object.keys(errors).length) return { status: "invalid", errors, values: keepValues(values) };

  const status = await sendEnquiry(values);
  return { status, errors: {}, values: status === "sent" ? emptyEnquiry : keepValues(values) };
}
