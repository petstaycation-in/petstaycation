import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);

  // Focus management for accessibility
  useEffect(() => {
    // Focus first focusable element when menu opens
    if (menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    // Trap focus inside the modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
        ) || [];

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else { // Tab
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuRef.current) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div ref={menuRef} className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-all duration-300" />

      {/* Mobile Menu Content */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-screen w-full max-w-[400px] transform transition-transform duration-500 ease-in-out"
           style={{ transform: 'translateX(0)' }}>
        <div className="flex-1 flex flex-col bg-white/95 backdrop-sm border-l border-border/20 overflow-hidden">

          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-border/20 bg-white/98 backdrop-sm">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Image
                  src="/pstlogo.png"
                  alt="Pet Staycation Logo"
                  width={36}
                  height={36}
                  priority
                  loading="eager"
                />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xl font-bold tracking-tighter text-secondary">
                  Pet Staycation
                </h2>
                <p className="text-xs text-muted tracking-wider">
                  Premium Pet-Friendly Stays
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-surface/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-6 flex-1 flex-col overflow-y-auto px-6 pb-12 space-y-4">
            <Link
              href="/stays"
              ref={el => {
                if (el && !firstLinkRef.current) firstLinkRef.current = el;
                if (el) lastLinkRef.current = el;
              }}
              className={`
                flex items-center px-4 py-3 rounded-xl text-lg font-medium
                text-foreground hover:bg-primary hover:text-primary/90
                transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20
              `}
              aria-label="Stays page"
            >
              Stays
            </Link>
            <Link
              href="/destinations"
              ref={el => {
                if (!firstLinkRef.current) firstLinkRef.current = el;
                lastLinkRef.current = el;
              }}
              className={`
                flex items-center px-4 py-3 rounded-xl text-lg font-medium
                text-foreground hover:bg-primary hover:text-primary/90
                transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20
              `}
              aria-label="Destinations page"
            >
              Destinations
            </Link>
            <Link
              href="/blog"
              ref={el => {
                if (!firstLinkRef.current) firstLinkRef.current = el;
                lastLinkRef.current = el;
              }}
              className={`
                flex items-center px-4 py-3 rounded-xl text-lg font-medium
                text-foreground hover:bg-primary hover:text-primary/90
                transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20
              `}
              aria-label="Blog page"
            >
              Blog
            </Link>
            <Link
              href="/about"
              ref={el => {
                if (!firstLinkRef.current) firstLinkRef.current = el;
                lastLinkRef.current = el;
              }}
              className={`
                flex items-center px-4 py-3 rounded-xl text-lg font-medium
                text-foreground hover:bg-primary hover:text-primary/90
                transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20
              `}
              aria-label="About page"
            >
              About
            </Link>
            <Link
              href="/contact"
              ref={el => {
                if (!firstLinkRef.current) firstLinkRef.current = el;
                lastLinkRef.current = el;
              }}
              className={`
                flex items-center px-4 py-3 rounded-xl text-lg font-medium
                text-foreground hover:bg-primary hover:text-primary/90
                transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20
              `}
              aria-label="Contact page"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Section */}
          <div className="mt-auto px-6 pb-8 space-y-4">
            <Link
              href="/list-property"
              className={`
                flex items-center justify-center px-5 py-3.5 rounded-xl bg-primary text-white font-semibold
                text-lg hover:bg-primary/90 transition-all duration-200 transform hover:-translate-y-0.5
                shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20
              `}
              aria-label="List your property"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
