import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900">This page has wandered off.</h1>
      <p className="mt-4 text-slate-600">The stay or destination may no longer be available at this address.</p>
      <Link href="/stays" className="mt-8 rounded-full bg-primary px-6 py-3 font-semibold text-white">Browse pet-friendly stays</Link>
    </main>
  );
}
