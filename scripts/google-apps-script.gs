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
    if (sheet.getLastRow() === 0) sheet.appendRow(["Received", "Type", "Name", "Email", "Phone", "Subject", "Details", "Consent"]);

    const details = JSON.stringify(payload.details || {});
    const fingerprint = Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, [payload.type, payload.email, payload.subject, details].join("|")));
    const cache = CacheService.getScriptCache();
    if (cache.get(fingerprint)) return json({ ok: true, duplicate: true });
    sheet.appendRow([payload.receivedAt || new Date().toISOString(), safe(payload.type), safe(payload.name), safe(payload.email), safe(payload.phone), safe(payload.subject), safe(details), payload.privacyConsent === true ? "Yes" : "No"]);

    const body = Object.entries(payload.details || {}).map(([key, value]) => `${key}: ${safe(value)}`).join("\n");
    MailApp.sendEmail({ to: NOTIFICATION_EMAIL, replyTo: safe(payload.email), subject: `[Pet Staycation] ${safe(payload.subject)}`, body: `New ${safe(payload.type)} enquiry\n\nName: ${safe(payload.name)}\nEmail: ${safe(payload.email)}\nPhone: ${safe(payload.phone)}\n\n${body}` });
    cache.put(fingerprint, "1", 600);
    return json({ ok: true });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: "Delivery failed" });
  }
}

function safe(value) {
  const text = String(value == null ? "" : value).replace(/[<>\u0000-\u001f]/g, " ").slice(0, 5000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
