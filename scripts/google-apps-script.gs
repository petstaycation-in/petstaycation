const SHEET_NAME = "Enquiries";
const NOTIFICATION_EMAIL = "petstaycationindia@gmail.com";

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (!expectedSecret || payload.secret !== expectedSecret) return json({ ok: false, error: "Unauthorized" });

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
    const headers = ["Received", "Type", "Name", "Email", "Phone", "Subject", "Property / Destination", "Travel Dates", "Guest Count", "Pet Count", "Pet Details", "Budget", "Source", "Enquiry Status", "Booking Value", "Commission", "Ravindra Share", "Payment Status", "Notes", "Details", "Consent"];
    ensureHeaders(sheet, headers);

    const details = JSON.stringify(payload.details || {});
    const fingerprint = Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, [payload.type, payload.email, payload.subject, details].join("|")));
    const cache = CacheService.getScriptCache();
    if (cache.get(fingerprint)) return json({ ok: true, duplicate: true });
    const values = {
      "Received": payload.receivedAt || new Date().toISOString(), "Type": payload.type, "Name": payload.name, "Email": payload.email, "Phone": payload.phone, "Subject": payload.subject,
      "Property / Destination": payload.details?.property || payload.details?.selectedProperty || "", "Travel Dates": [payload.details?.checkIn, payload.details?.checkOut].filter(Boolean).join(" to "), "Guest Count": [payload.details?.adults, payload.details?.children].filter(Boolean).join(" adults, ") + (payload.details?.children ? " children" : ""), "Pet Count": payload.details?.pets || payload.details?.numberOfPets || "", "Pet Details": [payload.details?.petType, payload.details?.breed || payload.details?.petBreedType].filter(Boolean).join(" / "), "Budget": payload.details?.budget || "", "Source": payload.details?.source || "Website", "Enquiry Status": payload.details?.enquiryStatus || "New", "Booking Value": payload.details?.bookingValue || "", "Commission": payload.details?.commission || "", "Ravindra Share": payload.details?.ravindraShare || "", "Payment Status": payload.details?.paymentStatus || "Not started", "Notes": payload.details?.notes || payload.details?.specialRequirements || "", "Details": details, "Consent": payload.privacyConsent === true ? "Yes" : "No"
    };
    const row = headers.map((header) => safe(values[header]));
    sheet.appendRow(row);

    const body = Object.entries(payload.details || {}).map(([key, value]) => `${key}: ${safe(value)}`).join("\n");
    MailApp.sendEmail({ to: NOTIFICATION_EMAIL, replyTo: safe(payload.email), subject: `[Pet Staycation] ${safe(payload.subject)}`, body: `New ${safe(payload.type)} enquiry\n\nName: ${safe(payload.name)}\nEmail: ${safe(payload.email)}\nPhone: ${safe(payload.phone)}\n\n${body}` });
    cache.put(fingerprint, "1", 600);
    return json({ ok: true });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: "Delivery failed" });
  }
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    return;
  }
  const existing = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  const missing = headers.filter((header) => existing.indexOf(header) === -1);
  if (missing.length) sheet.getRange(1, existing.length + 1, 1, missing.length).setValues([missing]);
}

function safe(value) {
  const text = String(value == null ? "" : value).replace(/[<>\u0000-\u001f]/g, " ").slice(0, 5000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
