import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Link from "next/link";

export const metadata = {
  title: "Pet Travel Journal | Pet Staycation",
  description: "Evidence-led planning notes for travelling with your dog from Jaipur and enquiring about Marubhoomi Pushkar.",
  alternates: { canonical: "https://petstaycation.in/blog" },
};

const posts = [
  {
    category: "Jaipur travel guide",
    title: "Where Can I Travel With My Dog From Jaipur?",
    summary: "Start with the destination and stay details that can actually be verified for your dates.",
    body: "Pushkar is the documented destination currently available in this journal. For a useful enquiry, share your travel dates, guest count, pet count, pet type and breed or type. The Marubhoomi Pushkar baseline records weekday INR 4,000, weekend INR 5,500, long weekend INR 6,000, a 30% advance and complimentary pets. These details still require reconfirmation before booking or payment.",
  },
  {
    category: "Marubhoomi Pushkar",
    title: "Marubhoomi Pushkar: What to Confirm Before You Book",
    summary: "A short checklist for turning a pet-stay enquiry into a clear written proposal.",
    body: "Ask for current availability, the available room or unit, guest capacity, pet rules, cancellation terms and the current tariff. The operating baseline says pets are complimentary and the advance is 30%, but those points should appear in the written confirmation for your dates before any payment.",
  },
  {
    category: "Marubhoomi Pushkar",
    title: "A Simple Marubhoomi Pushkar Rate Check",
    summary: "Use the documented weekday, weekend and long-weekend baselines as a starting point, not a final quote.",
    body: "The current working baseline is INR 4,000 on a weekday, INR 5,500 on a weekend and INR 6,000 on a long weekend. Rates are treated as historical or unverified until reconfirmed, so send dates and pet details through the enquiry form to request the exact current quote.",
  },
  {
    category: "Marubhoomi Pushkar",
    title: "How to Send a Booking-Ready Marubhoomi Enquiry",
    summary: "The details that help the team ask the property one clear question the first time.",
    body: "Include check-in and check-out dates, adults, children, number of pets, pet type, breed or type, preferred unit if known, meal plan, budget and any special requirements. The form records your source and notes privately so the team can qualify the request and track the next booking step without exposing internal commission information.",
  },
];

export default function BlogPage() {
  return <Container>
    <SectionHeading title="Pet Travel Journal" description="Planning notes based on documented property information, with reconfirmation prompts wherever details may have changed." />
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => <article key={post.title} className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-[.18em] text-primary">{post.category}</span>
        <h2 className="mt-3 font-['Libre_Baskerville'] text-2xl font-semibold text-slate-900">{post.title}</h2>
        <p className="mt-3 font-medium leading-7 text-slate-700">{post.summary}</p>
        <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{post.body}</p>
        <Link href="/stays/1#booking" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-secondary">Enquire about Marubhoomi</Link>
      </article>)}
    </div>
  </Container>;
}
