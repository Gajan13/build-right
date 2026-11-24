// Server only: reads the email settings and sends enquiries. Import it from server actions and Server Components,
// never from a "use client" file.
import { emptyEnquiry, enquiryLimits, type EnquiryField, type EnquiryState, type EnquiryValues } from "@/lib/enquiry";

type EmailConfig = { apiKey: string; to: string; from: string };

/** The one place that reads the variables documented in .env.example. Null until the owner sets them. */
function getEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.ENQUIRY_TO?.trim();
  if (!apiKey || !to) return null;
  // Resend's shared address works for testing before the owner's domain is verified.
  return { apiKey, to, from: process.env.ENQUIRY_FROM?.trim() || "Build Right website <onboarding@resend.dev>" };
}

export function isEnquiryEmailReady() {
  return getEmailConfig() !== null;
}

const read = (formData: FormData, field: string) => {
  const value = formData.get(field);
  // Collapse control characters so a value can't add lines to the email headers or subject.
  return typeof value === "string" ? value.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, " ").trim() : "";
};

export function validateEnquiry(formData: FormData, allowedNeeds: string[]) {
  const values: EnquiryValues = {
    name: read(formData, "name"),
    phone: read(formData, "phone"),
    email: read(formData, "email"),
    area: read(formData, "area"),
    need: read(formData, "need"),
    message: read(formData, "message"),
  };
  const errors: Partial<Record<EnquiryField, string>> = {};
  const { name, phone, email, area, message } = enquiryLimits;

  if (values.name.length < name.min) errors.name = "Please enter your name.";
  else if (values.name.length > name.max) errors.name = `Please keep your name under ${name.max} characters.`;

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone) errors.phone = "Please enter a phone number we can call.";
  else if (!/^\+?[\d\s()-]+$/.test(values.phone) || digits.length < phone.min || values.phone.length > phone.max)
    errors.phone = "Please enter a phone number using digits, for example 077 123 4567.";

  if (values.email && (values.email.length > email.max || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)))
    errors.email = "Please check your email address, or leave it empty.";

  if (values.area.length > area.max) errors.area = `Please keep this under ${area.max} characters.`;
  if (!allowedNeeds.includes(values.need)) errors.need = "Please choose what you need.";
  if (values.message.length > message.max) errors.message = `Please keep your message under ${message.max} characters.`;

  return { values, errors };
}

/** Sends one enquiry. Returns the outcome only, and never logs what the visitor wrote. */
export async function sendEnquiry(values: EnquiryValues): Promise<EnquiryState["status"]> {
  const config = getEmailConfig();
  if (!config) return "unavailable";

  const text = [
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email || "not given"}`,
    `Area: ${values.area || "not given"}`,
    `Needs: ${values.need}`,
    "",
    values.message || "(No message)",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        ...(values.email && { reply_to: values.email }),
        subject: `Website request: ${values.need}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) return "sent";
    console.error(`Enquiry email was rejected with status ${response.status}.`);
    return "failed";
  } catch (error) {
    console.error(`Enquiry email could not be sent: ${error instanceof Error ? error.name : "unknown error"}.`);
    return "failed";
  }
}

export const keepValues = (values: EnquiryValues): EnquiryValues => ({ ...emptyEnquiry, ...values });
