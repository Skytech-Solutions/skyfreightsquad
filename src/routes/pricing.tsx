import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollAnimation } from "../components/ScrollAnimation";
import { ComparisonTable } from "../components/home/ComparisonTable";
import { Check, ChevronDown, Clock, BarChart3, FileCheck, Shield, ClipboardList, User } from "lucide-react";

const BASE_URL = "https://skyfreightsquad.com";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Engagement | SkyFreightSquad — Freight Back-Office for Brokers & 3PLs" },
      { name: "description", content: "Simple, scalable freight back-office pricing for brokers and 3PLs. Start with a 7-day pilot — pay nothing if we don't deliver. Month-to-month after that. No lock-in." },
      { property: "og:title", content: "Pricing & Engagement | SkyFreightSquad — Freight Back-Office for Brokers & 3PLs" },
      { property: "og:description", content: "Simple, scalable freight back-office pricing for brokers and 3PLs. Start with a 7-day pilot — pay nothing if we don't deliver. Month-to-month after that. No lock-in." },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/pricing` }],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Starter",
    target: "For freight brokers testing outsourced back-office for the first time.",
    price: "From $2,400/mo",
    priceSub: "$10/hr · From $2,400/mo · Custom for larger scope",
    popular: false,
    features: [
      "One service covered (dispatch, T&T, billing, or support)",
      "8×5 or defined after-hours window",
      "1 dedicated coordinator on your account",
      "TMS and SOP integration included",
      "Weekly performance report",
    ],
    cta: "Start With a Pilot →",
    ctaStyle: "border-2 border-white text-white hover:bg-white hover:text-navy",
  },
  {
    name: "Growth",
    target: "For established brokerages and 3PLs with multi-function operational demand.",
    price: "Custom",
    priceSub: "Based on services and coverage hours",
    popular: true,
    features: [
      "Two to three services covered",
      "16×7 coverage hours",
      "Dedicated account manager",
      "Custom SLA definitions",
      "Exception reporting and escalation protocols",
      "Weekly operations review",
      "Priority response on all escalations",
    ],
    cta: "Start With a Pilot →",
    ctaStyle: "bg-cta text-white hover:bg-cta-hover",
  },
  {
    name: "Enterprise",
    target: "For high-volume 3PLs and multi-division freight operations.",
    price: "Custom",
    priceSub: "Strategic engagement — scoped to your operation",
    popular: false,
    features: [
      "All four services: dispatch, track & trace, billing, customer support",
      "24/7 full coverage including holidays",
      "Dedicated ops squad assigned to your account",
      "Priority 24-hour onboarding",
      "Executive reporting and QBR",
      "Multi-client workflow management",
      "Direct account lead available at all hours",
    ],
    cta: "Talk to Us →",
    ctaStyle: "border-2 border-white text-white hover:bg-white hover:text-navy",
  },
];

const inclusions = [
  { icon: Clock, title: "TMS access configuration", desc: "We configure access to your TMS during onboarding. No setup fee." },
  { icon: ClipboardList, title: "SOP integration", desc: "We learn your workflows before shift one. No training cost billed to you." },
  { icon: Shield, title: "Escalation protocol setup", desc: "Your escalation paths mapped and followed from day one." },
  { icon: FileCheck, title: "Daily activity documentation", desc: "Every action logged inside your TMS — full visibility at all times." },
  { icon: BarChart3, title: "Weekly performance report", desc: "KPIs tracked and reported weekly. You always know how the operation is performing." },
  { icon: User, title: "Dedicated account contact", desc: "A consistent point of contact on your account — not a support ticket queue." },
];

const faqs = [
  { q: "What does the 7-day pilot actually cost?", a: "The pilot is priced at the standard rate for your chosen service and coverage scope. If we don't deliver measurable results in the first 7 days — as defined by the specific KPIs agreed at onboarding — you pay nothing for the pilot. No partial charges, no setup fees, no questions asked." },
  { q: "What happens after the pilot?", a: "You decide whether to continue. If you do, you move to the month-to-month engagement at the same rate and coverage scope. There's no re-onboarding, no new contract negotiation — you're already live and the squad is already embedded in your systems." },
  { q: "Why is pricing custom rather than fixed?", a: "Because the right coverage for a 5-person brokerage covering overnight shifts is structurally different from the right coverage for a 30-person 3PL managing four client accounts 16×7. Custom pricing means you're paying for exactly what your operation needs — not a packaged bundle built around someone else's operation." },
  { q: "Is there a setup or onboarding fee?", a: "No. TMS access configuration, SOP review, and escalation protocol setup are included in every engagement. There are no setup fees, no training fees, and no costs outside the agreed monthly rate." },
  { q: "Can we add services mid-engagement?", a: "Yes. Most clients start with one service and expand as they see results. Adding a service doesn't require re-onboarding — the squad is already embedded in your systems, so expansion is a scope adjustment, not a new engagement." },
  { q: "What if we need to reduce scope or pause coverage?", a: "Scope adjustments are handled within your engagement with reasonable notice — typically one billing cycle. Because there's no long-term contract, you're never locked into a coverage level that doesn't match your current volume." },
  { q: "How is 'measurable results' defined for the pilot guarantee?", a: "It's defined specifically at onboarding based on your chosen service: 100% shift coverage with zero unaddressed tenders for dispatch, 95%+ check-in completion for track & trace, all invoices submitted within 24 hours of POD for billing, or 95%+ of inbound messages within your SLA window for customer support. These are agreed in writing before the pilot begins — there's no ambiguity about what qualifies." },
];

function PricingROICalculator() {
  const [loads, setLoads] = useState(100);
  const [staffing, setStaffing] = useState(8000);
  const [errorRate, setErrorRate] = useState(3.5);
  const [loadValue, setLoadValue] = useState(1800);

  const monthlyLoads = loads * 4.33;
  const billingLeakage = monthlyLoads * loadValue * (errorRate / 100) * 12;
  const staffingAnnual = staffing * 12;
  const totalCurrent = staffingAnnual + billingLeakage;
  const sfsCost = 38400;
  const savings = totalCurrent - sfsCost;
  const roi = sfsCost > 0 ? Math.round((savings / sfsCost) * 100) : 0;

  if (typeof window !== "undefined") {
    try { localStorage.setItem("sfq_roi_savings", String(savings)); } catch { /* noop */ }
  }

  const Slider = ({ label, value, min, max, step, onChange, display }: {
    label: string; value: number; min: number; max: number; step: number;
    onChange: (v: number) => void; display: string;
  }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-navy">{label}</label>
        <span className="text-xl font-bold text-cta">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
             onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  );

  return (
    <section className="bg-offwhite py-20">
      <div className="max-w-350 mx-auto px-5 md:px-6">
        <ScrollAnimation>
          <p className="text-xs uppercase tracking-[0.1em] text-cta text-center mb-3">ROI CALCULATOR</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">See Exactly What Your Back Office Is Costing You.</h2>
          <p className="text-base md:text-lg text-dim-gray text-center mb-12 max-w-xl mx-auto">
            Enter your operation details below. We'll show you what you're spending vs. what SkyFreightSquad costs.
          </p>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-8">
          <ScrollAnimation>
            <div className="bg-white rounded-2xl p-8 border border-soft-border">
              <h4 className="text-lg font-bold text-navy mb-6">Your current operation:</h4>
              <Slider label="Loads per week" value={loads} min={10} max={500} step={10} onChange={setLoads} display={`${loads} loads/week`} />
              <Slider label="After-hours staffing cost per month" value={staffing} min={1000} max={30000} step={500} onChange={setStaffing} display={`$${staffing.toLocaleString()}/mo`} />
              <Slider label="Estimated billing error rate" value={errorRate} min={0.5} max={10} step={0.5} onChange={setErrorRate} display={`${errorRate}%`} />
              <Slider label="Average load value" value={loadValue} min={500} max={5000} step={100} onChange={setLoadValue} display={`$${loadValue.toLocaleString()} per load`} />
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.1}>
            <div className="bg-navy rounded-2xl p-8 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-6">Your estimated annual cost:</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-gray">Your current back-office cost</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-cta">${Math.round(totalCurrent).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-gray">SkyFreightSquad annual cost</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-skyblue">${sfsCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-gray">Estimated Year 1 savings</p>
                  <p className="text-4xl md:text-5xl font-extrabold text-green-400">${Math.round(savings).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6 bg-green-700 rounded-full px-4 py-2 text-sm font-bold text-white text-center">
                {roi}% return on investment in Year 1
              </div>

              <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="mt-8 block w-full bg-cta text-white rounded-full px-8 py-4 font-bold text-sm text-center hover:bg-cta-hover active:scale-[0.97] transition-all">
                Book a Call to Get Your Custom Plan →
              </a>
              <p className="text-xs text-muted-gray mt-3 text-center">Based on industry averages. Your actual results reviewed on the discovery call.</p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

function PricingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="bg-navy pt-28 pb-20">
        <div className="max-w-350 mx-auto px-5 md:px-6 text-center">
          <ScrollAnimation>
            <p className="text-xs uppercase tracking-[0.15em] text-skyblue font-bold mb-4">SIMPLE, SCALABLE COVERAGE</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Start With a Pilot. Scale Without a Contract.</h1>
            <p className="text-lg md:text-xl text-muted-gray mb-6 max-w-2xl mx-auto leading-relaxed">
              Every engagement begins with a 7-day pilot — pay nothing if we don't deliver measurable results in your first week. After that, stay month-to-month with no lock-in.
            </p>
            <p className="text-base text-muted-gray mb-8 max-w-2xl mx-auto leading-relaxed">
              SkyFreightSquad is the only freight back-office built exclusively for brokers and 3PLs. You shouldn't have to sign a long-term contract to find out if it works. So you don't.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <span className="border border-white/20 text-white text-sm font-semibold rounded-full px-4 py-2 text-center">7-Day Pilot — pay nothing if results aren't delivered</span>
              <span className="border border-white/20 text-white text-sm font-semibold rounded-full px-4 py-2 text-center">Month-to-Month — no lock-in, cancel anytime</span>
            </div>
            <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block bg-cta text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-cta-hover active:scale-[0.97] transition-all">
              Start Your 7-Day Pilot →
            </a>
          </ScrollAnimation>
        </div>
      </section>

      {/* SECTION 2 — PRICING TIERS */}
      <section className="bg-navy py-24 border-t border-white/10">
        <div className="max-w-350 mx-auto px-5 md:px-6">
          <ScrollAnimation>
            <p className="text-xs uppercase tracking-[0.1em] text-skyblue text-center mb-3">COVERAGE TIERS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Three Tiers. One Consistent Standard.</h2>
            <p className="text-base text-muted-gray text-center mb-16 max-w-2xl mx-auto">
              Every tier runs inside your TMS, follows your SOPs, and operates to your SLAs. The tiers differ in coverage scope and hours — not in operational quality or the people on your account.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t, i) => (
              <ScrollAnimation key={t.name} delay={i * 0.1}>
                <div className={`bg-navy-card rounded-2xl p-8 hover:-translate-y-1 transition-all h-full flex flex-col ${
                  t.popular ? "border-2 border-skyblue shadow-[0_-4px_20px_rgba(45,170,225,0.15)]" : "border border-white/10"
                }`}>
                  {t.popular && (
                    <span className="bg-skyblue text-navy text-xs font-bold rounded-full px-3 py-1 mb-3 inline-block self-start">MOST POPULAR</span>
                  )}
                  <h4 className="text-xl font-bold text-white mb-2">{t.name}</h4>
                  <p className="text-sm text-muted-gray mb-6">{t.target}</p>
                  <div className="mb-2">
                    <span className={`text-3xl font-extrabold ${t.popular ? "text-skyblue" : "text-white"}`}>{t.price}</span>
                  </div>
                  <p className="text-sm text-muted-gray mb-6">{t.priceSub}</p>
                  <div className="border-t border-white/10 my-6" />
                  <div className="flex flex-col gap-3 flex-1">
                    {t.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${t.popular ? "text-skyblue" : "text-muted-gray"}`} />
                        <span className={`text-sm ${t.popular ? "text-white" : "text-muted-gray"}`}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className={`mt-8 w-full rounded-full py-4 font-bold text-sm text-center block transition-all ${t.ctaStyle}`}>
                    {t.cta}
                  </a>
                  <p className="text-xs text-muted-gray text-center mt-3">7-day pilot included</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-gray max-w-3xl mx-auto">
              All tiers start with a 7-day pilot. Pay nothing if we don't deliver measurable results in your first week. All paid engagements are month-to-month — no long-term contracts, no lock-in, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — NO HIDDEN COSTS */}
      <section className="bg-offwhite py-20">
        <div className="max-w-350 mx-auto px-5 md:px-6">
          <ScrollAnimation>
            <p className="text-xs uppercase tracking-[0.1em] text-cta text-center mb-3">EVERY ENGAGEMENT INCLUDES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">No Hidden Costs. No Surprise Add-Ons.</h2>
            <p className="text-base text-dim-gray text-center mb-12 max-w-2xl mx-auto">
              These are included in every SkyFreightSquad engagement at every tier — not charged separately, not unlocked at a higher price point.
            </p>
          </ScrollAnimation>

          <ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {inclusions.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-soft-border p-6 flex items-start gap-4">
                  <div className="w-10 h-10 bg-skyblue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-skyblue" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-navy mb-1">{item.title}</h4>
                    <p className="text-sm text-dim-gray">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* SECTION 4 — ROI CALCULATOR */}
      <PricingROICalculator />

      {/* SECTION 5 — COMPARISON TABLE */}
      <ComparisonTable />

      {/* SECTION 6 — PRICING FAQ */}
      <section className="bg-offwhite py-20">
        <div className="max-w-350 mx-auto px-5 md:px-6">
          <ScrollAnimation>
            <p className="text-xs uppercase tracking-[0.1em] text-skyblue text-center mb-3">PRICING QUESTIONS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">The Questions We Get Asked Most About Pricing</h2>
          </ScrollAnimation>

          <ScrollAnimation>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-navy/10 py-5">
                  <button
                    onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
                    className="flex justify-between items-center w-full text-left cursor-pointer"
                  >
                    <span className="text-base font-semibold text-navy pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-dim-gray flex-shrink-0 transition-transform duration-200 ${activeIndex === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${activeIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-base text-dim-gray pt-3 pb-2 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* SECTION 7 — CLOSING CTA */}
      <section className="bg-navy py-20 text-center">
        <div className="max-w-350 mx-auto px-5 md:px-6">
          <ScrollAnimation>
            <p className="text-xs uppercase tracking-[0.15em] text-cta font-bold mb-4">READY TO START?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5">One 45-Minute Call. Live Within 48 Hours.</h2>
            <p className="text-base md:text-lg text-muted-gray mb-8 leading-relaxed">
              The discovery call is where we map your operation, define the pilot scope, and set the measurable results criteria. From there, you're live within 48 hours. If the results aren't there after 7 days, you pay nothing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <span className="border border-white/20 text-white text-sm font-semibold rounded-full px-4 py-2 text-center">7-Day Pilot — pay nothing if we don't deliver</span>
              <span className="border border-white/20 text-white text-sm font-semibold rounded-full px-4 py-2 text-center">Month-to-month after pilot — cancel anytime</span>
            </div>
            <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block bg-cta text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-cta-hover active:scale-[0.97] transition-all">
              Book Your Discovery Call →
            </a>
            <p className="text-sm text-muted-gray mt-5 max-w-lg mx-auto">No pitch. No pressure. A 45-minute conversation about your operation and what better looks like.</p>
          </ScrollAnimation>
        </div>
      </section>
    </>
  );
}
