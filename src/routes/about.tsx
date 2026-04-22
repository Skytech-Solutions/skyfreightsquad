import { createFileRoute } from "@tanstack/react-router";
import { ScrollAnimation } from "../components/ScrollAnimation";

const BASE_URL = "https://skyfreightsquad.com";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SkyFreightSquad | Freight Back-Office Built for Brokers & 3PLs" },
      { name: "description", content: "SkyFreightSquad is the only freight back-office built exclusively for freight brokers and 3PLs. Learn who we are, why we built this, and what drives every engagement." },
      { property: "og:title", content: "About SkyFreightSquad | Freight Back-Office Built for Brokers & 3PLs" },
      { property: "og:description", content: "SkyFreightSquad is the only freight back-office built exclusively for freight brokers and 3PLs." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SkyFreightSquad" },
      { property: "og:image", content: "/SkyFreightSquad_Logo_Horizontal_LightBG.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@skyfreightsquad" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/about` }],
  }),
  component: AboutPage,
});

const values = [
  { title: "Freight Exclusivity", body: "We work only in freight brokerage and 3PL operations. That's a deliberate choice. It means we understand your TMS, your carrier relationships, your billing workflows, and your customers' expectations at a depth generalist firms cannot match." },
  { title: "Embedded, Not Adjacent", body: "We don't run a parallel operation alongside yours. We operate inside your systems, follow your SOPs, hold ourselves to your SLAs. The output is indistinguishable from your own team — because functionally, that's what we are." },
  { title: "Operational Integrity", body: "If something goes wrong, we say so, address it, and make sure it doesn't happen again. No ambiguity. No finger-pointing. Full transparency and clear accountability at every level." },
];

function AboutPage() {
  return (
    <>
      {/* HERO — ORIGIN STORY */}
      <section className="bg-[#0B1F3A] pb-24 pt-44">
        <div className="max-w-350 mx-auto px-6">
          <div className="grid lg:grid-cols-[60%_40%] gap-12 items-center">
            <ScrollAnimation>
              <p className="text-[#2DAAE1] uppercase text-xs mb-3 font-bold tracking-wider">OUR STORY</p>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Built Inside Freight. Exclusively for the People Who Run It.
              </h1>
              <p className="text-lg text-[#94A3B8] mt-8 mb-6 leading-relaxed">
                We didn't borrow an outsourcing model from another industry and apply it to logistics. We built one from scratch — specifically for freight brokers and 3PLs.
              </p>
              <p className="text-base text-[#94A3B8] leading-relaxed">
                SkyFreightSquad exists because we spent years inside freight operations and kept seeing the same pattern: talented teams spending their best hours on the wrong work. Dispatch gaps at 2 AM. TMS data that didn't match reality. Invoices sitting in queues nobody owned. We didn't build another BPO. We built the squad that freight brokers and 3PLs actually needed — one that embeds directly inside their operation, follows their standards, and runs their back-office like it's our own.
              </p>
              <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#FF8C00] text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-[#E07800] active:scale-[0.97] transition-all mt-8">
                Book a Meeting →
              </a>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="bg-[#112240] rounded-2xl p-8 border-l-4 border-[#FF8C00] rounded-l-none max-w-sm lg:ml-auto">
                <span className="text-5xl text-[#FF8C00]/60 font-black leading-none block mb-4">"</span>
                <p className="text-xl text-white italic leading-relaxed">We built the squad that freight brokers and 3PLs actually needed.</p>
                <p className="text-sm text-[#94A3B8] mt-6">— The SkyFreightSquad founding principle</p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* GEO ENTITY BLOCK */}
      <section className="bg-white py-20 border-t border-[#E2E8F0]">
        <div className="max-w-350 mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-6">What Is SkyFreightSquad?</h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              SkyFreightSquad is a freight back-office operations provider built exclusively for freight brokers and 3PLs in the United States. We provide 24/7 dispatch and after-hours coverage, track and trace with exception management, billing and invoice processing, and customer support — operating inside each client's existing TMS, following their SOPs, and holding ourselves to their SLAs. Unlike generalist BPO providers who serve multiple industries, SkyFreightSquad works only in freight brokerage and 3PL operations. We are not a staffing agency and not a call center. We are a dedicated freight operations squad that functions as an embedded extension of our clients' teams.
            </p>
          </ScrollAnimation>
        </div>
      </section>


      {/* TEAM */}
      <section className="bg-white py-20 border-t border-[#E2E8F0]">
        <div className="max-w-350 mx-auto px-6">
          <ScrollAnimation>
            <p className="text-xs uppercase tracking-[0.1em] text-[#FF8C00] text-center mb-3 font-bold">THE SQUAD</p>
            <h2 className="text-4xl font-bold text-[#0B1F3A] text-center mb-4">Real Freight Professionals. Not a Generic Service Provider.</h2>
            <p className="text-base text-[#64748B] text-center mb-12 max-w-2xl mx-auto">Every team member at SkyFreightSquad is trained specifically in freight brokerage and 3PL workflows before they touch a client account. We don't cross-train for healthcare or insurance. We do one thing: make freight back offices run without gaps.</p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { initials: "AK", name: "Alex K.", role: "Head of Dispatch Operations", bio: "Former McLeod TMS admin — 8 years at a $60M freight brokerage", tms: ["McLeod", "DAT", "Samsara"] },
              { initials: "SM", name: "Sarah M.", role: "Billing & Finance Lead", bio: "7 years freight invoice processing — handled $40M+ in annual billing for regional 3PL", tms: ["Aljex", "Revenova", "QuickBooks"] },
              { initials: "JR", name: "James R.", role: "Track & Trace Operations Manager", bio: "Former carrier relations coordinator — specialized in LTL exception management for national brokers", tms: ["Turvo", "Rose Rocket", "Motive"] },
            ].map((m) => (
              <ScrollAnimation key={m.initials}>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 hover:-translate-y-1 hover:border-b-2 hover:border-b-[#FF8C00] transition-all">
                  <div className="w-20 h-20 bg-[#2DAAE1]/15 text-[#2DAAE1] font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4">{m.initials}</div>
                  <h4 className="text-lg font-bold text-[#0B1F3A] text-center">{m.name}</h4>
                  <p className="text-sm text-[#FF8C00] font-semibold text-center mt-1">{m.role}</p>
                  <p className="text-sm text-[#64748B] text-center mt-3 italic">{m.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {m.tms.map((n) => (
                      <span key={n} className="border border-[#2DAAE1]/30 rounded-full px-3 py-1.5 text-xs font-semibold text-[#2DAAE1] bg-[#2DAAE1]/[0.08]">{n}</span>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-350 mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-[#0B1F3A] text-center mb-4">What We Hold Ourselves To</h2>
            <p className="text-base text-[#64748B] text-center mb-12 max-w-2xl mx-auto">These aren't company values on a wall. They're the operating principles behind every engagement, every team member, and every decision we make on behalf of our clients.</p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
            {values.map((v, i) => (
              <ScrollAnimation key={v.title} delay={i * 0.05}>
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-[#0B1F3A] mb-3">{v.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{v.body}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION / VISION / CREDENTIALS */}
      <section className="bg-[#0B1F3A] py-20">
        <div className="max-w-350 mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white text-center mb-12">Why We Come to Work</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <ScrollAnimation>
              <div className="bg-[#112240] rounded-2xl p-8 border border-white/[0.08]">
                <p className="text-xs text-[#FF8C00] font-bold uppercase mb-3">Our Mission</p>
                <p className="text-base text-[#94A3B8] leading-relaxed">To make freight back-office operations efficient, visible, and scalable — by building the operational infrastructure that freight brokers and 3PLs need to grow without adding the overhead that typically comes with growth.</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <div className="bg-[#112240] rounded-2xl p-8 border border-white/[0.08]">
                <p className="text-xs text-[#FF8C00] font-bold uppercase mb-3">Our Vision</p>
                <p className="text-base text-[#94A3B8] leading-relaxed">To be the most trusted freight operations squad in the industry — the team behind the teams that move the country's freight forward.</p>
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation>
            <h3 className="text-2xl font-bold text-white text-center mb-8">The Numbers Behind the Squad</h3>
          </ScrollAnimation>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              { value: "5+ Years", label: "of freight-specific dispatch and back-office expertise" },
              { value: "200+", label: "loads managed monthly across active client operations" },
              { value: "150+", label: "carriers actively supported across client networks" },
              { value: "300+", label: "freight brokers and 3PLs running on SkyFreightSquad" },
              { value: "48 hrs", label: "average time from signed agreement to live operations" },
            ].map((m) => (
              <ScrollAnimation key={m.value}>
                <div className="bg-[#112240] rounded-2xl p-6 text-center border border-white/[0.08]">
                  <p className="text-2xl md:text-3xl font-extrabold text-[#2DAAE1]">{m.value}</p>
                  <p className="text-xs text-[#94A3B8] mt-2">{m.label}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-350 mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-[#0B1F3A] text-center mb-12">What Our Clients Say About Us</h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "We stopped losing Friday-night loads within the first week. SkyFreightSquad had our McLeod SOPs configured before the first shift even started. That level of freight-specific knowledge isn't something you find at a generalist BPO.", attr: "James M. — Operations Director, Mid-Size Freight Brokerage, Chicago IL" },
              { quote: "Finally a back-office team that actually knows what a rate confirmation is. They were handling exceptions independently by day three. Our morning reports are clean for the first time in two years.", attr: "Sarah K. — VP Operations, Regional 3PL, Dallas TX" },
              { quote: "The billing alone paid for the service. They caught $14,000 in accessorial overbilling in the first 30 days. That's not back-office support — that's ROI.", attr: "Marcus D. — Owner, Independent Freight Brokerage, Atlanta GA" },
            ].map((t, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 h-full flex flex-col">
                  <p className="text-base text-[#64748B] italic leading-relaxed flex-1">"{t.quote}"</p>
                  <p className="text-sm text-[#0B1F3A] font-semibold mt-6">— {t.attr}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-cta py-20 text-center">
        <div className="max-w-350 mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-4xl font-black text-white mb-4">Ready to Build Something Better?</h2>
            <p className="text-lg text-white/90 mb-4 max-w-2xl mx-auto">Whether you're looking to close a specific operational gap, extend your team's capacity, or rebuild your entire back-office infrastructure — it starts with a single conversation. We'll listen to where you are, where you want to go, and tell you honestly whether SkyFreightSquad is the right fit.</p>
            <p className="text-sm text-white font-bold mb-2">7-Day Pilot — One service. Seven days. Pay nothing if results aren't delivered.</p>
            <p className="text-sm text-white/80 mb-8">No Lock-In — Month-to-month after your pilot. Cancel anytime.</p>
            <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-cta rounded-full px-8 py-4 font-bold hover:bg-gray-50 transition-all">
              Book a Meeting →
            </a>
            <p className="text-sm text-white/75 mt-3 max-w-lg mx-auto">No pitch. No pressure. Just a direct conversation about your operation.</p>
          </ScrollAnimation>
        </div>
      </section>
    </>
  );
}
