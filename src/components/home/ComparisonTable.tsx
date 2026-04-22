import { ScrollAnimation } from '../ScrollAnimation';
import { Check, X, AlertTriangle } from 'lucide-react';

const rows = [
  { label: 'Monthly cost', bad: '$6,000–$12,000+ per person (salary, benefits, payroll taxes)', good: 'From $2,400/mo — or $10/hr for custom scope', badType: 'warn' },
  { label: 'Coverage hours', bad: '8 hrs/day, 5 days/week — gaps every night and weekend', good: '24/7/365 — every shift, zero gaps', badType: 'bad' },
  { label: 'Freight expertise', bad: 'General ops hire — months to learn your TMS and freight workflows', good: 'Freight-only squad — pre-trained on McLeod, Aljex, Rose Rocket, and your SOPs', badType: 'bad' },
  { label: 'Time to live', bad: '4–8 weeks (job post + interviews + hire + onboard)', good: '48 hours from signed agreement', badType: 'bad' },
  { label: 'Sick days & turnover', bad: 'Your problem — uncovered shifts, rehiring costs, retraining time', good: 'Our problem — coverage never gaps', badType: 'bad' },
  { label: 'Scalability', bad: 'New hire required to scale — another 4–8 week cycle', good: 'Scale up or down the same week — no hiring cycle', badType: 'bad' },
  { label: 'Entry risk', bad: 'Employment contract + severance risk if it doesn\'t work out', good: '7-Day Pilot — pay nothing if we don\'t deliver results', badType: 'warn' },
  { label: 'Ongoing commitment', bad: 'Permanent headcount — hard to unwind', good: 'Month-to-month — no lock-in, cancel anytime', badType: 'warn' },
  { label: 'Billing error recovery', bad: 'Depends on individual skill and attention under pressure', good: 'Systematic review — 3–5% of billing recovered that would otherwise be lost', badType: 'bad' },
];

export function ComparisonTable() {
  return (
    <section className="bg-offwhite py-12 md:py-24">
      <div className="max-w-350 mx-auto px-5 md:px-6">
        <ScrollAnimation>
          <p className="text-xs uppercase tracking-[0.1em] text-cta text-center mb-3">THE REAL COST COMPARISON</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">Thinking about hiring instead? Read this first.</h2>
          <p className="text-base md:text-lg text-dim-gray text-center mb-12 md:mb-16 max-w-xl mx-auto">Every freight broker considers building in-house. Here's what it actually costs — versus a squad built exclusively for freight brokers and 3PLs, live inside your TMS in 48 hours.</p>
        </ScrollAnimation>

        <ScrollAnimation>
          {/* Desktop table */}
          <div className="hidden md:block max-w-6xl mx-auto bg-white rounded-2xl border border-soft-border overflow-hidden">
            <div className="grid grid-cols-3 bg-navy p-4 items-center">
              <span className="text-sm font-bold text-muted-gray uppercase tracking-wider">Comparison</span>
              <span className="text-sm font-bold text-muted-gray text-center uppercase">Hiring In-House</span>
              <span className="text-sm font-bold text-skyblue text-center uppercase">SkyFreightSquad</span>
            </div>
            {rows.map((r, i) => (
              <div key={r.label} className={`grid grid-cols-3 gap-4 p-5 items-center hover:bg-offwhite transition-colors ${i < rows.length - 1 ? 'border-b border-soft-border' : ''}`}>
                <span className="text-sm font-semibold text-navy">{r.label}</span>
                <div className="text-center flex items-center justify-center gap-1.5">
                  {r.badType === 'bad' ? <X className="w-4 h-4 text-red-500 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />}
                  <span className={`text-sm font-medium ${r.badType === 'bad' ? 'text-red-600' : 'text-amber-600'}`}>{r.bad}</span>
                </div>
                <div className="text-center flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-green-700 font-bold">{r.good}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile stacked cards */}
          <div className="md:hidden flex flex-col gap-4">
            {rows.map((r) => (
              <div key={r.label} className="bg-white rounded-xl border border-soft-border p-4">
                <p className="text-sm font-bold text-navy mb-3">{r.label}</p>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-muted-gray uppercase mb-1">In-House</p>
                    <div className="flex items-start gap-1">
                      {r.badType === 'bad' ? <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />}
                      <span className={`text-xs font-medium ${r.badType === 'bad' ? 'text-red-600' : 'text-amber-600'}`}>{r.bad}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-gray uppercase mb-1">SkyFreightSquad</p>
                    <div className="flex items-start gap-1">
                      <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-green-700 font-bold">{r.good}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block w-full md:w-auto bg-cta text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-cta-hover active:scale-[0.97] transition-all">
              Stop comparing. Start your 7-day pilot →
            </a>
            <p className="text-sm text-dim-gray mt-3">Pay nothing if we don't deliver measurable results in your first week.</p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
