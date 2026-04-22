import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollAnimation } from "../components/ScrollAnimation";
import { Calendar, Mail, Phone, Check } from "lucide-react";
import { submitFormEntry } from "../server/submissions";

const BASE_URL = "https://skyfreightsquad.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SkyFreightSquad | Start Your 7-Day Pilot" },
      { name: "description", content: "Talk to SkyFreightSquad about your freight back-office needs. Book a discovery call, submit a form, or call directly. Response within 1 business hour." },
      { property: "og:title", content: "Contact SkyFreightSquad | Start Your 7-Day Pilot" },
      { property: "og:description", content: "Talk to SkyFreightSquad about your freight back-office needs. Response within 1 business hour." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SkyFreightSquad" },
      { property: "og:image", content: "/SkyFreightSquad_Logo_Horizontal_LightBG.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@skyfreightsquad" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [challenge, setChallenge] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "loading") return;
    setFormState("loading");
    setErrorMsg("");
    try {
      const res = await submitFormEntry({
        data: {
          source: "contact",
          name,
          email,
          message,
          payload: challenge ? { challenge } : undefined,
        },
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
        setErrorMsg(
          res.error === "rate_limited"
            ? "Too many submissions from your location — try again in a few minutes."
            : "Something went wrong. Please try again or email us directly.",
        );
      }
    } catch {
      setFormState("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="bg-[#0B1F3A] pb-20 pt-40">
        <div className="max-w-350 mx-auto px-6 text-center">
          <ScrollAnimation>
            <p className="text-[#2DAAE1] uppercase text-xs mb-3 font-bold tracking-wider">Let's talk about your operation</p>
            <h1 className="text-4xl md:text-5xl font-black text-white max-w-3xl mx-auto">One Conversation. A Dedicated Freight Squad Within 48 Hours.</h1>
            <p className="text-lg text-[#94A3B8] mt-4 max-w-3xl mx-auto">No pitch. No pressure. We'll map your operation and tell you honestly whether SkyFreightSquad is the right fit.</p>
            <p className="text-base text-[#94A3B8] mt-4 max-w-3xl mx-auto">
              The discovery call is 45 minutes. We listen to where you are, where you want to go, and what gaps are costing you the most. If SkyFreightSquad is the right fit, we're live within 48 hours. If not, you walk away with a clear picture of where your operation needs work — at no cost.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* 3 CONTACT PATHS */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-350 mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-[#0B1F3A] text-center mb-10">Choose How You Want to Connect</h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Path A — Book */}
            <ScrollAnimation>
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center h-full">
                <Calendar className="w-8 h-8 text-[#FF8C00] mx-auto mb-4" />
                <h4 className="text-lg font-bold text-[#0B1F3A] mb-2">Book a Discovery Call</h4>
                <p className="text-sm text-[#64748B] mb-6">45-minute conversation. Map your workflows, identify your gaps, get a custom coverage plan. Most clients are live within 48 hours of this call.</p>
                <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#FF8C00] text-white rounded-full py-3 font-bold text-sm hover:bg-[#E07800] transition-all text-center">
                  Open Calendar →
                </a>
                <p className="text-xs text-[#94A3B8] mt-3">We respond within 1 business hour. Most clients are live within 48 hours of the first call.</p>
              </div>
            </ScrollAnimation>

            {/* Path B — Form */}
            <ScrollAnimation delay={0.1}>
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 h-full">
                <Mail className="w-8 h-8 text-[#2DAAE1] mx-auto mb-4" />
                <h4 className="text-lg font-bold text-[#0B1F3A] text-center mb-2">Send Us a Message</h4>
                <p className="text-sm text-[#64748B] text-center mb-6">Prefer to provide context first? Fill in the form and we'll reach out within 1 business hour.</p>
                {formState !== "success" ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="sr-only" htmlFor="contact-name">Name</label>
                    <input id="contact-name" type="text" placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)} disabled={formState === "loading"} className="border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm focus:border-[#2DAAE1] focus:outline-none w-full disabled:opacity-60" />
                    <label className="sr-only" htmlFor="contact-email">Email</label>
                    <input id="contact-email" type="email" placeholder="Your email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={formState === "loading"} className="border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm focus:border-[#2DAAE1] focus:outline-none w-full disabled:opacity-60" />
                    <label className="sr-only" htmlFor="contact-challenge">Biggest back-office challenge</label>
                    <select id="contact-challenge" value={challenge} onChange={(e) => setChallenge(e.target.value)} disabled={formState === "loading"} className="border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm focus:border-[#2DAAE1] focus:outline-none w-full bg-white text-[#64748B] disabled:opacity-60">
                      <option value="">Biggest back-office challenge</option>
                      <option value="dispatch">After-Hours Dispatch</option>
                      <option value="tracking">Track & Trace</option>
                      <option value="billing">Billing & Invoicing</option>
                      <option value="support">Customer Support</option>
                      <option value="all">All of the Above</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                    <label className="sr-only" htmlFor="contact-message">Message</label>
                    <textarea id="contact-message" rows={4} placeholder="Tell us about your operation..." required value={message} onChange={(e) => setMessage(e.target.value)} disabled={formState === "loading"} className="border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm focus:border-[#2DAAE1] focus:outline-none w-full resize-none disabled:opacity-60" />
                    {formState === "error" && errorMsg && (
                      <p className="text-sm text-red-600 -mt-1">{errorMsg}</p>
                    )}
                    <button type="submit" disabled={formState === "loading"} className="w-full bg-[#2DAAE1] text-white rounded-full py-3 font-bold text-sm hover:bg-[#1a8fc0] transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                      {formState === "loading" ? "Sending..." : "Send My Message →"}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <Check className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-[#0B1F3A]">You're in.</h4>
                    <p className="text-sm text-[#64748B] mt-2">Check your email for confirmation. We'll be in touch within 1 business hour.</p>
                  </div>
                )}
              </div>
            </ScrollAnimation>

            {/* Path C — Call */}
            <ScrollAnimation delay={0.2}>
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center h-full">
                <Phone className="w-8 h-8 text-[#FF8C00] mx-auto mb-4" />
                <h4 className="text-lg font-bold text-[#0B1F3A] mb-2">Call Us Directly</h4>
                <p className="text-sm text-[#64748B] mb-6">Available Monday–Friday 8 AM–6 PM EST. After-hours voicemail responded to within 1 business hour next business day.</p>
                <a href="tel:+1XXXXXXXXXX" className="text-2xl text-[#0B1F3A] font-bold block mb-2">+1 (XXX) XXX-XXXX</a>
                <p className="text-sm text-[#64748B]">Monday–Friday · 8 AM–6 PM EST</p>
                <div className="mt-6 mb-6 border-t border-[#E2E8F0]" />
                <p className="text-xs text-[#94A3B8]">Email us anytime:</p>
                <a href="mailto:hello@skyfreightsquad.com" className="text-sm text-[#2DAAE1] hover:underline">hello@skyfreightsquad.com</a>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="bg-white py-20 border-t border-[#E2E8F0]">
        <div className="max-w-2xl mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-[#0B1F3A] text-center mb-12">What Happens After You Reach Out</h2>
          </ScrollAnimation>
          <div className="flex flex-col gap-6">
            {[
              { num: "1", title: "Response within 1 business hour", body: "Every form submission and call request responded to within 1 business hour during business days." },
              { num: "2", title: "45-minute discovery call", body: "We map your workflows, TMS environment, coverage gaps, and team structure. No commitment required." },
              { num: "3", title: "Custom coverage plan delivered", body: "Within 24 hours of the discovery call, you receive a tailored operations plan with defined coverage, escalation paths, and SLAs." },
              { num: "4", title: "Live within 48 hours", body: "TMS access configured, SOPs reviewed, squad assigned. Your coverage is live — no ramp-up period." },
            ].map((s) => (
              <ScrollAnimation key={s.num}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FF8C00] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">{s.num}</div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0B1F3A]">{s.title}</h4>
                    <p className="text-sm text-[#64748B] mt-1">{s.body}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
          <ScrollAnimation>
            <div className="mt-10 text-center">
              <p className="text-sm text-[#FF8C00] font-bold">7-Day Pilot — Your first engagement. Pay nothing if we don't deliver measurable results in your first week.</p>
              <p className="text-sm text-[#64748B] mt-2">No Lock-In — Month-to-month after your pilot. Cancel anytime.</p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

    </>
  );
}
