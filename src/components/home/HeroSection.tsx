import { ScrollAnimation } from '../ScrollAnimation';
import { Link } from '@tanstack/react-router';

export function HeroSection() {
  return (
    <section className="hero-section bg-navy min-h-[92vh] flex items-center pt-16 max-w-full overflow-x-hidden">
      <div className="hero-container mx-auto w-full lg:px-8 sm:px-0">
        <div className="hero-grid items-center min-w-0 max-w-full">
          <ScrollAnimation className="max-w-full">
            <div className=" max-w-full">
              <div className="hero-eyebrow mb-4 sm:mb-6 inline-flex items-center gap-2 border border-cta/40 rounded-full px-3 sm:px-4 py-1.5 bg-cta/[0.06] animate-pulse-slow max-w-full overflow-hidden">
                <span className="text-cta truncate">✦ Rated #1 Freight BPO · BBB Accredited</span>
              </div>

              <h1 className="hero-h1 font-black text-white">
                The Freight Back-Office Built Exclusively for{' '}
                <span className="text-cta">Brokers &amp; 3PLs</span>
              </h1>

              <p className="hero-subheadline text-muted-gray">
                24/7 dispatch, track &amp; trace, billing, and customer support — running inside your TMS, your SOPs, your standards. Not ours.
              </p>

              <div className="hero-cta-buttons flex gap-3">
                <a href="https://api.leadconnectorhq.com/widget/bookings/meetings-skyfreightsquad" target="_blank" rel="noopener noreferrer" className="hero-cta-primary bg-cta text-white rounded-full font-bold hover:bg-cta-hover active:scale-[0.97] transition-all text-center">
                  Start Your 7-Day Pilot →
                </a>
                <Link to="/how-it-works" className="hero-cta-secondary border-2 border-skyblue text-skyblue rounded-full font-bold hover:bg-skyblue hover:text-white transition-all text-center">
                  See How It Works
                </Link>
              </div>

              <p className="hero-microcopy text-muted-gray">No commitment required. We respond same day.</p>

              <div className="mt-8 lg:mt-12 max-w-full">
                <p className="text-xs text-muted-gray mb-3">Trained on the tools you already use:</p>
                <div className="hero-trust-bar flex flex-wrap gap-2">
                  {['McLeod', 'DAT', 'Samsara', 'Motive', 'Rose Rocket', 'Aljex'].map((name) => (
                    <span key={name} className="border border-skyblue/30 rounded-full px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold text-skyblue bg-skyblue/[0.08] inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-skyblue" />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.2} className="hero-right-col hidden lg:flex items-center justify-center">
            <NetworkAnimation />
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

function NetworkAnimation() {
  // Logistics network: hub + satellite nodes with traveling signal pulses
  const nodes = [
    { id: 'hub', cx: 220, cy: 180, r: 14, label: 'OPS' },
    { id: 'n1', cx: 80, cy: 70, r: 9 },
    { id: 'n2', cx: 360, cy: 70, r: 9 },
    { id: 'n3', cx: 50, cy: 200, r: 9 },
    { id: 'n4', cx: 390, cy: 200, r: 9 },
    { id: 'n5', cx: 90, cy: 320, r: 9 },
    { id: 'n6', cx: 350, cy: 320, r: 9 },
    { id: 'n7', cx: 220, cy: 40, r: 8 },
    { id: 'n8', cx: 220, cy: 340, r: 8 },
  ];
  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const links = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8'];

  return (
    <div className="w-full max-w-[460px]">
      <svg viewBox="0 0 440 380" className="w-full h-auto">
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
          </radialGradient>
          <style>{`
            @keyframes nodePulseA { 0%,100%{opacity:.35} 50%{opacity:1} }
            .np { animation: nodePulseA 2.4s ease-in-out infinite; transform-origin: center; }
          `}</style>
        </defs>

        {/* Hub glow */}
        <circle cx={220} cy={180} r={70} fill="url(#hubGlow)" />

        {/* Connection lines */}
        {links.map((id) => (
          <line key={id} x1={map.hub.cx} y1={map.hub.cy} x2={map[id].cx} y2={map[id].cy}
                stroke="#2DAAE1" strokeWidth={1.2} opacity={0.35} />
        ))}

        {/* Outer satellite nodes */}
        {links.map((id, i) => (
          <circle key={id} cx={map[id].cx} cy={map[id].cy} r={map[id].r}
                  fill="#0B1F3A" stroke="#2DAAE1" strokeWidth={2}
                  className="np" style={{ animationDelay: `${(i * 0.3).toFixed(1)}s` }} />
        ))}

        {/* Hub */}
        <circle cx={220} cy={180} r={20} fill="#0B1F3A" stroke="#FF8C00" strokeWidth={3} />
        <circle cx={220} cy={180} r={6} fill="#FF8C00" />

        {/* Traveling signal pulses (orange dots moving along lines toward hub) */}
        {links.map((id, i) => (
          <circle key={`p-${id}`} r={3.5} fill="#FF8C00">
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              begin={`${(i * 0.35).toFixed(2)}s`}
              path={`M${map[id].cx},${map[id].cy} L${map.hub.cx},${map.hub.cy}`}
            />
            <animate attributeName="opacity" values="0;1;1;0" dur="2.8s"
                     begin={`${(i * 0.35).toFixed(2)}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}
