import { createFileRoute } from "@tanstack/react-router";
import { ScrollAnimation } from "../components/ScrollAnimation";

const BASE_URL = "https://skyfreightsquad.com";

const articles = [
  { banner: "DISPATCH OPERATIONS", category: "Dispatch", title: "5 Signs Your Freight Brokerage Needs Overnight Dispatch Coverage", excerpt: "If you're losing loads after hours, waking up to missed calls, or burning out your team on weekends, it's time to rethink your coverage model." },
  { banner: "BILLING & INVOICING", category: "Billing", title: "How Billing Errors Are Quietly Killing Your Freight Margins", excerpt: "The average freight brokerage loses 3–5% of revenue to billing errors they never catch. Here's where the money goes and how to stop it." },
  { banner: "3PL GROWTH", category: "Growth", title: "Scaling a 3PL Without Scaling Headcount: The Back-Office Playbook", excerpt: "The fastest-growing 3PLs aren't hiring more back-office staff — they're outsourcing operations to specialized teams that already know their TMS." },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Freight Operations Resources | SkyFreightSquad Blog" },
      { name: "description", content: "Practical guides for freight brokers and 3PL operators. Learn how to eliminate back-office gaps, reduce billing errors, and scale operations without scaling headcount." },
      { property: "og:title", content: "Freight Operations Resources | SkyFreightSquad Blog" },
      { property: "og:description", content: "Practical guides for freight brokers and 3PL operators." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SkyFreightSquad" },
      { property: "og:image", content: "/SkyFreightSquad_Logo_Horizontal_LightBG.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@skyfreightsquad" },
    ],
    links: [
      { rel: "canonical", href: `${BASE_URL}/blog` },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <>
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-350 mx-auto px-6">
          <ScrollAnimation>
            <h1 className="text-4xl md:text-5xl font-black text-[#0B1F3A] mb-4">Freight Operations Resources</h1>
            <p className="text-lg text-[#64748B] mb-16">Practical guides for freight brokers and 3PL operators.</p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((a, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <article className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:-translate-y-1 transition-all hover:border-[#2DAAE1]/40">
                  <div className="bg-[#0B1F3A] h-36 flex items-center justify-center">
                    <span className="text-xs uppercase tracking-[0.08em] text-white font-bold">{a.banner}</span>
                  </div>
                  <div className="p-8">
                    <p className="text-xs text-[#FF8C00] font-bold mb-3">{a.category}</p>
                    <h4 className="text-lg font-bold text-[#0B1F3A] mb-3">{a.title}</h4>
                    <p className="text-sm text-[#64748B] mb-6 leading-relaxed">{a.excerpt}</p>
                    <span className="text-sm text-[#2DAAE1] font-semibold hover:text-[#FF8C00] transition-colors cursor-pointer">Read article →</span>
                  </div>
                </article>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="bg-[#0B1F3A] py-16 text-center">
        <div className="max-w-350 mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to fix your freight back office?</h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-lg mx-auto">Every article we write is based on real problems we solve every day for freight brokers and 3PLs.</p>
            <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#FF8C00] text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-[#E07800] active:scale-[0.97] transition-all">
              Book a Discovery Call →
            </a>
          </ScrollAnimation>
        </div>
      </section>
    </>
  );
}
