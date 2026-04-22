import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ScrollAnimation } from "../../components/ScrollAnimation";
import { CredentialCard, TmsProof, DetailedServiceScope, AnswerBlock, WhatChanges, ServiceFAQ, ServiceCTA } from "../../components/services/ServiceShared";
import { AnimatedCaseStudy } from "../../components/services/AnimatedCaseStudy";

const BASE_URL = "https://skyfreightsquad.com";

export const Route = createFileRoute("/services/billing")({
  head: () => ({
    meta: [
      { title: "Freight Billing Outsourcing for Brokers & 3PLs | SkyFreightSquad" },
      { name: "description", content: "SkyFreightSquad manages freight billing end-to-end — rate validation, EDI 210, short-pay recovery, dispute resolution. Reduce DSO. Improve cash flow. 7-day pilot." },
      { property: "og:title", content: "Freight Billing Outsourcing for Brokers & 3PLs | SkyFreightSquad" },
      { property: "og:description", content: "SkyFreightSquad manages freight billing end-to-end — rate validation, EDI 210, short-pay recovery, dispute resolution." },
      { property: "og:image", content: "/SkyFreightSquad_Logo_Horizontal_LightBG.png" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SkyFreightSquad" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@skyfreightsquad" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/services/billing` }],
  }),
  component: BillingPage,
});

function BillingPage() {
  return (
    <>
      <section className="bg-navy pt-24 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimation>
            <p className="text-sm text-muted-gray mb-6">
              <Link to="/" className="hover:text-white">Home</Link> → <Link to="/services/billing" className="hover:text-white">Services</Link> → Billing & Invoice Processing
            </p>
            <p className="text-cta uppercase text-xs mb-3 font-bold tracking-wider">BILLING & INVOICE PROCESSING</p>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-[55%_45%] gap-12 items-start">
            <ScrollAnimation>
              <h1 className="text-5xl font-black text-white max-w-xl leading-tight">
                Freight Billing That Goes Out Right. Gets Paid Faster.
              </h1>
              <p className="text-lg text-muted-gray mt-2 mb-2 max-w-lg">
                Rate validation, invoice creation, EDI submission, short-pay recovery, and collections — end-to-end inside your systems.
              </p>
              <p className="text-base text-muted-gray mb-4 max-w-lg leading-relaxed">
                Billing errors don't just delay payment — they signal operational unreliability to your customers. Every rejected invoice, every unworked short pay, and every dispute that ages into a write-off is a cost your business is absorbing silently. SkyFreightSquad manages your billing cycle end-to-end so invoices go out accurate, disputes get resolved, and the revenue your operation earns actually lands in your accounts.
              </p>
              <p className="text-sm text-muted-gray mb-8 max-w-lg">
                No Lock-In — Month-to-month after your pilot. Cancel anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block bg-cta text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-cta-hover active:scale-[0.97] transition-all text-center">
                  Talk to a Billing Specialist →
                </a>
                <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-skyblue text-skyblue rounded-full px-8 py-4 font-bold text-sm hover:bg-skyblue hover:text-white transition-all text-center">
                  Start Your 7-Day Pilot
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {['First-pass accuracy focus', 'EDI 210 processing', 'Short-pay recovery within resolution windows', 'DSO reduction within 60 days'].map((c) => (
                  <span key={c} className="border border-skyblue/30 rounded-full px-4 py-2 text-xs text-skyblue font-medium">{c}</span>
                ))}
              </div>
            </ScrollAnimation>

            <CredentialCard stats={[
              { icon: '💰', stat: 'End-to-end', desc: 'billing management' },
              { icon: '📋', stat: 'EDI 210', desc: 'processing included' },
              { icon: '✓', stat: '7-Day', desc: 'pilot' },
            ]} />
          </div>
        </div>
      </section>

      <AnswerBlock
        h2="How Do You Reduce DSO in Freight Brokerage?"
        answerBody="DSO in freight brokerage is driven by three compounding problems: invoice errors on first submission, short pays that go unworked until the recovery window closes, and billing disputes without dedicated follow-up. Reducing DSO requires invoices that go out correct the first time, short pays identified and disputed within the recovery window, and disputes with a dedicated owner moving them toward resolution daily. SkyFreightSquad manages all three as a dedicated billing function — clients typically see DSO reduction of 8–14 days within the first 60 days."
        subH2="Where Freight Billing Breaks Down"
        subBody="Freight billing is more complex than it looks. Rates have to match contracted terms. Accessorials have to be documented and defensible. EDI submissions have to go out correctly the first time. When billing is handled by a team also managing operations, something always gives."
        bullets={[
          "Invoice errors on first submission — rejections that require correction add days to every payment cycle",
          "Short pays left unworked — every uncontested short pay is revenue the business simply doesn't collect",
          "Disputes aging into write-offs — unresolved disputes don't resolve themselves, they compound",
        ]}
      />

      <DetailedServiceScope
        title="What We Own in Your Billing Operation"
        items={[
          { title: 'Load & Rate Validation', body: 'Rates verified against contracts and load data before a single invoice is created. The most effective intervention in first-pass accuracy — we catch discrepancies before they become rejections.', includes: 'Contract rate verification · Load data matching · Accessorial review · Pre-submission validation' },
          { title: 'Invoice Creation & Backup Attachment', body: "Invoices created with complete, validated charges. All required backup documentation — PODs, rate confirmations, accessorial support — attached upfront so billing holds don't happen.", includes: 'Invoice creation · POD attachment · Rate confirmation linking · Accessorial documentation · Quality review' },
          { title: 'EDI 210 / Invoice Submission', body: 'Invoices submitted correctly through EDI or customer portals on the first attempt. Submission errors tracked and resolved without delays to your payment cycle.', includes: 'EDI 210 processing · Portal submission · Error tracking · Resubmission management · Confirmation logging' },
          { title: 'Short-Pay Research & Recovery', body: "Short pays identified, researched, and disputed within resolution windows. Every short pay that goes unworked is revenue your business doesn't collect. We work them all.", includes: 'Short-pay identification · Research and documentation · Dispute filing within windows · Follow-up management · Recovery tracking' },
          { title: 'Dispute Resolution & Collections', body: 'Disputes tracked with clear ownership, active daily follow-up, and structured escalation. Aging receivables followed up consistently and professionally — maintaining customer relationships while being persistent about outstanding balances.', includes: 'Dispute ownership · Active follow-up · Collections outreach · AR aging management · Professional brand representation' },
        ]}
      />

      <TmsProof />

      <WhatChanges
        title="What Better Billing Delivers"
        bullets={[
          "Shorter payment cycles — accurate first-pass submissions get processed faster, improving cash flow predictability",
          "Higher first-pass acceptance rates — correct invoices with complete documentation don't get rejected and resubmitted",
          "Reduced revenue leakage — short pays and disputes actively recovered instead of silently absorbed",
          "DSO reduction — clients typically see 8–14 days of improvement within 60 days of engagement",
          "Less internal pressure — billing workload shifts off your operations team, reducing backlog during high-volume periods",
        ]}
      />

      <AnimatedCaseStudy
        location="Results: Mid-Size 3PL — Billing Transformation"
        body="Challenge: Manual billing workflows generating frequent invoice errors, 42-hour average dispute resolution time, and $12,000/month in administrative overhead."
        quote="The billing alone paid for the service. They caught $14,000 in accessorial overbilling in the first 30 days. That's not back-office support — that's ROI."
        attribution="Marcus D. — Owner, Independent Freight Brokerage, Atlanta GA"
        metrics={[
          { beforeValue: 90, afterValue: 100, beforeLabel: '90%', label: 'invoice processing accuracy achieved within 30 days', suffix: '%' },
          { beforeValue: 42, afterValue: 5, beforeLabel: '42 hrs', label: 'average dispute resolution time (down from 42 hours)', suffix: ' hrs' },
          { beforeValue: 0, afterValue: 14000, beforeLabel: '$0', label: 'in accessorial overbilling caught in the first 30 days', prefix: '$' },
          { beforeValue: 34, afterValue: 19, beforeLabel: '34 days', label: 'DSO achieved (down from 34 days at engagement start)', suffix: ' days' },
        ]}
      />

      <ServiceFAQ
        title="Frequently Asked Questions"
        faqs={[
          { q: "Can freight brokers outsource billing and invoicing?", a: "Yes — and it's one of the highest-ROI decisions a growing freight brokerage can make. Billing accuracy and speed directly affect cash flow, customer relationships, and team capacity. SkyFreightSquad manages the full billing cycle inside your existing systems, with no system changes required." },
          { q: "What EDI formats and billing systems do you work in?", a: "We support EDI 210 and work inside McLeod, Aljex, Rose Rocket, Turvo, and other major platforms. We align to your specific EDI requirements and customer portal specifications during engagement setup — no changes to your current infrastructure required." },
          { q: "How will this affect our short pays and billing disputes?", a: "Directly and significantly. Most short pays persist because they're not worked promptly — the recovery window closes while they sit in a queue. When short pays are identified and disputed immediately, recovery rates improve and dispute volume decreases over time." },
          { q: "How quickly will we see DSO improvement?", a: "Most clients see measurable DSO reduction within the first 30–60 days. The primary drivers are faster invoice submission, immediate short-pay follow-up, and consistent collections outreach on aging receivables." },
          { q: "Do you handle billing end-to-end or just specific functions?", a: "Both models work. We can take full ownership of the end-to-end billing cycle, or provide targeted support — short-pay management, dispute resolution, or EDI submission. Scope is defined during onboarding and adjustable as your needs change." },
        ]}
      />

      <ServiceCTA
        headline="Get Paid Faster. Without the Billing Headaches."
        body="Billing complexity shouldn't drain your team's capacity or leak revenue your operation has already earned. SkyFreightSquad brings dedicated, structured billing management to your operation — so invoices go out right, disputes get resolved, and cash lands in your accounts on a predictable schedule."
        pilotTag="7-Day Pilot — Pay nothing if we don't deliver measurable results in your first week."
        guarantee="No Lock-In — Month-to-month after your pilot. Cancel anytime."
        cta="Book a Meeting →"
        pills={['48-hour onboarding', 'Your TMS, your SOPs', 'Month-to-month']}
      />
    </>
  );
}