import { Link } from '@tanstack/react-router';
import { ScrollAnimation } from '../ScrollAnimation';

const steps = [
  {
    day: 'STEP 1 / DAY 1',
    title: 'Discovery Call',
    desc: '45-minute session. We map your TMS, SOPs, escalation rules, and coverage gaps. No commitment.',
  },
  {
    day: 'STEP 2 / DAY 2',
    title: 'Custom Coverage Plan',
    desc: 'We build your tailored operations plan: services, coverage hours, escalation paths, TMS workflows. Nothing templated.',
  },
  {
    day: 'STEP 3 / DAY 3',
    title: 'TMS Access & SOP Review',
    desc: 'Role-based TMS access configured. SOPs reviewed and mapped. Operating correctly from shift one — not learning on your loads.',
  },
  {
    day: 'STEP 4 / DAYS 4–5',
    title: '7-Day Pilot — Live Operations',
    desc: 'Your squad goes live inside your active workflows. Real loads. Real coverage. Pay nothing if results aren\'t delivered.',
  },
  {
    day: 'STEP 5 / DAY 8+',
    title: 'Performance Review & Ongoing Coverage',
    desc: 'We walk through results together. If you continue, you\'re already live — no re-onboarding, no ramp-up.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-offwhite py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimation>
          <p className="text-xs uppercase tracking-[0.1em] text-cta text-center mb-3">THE PROCESS</p>
          <h2 className="text-4xl font-bold text-navy text-center mb-4">From First Call to Live Operations in 48 Hours.</h2>
          <p className="text-lg text-dim-gray text-center mb-16 max-w-2xl mx-auto">
            No lengthy implementations. No disruption to active operations. One structured path from first conversation to full coverage.
          </p>
        </ScrollAnimation>

        <div className="relative">
          {/* Desktop horizontal dotted line through circle centers */}
          <div
            className="hidden lg:block absolute left-0 right-0 border-t-2 border-dotted border-cta/50 z-0"
            style={{ top: 'calc(1.5rem + 28px)' }}
            aria-hidden="true"
          />
          {/* Mobile vertical dotted line */}
          <div className="lg:hidden absolute top-8 bottom-8 left-7 border-l-2 border-dotted border-cta/50 z-0" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 relative z-10">
            {steps.map((s, i) => (
              <ScrollAnimation key={s.title} delay={i * 0.1}>
                <div className="flex lg:flex-col items-start lg:items-center text-left lg:text-center gap-4 lg:gap-0">
                  <p className="hidden lg:block text-[11px] uppercase tracking-wider font-bold text-cta mb-3 h-6">{s.day}</p>
                  <div className="w-14 h-14 bg-cta rounded-full flex items-center justify-center text-white font-black text-xl ring-4 ring-offwhite shrink-0 relative z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1 lg:mt-5">
                    <p className="lg:hidden text-[11px] uppercase tracking-wider font-bold text-cta mb-1">{s.day}</p>
                    <h3 className="text-lg font-bold text-navy mb-2">{s.title}</h3>
                    <p className="text-sm text-dim-gray leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/how-it-works"
            className="inline-block bg-cta text-white rounded-full px-8 py-4 font-bold text-base hover:bg-cta-hover active:scale-[0.97] transition-all"
          >
            See the Full Process →
          </Link>
          <p className="mt-4 text-sm text-dim-gray">Average onboarding: 48 hours from signed agreement to live coverage.</p>
        </div>
      </div>
    </section>
  );
}
