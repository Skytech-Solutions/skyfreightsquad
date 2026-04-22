import { useEffect, useRef, useState } from 'react';
import { ScrollAnimation } from '../ScrollAnimation';
import { Phone, AlertTriangle, Clock, FileText } from 'lucide-react';

const tiles = [
  { icon: Phone, value: 4847, label: 'Check calls completed', color: 'text-skyblue', border: 'border-t-skyblue', suffix: '', decimals: 0 },
  { icon: AlertTriangle, value: 312, label: 'Exceptions resolved', color: 'text-cta', border: 'border-t-cta', suffix: '', decimals: 0 },
  { icon: Clock, value: 0, label: 'Coverage, 365 days including weekends and holidays', color: 'text-skyblue', border: 'border-t-skyblue', suffix: '', decimals: 0, display: '24/7' },
  { icon: FileText, value: 1203, label: 'Invoices processed', color: 'text-cta', border: 'border-t-cta', suffix: '', decimals: 0 },
];

function CountUp({ target, className, suffix, decimals, display }: { target: number; className: string; suffix: string; decimals: number; display?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (display) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const duration = 1500;
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(eased * target);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, display]);

  if (display) {
    return <span ref={ref} className={className}>{display}</span>;
  }

  const formatted = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString();

  return <span ref={ref} className={className}>{formatted}{suffix}</span>;
}

export function LiveOpsCounter() {
  return (
    <section className="bg-offwhite py-16">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollAnimation>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-cta text-center mb-3">BUILT ON REAL FREIGHT OPERATIONS</p>
          <h2 className="text-3xl font-bold text-navy text-center mb-12">What Our Squad Handled This Week</h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tiles.map((t, i) => (
            <ScrollAnimation key={t.label} delay={i * 0.1}>
              <div className={`bg-white rounded-2xl p-6 sm:p-8 text-center border border-soft-border border-t-[3px] ${t.border} flex flex-row sm:flex-col items-center sm:items-center gap-4 sm:gap-0 h-full`}>
                <t.icon className={`w-7 h-7 ${t.color} sm:mx-auto sm:mb-4 flex-shrink-0`} />
                <div className="flex flex-col sm:items-center">
                  <CountUp target={t.value} className={`text-3xl sm:text-5xl font-extrabold ${t.color} whitespace-nowrap`} suffix={t.suffix} decimals={t.decimals} display={t.display} />
                  <p className="text-sm text-muted-gray mt-1 sm:mt-2 text-left sm:text-center">{t.label}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <p className="text-center text-xs text-dim-gray mt-8">Updated every Monday. Real numbers from real operations.</p>
      </div>
    </section>
  );
}
