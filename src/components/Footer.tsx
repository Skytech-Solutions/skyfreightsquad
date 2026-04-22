import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/[0.08] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="bg-transparent" style={{ background: 'transparent', padding: 0, border: 'none', boxShadow: 'none', borderRadius: 0 }}>
              <img src="/SkyFreightSquad_Logo_Horizontal_DarkBG.png" alt="SkyFreightSquad" className="w-auto object-contain" style={{ height: '36px', display: 'block' }} />
            </div>
            <p className="text-sm text-muted-gray mt-3 max-w-[220px]">
              Always On. Always Accurate. Built exclusively for freight brokers and 3PL operators.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-muted-gray hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" className="text-muted-gray hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-gray mb-4">SERVICES</h4>
            <div className="flex flex-col gap-3">
              <Link to="/services/dispatch" className="text-sm text-muted-gray hover:text-white hover:underline underline-offset-4 transition-colors">24/7 Dispatch</Link>
              <Link to="/services/track-trace" className="text-sm text-muted-gray hover:text-white hover:underline underline-offset-4 transition-colors">Track & Trace</Link>
              <Link to="/services/billing" className="text-sm text-muted-gray hover:text-white hover:underline underline-offset-4 transition-colors">Billing</Link>
              <Link to="/services/customer-support" className="text-sm text-muted-gray hover:text-white hover:underline underline-offset-4 transition-colors">Customer Support</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-gray mb-4">COMPANY</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-muted-gray hover:text-white hover:underline underline-offset-4 transition-colors">About</Link>
              <Link to="/how-it-works" className="text-sm text-muted-gray hover:text-white hover:underline underline-offset-4 transition-colors">How It Works</Link>
              <Link to="/pricing" className="text-sm text-muted-gray hover:text-white hover:underline underline-offset-4 transition-colors">Pricing</Link>
              <Link to="/blog" className="text-sm text-muted-gray hover:text-white hover:underline underline-offset-4 transition-colors">Blog</Link>
              <Link to="/contact" className="text-sm text-muted-gray hover:text-white hover:underline underline-offset-4 transition-colors">Contact</Link>
              <Link to="/careers" className="text-sm text-muted-gray hover:text-white hover:underline underline-offset-4 transition-colors">Careers</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-gray mb-4">GET IN TOUCH</h4>
            <a href="tel:+1XXXXXXXXXX" className="text-white font-semibold text-sm">+1 (XXX) XXX-XXXX</a>
            <p className="text-xs text-muted-gray mt-1">Mon–Fri · 7am–7pm CST</p>
            <a href="mailto:hello@skyfreightsquad.com" className="text-sm text-skyblue mt-3 block hover:underline">hello@skyfreightsquad.com</a>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-white font-medium">We respond within 1 business hour.</span>
            </div>
            <div className="mt-6 flex gap-3">
              <span className="border border-white/20 rounded-full px-3 py-1 text-xs text-white">BBB Accredited</span>
              <span className="border border-white/20 rounded-full px-3 py-1 text-xs text-white">SOC 2 Aligned</span>
            </div>
          </div>
        </div>

        {/* GEO */}
        <p className="mt-12 text-xs text-[#94A3B8] text-center max-w-2xl mx-auto">
          Serving freight brokers and 3PL operators across all US time zones — Chicago, Dallas, Atlanta, Los Angeles, New York, and nationwide.
        </p>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex justify-between flex-wrap gap-4 text-xs text-muted-gray">
          <span>© 2025 SkyFreightSquad. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
