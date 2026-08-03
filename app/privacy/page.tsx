import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata = { title: "Privacy Policy | Pet Staycation", description: "How Pet Staycation collects, uses, stores and protects enquiry information.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <PolicyPage title="Privacy Policy" summary="This policy explains how Pet Staycation handles information submitted while planning a stay or listing a property.">
    <section><h2>Information we collect</h2><p>We may collect your name, email address, telephone number, city, travel dates, guest and pet details, property information, enquiry messages, consent records, technical security data and communication history.</p></section>
    <section><h2>How we use information</h2><ul><li>To respond to enquiries and recommend suitable stays.</li><li>To coordinate with relevant accommodation partners.</li><li>To send transactional email and WhatsApp communications requested by you.</li><li>To manage leads in our database and customer relationship system.</li><li>To prevent spam, fraud and misuse and to maintain service security.</li><li>To meet legal, accounting and dispute-resolution obligations.</li></ul></section>
    <section><h2>Sharing and processors</h2><p>Information may be shared with the property relevant to your enquiry and with contracted providers that host our website, database, email, CRM, security or analytics services. We do not sell personal information. Providers are permitted to process information only for the service they supply to us.</p></section>
    <section><h2>Retention and security</h2><p>Enquiry records are retained only while reasonably required for booking support, follow-up, legal obligations and dispute handling. Access is restricted to authorised personnel. No internet service is completely secure, but we use appropriate access controls, validation and service-provider safeguards.</p></section>
    <section><h2>Your choices</h2><p>You may request access, correction or deletion of your information, withdraw optional marketing consent, or object to non-essential processing by contacting us. Some records may be retained where required by law or to protect legitimate legal interests.</p></section>
    <section><h2>Children and updates</h2><p>Our enquiry services are intended for adults. Please do not submit personal information about a child beyond what is necessary to plan occupancy. Material policy changes will be posted here with a revised date.</p></section>
  </PolicyPage>;
}
