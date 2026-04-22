import { useEffect, useRef, useState } from 'react';
import { ScrollAnimation } from '../ScrollAnimation';

interface MetricTile {
  beforeValue: number;
  afterValue: number;
  beforeLabel: string;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  afterDisplay?: string;
  greenOnZero?: boolean;
}

function AnimatedMetric({ tile }: { tile: MetricTile }) {
  const [current, setCurrent] = useState(tile.beforeValue);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const dur = 1500;
        const from = tile.beforeValue;
        const to = tile.afterValue;
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / dur, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = from + (to - from) * eased;
          setCurrent(val);
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDone(true);
          }
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [tile.beforeValue, tile.afterValue]);

  const progress = started.current ? (current - tile.beforeValue) / (tile.afterValue - tile.beforeValue || 1) : 0;
  const isGreenTarget = tile.greenOnZero && done;
  const colorClass = isGreenTarget ? 'text-green-400' : progress > 0.5 ? 'text-skyblue' : 'text-amber-400';

  const formatted = tile.afterDisplay && done
    ? tile.afterDisplay
    : `${tile.prefix || ''}${tile.decimals ? current.toFixed(tile.decimals) : Math.round(current).toLocaleString()}${tile.suffix || ''}`;

  return (
    <div ref={ref} className="bg-navy-card rounded-xl p-6 border border-white/[0.08]">
      <span className={`text-4xl font-extrabold ${colorClass} block`} style={{ transition: 'color 1000ms ease-in-out' }}>
        {formatted}
      </span>
      <p className="text-sm text-muted-gray mt-1">{tile.label}</p>
      <p className="text-xs text-muted-gray italic mt-1">(was {tile.beforeLabel})</p>
    </div>
  );
}

interface CaseStudyProps {
  location: string;
  body: string;
  quote: string;
  attribution: string;
  metrics: MetricTile[];
}

export function AnimatedCaseStudy({ location, body, quote, attribution, metrics }: CaseStudyProps) {
  return (
    <section className="bg-navy py-20">
      <div className="max-w-350 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollAnimation>
            <p className="text-xs uppercase tracking-wider text-skyblue mb-3">CLIENT RESULT</p>
            <h3 className="text-2xl font-bold text-white mb-4">{location}</h3>
            <p className="text-base text-muted-gray mb-8 max-w-md leading-relaxed">{body}</p>
            <blockquote className="text-lg text-white italic border-l-[3px] border-cta pl-6">
              "{quote}"
            </blockquote>
            <p className="text-sm text-muted-gray mt-4">— {attribution}</p>
          </ScrollAnimation>

          <div className="flex flex-col gap-4">
              {metrics.map((m, i) => (
                <ScrollAnimation key={m.label} delay={0.15 + i * 0.3} duration={0.8}>
                  <AnimatedMetric tile={m} />
                </ScrollAnimation>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}
