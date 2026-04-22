import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ScrollAnimation } from "../../components/ScrollAnimation";
import { CredentialCard, TmsProof, DetailedServiceScope, AnswerBlock, WhatChanges, ServiceFAQ, ServiceCTA } from "../../components/services/ServiceShared";
import { AnimatedCaseStudy } from "../../components/services/AnimatedCaseStudy";


const BASE_URL = "https://skyfreightsquad.com";

export const Route = createFileRoute("/services/dispatch")({
  head: () => ({
    meta: [
      { title: "After-Hours Freight Dispatch for Brokers & 3PLs | SkyFreightSquad" },
      { name: "description", content: "SkyFreightSquad provides 24/7 after-hours freight dispatch exclusively for freight brokers and 3PLs. Embedded in your TMS & SOPs. 7-day pilot. No contracts." },
      { property: "og:title", content: "After-Hours Freight Dispatch for Brokers & 3PLs | SkyFreightSquad" },
      { property: "og:description", content: "SkyFreightSquad provides 24/7 after-hours freight dispatch exclusively for freight brokers and 3PLs. Embedded in your TMS & SOPs." },
      { property: "og:image", content: "/SkyFreightSquad_Logo_Horizontal_LightBG.png" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SkyFreightSquad" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@skyfreightsquad" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/services/dispatch` }],
  }),
  component: DispatchPage,
});

function DispatchPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-navy pt-24 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimation>
            <p className="text-sm text-muted-gray mb-6">
              <Link to="/" className="hover:text-white">Home</Link> → <Link to="/services/dispatch" className="hover:text-white">Services</Link> → 24/7 Dispatch & After-Hours
            </p>
            <p className="text-cta uppercase text-xs mb-3 font-bold tracking-wider">24/7 DISPATCH & AFTER-HOURS COVERAGE</p>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-[55%_45%] gap-12 items-start">
            <ScrollAnimation>
              <h1 className="text-5xl font-black text-white max-w-xl leading-tight">
                After-Hours Freight Dispatch. Covered Every Shift.
              </h1>
              <p className="text-lg text-muted-gray mt-2 mb-2 max-w-lg">
                Loads don't stop moving at 5 PM. Neither does your coverage.
              </p>
              <p className="text-base text-muted-gray mb-4 max-w-lg leading-relaxed">
                After-hours gaps don't just cost loads — they cost carrier trust, customer confidence, and revenue that doesn't come back. SkyFreightSquad delivers continuous dispatch coverage embedded inside your TMS and SOPs, so your freight keeps moving every hour of every day.
              </p>
              <p className="text-sm text-muted-gray mb-8 max-w-lg">
                No Lock-In — Month-to-month after your pilot. Cancel anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block bg-cta text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-cta-hover active:scale-[0.97] transition-all text-center">
                  Talk to a Dispatch Specialist →
                </a>
                <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-skyblue text-skyblue rounded-full px-8 py-4 font-bold text-sm hover:bg-skyblue hover:text-white transition-all text-center">
                  Start Your 7-Day Pilot
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {['Live in 48 hours', 'McLeod · Aljex · Rose Rocket', 'Your SOPs. Your escalation rules.', 'Nights, weekends, holidays covered'].map((c) => (
                  <span key={c} className="border border-skyblue/30 rounded-full px-4 py-2 text-xs text-skyblue font-medium">{c}</span>
                ))}
              </div>
            </ScrollAnimation>

            <CredentialCard stats={[
              { icon: '⚡', stat: 'Zero', desc: 'missed loads guarantee' },
              { icon: '✓', stat: '24/7', desc: 'continuous dispatch' },
              { icon: '🚀', stat: '7-Day', desc: 'pilot' },
            ]} />
          </div>
        </div>
      </section>

      {/* AEO/GEO ANSWER BLOCK */}
      <AnswerBlock
        h2="How Do Freight Brokers Handle After-Hours Dispatch?"
        answerBody="Most freight brokers handle after-hours in one of two ways: stretch internal staff across overnight shifts — creating burnout and inconsistency — or accept missed loads as a cost of doing business. SkyFreightSquad provides a third option: a dedicated after-hours dispatch team embedded directly inside the broker's TMS and SOPs, managing load acceptance, driver communication, exception handling, and system updates from the moment the internal team signs off to the moment they return."
        subH2="Where After-Hours Gaps Cost You Most"
        subBody="A missed tender at 10 PM isn't just one lost load. It's a carrier relationship that weakens, a customer update that doesn't go out, a TMS status that falls behind, and a morning team that arrives to a backlog they spend the first two hours clearing."
        bullets={[
          "Missed tender windows — every unanswered tender after hours is revenue that didn't materialize",
          "Unaddressed driver issues — delays caused by drivers with no one to reach overnight",
          "No-update customer escalations — shippers calling at 6 AM about loads nobody monitored",
          "Morning backlog — your day team spending the first two hours catching up instead of moving freight",
        ]}
      />

      {/* WHAT WE HANDLE */}
      <DetailedServiceScope
        title="What Your SkyFreightSquad Dispatch Team Handles"
        body="From the moment your internal team signs off to the moment they return, SkyFreightSquad manages every dispatch function inside your operation — without gaps, without handoff risk, and without your team having to stay on call."
        items={[
          { title: 'Load Acceptance & Tender Management', body: 'We monitor tenders in real time and respond within required windows so no load opportunity is missed. Every tender is logged and tracked in your TMS with full visibility for your morning team.', includes: 'Real-time tender monitoring · Rate confirmation review · Acceptance and rejection logging · TMS status updates' },
          { title: 'Driver Communication & Dispatch', body: "Driver assignments, updates, check calls, and issue resolution managed throughout every shift. Drivers always have a real person to reach. Nothing sits pending until morning.", includes: 'Driver assignments · Check call execution · Issue resolution · ELD and HOS monitoring · Carrier coordination' },
          { title: 'Live Tracking & ETA Updates', body: "Active loads monitored continuously. Accurate ETA updates provided to brokers, shippers, and internal systems. Your portals and TMS reflect real conditions — not yesterday's data.", includes: 'Real-time load monitoring · ETA updates to all parties · TMS and portal status updates · Appointment windows tracked' },
          { title: 'Escalations & Exception Handling', body: "Breakdowns, missed appointments, and no-shows addressed immediately using your escalation protocols. Problems resolved overnight — not waiting for morning.", includes: 'Breakdown coordination · No-show management · Appointment rescheduling · Protocol-based escalation · Full documentation' },
          { title: 'TMS & Portal Updates', body: "Every action documented inside your TMS so your morning team starts the day with clean, current data — not a backlog of statuses to correct.", includes: 'Load status updates · Accessorial capture · Reference number maintenance · Portal synchronization · Overnight activity log' },
        ]}
      />

      {/* TMS PROOF */}
      <TmsProof />

      {/* WHAT CHANGES */}
      <WhatChanges
        title="What Your Operation Looks Like With Full Coverage"
        bullets={[
          "Capture more loads — after-hours responses secure freight that would otherwise go to a competitor who picks up the phone",
          "Maintain on-time performance — continuous monitoring and proactive communication keep loads on schedule through the night",
          "Protect your team from burnout — a dedicated squad handles nights so your staff fully disconnects and returns sharp",
          "Keep every stakeholder informed — drivers, brokers, and shippers get timely updates at every hour, not just business hours",
          "Start every morning clean — TMS current, exceptions documented, nothing sitting in a queue",
        ]}
      />

      {/* CASE STUDY */}
      <AnimatedCaseStudy
        location="Results: Regional Freight Broker — After-Hours Dispatch"
        body="Challenge: A 22% tender rejection rate driven by zero after-hours coverage. Carrier relationships deteriorating. Customer escalations piling up overnight with no one to respond."
        quote="We stopped losing Friday-night loads within the first week. SkyFreightSquad had our McLeod SOPs configured before the first shift even started."
        attribution="James M. — Operations Director, Mid-Size Freight Brokerage, Chicago IL"
        metrics={[
          { beforeValue: 78, afterValue: 97.4, beforeLabel: '78%', label: 'tender acceptance rate achieved within 60 days', suffix: '%', decimals: 1 },
          { beforeValue: 100, afterValue: 39, beforeLabel: '100%', label: 'reduction in after-hours escalations', suffix: '%' },
          { beforeValue: 0, afterValue: 4.8, beforeLabel: 'N/A', label: 'customer satisfaction score from active shipper accounts', decimals: 1, afterDisplay: '4.8/5' },
        ]}
      />

      {/* FAQ */}
      <ServiceFAQ
        title="Frequently Asked Questions"
        faqs={[
          { q: "Does SkyFreightSquad replace our in-house dispatch team?", a: "That depends entirely on what you need. We can take on full 24/7 dispatch responsibility, or cover specific gaps — overnight, weekends, peak overflow — while your internal team handles regular business hours. You define the scope. We operate within it." },
          { q: "How quickly can SkyFreightSquad go live on our account?", a: "Most clients are live within 48 hours of the engagement starting. We get TMS access, review your SOPs, map your escalation paths, and go live alongside your active operations — without disrupting anything already in progress." },
          { q: "What happens when a real problem comes up overnight?", a: "We address it immediately using your escalation protocols. Driver breakdowns, missed appointments, carrier no-shows — managed the moment they surface. We only escalate to your organization when the situation genuinely requires it. Problems don't sit unaddressed until morning." },
          { q: "Which TMS platforms does SkyFreightSquad work in?", a: "We operate in McLeod, Aljex, Rose Rocket, Revenova, Turvo, and other major platforms. If yours isn't listed, tell us on the discovery call — we learn quickly and onboard to client systems as a standard part of engagement setup." },
          { q: "Can we start with after-hours only and add services later?", a: "Yes — and most clients do. Start with the coverage gap that's costing you most. Once you've seen how SkyFreightSquad integrates, expanding to additional services or hours requires no re-onboarding." },
        ]}
      />

      {/* CTA */}
      <ServiceCTA
        headline="Every Shift Covered. Every Load Moving."
        body="After-hours gaps aren't a permanent condition of running a freight brokerage. They're an operational problem with a clear solution. SkyFreightSquad is built to provide it — embedded inside your operation, running your SOPs, from the moment your team logs off to the moment they return."
        pilotTag="7-Day Pilot — Pay nothing if we don't deliver measurable results in your first week."
        guarantee="No Lock-In — Month-to-month after your pilot. Cancel anytime."
        cta="Talk to Our Dispatch Team →"
        microCopy="One conversation. We'll assess your current coverage gaps and tell you exactly how SkyFreightSquad closes them."
        pills={['48-hour onboarding', 'Your TMS, your SOPs', 'Month-to-month']}
      />
    </>
  );
}