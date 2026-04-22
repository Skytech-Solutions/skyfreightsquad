import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ScrollAnimation } from "../../components/ScrollAnimation";
import { CredentialCard, TmsProof, DetailedServiceScope, AnswerBlock, WhatChanges, ServiceFAQ, ServiceCTA } from "../../components/services/ServiceShared";
import { AnimatedCaseStudy } from "../../components/services/AnimatedCaseStudy";

const BASE_URL = "https://skyfreightsquad.com";

export const Route = createFileRoute("/services/customer-support")({
  head: () => ({
    meta: [
      { title: "Freight Broker Customer Support Outsourcing | SkyFreightSquad" },
      { name: "description", content: "SkyFreightSquad manages inbound customer support for freight brokers and 3PLs — emails, calls, portal updates, EDI triage. SLA-driven. Under your brand. 24/7." },
      { property: "og:title", content: "Freight Broker Customer Support Outsourcing | SkyFreightSquad" },
      { property: "og:description", content: "SkyFreightSquad manages inbound customer support for freight brokers and 3PLs — SLA-driven, under your brand, 24/7." },
      { property: "og:image", content: "/SkyFreightSquad_Logo_Horizontal_LightBG.png" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SkyFreightSquad" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@skyfreightsquad" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/services/customer-support` }],
  }),
  component: CustomerSupportPage,
});

function CustomerSupportPage() {
  return (
    <>
      <section className="bg-navy pt-40 pb-24">
        <div className="max-w-350 mx-auto px-6">
          <ScrollAnimation>
            <p className="text-sm text-muted-gray mb-6">
              <Link to="/" className="hover:text-white">Home</Link> → <Link to="/services/customer-support" className="hover:text-white">Services</Link> → Customer Support
            </p>
            <p className="text-cta uppercase text-xs mb-3 font-bold tracking-wider">CUSTOMER SUPPORT & QUEUE TRIAGE</p>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-[55%_45%] gap-12 items-start">
            <ScrollAnimation>
              <h1 className="text-5xl font-black text-white leading-tight">
                Your Customer Queue. Managed. Every Message Answered.
              </h1>
              <p className="text-lg text-muted-gray mt-2 mb-2">
                SLA-driven. Your brand. Your standards. Every inbound message handled without gaps.
              </p>
              <p className="text-base text-muted-gray mb-4 leading-relaxed">
                Slow response times and unanswered messages don't just frustrate customers — they erode the relationships freight businesses depend on for growth. SkyFreightSquad manages your customer communication queues under your brand and to your standards — so every customer experiences your operation as responsive, reliable, and professional.
              </p>
              <p className="text-sm text-muted-gray mb-8">
                No Lock-In — Month-to-month after your pilot. Cancel anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block bg-cta text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-cta-hover active:scale-[0.97] transition-all text-center">
                  Talk to a Support Specialist →
                </a>
                <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-skyblue text-skyblue rounded-full px-8 py-4 font-bold text-sm hover:bg-skyblue hover:text-white transition-all text-center">
                  Start Your 7-Day Pilot
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {['Under 3-min first response target', 'Answered as your company', '24/7 coverage', 'EDI failures caught and retried'].map((c) => (
                  <span key={c} className="border border-skyblue/30 rounded-full px-4 py-2 text-xs text-skyblue font-medium">{c}</span>
                ))}
              </div>
            </ScrollAnimation>

            <CredentialCard stats={[
              { icon: '📞', stat: '< 3 min', desc: 'first response target' },
              { icon: '🏷', stat: 'White-label', desc: 'answer as your brand' },
              { icon: '🌐', stat: '24/7', desc: 'all time zones covered' },
            ]} />
          </div>
        </div>
      </section>

      <AnswerBlock
        h2="Can Freight Brokers Outsource Customer Support?"
        answerBody="Yes — for freight brokers and 3PLs managing high inbound communication volumes, outsourcing customer support is one of the most effective ways to protect SLAs, maintain customer relationships, and free up internal team capacity. The key distinction is how it's done. SkyFreightSquad works exclusively in freight, so the support team understands rate confirmations, TMS portals, EDI transactions, and the communication expectations of shippers and carriers. We operate under your brand, using your channels, following your escalation protocols — the experience is indistinguishable from your own team."
        subH2="When Support Backlogs Start Damaging Relationships"
        subBody="Support handled as a secondary task leads to slow responses, inconsistent answers, and growing queues during peak periods. Over time this erodes customer trust and drives them to competitors — regardless of how competitive your rates are."
        bullets={[
          "Unanswered emails during peak periods — delayed responses signal unreliability to shippers",
          "Inconsistent response quality — varying replies create a fractured customer experience",
          "EDI failures that sit unaddressed — unresolved EDI issues create downstream billing and tracking problems",
        ]}
      />

      <DetailedServiceScope
        title="What We Handle in Your Communication Queues"
        items={[
          { title: 'Shared Inbox Management', body: "Emails monitored, prioritized, and routed continuously so nothing goes unread during peak periods, overnight, or on weekends. Every message visible. Every response tracked.", includes: 'Continuous inbox monitoring · Priority routing · Response documentation · SLA tracking · Queue visibility' },
          { title: 'SLA-Based Queue Triage', body: "Inbound requests triaged by urgency and customer tier using your defined SLA rules. Time-sensitive requests identified immediately and routed to the appropriate workflow — urgency is never missed in a high-volume queue.", includes: 'SLA rule configuration · Customer tier classification · Urgency identification · Workflow routing · Triage documentation' },
          { title: 'Call & Chat Handling', body: "Inbound calls and chats handled by people who know freight — rate confirmations, TMS portals, shipment status, carrier communication. Documented and resolved consistently, not just logged.", includes: 'Inbound call handling · Chat management · Freight-specific knowledge · Documentation · Consistent resolution' },
          { title: 'Proactive Status Updates', body: "Updates pushed at key milestones and exceptions without waiting for customers to ask. Proactive communication is the single most effective driver of customer confidence in freight operations.", includes: 'Milestone-triggered updates · Exception notifications · Proactive outreach · Multi-channel delivery · Customer expectation management' },
          { title: 'EDI Failure Identification & Retry', body: "Failed EDI transmissions identified, diagnosed, and retried before they impact billing or tracking. EDI failures that sit unaddressed create downstream problems — we resolve them at the source.", includes: 'EDI failure monitoring · Error diagnosis · Retry management · Status tracking · Downstream impact prevention' },
        ]}
      />

      <TmsProof />

      <WhatChanges
        title="What Consistent Customer Communication Delivers"
        bullets={[
          "Faster response times — every message answered within SLA windows regardless of volume or time of day",
          "Stronger SLA compliance — priority triage ensures urgent requests are addressed before they breach",
          "Reduced escalations — freight-specific, accurate responses resolve issues before they compound",
          "Better customer confidence — reliable communication builds the trust that keeps customers from looking elsewhere",
          "Internal team focus — your operations team spends less time in the inbox, more time running operations",
        ]}
      />

      <AnimatedCaseStudy
        location="Results: Freight Broker — Customer Support Transformation"
        body="Challenge: Inbound communication volume during peak periods causing SLA breaches, inconsistent response quality, and mounting customer frustration."
        quote="Our shippers have no idea the calls aren't going to our office. The handoff is completely seamless. Response times improved from hours to under three minutes on average."
        attribution="Emily K. — Operations Manager, Freight Brokerage, New York"
        metrics={[
          { beforeValue: 71, afterValue: 97, beforeLabel: '71%', label: 'same-day resolution rate across all inbound requests', suffix: '%' },
          { beforeValue: 3.1, afterValue: 4.8, beforeLabel: '3.1/5', label: 'shipper satisfaction score', decimals: 1, afterDisplay: '4.8/5' },
          { beforeValue: 196, afterValue: 600, beforeLabel: '196', label: 'inbound communications managed monthly', suffix: '+' },
        ]}
      />

      <ServiceFAQ
        title="Frequently Asked Questions"
        faqs={[
          { q: "Will our customers know they're communicating with an outsourced team?", a: "No. We operate under your brand identity, use your communication channels, and follow your tone and response standards. Customer communication is seamless — consistent with what your customers already expect from your team." },
          { q: "Do you act as the front-line support team or support our existing team?", a: "Both options are available. We can manage all inbound customer communication as the dedicated front line, or provide support during high-volume periods or specific coverage gaps. Scope is defined during engagement setup." },
          { q: "How do you prioritize urgent requests?", a: "We triage using your defined SLA rules, urgency criteria, and customer tier classifications. Time-sensitive requests are identified immediately and routed to the appropriate workflow — urgency is never missed in a high-volume queue because prioritization happens at intake." },
          { q: "Can you work inside our existing communication platforms?", a: "Yes. We operate within your approved inboxes, communication platforms, and customer portals. Everything is centralized within your existing tools — no separate system required." },
          { q: "How do you handle situations that require escalation to our internal team?", a: "We follow your predefined escalation protocols. Situations requiring internal approval, customer-specific exceptions, or decisions above our defined authority are escalated immediately to the right person — with full context so the handoff is clean." },
        ]}
      />

      <ServiceCTA
        headline="Keep Customers Informed. Without Overloading Your Team."
        body="When every message gets a timely, accurate response, customers experience your operation as reliable. Reliable freight partners keep their customers. Unreliable ones don't — regardless of how competitive their rates are."
        pilotTag="7-Day Pilot — Pay nothing if we don't deliver measurable results in your first week."
        guarantee="No Lock-In — Month-to-month after your pilot. Cancel anytime."
        cta="Get Started Today →"
        pills={['48-hour onboarding', 'White-label trained', 'Month-to-month']}
      />
    </>
  );
}