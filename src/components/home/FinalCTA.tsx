import { useState } from 'react';
import { ScrollAnimation } from '../ScrollAnimation';
import { CheckCircle } from 'lucide-react';

export function FinalCTA() {
  const [formState, setFormState] = useState<'idle' | 'sent'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sent');
  };

  return (
    <section className="bg-cta py-24">
      <div className="max-w-350 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <ScrollAnimation>
            <p className="text-xs uppercase tracking-[0.1em] text-white/80 font-bold mb-4">READY TO GET STARTED?</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              One Conversation. A Dedicated Freight Squad Within 48 Hours.
            </h2>
            <p className="text-lg text-white/90 mb-6 leading-relaxed">
              No pitch. No pressure. We'll map your current operation, identify where the biggest gaps are, and tell you honestly whether SkyFreightSquad is the right fit.
            </p>
            <p className="text-base font-bold text-white mb-3">
              7-Day Pilot — Pay nothing if we don't deliver measurable results in your first week.
            </p>
            <p className="text-sm text-white/85">
              No Lock-In — Month-to-month after your pilot. Cancel anytime.
            </p>
          </ScrollAnimation>

          {/* Right column — form */}
          <ScrollAnimation delay={0.15}>
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {formState === 'idle' ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h4 className="text-xl font-bold text-navy mb-2">Book My Free Discovery Call</h4>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-offwhite border border-soft-border rounded-lg px-4 py-3 text-navy placeholder-dim-gray text-sm focus:border-cta focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-offwhite border border-soft-border rounded-lg px-4 py-3 text-navy placeholder-dim-gray text-sm focus:border-cta focus:outline-none"
                  />
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    className="bg-offwhite border border-soft-border rounded-lg px-4 py-3 text-navy text-sm focus:border-cta focus:outline-none"
                  >
                    <option value="">Select a service...</option>
                    <option value="dispatch">24/7 Dispatch</option>
                    <option value="track">Track & Trace</option>
                    <option value="billing">Billing & Invoicing</option>
                    <option value="support">Customer Support</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                  <button type="submit" className="w-full bg-cta text-white rounded-full py-4 font-bold text-sm hover:bg-cta-hover active:scale-[0.97] transition-all">
                    Book My Free Discovery Call →
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                  <h4 className="text-lg font-bold text-navy">You're in.</h4>
                  <p className="text-sm text-dim-gray mt-2">Check your email for confirmation. We'll be in touch within 1 business hour.</p>
                </div>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
