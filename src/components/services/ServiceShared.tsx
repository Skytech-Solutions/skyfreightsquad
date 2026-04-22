import { ScrollAnimation } from '../ScrollAnimation';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const tmsList = ['McLeod', 'DAT', 'Samsara', 'Motive', 'Turvo', 'Revenova', 'Rose Rocket', 'Aljex'];

interface MicroStat {
  icon: string;
  stat: string;
  desc: string;
}

export function CredentialCard({ stats }: { stats: MicroStat[] }) {
  return (
    <ScrollAnimation delay={0.2}>
      <div className="bg-navy-card rounded-2xl p-6 border border-white/[0.08] max-w-sm">
        <p className="text-sm text-muted-gray mb-4">Integrated with your tools:</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tmsList.map((t) => (
            <span key={t} className="border border-skyblue/30 rounded-full px-3 py-1.5 text-xs font-semibold text-skyblue bg-skyblue/[0.08] inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-skyblue flex-shrink-0" />
              {t}
            </span>
          ))}
        </div>
        <div className="border-t border-white/10 mb-6" />
        <div className="flex flex-col gap-4">
          {stats.map((s) => (
            <div key={s.stat} className="flex items-center gap-3">
              <span className="text-cta text-base">{s.icon}</span>
              <div>
                <span className="text-sm text-white font-bold">{s.stat}</span>
                <span className="text-xs text-muted-gray ml-2">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollAnimation>
  );
}

export function TmsProof() {
  return (
    <section className="bg-white py-16 border-t border-soft-border">
      <div className="max-w-350 mx-auto px-6">
        <ScrollAnimation>
          <h3 className="text-2xl font-bold text-navy text-center mb-4">Already fluent in the tools you use:</h3>
          <div className="flex justify-center flex-wrap gap-3 mb-6">
            {tmsList.map((t) => (
              <span key={t} className="border border-skyblue/30 rounded-full px-3 py-1.5 text-xs font-semibold text-skyblue bg-skyblue/[0.08] inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-skyblue flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>
          <p className="text-base text-dim-gray text-center">Don't see yours? We'll learn it. Most custom TMS setups configured within 48 hours of onboarding.</p>
        </ScrollAnimation>
      </div>
    </section>
  );
}

export function ServiceScope({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="bg-offwhite py-20">
      <div className="max-w-350 mx-auto px-6">
        <ScrollAnimation>
          <h2 className="text-3xl font-bold text-navy text-center mb-12">{title}</h2>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <ScrollAnimation key={item} delay={i * 0.05}>
              <div className="flex gap-3 items-start">
                <svg className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-base text-navy">{item}</span>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface DetailedScopeItem {
  title: string;
  body: string;
  includes: string;
}

export function DetailedServiceScope({ title, body, items }: { title: string; body?: string; items: DetailedScopeItem[] }) {
  return (
    <section className="bg-offwhite py-20">
      <div className="max-w-350 mx-auto px-6">
        <ScrollAnimation>
          <h2 className="text-3xl font-bold text-navy text-center mb-4">{title}</h2>
          {body && <p className="text-base text-dim-gray text-center mb-12 max-w-2xl mx-auto">{body}</p>}
        </ScrollAnimation>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <ScrollAnimation key={item.title} delay={i * 0.05}>
              <div className="bg-white rounded-2xl p-8 border border-soft-border">
                <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-base text-dim-gray leading-relaxed mb-4">{item.body}</p>
                <div className="flex flex-wrap gap-2">
                  {item.includes.split(' · ').map((inc) => (
                    <span key={inc} className="border border-skyblue/30 rounded-full px-3 py-1.5 text-xs font-semibold text-skyblue bg-skyblue/[0.08]">{inc}</span>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AnswerBlock({ h2, answerBody, subH2, subBody, bullets }: { h2: string; answerBody: string; subH2: string; subBody: string; bullets: string[] }) {
  return (
    <section className="bg-white py-20 border-t border-soft-border">
      <div className="max-w-350 mx-auto px-6">
        <ScrollAnimation>
          <h2 className="text-3xl font-bold text-navy mb-6">{h2}</h2>
          <p className="text-base text-dim-gray leading-relaxed mb-10">{answerBody}</p>
          <h3 className="text-2xl font-bold text-navy mb-4">{subH2}</h3>
          <p className="text-base text-dim-gray leading-relaxed mb-6">{subBody}</p>
          <div className="flex flex-col gap-3">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-cta flex-shrink-0 mt-1" />
                <span className="text-base text-dim-gray">{b}</span>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

export function WhatChanges({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <section className="bg-white py-20 border-t border-soft-border">
      <div className="max-w-350 mx-auto px-6">
        <ScrollAnimation>
          <h2 className="text-3xl font-bold text-navy mb-8">{title}</h2>
          <div className="flex flex-col gap-4">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" />
                <span className="text-base text-dim-gray leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

export function ServiceFAQ({ title, faqs }: { title: string; faqs: { q: string; a: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-offwhite py-20">
      <div className="max-w-350 mx-auto px-6">
        <ScrollAnimation>
          <h2 className="text-3xl font-bold text-navy text-center mb-12">{title}</h2>
        </ScrollAnimation>
        <ScrollAnimation>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-soft-border py-5">
              <button
                onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
                className="flex justify-between items-center w-full text-left cursor-pointer"
              >
                <span className="text-base font-semibold text-navy pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-dim-gray flex-shrink-0 transition-transform duration-200 ${activeIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${activeIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-base text-dim-gray pt-3 pb-2 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </ScrollAnimation>
      </div>
    </section>
  );
}

export function ServiceCTA({ headline, body, pilotTag, guarantee, cta, microCopy, pills }: {
  headline: string;
  body?: string;
  pilotTag?: string;
  guarantee?: string;
  cta: string;
  microCopy?: string;
  pills: string[];
}) {
  return (
    <section className="bg-cta py-20">
      <div className="max-w-350 mx-auto px-6 text-center">
        <ScrollAnimation>
          <h2 className="text-4xl font-black text-white mb-4">{headline}</h2>
          {body && <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">{body}</p>}
          {pilotTag && <p className="text-sm text-white font-bold mb-2">{pilotTag}</p>}
          {guarantee && <p className="text-sm text-white/80 mb-8">{guarantee}</p>}
          <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-cta rounded-full px-8 py-4 font-bold hover:bg-gray-50 transition-all active:scale-[0.97]">
            {cta}
          </a>
          {microCopy && <p className="text-sm text-white/75 mt-3 max-w-lg mx-auto">{microCopy}</p>}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {pills.map((p) => (
              <span key={p} className="border border-white/30 rounded-full px-4 py-2 text-sm text-white bg-white/10">{p}</span>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}