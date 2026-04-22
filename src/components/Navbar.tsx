import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X, ChevronDown, Clock, Radar, FileText, Headphones } from 'lucide-react';

const services = [
  { name: '24/7 Dispatch & After-Hours', desc: 'Full overnight coverage', href: '/services/dispatch', Icon: Clock },
  { name: 'Track & Trace', desc: 'Proactive load visibility', href: '/services/track-trace', Icon: Radar },
  { name: 'Billing & Invoice', desc: 'Stop the billing leaks', href: '/services/billing', Icon: FileText },
  { name: 'Customer Support', desc: 'Your brand, our squad, seamless', href: '/services/customer-support', Icon: Headphones },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const isBlog = location.pathname.startsWith('/blog');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');
  const isExactActive = (href: string) => location.pathname === href;

  const bgClass = scrolled || isBlog ? 'bg-navy border-b border-white/10' : 'bg-transparent';

  const handleDropdownTriggerEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDropdownOpen(true);
  };
  const handleDropdownTriggerLeave = () => {
    closeTimerRef.current = setTimeout(() => setDropdownOpen(false), 300);
  };
  const handleDropdownPanelEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };
  const handleDropdownPanelLeave = () => {
    closeTimerRef.current = setTimeout(() => setDropdownOpen(false), 300);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${bgClass}`}>
        <div className="max-w-350 mx-auto px-3 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="bg-transparent flex-shrink-0" style={{ background: 'transparent', padding: 0, border: 'none', boxShadow: 'none', borderRadius: 0 }}>
            <img src="/SkyFreightSquad_Logo_Horizontal_DarkBG.png" alt="SkyFreightSquad" className="w-auto object-contain h-8 sm:h-10" style={{ display: 'block' }} />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {/* Home */}
            <Link to="/" className={`text-sm font-medium transition-colors ${isExactActive('/') ? 'text-cta border-b-2 border-cta pb-0.5' : 'text-white/80 hover:text-white'}`}>Home</Link>

            {/* Services dropdown */}
            <div className="relative" onMouseEnter={handleDropdownTriggerEnter} onMouseLeave={handleDropdownTriggerLeave}>
              <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${location.pathname.startsWith('/services') ? 'text-cta' : 'text-white/80 hover:text-white'}`}>
                Services <ChevronDown className="w-3 h-3" />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute top-9 left-0 bg-navy-card rounded-xl p-3 border border-white/10 w-72 shadow-xl"
                  style={{ marginTop: 0, pointerEvents: 'auto' }}
                  onMouseEnter={handleDropdownPanelEnter}
                  onMouseLeave={handleDropdownPanelLeave}
                >
                  {services.map((s) => (
                    <Link key={s.href} to={s.href} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors" onClick={() => setDropdownOpen(false)}>
                      <s.Icon className="w-5 h-5 text-skyblue mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-white">{s.name}</div>
                        <div className="text-xs text-muted-gray">{s.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/how-it-works" className={`text-sm font-medium transition-colors ${isActive('/how-it-works') ? 'text-cta border-b-2 border-cta pb-0.5' : 'text-white/80 hover:text-white'}`}>How It Works</Link>
            <Link to="/pricing" className={`text-sm font-medium transition-colors ${isActive('/pricing') ? 'text-cta border-b-2 border-cta pb-0.5' : 'text-white/80 hover:text-white'}`}>Pricing</Link>
            <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-cta border-b-2 border-cta pb-0.5' : 'text-white/80 hover:text-white'}`}>About</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-cta border-b-2 border-cta pb-0.5' : 'text-white/80 hover:text-white'}`}>Contact</Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-block bg-cta text-white rounded-full px-6 py-2.5 font-bold text-sm hover:bg-cta-hover active:scale-[0.97] transition-all whitespace-nowrap">
              Book a Discovery Call →
            </a>
            <button className="md:hidden text-white" onClick={() => setMobileOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-navy flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between p-6">
              <img src="/SkyFreightSquad_Logo_Horizontal_DarkBG.png" alt="SkyFreightSquad" className="w-auto object-contain" style={{ height: '40px', display: 'block' }} />
              <button onClick={() => setMobileOpen(false)} className="text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex flex-col flex-1 px-6 gap-1 overflow-y-auto">
              <Link to="/" className="text-white/80 py-3 text-base font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center justify-between text-white/80 py-3 text-base font-medium">
                Services <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && services.map((s) => (
                <Link key={s.href} to={s.href} className="pl-4 py-2 text-sm text-muted-gray hover:text-white flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <s.Icon className="w-4 h-4 text-skyblue" /> {s.name}
                </Link>
              ))}
              <Link to="/how-it-works" className="text-white/80 py-3 text-base font-medium" onClick={() => setMobileOpen(false)}>How It Works</Link>
              <Link to="/pricing" className="text-white/80 py-3 text-base font-medium" onClick={() => setMobileOpen(false)}>Pricing</Link>
              <Link to="/about" className="text-white/80 py-3 text-base font-medium" onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/contact" className="text-white/80 py-3 text-base font-medium" onClick={() => setMobileOpen(false)}>Contact</Link>
            </div>
            <div className="p-6">
              <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="block w-full bg-cta text-white rounded-full py-4 font-bold text-sm text-center hover:bg-cta-hover transition-all">
                Book a Discovery Call →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
