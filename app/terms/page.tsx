import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata = { title: "Terms of Use | Pet Staycation", description: "Terms governing use of Pet Staycation and its enquiry services.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <PolicyPage title="Terms of Use" summary="These terms apply when you browse Pet Staycation, submit an enquiry or ask us to introduce you to a property.">
    <section><h2>Our role</h2><p>Pet Staycation provides travel discovery, enquiry assistance and introductions to independent accommodation providers. Property availability, final price, inclusions, rules and booking acceptance must be confirmed in writing before payment.</p></section>
    <section><h2>Your responsibilities</h2><ul><li>Provide accurate guest, pet, contact and travel information.</li><li>Review the property&apos;s final offer, pet rules and cancellation terms.</li><li>Supervise pets and comply with safety, hygiene and damage policies.</li><li>Use the website lawfully and avoid automated abuse or interference.</li></ul></section>
    <section><h2>Content and availability</h2><p>We aim to keep property information accurate, but facilities, prices, activities and policies may change. Photographs are illustrative of the identified property and seasonal conditions may differ. An enquiry is not a confirmed booking.</p></section>
    <section><h2>Payments and third parties</h2><p>Payment instructions, taxes and refund terms are supplied with the final booking proposal. Third-party properties, maps, messaging services and payment providers operate under their own terms. Never pay using account details that have not been verified through an official Pet Staycation channel.</p></section>
    <section><h2>Liability</h2><p>Nothing in these terms excludes liability that cannot lawfully be excluded. Subject to that, Pet Staycation is not responsible for indirect loss, pet behaviour, travel disruption, or acts and omissions of independent properties and service providers.</p></section>
    <section><h2>Law and changes</h2><p>These terms are governed by applicable Indian law. Disputes should first be raised with us for good-faith resolution. Updated terms apply from the date published on this page.</p></section>
  </PolicyPage>;
}
