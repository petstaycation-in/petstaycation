import Link from "next/link";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className="hidden md:block">
      <div className="pointer-events-none fixed inset-0 z-40"></div>

      <div className="fixed right-0 top-0 z-50 w-full max-w-xs h-screen bg-beige/95 backdrop-blur-sm border-l border-beige/20 transform animate-slide-in pointer-events-auto">
        <div className="flex h-full flex-col">
          <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-beige/20">
            <span className="text-xl font-bold text-forest-green">Pet Staycation</span>
            <button
              onClick={onClose}
              className="rounded-md p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="mt-6 flex-1 flex-col overflow-y-auto px-6 pb-8">
            <Link
              href="/stays"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-beige/50 hover:text-forest-green transition-colors"
            >
              Stays
            </Link>
            <Link
              href="/destinations"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-beige/50 hover:text-forest-green transition-colors mt-2"
            >
              Destinations
            </Link>
            <Link
              href="/blog"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-beige/50 hover:text-forest-green transition-colors mt-2"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-beige/50 hover:text-forest-green transition-colors mt-2"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-beige/50 hover:text-bg-primary transition-colors mt-2"
            >
              Contact
            </Link>
            <Link
              href="/list-property"
              className="flex items-center px-3 py-2 rounded-md bg-bg-primary text-white mt-2"
            >
              List Your Property
            </Link>
            <Link
              href="/admin"
              className="flex items-center px-3 py-2 rounded-md bg-gray-800 text-white mt-2"
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}