import { Link } from '@tanstack/react-router';
import { ScrollAnimation } from '../ScrollAnimation';
import { Clock, Radar, FileText, Headphones } from 'lucide-react';

const cards = [
  {
    Icon: Clock, href: '/services/dispatch' as const,
    title: '24/7 Dispatch & After-Hours Coverage',
    oneLiner: "Loads move even when you're offline.",
  },
  {
    Icon: Radar, href: '/services/track-trace' as const,
    title: 'Track & Trace / Exception Management',
    oneLiner: 'No load goes dark. No exception goes unresolved.',
  },
  {
    Icon: FileText, href: '/services/billing' as const,
    title: 'Billing & Invoice Processing',
    oneLiner: 'Stop the billing leaks.',
  },
  {
    Icon: Headphones, href: '/services/customer-support' as const,
    title: 'Customer Support & Queue Triage',
    oneLiner: 'Your brand. Our squad. Seamless.',
  },
];

export function ServicesCards() {
  return (
    <section id="services" className="bg-offwhite py-24">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollAnimation>
          <p className="text-xs uppercase tracking-[0.1em] text-cta text-center mb-3">FOUR FUNCTIONS. ONE SQUAD.</p>
          <h2 className="text-4xl font-bold text-navy text-center mb-4">Everything Your Back-Office Needs. None of the Overhead.</h2>
          <p className="text-lg text-dim-gray text-center mb-16 max-w-xl mx-auto">SkyFreightSquad runs four core back-office functions — embedded inside your existing TMS and SOPs.</p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((c, i) => (
            <ScrollAnimation key={c.title} delay={i * 0.1}>
              <Link to={c.href} className="group block bg-white border border-soft-border rounded-2xl p-8 transition-all hover:-translate-y-0.5 hover:border-l-4 hover:border-l-cta h-full">
                <c.Icon className="w-8 h-8 text-skyblue mb-6" />
                <h3 className="text-2xl font-bold text-navy mb-3">{c.title}</h3>
                <p className="text-base text-dim-gray leading-relaxed mb-6">{c.oneLiner}</p>
                <span className="text-cta text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <span>→</span>
                </span>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
