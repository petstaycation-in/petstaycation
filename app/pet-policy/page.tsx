import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata = { title: "Pet Policy | Pet Staycation", description: "General responsibilities and property-specific rules for travelling with pets.", alternates: { canonical: "/pet-policy" } };

export default function PetPolicyPage() {
  return <PolicyPage title="Pet Policy" summary="Pet-friendly does not mean every property has identical rules. The property-specific policy confirmed with your booking always takes priority.">
    <section><h2>Information required</h2><p>Please disclose the number, species, breed, age, approximate weight, vaccination status, temperament and relevant medical or accessibility needs of every pet before booking.</p></section>
    <section><h2>Pet-parent responsibilities</h2><ul><li>Keep vaccinations and identification current.</li><li>Supervise pets and follow leash or restricted-area rules.</li><li>Clean up waste and prevent nuisance, damage or unsafe interaction.</li><li>Bring food, medication, bedding and other essentials unless confirmed otherwise.</li><li>Notify us promptly about incidents, damage or illness.</li></ul></section>
    <section><h2>Property rules and charges</h2><p>Properties may set limits on pet numbers, types, sizes, furniture, pools, dining areas and unattended pets. A pet fee, cleaning charge or refundable security deposit may apply only where disclosed with the booking proposal.</p></section>
    <section><h2>Safety and welfare</h2><p>Pet parents remain responsible for their pet&apos;s wellbeing and behaviour. Outdoor, farm, livestock, wildlife, pool and village environments require appropriate supervision. Seek local veterinary help immediately in an emergency.</p></section>
  </PolicyPage>;
}
