import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-surface pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="mb-4 text-xl font-bold text-surface">Pet Staycation</h3>
            <p className="text-surface/80">
              Pet-friendly stays across Rajasthan&apos;s most
              magnificent destinations.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-semibold text-white">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/stays"
                  className="hover:text-surface transition-colors"
                >
                  Stays
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="hover:text-surface transition-colors"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-surface transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-semibold text-white">About</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-surface transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-surface transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li><Link href="/privacy" className="hover:text-surface transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-surface transition-colors">Terms of Use</Link></li>
              <li><Link href="/cancellation-policy" className="hover:text-surface transition-colors">Cancellation Policy</Link></li>
              <li><Link href="/pet-policy" className="hover:text-surface transition-colors">Pet Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-semibold text-white">Contact</h4>
            <div className="flex flex-col gap-2">
              <a href="tel:+919649088717" className="hover:text-surface/80 transition-colors">+91 96490 88717</a>
              <a href="mailto:petstaycationindia@gmail.com" className="break-all hover:text-surface/80 transition-colors">petstaycationindia@gmail.com</a>
              <a href="https://www.instagram.com/petstaycation.in" target="_blank" rel="noreferrer" className="hover:text-surface/80 transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 pt-8 text-center text-surface/60 text-sm">
          © {new Date().getFullYear()} Pet Staycation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
