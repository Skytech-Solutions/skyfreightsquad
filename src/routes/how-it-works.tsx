import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ScrollAnimation } from "../components/ScrollAnimation";
import { Check } from "lucide-react";

const BASE_URL = "https://skyfreightsquad.com";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How SkyFreightSquad Works | From First Call to Live in 48 Hours" },
      { name: "description", content: "See how SkyFreightSquad goes from discovery call to live freight back-office operations in 48 hours. 7-day pilot. No contracts. Embedded in your TMS and SOPs." },
      { property: "og:title", content: "How SkyFreightSquad Works | From First Call to Live in 48 Hours" },
      { property: "og:description", content: "See how SkyFreightSquad goes from discovery call to live freight back-office operations in 48 hours." },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/how-it-works` }],
  }),
  component: HowItWorksPage,
});

type Step = {
  label: string;
  title: string;
  body?: string;
  twoCol?: { provide: string[]; receive: string[] };
};

const steps: Step[] = [
  {
    label: "STEP 1 —",
    title: "Discovery Call (45 minutes)",
    twoCol: {
      provide: [
        "Current TMS access details",
        "Your SOPs or verbal walkthrough",
        "Coverage hours and escalation rules",
      ],
      receive: [
        "Coverage gap analysis",
        "Custom operations plan",
        "Pricing scoped to your volume",
      ],
    },
  },
  {
    label: "STEP 2 —",
    title: "Custom Coverage Plan (24 hours)",
    body: "Based on the discovery call, we build a tailored operations plan: which services, which coverage hours, which escalation paths, which TMS workflows. Nothing templated from another client's operation. Everything is mapped to how your business actually runs.",
  },
  {
    label: "STEP 3 —",
    title: "TMS Access & SOP Review (same day)",
    body: "We get role-based TMS access approved by your organization, review your SOPs and load management processes, and map your carrier communication standards. This is where most outsourcing engagements fail — we spend real time here so we're operating correctly from shift one, not learning on your loads.",
  },
  {
    label: "STEP 4 —",
    title: "7-Day Pilot (live operations)",
    body: "Your SkyFreightSquad squad goes live inside your active workflows. Your operation doesn't pause while we ramp up — we integrate without disruption. For 7 days, you see exactly what a dedicated freight back-office squad does for your operation: loads covered, exceptions handled, billing processed, queues cleared. Pay nothing if measurable results aren't delivered.",
  },
  {
    label: "STEP 5 —",
    title: "Performance Review & Ongoing Coverage",
    body: "At the end of the pilot, we walk through a performance report together: loads managed, exceptions handled, response times, billing metrics, queue performance. You decide whether to continue. If you do, you're already live — no re-onboarding, no ramp-up, just ongoing coverage at the quality you've already seen.",
  },
];

const tmsList = ["McLeod", "DAT", "Samsara", "Motive", "Turvo", "Revenova", "Rose Rocket", "Aljex"];

function ScrollStepper() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const viewportTrigger = window.innerHeight * 0.45;
      let current = 0;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top < viewportTrigger) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative grid grid-cols-[60px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10">
      {/* Progress rail */}
      <div className="relative">
        <div className="sticky top-32">
          <div className="relative flex flex-col items-center">
            <div className="absolute top-3 bottom-3 w-0.5 bg-soft-border" />
            <div
              className="absolute top-3 w-0.5 bg-cta transition-all duration-500"
              style={{ height: `${(active / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((_, i) => {
              const isActive = i <= active;
              return (
                <div
                  key={i}
                  className={`relative z-10 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${
                    isActive
                      ? "bg-cta text-white ring-4 ring-cta/20 scale-100"
                      : "bg-white text-muted-gray border-2 border-soft-border scale-90"
                  } ${i < steps.length - 1 ? "mb-16 md:mb-24" : ""}`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Steps content */}
      <div>
        {steps.map((s, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <div
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              className={`mb-16 md:mb-24 transition-all duration-500 ${
                isActive ? "opacity-100 scale-100" : isPast ? "opacity-40" : "opacity-50"
              }`}
            >
              <p className={`text-xs font-bold uppercase tracking-[0.15em] mb-2 transition-colors ${
                isActive ? "text-cta" : "text-muted-gray"
              }`}>
                {s.label}
              </p>
              <h3 className={`text-2xl md:text-3xl font-bold mb-5 transition-colors ${
                isActive ? "text-navy" : "text-dim-gray"
              }`}>
                {s.title}
              </h3>

              <div
                className={`bg-white rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isActive ? "border-cta/40 shadow-xl p-6 md:p-8" : "border-soft-border p-5 md:p-6"
                }`}
              >
                {s.twoCol ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-skyblue mb-3">What You Provide:</p>
                      <ul className="space-y-2">
                        {s.twoCol.provide.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm text-dim-gray">
                            <Check className="w-4 h-4 text-skyblue flex-shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-cta mb-3">What You Receive:</p>
                      <ul className="space-y-2">
                        {s.twoCol.receive.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm text-dim-gray">
                            <Check className="w-4 h-4 text-cta flex-shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-base text-dim-gray leading-relaxed">{s.body}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HowItWorksPage() {
  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="bg-navy pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="max-w-350 mx-auto px-5 md:px-6 text-center">
          <ScrollAnimation>
            <p className="text-cta uppercase text-xs tracking-[0.15em] font-bold mb-4">SIMPLE TO START. LIVE IN 48 HOURS.</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6" >
              From First Call to Live Operations in 48 Hours
            </h1>
            <p className="text-lg md:text-xl text-muted-gray mb-8 max-w-2xl mx-auto leading-relaxed">
              No lengthy implementations. No disruption to active operations. Just a structured path from first conversation to full coverage.
            </p>
            <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block bg-cta text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-cta-hover active:scale-[0.97] transition-all">
              Book Your Discovery Call →
            </a>
            <p className="text-sm text-cta font-bold mt-5">7-Day Pilot — Pay nothing if results aren't delivered.</p>
          </ScrollAnimation>
        </div>
      </section>

      {/* SECTION 2 — INTERACTIVE 5-STEP STEPPER */}
      <section className="bg-offwhite py-20 md:py-28">
        <div className="max-w-350 mx-auto px-5 md:px-6">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-16 md:mb-20">
              The SkyFreightSquad Onboarding Process
            </h2>
          </ScrollAnimation>
          <ScrollStepper />
        </div>
      </section>

      {/* SECTION 3 — EMBEDDED MODEL */}
      <section className="bg-white py-20 border-t border-soft-border">
        <div className="max-w-350 mx-auto px-5 md:px-6">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Why The Embedded Model Produces Different Results</h2>
            <p className="text-base text-dim-gray leading-relaxed mb-8">
              The difference between SkyFreightSquad and a standard BPO isn't the services — it's the model. We don't run a separate workflow you have to manage around. We operate inside your systems.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Your TMS — we access it using your processes, not ours",
                "Your SOPs — we learn them during onboarding and follow them from shift one",
                "Your communication channels — handoffs are clean, nothing gets lost between teams",
                "Your escalation protocols — exceptions resolved your way, not defaulted to generic rules",
                "Your data — every action documented inside your systems, full visibility at all times",
              ].map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" />
                  <span className="text-base text-dim-gray">{b}</span>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* SECTION 4 — WHAT'S IN THE PILOT */}
      <section className="bg-offwhite py-20">
        <div className="max-w-350 mx-auto px-5 md:px-6">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">What You Get During the 7-Day Pilot</h2>
            <p className="text-base text-dim-gray leading-relaxed mb-8">
              The pilot isn't a demo. It's your actual operation, with SkyFreightSquad embedded inside it, handling real work. Here's exactly what's included:
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Full TMS access configuration and SOP integration — completed before shift one",
                "Coverage for your chosen service: dispatch, track & trace, billing, or customer support",
                "Daily activity logs inside your TMS so you can see exactly what was done each shift",
                "Real-time escalation handling using your defined protocols",
                "End-of-pilot performance report: loads managed, exceptions handled, response times, results",
                "Pay nothing if measurable results aren't delivered. No obligation to continue. No re-onboarding if you do.",
              ].map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" />
                  <span className="text-base text-dim-gray">{b}</span>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* SECTION 5 — TOOL COMPATIBILITY */}
      <section className="bg-navy-card py-16">
        <div className="max-w-350 mx-auto px-5 md:px-6 text-center">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">We work inside the tools you already use.</h2>
            <p className="text-muted-gray mb-8">No new software. No migration. We configure to your stack.</p>
            <div className="flex justify-center flex-wrap gap-3 mb-6">
              {tmsList.map((t) => (
                <span key={t} className="border border-skyblue/30 rounded-full px-4 py-2 text-sm font-semibold text-skyblue bg-skyblue/[0.08] inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-skyblue rounded-full flex-shrink-0" />{t}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-gray">Don't see yours? We'll learn it. Most custom TMS setups configured within 48 hours of onboarding.</p>
          </ScrollAnimation>
        </div>
      </section>

      {/* SECTION 6 — CLOSING CTA */}
      <section className="bg-cta py-20 text-center">
        <div className="max-w-350 mx-auto px-5 md:px-6">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5">Ready to See SkyFreightSquad Inside Your Operation?</h2>
            <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed">
              The discovery call is 45 minutes. The onboarding is 48 hours. The pilot is 7 days. At the end of it you'll know exactly what SkyFreightSquad does for your operation — and you'll have the data to make the decision.
            </p>
            <p className="text-base text-white font-bold mb-2">7-Day Pilot — Pay nothing if we don't deliver measurable results in your first week.</p>
            <p className="text-sm text-white/85 mb-8">No Lock-In — Month-to-month after your pilot. Cancel anytime.</p>
            <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-white text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-white hover:text-cta transition-all">
              Book Your Discovery Call →
            </a>
            <p className="text-sm text-white/85 mt-5 max-w-lg mx-auto">No pitch. No pressure. A 45-minute conversation about your operation and what better looks like.</p>
          </ScrollAnimation>
        </div>
      </section>
    </>
  );
}
