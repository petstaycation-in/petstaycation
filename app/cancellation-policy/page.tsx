import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata = { title: "Cancellation Policy | Pet Staycation", description: "How cancellation and refund terms are confirmed for Pet Staycation bookings.", alternates: { canonical: "/cancellation-policy" } };

export default function CancellationPolicyPage() {
  return <PolicyPage title="Cancellation Policy" summary="Cancellation terms differ by property and rate. The terms in your written booking proposal are the terms that apply to your reservation.">
    <section><h2>Before payment</h2><p>Your availability proposal will state the cancellation window, refund eligibility, date-change rules, payment schedule and any non-refundable amount. Please do not pay until you have reviewed and accepted those terms.</p></section>
    <section><h2>Cancellation requests</h2><p>Send cancellation requests through the same verified email or WhatsApp channel used for booking. A cancellation is effective only when acknowledged in writing. The property&apos;s stated cut-off time and local timezone apply.</p></section>
    <section><h2>Refunds and changes</h2><p>Eligible refunds are returned through the original payment method where practical, less any disclosed non-refundable charges. Bank and provider processing times may apply. Date changes, early departure, no-shows and reductions in rooms or guests may be treated as cancellations under the confirmed property terms.</p></section>
    <section><h2>Exceptional events</h2><p>Weather, transport disruption, illness and other exceptional circumstances do not automatically create a refund right. We will help discuss reasonable alternatives with the property, but outcomes remain subject to the confirmed terms and applicable law.</p></section>
  </PolicyPage>;
}
