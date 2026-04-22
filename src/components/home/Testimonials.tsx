import { ScrollAnimation } from '../ScrollAnimation';

const testimonials = [
  {
    quote: 'We stopped losing Friday-night loads within the first week. SkyFreightSquad had our McLeod SOPs configured before the first shift even started. That level of freight-specific knowledge isn\'t something you find at a generalist BPO.',
    initials: 'JM', name: 'James M.',
    role: 'Operations Director, Mid-Size Freight Brokerage — Chicago, IL',
  },
  {
    quote: 'Finally a back-office team that actually knows what a rate confirmation is. They were handling exceptions independently by day three. Our morning reports are clean for the first time in two years.',
    initials: 'SK', name: 'Sarah K.',
    role: 'VP Operations, Regional 3PL — Dallas, TX',
  },
  {
    quote: 'The billing alone paid for the service. They caught $14,000 in accessorial overbilling in the first 30 days. That\'s not back-office support — that\'s ROI.',
    initials: 'MD', name: 'Marcus D.',
    role: 'Owner, Independent Freight Brokerage — Atlanta, GA',
  },
];

export function Testimonials() {
  return (
    <section className="bg-navy py-24">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollAnimation>
          <p className="text-xs uppercase tracking-[0.1em] text-skyblue text-center mb-3">CLIENT RESULTS</p>
          <h2 className="text-4xl font-bold text-white text-center mb-16">What Freight Brokers and 3PLs Say After 90 Days</h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollAnimation key={t.name} delay={i * 0.1}>
              <div className="bg-navy-card border border-white/[0.08] rounded-2xl p-8 relative overflow-hidden transition-all hover:border-b-2 hover:border-b-cta h-full flex flex-col">
                <span className="absolute top-3 right-4 text-8xl text-skyblue/[0.08] font-black leading-none pointer-events-none select-none">"</span>
                <div className="text-cta text-sm mb-4">★★★★★</div>
                <p className="italic text-lg text-white leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-skyblue/20 text-skyblue font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{t.name}</div>
                      <div className="text-xs text-muted-gray mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-16 flex justify-center gap-6 flex-wrap">
          {['McLeod Certified', 'DAT Partner', 'BBB Accredited', 'SOC 2 Aligned'].map((b) => (
            <span key={b} className="border border-white/15 rounded-full px-4 py-2 text-xs text-white">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}