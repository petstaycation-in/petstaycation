"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Memoize toggle function to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  // Determine active route for navigation links
  const isActive = useMemo(
    () => (href: string) => pathname === href || (href === "/" && pathname === ""),
    [pathname]
  );

  return (
    <>
      <nav
        className={`
          bg-surface/90
          backdrop-blur-sm
          ${isScrolled ? "bg-surface/80 backdrop-blur-md" : "bg-surface/95"}
          border-b
          border-border/20
          sticky
          top-0
          z-50
          transition-all
          duration-300
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Brand Logo */}
            <div className="min-w-0 flex items-center space-x-2 sm:space-x-3">
              <Link href="/" className="flex items-center">
                <Image
                  src="/pstlogo.png"
                  alt="Pet Staycation Logo"
                  width={48}
                  height={48}
                  priority
                  loading="eager"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="min-w-0 space-y-1">
                <p className="whitespace-nowrap text-xl font-bold tracking-tighter sm:text-2xl">
                  <span className="text-secondary">Pet</span>{" "}
                  <span className="text-accent">Staycation</span>
                </p>
                <p className="hidden text-xs text-muted tracking-wider min-[360px]:block">
                  Premium Pet-Friendly Stays
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {/* Navigation Links */}
              <div className="flex space-x-6">
                <Link
                  href="/stays"
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${isActive("/stays")
                      ? "bg-primary text-surface"
                      : "text-foreground hover:text-primary"}
                    transition-all duration-200
                    hover:bg-primary/5
                  `}
                  aria-label="Stays page"
                >
                  Stays
                </Link>
                <Link
                  href="/destinations"
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${isActive("/destinations")
                      ? "bg-primary text-surface"
                      : "text-foreground hover:text-primary"}
                    transition-all duration-200
                    hover:bg-primary/5
                  `}
                  aria-label="Destinations page"
                >
                  Destinations
                </Link>
                <Link
                  href="/blog"
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${isActive("/blog")
                      ? "bg-primary text-surface"
                      : "text-foreground hover:text-primary"}
                    transition-all duration-200
                    hover:bg-primary/5
                  `}
                  aria-label="Blog page"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${isActive("/about")
                      ? "bg-primary text-surface"
                      : "text-foreground hover:text-primary"}
                    transition-all duration-200
                    hover:bg-primary/5
                  `}
                  aria-label="About page"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${isActive("/contact")
                      ? "bg-primary text-surface"
                      : "text-foreground hover:text-primary"}
                    transition-all duration-200
                    hover:bg-primary/5
                  `}
                  aria-label="Contact page"
                  >
                  Contact
                </Link>
              </div>

              {/* CTA Buttons */}
              <div className="flex space-x-3">
                <Link
                  href="/list-property"
                  className="flex items-center px-5 py-2.5 rounded-xl bg-primary text-surface font-semibold text-sm hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  aria-label="List your property"
                >
                  List Your Property
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="ml-2 flex shrink-0 items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="p-3 rounded-xl bg-surface/80 hover:bg-surface/70 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                aria-label="Toggle mobile navigation menu"
              >
                {isOpen ? (
                  <svg className="h-6 w-6 text-muted transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <MobileMenu onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
