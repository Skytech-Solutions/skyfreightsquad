import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { X } from "lucide-react";

export function ExitIntentOverlay() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const close = useCallback(() => {
    setShow(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sfq_exit_shown", "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don't show on /assessment
    if (location.pathname === "/assessment") return;

    const canShow = () => {
      return (
        sessionStorage.getItem("sfq_exit_shown") !== "true" &&
        sessionStorage.getItem("sfq_cta_clicked") !== "true"
      );
    };

    let ready = false;

    const readyTimer = setTimeout(() => {
      ready = true;
    }, 15000);

    const trigger = () => {
      if (!ready || !canShow()) return;
      setShow(true);
      sessionStorage.setItem("sfq_exit_shown", "true");
    };

    // Desktop: mouse leaves top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) trigger();
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    // Mobile: 40s inactivity
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;
    const resetInactivity = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        trigger();
      }, 40000);
    };

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      resetInactivity();
      window.addEventListener("scroll", resetInactivity);
      window.addEventListener("click", resetInactivity);
      window.addEventListener("touchstart", resetInactivity);
    }

    return () => {
      clearTimeout(readyTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (inactivityTimer) clearTimeout(inactivityTimer);
      if (isMobile) {
        window.removeEventListener("scroll", resetInactivity);
        window.removeEventListener("click", resetInactivity);
        window.removeEventListener("touchstart", resetInactivity);
      }
    };
  }, [location.pathname]);

  if (!show) return null;

  // Get savings figure
  let savingsFigure = "$384,948";
  let usedCalculator = false;
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("sfq_roi_savings");
    if (stored) {
      const val = Number(stored);
      if (!isNaN(val) && val >= 10000) {
        savingsFigure = "$" + Math.round(val).toLocaleString("en-US");
        usedCalculator = true;
      }
    }
  }

  const headline = usedCalculator
    ? `Your operation could save ${savingsFigure} in Year 1.`
    : `Operations like yours save an average of ${savingsFigure} in Year 1.`;

  const handleCTA = () => {
    sessionStorage.setItem("sfq_cta_clicked", "true");
    close();
    navigate({ to: "/contact" });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
      onClick={close}
    >
      <div
        className="relative bg-[#0B1F3A] rounded-2xl p-8 md:p-10 max-w-[480px] w-full animate-[fadeScaleIn_300ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={close} className="absolute top-4 right-4 text-white opacity-60 hover:opacity-100 transition-opacity">
          <X className="w-6 h-6" />
        </button>

        <p className="text-[#2DAAE1] uppercase text-[11px] font-bold tracking-[0.1em] mb-3">BEFORE YOU GO</p>
        <h2 className="text-2xl font-bold text-white leading-snug">{headline}</h2>
        <p className="text-[#94A3B8] text-base mt-3">
          A 7-day pilot shows you exactly how. Pay nothing if we don't deliver measurable results.
        </p>

        <div className="border-t border-white/10 my-6" />

        <div className="bg-[#112240] rounded-lg p-4">
          <p className="text-[#FF8C00] text-xs uppercase font-bold tracking-wider mb-2">7-DAY PILOT</p>
          <p className="text-white text-[15px]">Start this week. Pay nothing if measurable results aren't delivered in your first 7 days.</p>
        </div>

        <p className="text-[#94A3B8] text-[13px] mt-3">Month-to-month after pilot. No lock-in. Cancel anytime.</p>

        <button
          onClick={handleCTA}
          className="mt-6 w-full bg-[#FF8C00] text-white rounded-full py-4 font-bold text-sm hover:bg-[#E07800] active:scale-[0.97] transition-all"
        >
          Start My Pilot →
        </button>

        <p onClick={close} className="text-[#94A3B8] text-[13px] text-center mt-4 cursor-pointer hover:text-white transition-colors">
          No thanks, I'll figure it out myself
        </p>
      </div>
    </div>
  );
}
