import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { ScrollAnimation } from "../components/ScrollAnimation";

const BASE_URL = "https://skyfreightsquad.com";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Free Back-Office Assessment | SkyFreightSquad" },
      { name: "description", content: "Take the 2-minute coverage gap assessment. Find out exactly where your freight back-office is costing you — and which service will have the highest impact." },
      { property: "og:title", content: "Free Back-Office Assessment | SkyFreightSquad" },
      { property: "og:description", content: "Take the 2-minute coverage gap assessment. Find out exactly where your freight back-office is costing you." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SkyFreightSquad" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/assessment` }],
  }),
  component: AssessmentPage,
});

type Answers = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
};

const questions = [
  {
    key: "q1" as const,
    text: "What best describes your operation?",
    options: [
      { label: "Freight Broker", value: "broker" },
      { label: "3PL Provider", value: "3pl" },
      { label: "Asset-Based Carrier or Fleet Operator", value: "carrier" },
      { label: "Shipper with Private or Contracted Fleet", value: "shipper" },
    ],
  },
  {
    key: "q2" as const,
    text: "Where are your biggest back-office gaps right now?",
    options: [
      { label: "After-hours coverage — loads going uncovered overnight and on weekends", value: "dispatch" },
      { label: "Load visibility — exceptions and delays we're not catching fast enough", value: "tracking" },
      { label: "Billing errors and slow payments — DSO is higher than it should be", value: "billing" },
      { label: "Customer response times — we're not answering fast enough", value: "support" },
    ],
  },
  {
    key: "q3" as const,
    text: "How many loads does your operation move per week?",
    options: [
      { label: "Under 50 loads/week", value: "tier1" },
      { label: "50–200 loads/week", value: "tier2" },
      { label: "200–500 loads/week", value: "tier3" },
      { label: "500+ loads/week", value: "tier4" },
    ],
  },
  {
    key: "q4" as const,
    text: "How are you currently handling back-office operations?",
    options: [
      { label: "Entirely in-house — our own staff handles everything", value: "inhouse" },
      { label: "Mix of in-house and some outsourcing", value: "mixed" },
      { label: "Mostly outsourced but it's not working well", value: "outsourced_bad" },
      { label: "It's not properly covered — it's a real problem", value: "uncovered" },
    ],
  },
  {
    key: "q5" as const,
    text: "What keeps you up at night about your freight operation?",
    options: [
      { label: "Missing loads after hours and losing revenue", value: "fear_dispatch" },
      { label: "Billing errors quietly draining cash flow", value: "fear_billing" },
      { label: "Customers leaving because we're too slow to respond", value: "fear_support" },
      { label: "All of the above — the whole back-office needs fixing", value: "fear_all" },
    ],
  },
];

function getRecommendedService(answers: Answers) {
  if (answers.q5 === "fear_all") return "Full Back-Office Coverage (Growth Plan)";
  const map: Record<string, string> = {
    dispatch: "24/7 Dispatch & After-Hours Coverage",
    tracking: "Track & Trace / Exception Management",
    billing: "Billing & Invoice Processing",
    support: "Customer Support & Queue Triage",
  };
  return map[answers.q2] || "Full Back-Office Coverage (Growth Plan)";
}

function getScore(answers: Answers) {
  let score = 0;
  const q3Map: Record<string, number> = { tier1: 1, tier2: 2, tier3: 3, tier4: 4 };
  const q4Map: Record<string, number> = { inhouse: 2, mixed: 1, outsourced_bad: 3, uncovered: 4 };
  const q5Map: Record<string, number> = { fear_dispatch: 1, fear_billing: 1, fear_support: 1, fear_all: 3 };
  score += q3Map[answers.q3] || 0;
  score += q4Map[answers.q4] || 0;
  score += q5Map[answers.q5] || 0;
  return score;
}

function getScoreLabel(score: number) {
  if (score <= 4) return { label: "Moderate Gap", color: "#FF8C00" };
  if (score <= 7) return { label: "Significant Gap", color: "#E07800" };
  return { label: "Critical Gap", color: "#DC2626" };
}

function getInsight(service: string) {
  const insights: Record<string, string> = {
    "24/7 Dispatch & After-Hours Coverage": "Operations running at your volume without 24/7 dispatch coverage are losing an estimated 15–22% of after-hours tender opportunities. That's revenue that's going to competitors who pick up the phone.",
    "Track & Trace / Exception Management": "At your load volume, reactive exception management typically costs 8–12% more in detention charges and customer escalations than proactive monitoring. Every exception that arrives as a surprise is an avoidable cost.",
    "Billing & Invoice Processing": "Freight brokerages at your scale typically have a 3–5% billing error rate going undetected. On 200+ loads per week that compounds into tens of thousands in annual revenue leakage.",
    "Customer Support & Queue Triage": "Response time is the single most cited reason freight shippers switch brokers. At your volume, an unmanaged support queue is a silent churn driver that's hard to reverse once customers leave.",
    "Full Back-Office Coverage (Growth Plan)": "Your operation has gaps across multiple back-office functions. The highest-impact starting point is a Growth Plan engagement — covering dispatch, tracking, and billing in a single embedded squad.",
  };
  return insights[service] || insights["Full Back-Office Coverage (Growth Plan)"];
}

function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  // Results form state
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const currentQ = questions[step];

  const handleSelect = useCallback((value: string) => {
    setSelectedOption(value);
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedOption || !currentQ) return;
    const newAnswers = { ...answers, [currentQ.key]: selectedOption };
    setAnswers(newAnswers);
    setSelectedOption(null);
    setDirection("forward");

    if (step === questions.length - 1) {
      setShowResults(true);
    } else {
      setStep((s) => s + 1);
      // Pre-select if answer exists
      const nextKey = questions[step + 1]?.key;
      if (nextKey && newAnswers[nextKey]) {
        setSelectedOption(newAnswers[nextKey]!);
      }
    }
  }, [selectedOption, currentQ, answers, step]);

  const handleBack = useCallback(() => {
    if (step === 0) return;
    setDirection("back");
    const prevStep = step - 1;
    setStep(prevStep);
    const prevKey = questions[prevStep].key;
    setSelectedOption(answers[prevKey] || null);
  }, [step, answers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;

    const fullAnswers = answers as Answers;
    const score = getScore(fullAnswers);
    const scoreInfo = getScoreLabel(score);
    const service = getRecommendedService(fullAnswers);

    // Populate hidden form fields
    const setField = (id: string, val: string) => {
      const el = document.getElementById(id) as HTMLInputElement | null;
      if (el) el.value = val;
    };
    setField("ghl-firstName", firstName.trim());
    setField("ghl-email", email.trim());
    setField("ghl-op", fullAnswers.q1);
    setField("ghl-gap", fullAnswers.q2);
    setField("ghl-loads", fullAnswers.q3);
    setField("ghl-handling", fullAnswers.q4);
    setField("ghl-fear", fullAnswers.q5);
    setField("ghl-score", scoreInfo.label);
    setField("ghl-service", service);
    // Duplicate fields
    setField("ghl-op2", fullAnswers.q1);
    setField("ghl-gap2", fullAnswers.q2);
    setField("ghl-loads2", fullAnswers.q3);
    setField("ghl-handling2", fullAnswers.q4);
    setField("ghl-fear2", fullAnswers.q5);
    setField("ghl-score2", scoreInfo.label);
    setField("ghl-service2", service);

    // Submit via hidden form → iframe (no CORS issues)
    const form = document.getElementById("ghl-hidden-form") as HTMLFormElement | null;
    if (form) form.submit();

    setSubmitState("success");
  };

  const fullAnswers = answers as Answers;
  const score = showResults ? getScore(fullAnswers) : 0;
  const scoreInfo = showResults ? getScoreLabel(score) : { label: "", color: "" };
  const recommendedService = showResults ? getRecommendedService(fullAnswers) : "";

  return (
    <>
      {/* HERO */}
      <section className="bg-[#0B1F3A] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollAnimation>
            <p className="text-[#2DAAE1] uppercase text-xs mb-3 font-bold tracking-[0.1em]">FREE 2-MINUTE ASSESSMENT</p>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Is Your Freight Back-Office Costing You More Than You Think?
            </h1>
            <p className="text-lg text-[#94A3B8] mt-4 max-w-xl mx-auto">
              Answer 5 questions. Get a personalised coverage gap score and a specific service recommendation — based on how your operation actually runs.
            </p>
            <p className="text-sm text-[#64748B] mt-3">Taken by 300+ freight brokers and 3PLs across the US</p>
          </ScrollAnimation>
        </div>
      </section>

      {/* QUIZ */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
            {!showResults ? (
              <div className="p-6 md:p-8">
                {/* Back link */}
                {step > 0 && (
                  <button onClick={handleBack} className="text-sm text-[#2DAAE1] hover:underline mb-4 inline-flex items-center gap-1">
                    ← Back
                  </button>
                )}

                {/* Progress bar */}
                <div className="mb-6">
                  <p className="text-xs text-[#64748B] mb-2">Question {step + 1} of {questions.length}</p>
                  <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF8C00] rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div
                  key={step}
                  className={`transition-all duration-300 ease-in-out ${direction === "forward" ? "animate-[slideInRight_300ms_ease-in-out]" : "animate-[slideInLeft_300ms_ease-in-out]"}`}
                >
                  <h2 className="text-xl font-semibold text-[#0B1F3A] mb-6">{currentQ.text}</h2>

                  <div className="flex flex-col gap-3">
                    {currentQ.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                          selectedOption === opt.value
                            ? "border-[#FF8C00] bg-[#FFF7ED] text-[#0B1F3A]"
                            : "border-[#E2E8F0] bg-white text-[#334155] hover:border-[#CBD5E1]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Next button */}
                {selectedOption && (
                  <button
                    onClick={handleNext}
                    className="mt-6 w-full bg-[#FF8C00] text-white rounded-full py-4 font-bold text-sm hover:bg-[#E07800] active:scale-[0.97] transition-all"
                  >
                    {step === questions.length - 1 ? "See My Results →" : "Next →"}
                  </button>
                )}
              </div>
            ) : (
              /* RESULTS */
              <div className="animate-[fadeScaleIn_400ms_ease-out]">
                {/* Score header */}
                <div className="bg-[#0B1F3A] p-6 md:p-8 text-center">
                  <div
                    className="inline-block rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider text-white mb-3"
                    style={{ backgroundColor: scoreInfo.color }}
                  >
                    {scoreInfo.label}
                  </div>
                  <p className="text-sm text-[#94A3B8]">Your Coverage Gap Score</p>
                  <p className="text-xs text-[#64748B] mt-1">Based on your operation profile</p>
                </div>

                {/* Recommendation */}
                <div className="p-6 md:p-8">
                  <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">Your Recommended Starting Point:</h3>
                  <p className="text-xl font-bold text-[#2DAAE1] mb-4">{recommendedService}</p>
                  <p className="text-sm text-[#64748B] leading-relaxed">{getInsight(recommendedService)}</p>

                  {/* Email capture */}
                  {submitState === "success" ? (
                    <div className="mt-8 bg-[#F0FDF4] border border-green-200 rounded-xl p-6 text-center">
                      <p className="text-green-700 font-bold">You're in.</p>
                      <p className="text-sm text-green-600 mt-2">Check your inbox — your results report is on its way. We'll be in touch within 1 business hour.</p>
                    </div>
                  ) : submitState === "error" ? (
                    <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                      <p className="text-red-700 font-bold text-sm">Something went wrong sending your results.</p>
                      <Link to="/contact" className="text-sm text-[#2DAAE1] hover:underline mt-2 inline-block">You can book a call directly instead →</Link>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                      <input
                        type="text"
                        placeholder="First name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm focus:border-[#2DAAE1] focus:outline-none"
                      />
                      <input
                        type="email"
                        placeholder="Enter your email to get your full results report"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm focus:border-[#2DAAE1] focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={submitState === "loading"}
                        className="w-full bg-[#FF8C00] text-white rounded-full py-4 font-bold text-sm hover:bg-[#E07800] active:scale-[0.97] transition-all disabled:opacity-60"
                      >
                        {submitState === "loading" ? "Sending..." : "Send My Results →"}
                      </button>
                      <p className="text-xs text-[#94A3B8] text-center">Your results will be emailed to you. No spam. Unsubscribe anytime.</p>
                      <div className="text-center">
                        <Link to="/contact" className="text-sm text-[#2DAAE1] hover:underline">Just book a call directly →</Link>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hidden iframe + form for GHL submission (avoids CORS) */}
      <iframe
        name="ghl-submission-frame"
        id="ghl-submission-frame"
        style={{ display: 'none', width: 0, height: 0, border: 'none' }}
        title="form-submission"
      />
      <form
        id="ghl-hidden-form"
        action="https://api.leadconnectorhq.com/widget/form/2WIqicR0ges9j2W8sqOo"
        method="POST"
        target="ghl-submission-frame"
        style={{ display: 'none' }}
      >
        <input type="hidden" name="firstName" id="ghl-firstName" />
        <input type="hidden" name="email" id="ghl-email" />
        <input type="hidden" name="phone" id="ghl-phone" defaultValue="" />
        <input type="hidden" name="customField_operation_type" id="ghl-op" />
        <input type="hidden" name="customField_biggest_gap" id="ghl-gap" />
        <input type="hidden" name="customField_loads_per_week" id="ghl-loads" />
        <input type="hidden" name="customField_current_handling" id="ghl-handling" />
        <input type="hidden" name="customField_biggest_fear" id="ghl-fear" />
        <input type="hidden" name="customField_coverage_gap_score" id="ghl-score" />
        <input type="hidden" name="customField_recommended_service" id="ghl-service" />
        <input type="hidden" name="customField_lead_source" id="ghl-source" defaultValue="Coverage Gap Assessment Quiz" />
        {/* Duplicate field names for GHL compatibility */}
        <input type="hidden" name="operation_type" id="ghl-op2" />
        <input type="hidden" name="biggest_gap" id="ghl-gap2" />
        <input type="hidden" name="loads_per_week" id="ghl-loads2" />
        <input type="hidden" name="current_handling" id="ghl-handling2" />
        <input type="hidden" name="biggest_fear" id="ghl-fear2" />
        <input type="hidden" name="coverage_gap_score" id="ghl-score2" />
        <input type="hidden" name="recommended_service" id="ghl-service2" />
        <input type="hidden" name="lead_source" id="ghl-source2" defaultValue="Coverage Gap Assessment Quiz" />
      </form>
    </>
  );
}
