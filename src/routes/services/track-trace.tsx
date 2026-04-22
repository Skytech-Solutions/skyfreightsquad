import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ScrollAnimation } from "../../components/ScrollAnimation";
import { CredentialCard, TmsProof, DetailedServiceScope, AnswerBlock, WhatChanges, ServiceFAQ, ServiceCTA } from "../../components/services/ServiceShared";
import { AnimatedCaseStudy } from "../../components/services/AnimatedCaseStudy";

const BASE_URL = "https://skyfreightsquad.com";

export const Route = createFileRoute("/services/track-trace")({
  head: () => ({
    meta: [
      { title: "Freight Track & Trace Outsourcing for Brokers & 3PLs | SkyFreightSquad" },
      { name: "description", content: "SkyFreightSquad provides dedicated track and trace and exception management for freight brokers and 3PLs. Every load monitored 24/7. Exceptions handled before they escalate." },
      { property: "og:title", content: "Freight Track & Trace Outsourcing for Brokers & 3PLs | SkyFreightSquad" },
      { property: "og:description", content: "Dedicated track and trace and exception management for freight brokers and 3PLs. Every load monitored 24/7." },
      { property: "og:image", content: "/SkyFreightSquad_Logo_Horizontal_LightBG.png" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SkyFreightSquad" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@skyfreightsquad" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/services/track-trace` }],
  }),
  component: TrackTracePage,
});

function TrackTracePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-navy pt-40 pb-24">
        <div className="max-w-350 mx-auto px-6">
          <ScrollAnimation>
            <p className="text-sm text-muted-gray mb-6">
              <Link to="/" className="hover:text-white">Home</Link> → <Link to="/services/track-trace" className="hover:text-white">Services</Link> → Track & Trace
            </p>
            <p className="text-cta uppercase text-xs mb-3 font-bold tracking-wider">TRACK & TRACE / EXCEPTION MANAGEMENT</p>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-[55%_45%] gap-12 items-start">
            <ScrollAnimation>
              <h1 className="text-5xl font-black text-white leading-tight">
                Every Load Tracked. Every Exception Handled Before It Escalates.
              </h1>
              <p className="text-lg text-muted-gray mt-2 mb-2">
                Real-time visibility. Proactive exception management. Inside your TMS, 24/7.
              </p>
              <p className="text-base text-muted-gray mb-4 leading-relaxed">
                Missed updates turn into missed appointments. Missed appointments turn into detention charges, delivery failures, and customer relationships that quietly erode. SkyFreightSquad keeps every load visible and every exception resolved before it compounds — so your operation runs on control, not reaction.
              </p>
              <p className="text-sm text-muted-gray mb-8 max-w-lg">
                No Lock-In — Month-to-month after your pilot. Cancel anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block bg-cta text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-cta-hover active:scale-[0.97] transition-all text-center">
                  Talk to a Tracking Specialist →
                </a>
                <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-skyblue text-skyblue rounded-full px-8 py-4 font-bold text-sm hover:bg-skyblue hover:text-white transition-all text-center">
                  Start Your 7-Day Pilot
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {['Check-ins every 60–90 min (high-risk loads)', 'POD confirmed at delivery', 'Exceptions escalated in real time', 'Zero data silos — all inside your TMS'].map((c) => (
                  <span key={c} className="border border-skyblue/30 rounded-full px-4 py-2 text-xs text-skyblue font-medium">{c}</span>
                ))}
              </div>
            </ScrollAnimation>

            <CredentialCard stats={[
              { icon: '📡', stat: '24/7', desc: 'continuous monitoring' },
              { icon: '⚡', stat: '60–90 min', desc: 'high-risk check-in cadence' },
              { icon: '🔄', stat: 'Real-time', desc: 'TMS status updates' },
            ]} />
          </div>
        </div>
      </section>

      {/* AEO/GEO ANSWER BLOCK */}
      <AnswerBlock
        h2="What Is Track and Trace in Freight Brokerage?"
        answerBody="Track and trace in freight brokerage is the continuous monitoring of active loads from pickup confirmation through delivery verification. It includes proactive carrier check-ins at defined intervals, real-time status updates in the TMS and customer portals, exception identification when loads deviate from schedule, and immediate escalation when issues require intervention. When done well, it prevents exceptions from becoming service failures. When it falls behind — because the team is stretched too thin — exceptions arrive as surprises and the operation shifts into reactive mode."
        subH2="What Happens When Tracking Falls Behind"
        subBody="Freight businesses lose visibility incrementally. Check-in intervals stretch from 90 minutes to three hours to 'we'll catch up in the morning.' Then exceptions start arriving as surprises. Reactive freight management is expensive: detention charges, damaged customer relationships, and billing delays from documentation gaps at delivery."
        bullets={[
          "Delays identified too late — delivery window already at risk by the time the issue surfaces",
          "Customers chasing updates — shippers calling for status is a signal visibility has broken down",
          "Documentation gaps at delivery — PODs not captured promptly hold up billing and cash flow",
        ]}
      />

      {/* WHAT WE MANAGE */}
      <DetailedServiceScope
        title="What We Monitor and Manage, 24/7"
        items={[
          { title: 'Live Load Tracking', body: "Every active load monitored continuously inside your TMS and ELD platforms. Real-time visibility across your entire load board — not periodic spot checks.", includes: 'Real-time TMS monitoring · ELD platform integration · Load board visibility · Status accuracy verification' },
          { title: 'Proactive Check-Ins by Load Risk', body: "High-priority loads checked every 60–90 minutes. Standard loads every 2–3 hours. Intervals adjusted based on lane sensitivity, customer requirements, and real-time conditions.", includes: 'Risk-calibrated check-in cadence · Customer requirement alignment · Lane sensitivity adjustment · Real-time condition response' },
          { title: 'Exception Detection & Escalation', body: "Delays, deviations, and disruptions identified the moment they emerge — not after they've become service failures. Escalated immediately using your defined protocols.", includes: 'Delay detection · Route deviation flagging · Appointment risk identification · Protocol-based escalation · Full documentation' },
          { title: 'Milestone Monitoring', body: "Pickups, transit updates, delivery confirmations, and appointment windows tracked against schedule. Every milestone logged in your TMS in real time.", includes: 'Pickup confirmation · Transit milestone logging · Delivery window tracking · Appointment adherence monitoring' },
          { title: 'POD Confirmation', body: "Proof of delivery collected and confirmed immediately after delivery — so billing can move without waiting on documentation that isn't there.", includes: 'Immediate post-delivery follow-up · ePOD retrieval · Carrier and driver contact · Billing-ready confirmation' },
        ]}
      />

      {/* TMS PROOF */}
      <TmsProof />

      {/* WHAT CHANGES */}
      <WhatChanges
        title="What Consistent Visibility Delivers"
        bullets={[
          "Fewer surprises — issues caught early and resolved before they become delivery failures",
          "Stronger on-time performance — proactive monitoring and fast exception response keep loads on schedule",
          "Less manual follow-up — your team spends less time chasing carriers for updates",
          "Better customer confidence — accurate, timely status updates build retention-level trust",
          "Billing that doesn't wait — PODs confirmed at delivery so invoices go out without holds",
        ]}
      />

      {/* CASE STUDY */}
      <AnimatedCaseStudy
        location="Results: Asset-Based Carrier — Track & Trace Transformation"
        body="Challenge: Inconsistent shipment visibility and reactive exception handling creating downstream billing errors and leaving shippers without reliable delivery updates."
        quote="We went from reactive to proactive in three weeks. SkyFreightSquad catches issues before our shippers even know there's a problem. That's changed how customers see our operation."
        attribution="David R. — VP Operations, Regional Carrier, Tennessee"
        metrics={[
          { beforeValue: 82, afterValue: 98.8, beforeLabel: '82%', label: 'shipment tracking accuracy achieved across all active lanes', suffix: '%', decimals: 1 },
          { beforeValue: 3.2, afterValue: 4.8, beforeLabel: '3.2/5', label: 'customer satisfaction score from shipper accounts', decimals: 1, afterDisplay: '4.8/5' },
          { beforeValue: 90, afterValue: 45, beforeLabel: '90 days', label: 'to reduce delivery delays across all active lanes', suffix: ' days' },
        ]}
      />

      {/* FAQ */}
      <ServiceFAQ
        title="Frequently Asked Questions"
        faqs={[
          { q: "Is track and trace active 24/7 including weekends and holidays?", a: "Yes. Load visibility doesn't have business hours and neither does our monitoring team. SkyFreightSquad tracks loads continuously — nights, weekends, and holidays — with the same check-in cadence and exception response protocols as any other shift." },
          { q: "What check-in frequency do you use?", a: "Frequency is determined by load risk profile. High-risk or high-priority loads are checked every 60–90 minutes. Standard loads are monitored every 2–3 hours. We adjust based on your customer requirements, lane sensitivity, and any real-time conditions that elevate a load's risk." },
          { q: "Do you work inside our existing TMS and customer portals?", a: "Yes. We operate entirely within your approved systems. All tracking updates, exception notes, and milestone records land in your TMS and portals — data stays centralized and your team always has access to current information." },
          { q: "Can this actually reduce detention charges?", a: "Yes, directly. Most detention charges occur when exceptions aren't caught early enough to adjust appointments or coordinate facility arrivals. Proactive check-ins give you the window to act before detention becomes unavoidable." },
          { q: "How do you handle exceptions when something goes wrong?", a: "We follow your defined escalation protocols immediately. Contact the carrier, notify the shipper, adjust the appointment, or escalate internally — depending on the situation. Every action documented in your TMS so your team has a full record." },
        ]}
      />

      {/* CTA */}
      <ServiceCTA
        headline="Your Loads Deserve to Be Watched."
        body="Visibility is the foundation of operational reliability. When every load is monitored and every exception is handled before it compounds, your business runs on control — not reaction."
        pilotTag="7-Day Pilot — Pay nothing if we don't deliver measurable results in your first week."
        guarantee="No Lock-In — Month-to-month after your pilot. Cancel anytime."
        cta="Book a Consultation →"
        pills={['48-hour onboarding', 'Your TMS, your SOPs', 'Month-to-month']}
      />
    </>
  );
}