"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-surface/90 backdrop-blur-sm border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3">
  <Image
  src="/pstlogo.png"
  alt="Pet Staycation"
  width={46}
  height={46}
  priority
/>

<h1
  className="text-[30px] font-semibold whitespace-nowrap tracking-tight"
  style={{ fontFamily: "'Libre Baskerville', serif" }}
>
  <span style={{ color: "#005D74" }}>Pet</span>{" "}
  <span style={{ color: "#D4A373" }}>Staycation</span>
</h1>
</Link>
  </div>
  <div className="hidden md:flex md:items-center md:space-x-6">
  <Link href="/stays" className="text-foreground hover:text-primary transition-colors">
  Stays
  </Link>
  <Link href="/destinations" className="text-foreground hover:text-primary transition-colors">
   Destinations
  </Link>
  <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
   Blog
   </Link>
   <Link href="/about" className="text-foreground hover:text-primary transition-colors">
   About
   </Link>
   <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
   Contact
   </Link>
   <Link href="/list-property" className="bg-primary text-surface px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
   List Your Property
   </Link>
   <Link href="/admin" className="bg-muted/20 text-muted px-4 py-2 rounded-md text-sm font-medium hover:bg-muted/30 transition-colors">
   Admin
   </Link>
   </div>
   <div className="flex items-center md:hidden">
   <button
    onClick={() => setIsOpen(!isOpen)}
    className="rounded-md p-2 text-muted hover:text-foreground focus:outline-none"
    aria-controls="mobile-menu"
    aria-expanded={isOpen}
    >
    {isOpen ? (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
    ) : (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
     )}
     </button>
     </div>
      </div>
      </div>
      </nav>

      {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
    </>
  );
}