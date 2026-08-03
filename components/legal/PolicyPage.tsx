import type { ReactNode } from "react";
import Link from "next/link";

export function PolicyPage({ title, summary, children }: { title: string; summary: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Pet Staycation policy</p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">{summary}</p>
      <p className="mt-3 text-sm text-slate-500">Last updated: 18 July 2026</p>
      <div className="mt-10 space-y-8 text-base leading-8 text-slate-700 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">{children}</div>
      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        Questions may be sent to <a className="font-semibold text-primary underline" href="mailto:petstaycationindia@gmail.com">petstaycationindia@gmail.com</a> or discussed through our <Link className="font-semibold text-primary underline" href="/contact">contact page</Link>.
      </div>
    </article>
  );
}
