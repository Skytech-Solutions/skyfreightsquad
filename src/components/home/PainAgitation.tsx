import { ScrollAnimation } from '../ScrollAnimation';
import { Moon, AlertTriangle, PhoneOff } from 'lucide-react';

const cards = [
  {
    Icon: Moon,
    title: 'Missed loads after 5 PM',
    body: 'Every tender that goes unanswered after business hours is revenue that didn\'t materialize. Freight doesn\'t stop at 5 PM. Your coverage shouldn\'t either.',
  },
  {
    Icon: AlertTriangle,
    title: 'Billing errors and DSO creep',
    body: 'Invoice errors, missing PODs, and unworked short pays don\'t just delay payment — they quietly drain cash flow and signal operational unreliability to your customers.',
  },
  {
    Icon: PhoneOff,
    title: 'Internal teams stretched past capacity',
    body: 'Your operations staff shouldn\'t be chasing check calls, correcting TMS statuses, or clearing support queues at midnight. But without dedicated back-office coverage, that\'s exactly where their time goes.',
  },
];

export function PainAgitation() {
  return (
    <section className="bg-navy py-24">
      <div className="max-w-350 mx-auto px-6">
        <ScrollAnimation>
          <p className="text-xs uppercase tracking-[0.1em] text-cta text-center mb-4">THE HIDDEN COST OF YOUR CURRENT SETUP</p>
          <h2 className="text-4xl font-bold text-white text-center mb-4 max-w-2xl mx-auto">
            Every Freight Brokerage Hits the Same Three Walls
          </h2>
          <p className="text-base text-muted-gray text-center max-w-2xl mx-auto mb-4">
            It doesn't matter how strong your commercial team is. If the back-office can't keep up, the operation stalls. These are the three places it always breaks — and the three places SkyFreightSquad is specifically built to fix.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {cards.map((c, i) => (
            <ScrollAnimation key={c.title} delay={i * 0.1}>
              <div className="bg-navy-card rounded-2xl p-8 border-l-4 border-cta rounded-l-none h-full">
                <div className="w-12 h-12 bg-cta/[0.12] rounded-full flex items-center justify-center mb-4 animate-icon-pulse" style={{ animationDelay: `${i * 400}ms` }}>
                  <c.Icon className="w-6 h-6 text-cta" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{c.title}</h3>
                <p className="text-base text-muted-gray leading-relaxed">{c.body}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}