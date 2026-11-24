// Shared by the form and the server action. Holds no secrets, so the browser may load it.

export const enquiryLimits = {
  name: { min: 2, max: 80 },
  phone: { min: 7, max: 20 },
  email: { max: 120 },
  area: { max: 80 },
  message: { max: 2000 },
};

export type EnquiryField = "name" | "phone" | "email" | "area" | "need" | "message";
export type EnquiryValues = Record<EnquiryField, string>;

export type EnquiryState = {
  status: "idle" | "invalid" | "sent" | "failed" | "unavailable";
  errors: Partial<Record<EnquiryField, string>>;
  /** What the visitor typed, so nothing is lost after an error. Empty after a successful send. */
  values: EnquiryValues;
};

export const emptyEnquiry: EnquiryValues = { name: "", phone: "", email: "", area: "", need: "", message: "" };
export const initialEnquiryState: EnquiryState = { status: "idle", errors: {}, values: emptyEnquiry };
