import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Link from "next/link";

export const metadata = {
  title: "Pet Travel Journal | Pet Staycation",
  description: "Evidence-led planning notes for travelling with your dog from Jaipur and enquiring about Maru Retreat Farmstay.",
  alternates: { canonical: "https://petstaycation.in/blog" },
};

const posts = [
  {
    category: "Jaipur travel guide",
    title: "Where Can I Travel With My Dog From Jaipur?",
    summary: "Start with the destination and stay details that can actually be verified for your dates.",
    body: "Pushkar is the documented destination currently available in this journal. For a useful enquiry, share your travel dates, guest count, pet count, pet type and breed or type. Maru Retreat Farmstay rates start from INR 4,999 per night for one villa, two adults and Stay Only. The form estimates each travel night separately, and Petstaycation reconfirms availability and tariff before payment. Pets stay complimentary.",
  },
  {
    category: "Maru Retreat Farmstay",
    title: "Maru Retreat Farmstay: What to Confirm Before You Book",
    summary: "A short checklist for turning a pet-stay enquiry into a clear written proposal.",
    body: "Ask for current availability, the available room or unit, guest capacity, pet rules, cancellation terms and the current tariff. The operating baseline says pets are complimentary and the advance is 30%, but those points should appear in the written confirmation for your dates before any payment.",
  },
  {
    category: "Maru Retreat Farmstay",
    title: "A Simple Maru Retreat Farmstay Rate Check",
    summary: "Select your dates, stay option and meal plan for a useful estimate before requesting the final quote.",
    body: "The public starting tariff is INR 4,999 per night for one villa, two adults and Stay Only on a normal weekday. Rates vary night by night for weekends and special dates, while stay options, extra adults and meal plans can change the estimate. Petstaycation will reconfirm the final availability and tariff before payment.",
  },
  {
    category: "Maru Retreat Farmstay",
    title: "How to Send a Booking-Ready Maru Retreat Farmstay Enquiry",
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
        <Link href="/stays/1#booking" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-secondary">Enquire about Maru Retreat Farmstay</Link>
      </article>)}
    </div>
  </Container>;
}
