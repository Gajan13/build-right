# Add a form

Forms are tier 1.

1. Confirm the fields, where submissions go, retention and consent wording. Without a delivery destination,
   stop and ask: never fake success.
2. Read the installed guides on forms and data security.
3. Collect only the fields that are needed, each with a visible label and `autocomplete`.
4. Write the server action. Validate type, length and format on the server, and limit abuse.
5. Keep credentials in server-only variables. Never log field values or put them in a URL.
6. Show pending, success and error states, announce them accessibly and keep input after an error.
7. Test valid, invalid, oversized, repeated and failed delivery with test data.
8. Run `npm run check -- --full`, then a deep review and owner approval.
