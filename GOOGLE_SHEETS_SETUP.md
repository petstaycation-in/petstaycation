# Google Sheets enquiry CRM setup

The website is already configured to send validated enquiries to a private Google Sheet and email `petstaycationindia@gmail.com`. The CRM sheet has been created at https://docs.google.com/spreadsheets/d/1qy-Ca0k-ILxxKM9OpBRB5IELNMRc97lLLqX5LsuvzKg/edit. Complete the remaining account-owner steps once before deployment.

1. Open the existing private **Pet Staycation Enquiry CRM** Sheet linked above. Its spreadsheet ID is `1qy-Ca0k-ILxxKM9OpBRB5IELNMRc97lLLqX5LsuvzKg` and its configured tab is `Enquiries`.
2. Visit [script.google.com](https://script.google.com), create a standalone project, and paste in the complete contents of `scripts/google-apps-script.gs`.
3. Open **Project Settings → Script properties** and add:
   - `SPREADSHEET_ID`: `1qy-Ca0k-ILxxKM9OpBRB5IELNMRc97lLLqX5LsuvzKg`.
   - `WEBHOOK_SECRET`: a randomly generated secret of at least 32 characters.
4. Choose **Deploy → New deployment → Web app**.
5. Set **Execute as** to yourself and access to **Anyone**. The shared secret is independently verified by the script before any row or email is created.
6. Authorise access to the selected Sheet and permission to send notification email.
7. Copy the deployed `/exec` URL.
8. Add these server-only environment variables to the hosting project:
   - `GOOGLE_SHEETS_WEBHOOK_URL`: the deployed `/exec` URL.
   - `GOOGLE_SHEETS_WEBHOOK_SECRET`: the same secret stored in Script properties.
9. Redeploy the website, submit one labelled test enquiry, then confirm:
   - a row appears in the `Enquiries` tab;
   - an email arrives at `petstaycationindia@gmail.com`;
   - replying to the notification targets the guest email;
   - WhatsApp opens only after storage succeeds.
   - repeating the identical submission within ten minutes does not create another row or email.

Never commit the deployed URL or secret. `.env*` is ignored by Git; `.env.example` contains names only.
