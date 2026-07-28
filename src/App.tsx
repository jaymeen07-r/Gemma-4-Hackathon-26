import { useState, useRef, useEffect } from "react";
import Footer from "./componants/Footer";
import icon from "./assets/icon.png";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SharedCases from "./pages/SharedCases";
import Team from "./pages/Team";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Upload01Icon,
  Attachment01Icon,
  ArrowDown02Icon,
} from "@hugeicons/core-free-icons";
const API_URL = import.meta.env.VITE_API_URL;
// ─── Types ─────────────────────────────────────────────────────────────────────

type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function RiskBadge({ level }: { level: string }) {
  const map = {
    HIGH: {
      bg: "#1a0505",
      text: "#ef5350",
      border: "#3a0a0a",
    },
    MEDIUM: {
      bg: "#1a1200",
      text: "#f59e0b",
      border: "#3a2800",
    },
    LOW: {
      bg: "#051a05",
      text: "#4caf50",
      border: "#0a3a0a",
    },
    UNKNOWN: {
      bg: "#111111",
      text: "#999999",
      border: "#333333",
    },
  };

  const c = map[level as keyof typeof map] ?? map.UNKNOWN;

  return (
    <span
      className="text-xs font-mono font-semibold px-2 py-0.5 border"
      style={{
        backgroundColor: c.bg,
        color: c.text,
        borderColor: c.border,
      }}
    >
      {level}
    </span>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Team", path: "/team" },
    { label: "Shared Cases", path: "/sharedcases" },
    { label: "Contact", path: "/contact" },
  ];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: "#0a0a0aee",
        backdropFilter: "blur(8px)",
        borderColor: "#222",
      }}
    >
      <div className="w-full px-8 lg:px-16 h-15 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img src={icon} className="icon w-9 h-9"></img>
          <span className="text-[20px] font-semibold tracking-[0.08em] ">
            BLACKTRACE
          </span>
        </div>
        <div className="hidden md:flex items-center gap-5">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-[15px] font-medium transition-colors"
              style={{ color: "#666" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-mono px-2 py-1 border"
            style={{ borderColor: "#222", color: "#666" }}
          >
            Analyze Now
          </span>
        </div>
      </div>
    </nav>
  );
}

// ─── Analysis state ────────────────────────────────────────────────────────────

type AnalysisResult = {
  riskLevel: RiskLevel;
  fraudType: string;
  confidence: number;
  summary: string;
  indicators: { title: string; detail: string }[];
  tactics: { name: string; explanation: string }[];
  steps: string[];
  warning: string;
};

const EXAMPLE_PROMPTS = [
  "Is this WhatsApp message a scam?",
  "Analyze this investment opportunity.",
  "Check this banking SMS.",
  "Verify this job offer.",
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

type AttachMode = "file" | "image" | "voice" | "audio" | "video" | null;
type HeroPhase = "input" | "analyzing" | "result";

const ANALYSIS_STAGES = {
  IDLE: "",
  SENDING: "Sending evidence to BLACKTRACE...",
  PROCESSING: "Preparing investigation request...",
  ANALYZING: "Gemma 4 is analyzing threat indicators...",
  REPORTING: "Building investigation report...",
  COMPLETE: "Investigation complete.",
};

function Hero() {
  const [phase, setPhase] = useState<HeroPhase>("input");
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submittedText, setSubmittedText] = useState("");
  const [submittedAttach, setSubmittedAttach] = useState<AttachMode>(null);
  const [attach, setAttach] = useState<AttachMode>(null);
  const [progress, setProgress] = useState(0);
  const [stageLabel, setStageLabel] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [streamedSummary, setStreamedSummary] = useState("");
  const [summaryDone, setSummaryDone] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [uploadTpe, setUploadType] = useState("");
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const currentStep =
    progress < 20
      ? 0
      : progress < 40
        ? 1
        : progress < 60
          ? 2
          : progress < 80
            ? 3
            : 4;

  const [elapsedTime, setElapsedTime] = useState(0);

  const canAnalyze = text.trim().length > 0 || attach !== null;

  // async function runAnalysis(inputText?: string) {
  //   const src = inputText ?? text;

  //   setSubmittedText(src);
  //   setSubmittedAttach(attach);

  //   setPhase("analyzing");
  //   setElapsedTime(0);

  //   const startTime = Date.now();
  //   const formData = new FormData();

  //   formData.append("text", text);

  //   if (selectedFile) {
  //     formData.append("file", selectedFile);
  //   }

  //   await fetch("http://localhost:8000/api/analyze", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const timer = setInterval(() => {
  //     setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
  //   }, 1000);

  //   setResult(null);

  //   setStreamedSummary("");
  //   setSummaryDone(false);

  //   setProgress(10);
  //   setStageLabel(ANALYSIS_STAGES.SENDING);

  //   try {
  //     // request started
  //     setTimeout(() => {
  //       setProgress(25);
  //       setStageLabel(ANALYSIS_STAGES.PROCESSING);
  //     }, 300);

  //     setTimeout(() => {
  //       setProgress(50);
  //       setStageLabel(ANALYSIS_STAGES.ANALYZING);
  //     }, 700);

  //     const out = await analyzeText(src);
  //     clearInterval(timer);

  //     setProgress(80);
  //     setStageLabel(ANALYSIS_STAGES.REPORTING);

  //     setTimeout(() => {
  //       setProgress(100);
  //       setStageLabel(ANALYSIS_STAGES.COMPLETE);

  //       setResult(out);

  //       setPhase("result");

  //       const fullText = out.summary;

  //       let idx = 0;

  //       const iv = setInterval(() => {
  //         idx += 4;

  //         setStreamedSummary(fullText.slice(0, idx));

  //         if (idx >= fullText.length) {
  //           clearInterval(iv);
  //           setSummaryDone(true);
  //         }
  //       }, 16);
  //     }, 500);
  //   } catch (err) {
  //     console.error(err);
  //     clearInterval(timer);
  //     alert("Failed to analyze content.");
  //   }
  // }

  async function runAnalysis(inputText?: string) {
    const src = inputText ?? text;

    if (!src.trim() && !selectedFile) {
      alert("Please enter text or upload evidence.");
      return;
    }

    setSubmittedText(src);
    setSubmittedAttach(attach);

    setPhase("analyzing");
    setElapsedTime(0);

    setResult(null);
    setStreamedSummary("");
    setSummaryDone(false);

    const startTime = Date.now();

    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    setProgress(10);
    setStageLabel(ANALYSIS_STAGES.SENDING);

    try {
      const formData = new FormData();

      formData.append("text", src);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      setTimeout(() => {
        setProgress(25);
        setStageLabel(ANALYSIS_STAGES.PROCESSING);
      }, 300);

      setTimeout(() => {
        setProgress(50);
        setStageLabel(ANALYSIS_STAGES.ANALYZING);
      }, 700);

       const response = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis request failed");
      }

      const out = await response.json();

      clearInterval(timer);

      setProgress(80);
      setStageLabel(ANALYSIS_STAGES.REPORTING);

      setTimeout(() => {
        setProgress(100);
        setStageLabel(ANALYSIS_STAGES.COMPLETE);

        setResult(out);
        setPhase("result");

        const fullText = out.summary || "";

        let idx = 0;

        const iv = setInterval(() => {
          idx += 4;

          setStreamedSummary(fullText.slice(0, idx));

          if (idx >= fullText.length) {
            clearInterval(iv);
            setSummaryDone(true);
          }
        }, 16);
      }, 500);
    } catch (err) {
      console.error(err);

      clearInterval(timer);

      alert("Failed to analyze content.");
    }
  }

  function reset() {
    setPhase("input");
    setText("");
    setAttach(null);
    setResult(null);
    setStreamedSummary("");
    setSummaryDone(false);
    setProgress(0);
    setTimeout(() => textareaRef.current?.focus(), 100);
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 240)}px`;
    }
  }, [text]);

  const attachIcons: {
    key: AttachMode;
    icon: React.ReactNode;
    label: string;
  }[] = [
    {
      key: "file",
      label: "Attach File",
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M3 2h6l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path
            d="M9 2v4h4"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "image",
      label: "Upload Image",
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect
            x="1.5"
            y="2.5"
            width="12"
            height="10"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <circle
            cx="5"
            cy="5.5"
            r="1"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path
            d="M1.5 10l3.5-3.5 2.5 2.5 2-2 3 3"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  // ── PHASE: INPUT ────────────────────────────────────────────────────────────
  if (phase === "input")
    return (
      <section
        className="min-h-screen flex flex-col items-center justify-center pt-14 px-4 pb-16"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <div
            className="mb-8 inline-flex items-center gap-2 border px-3 py-1.5"
            style={{ borderColor: "#222", backgroundColor: "#111" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#4caf50" }}
            />
            <span className="text-xs font-mono" style={{ color: "#b3b3b3" }}>
              BLACKTRACE · Fraud Investigation Workspace
            </span>
          </div>
          <h1
            className="text-5xl sm:text-6xl font-bold tracking-tight text-center leading-[1.06] mb-5"
            style={{ color: "#fff" }}
          >
            Trace Hidden Threats.
            <br />
            Before They Cost You.
          </h1>
          <p
            className="text-base text-center leading-relaxed max-w-xl mb-10"
            style={{ color: "#b3b3b3" }}
          >
            Submit suspicious messages, screenshots, emails, voice recordings,
            or videos. BLACKTRACE investigates the evidence using Gemma 4 and
            reveals fraud indicators, risk levels, and recommended actions.
          </p>
          {/* Composer */}
          <div
            className="w-[900px] border"
            style={{ borderColor: "#2a2a2a", backgroundColor: "#111" }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,audio/*,video/*,.pdf"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                console.log("Selected:", file);

                setSelectedFile(file);

                if (file.type.startsWith("image/")) {
                  setAttach("image");
                } else if (file.type.startsWith("audio/")) {
                  setAttach("audio");
                } else if (file.type.startsWith("video/")) {
                  setAttach("video");
                } else {
                  setAttach("file");
                }
              }}
            />
            {attach && (
              <div className="flex items-center gap-2 px-4 pt-3">
                <div
                  className="flex items-center gap-2 border px-2.5 py-1 text-xs font-mono"
                  style={{
                    borderColor: "#2a2a2a",
                    backgroundColor: "#161616",
                    color: "#b3b3b3",
                  }}
                >
                  <span style={{ color: "#4caf50" }}>●</span>
                  {selectedFile?.name ||
                    (attach === "voice"
                      ? "voice_note.webm"
                      : "No file selected")}
                  <button
                    onClick={() => setAttach(null)}
                    className="ml-1.5 leading-none"
                    style={{ color: "#666" }}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <div className="px-5 pt-4 pb-2">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    (e.metaKey || e.ctrlKey) &&
                    canAnalyze
                  ) {
                    e.preventDefault();
                    runAnalysis();
                  }
                }}
                placeholder="Paste a suspicious message, upload a screenshot, record a voice note, or describe a suspicious situation…"
                rows={4}
                className="w-full resize-none outline-none text-sm leading-relaxed bg-transparent"
                style={{
                  color: "#fff",
                  caretColor: "#fff",
                  minHeight: "96px",
                  maxHeight: "240px",
                }}
              />
            </div>

            <div
              className="flex items-center justify-between px-4 pb-3 pt-1 border-t gap-2"
              style={{ borderColor: "#1e1e1e" }}
            >
              <div className="relative">
                <button
                  onClick={() => setShowUploadMenu(!showUploadMenu)}
                  className="flex items-center gap-2 px-3 py-2"
                  style={{
                    borderColor: "#222",
                    color: "#b3b3b3",
                    backgroundColor: "#111",
                  }}
                >
                  {/* <Plus size={14} /> */}
                  <HugeiconsIcon icon={Upload01Icon} size={18} />
                  <span>Upload Evidence</span>
                </button>

                {showUploadMenu && (
                  <div
                    className="absolute bottom-12 left-0 w-64 border"
                    style={{
                      backgroundColor: "#111",
                      borderColor: "#222",
                    }}
                  >
                    <h1 className="w-full flex items-center gap-3 px-4 py-3 text-left border-b border-[#222]">
                      <HugeiconsIcon icon={Attachment01Icon} size="20" />
                      Add Evidence
                    </h1>
                    {attachIcons.map(({ key, icon, label }) => (
                      <button
                        key={key}
                        onClick={() => {
                          setShowUploadMenu(false);

                          if (
                            key === "file" ||
                            key === "image" ||
                            key === "audio" ||
                            key === "video"
                          ) {
                            setUploadType(key);
                            fileInputRef.current?.click();
                            return;
                          }

                          setAttach(key);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left"
                        style={{
                          color: "#b3b3b3",
                        }}
                      >
                        {icon}
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => runAnalysis()}
                  disabled={!canAnalyze}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold border transition-colors disabled:opacity-25"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    borderColor: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    if (canAnalyze)
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "#e0e0e0";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "#fff";
                  }}
                >
                  Analyze Threat
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M2 6.5h9M7 2l4.5 4.5L7 11"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Quick prompts */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {EXAMPLE_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setText(p);
                  setTimeout(() => runAnalysis(p), 60);
                }}
                className="text-xs px-3 py-1.5 border transition-colors"
                style={{
                  borderColor: "#1e1e1e",
                  color: "#555",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#3a3a3a";
                  e.currentTarget.style.color = "#b3b3b3";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1e1e1e";
                  e.currentTarget.style.color = "#555";
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="absolute bottom-[2%] right-[1%] -translate-x-1/2 w-12 h-12 rounded-full border border-[#333] flex items-center justify-center cursor-pointer animate-pulse">
            <HugeiconsIcon icon={ArrowDown02Icon} size={24} color="#888" />
          </div>
        </div>
      </section>
    );

  // ── PHASE: ANALYZING ────────────────────────────────────────────────────────
  if (phase === "analyzing")
    return (
      <section
        className="min-h-screen flex flex-col items-center justify-center pt-14 px-4"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="w-full max-w-2xl mx-auto">
          {/* Submitted content */}
          <div
            className="mb-8 p-4 border"
            style={{ borderColor: "#222", backgroundColor: "#111" }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-6 h-6 border flex-shrink-0 flex items-center justify-center text-xs"
                style={{ borderColor: "#333", color: "#666" }}
              >
                U
              </div>
              <div>
                {submittedAttach && (
                  <div
                    className="flex items-center gap-2 text-xs font-mono mb-2"
                    style={{ color: "#b3b3b3" }}
                  >
                    <span style={{ color: "#4caf50" }}>●</span>
                    {selectedFile?.name || "Uploaded Evidence"}
                  </div>
                )}
                {submittedText && (
                  <div
                    className="text-sm leading-relaxed"
                    style={{ color: "#b3b3b3" }}
                  >
                    {submittedText}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analysis progress */}
          <div className="flex items-start gap-4">
            <div
              className="w-6 h-6 border flex-shrink-0 flex items-center justify-center mt-0.5"
              style={{ borderColor: "#333", backgroundColor: "#1a1a1a" }}
            >
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#fff" strokeWidth="1.5" />
                <circle cx="10" cy="10" r="2" fill="#fff" />
              </svg>
            </div>
            <div className="flex-1">
              <div
                className="text-xs font-mono mb-4"
                style={{ color: "#b3b3b3" }}
              >
                {stageLabel}
                <span className="animate-pulse ml-1">▋</span>
              </div>
              <div
                className="w-full h-px"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${progress}%`, backgroundColor: "#fff" }}
                />
              </div>
              <div
                className="flex justify-between mt-2 text-xs font-mono"
                style={{ color: "#3a3a3a" }}
              >
                <span>Gemma 4 · gemma-4-27b-it</span>
                <span>
                  {progress}% . Investigation Time: {elapsedTime}s
                </span>
              </div>
              <div className="mt-6 space-y-2">
                {[
                  "Evidence Submitted",
                  "Evidence Processing",
                  "Threat Intelligence Analysis",
                  "Fraud Pattern Detection",
                  "Investigation Report Generated",
                ].map((label, i) => {
                  const done = i < currentStep;
                  const active = i === currentStep;
                  return (
                    <div
                      key={label}
                      className="flex items-center gap-3 text-xs font-mono"
                    >
                      <span
                        style={{
                          color: done ? "#4caf50" : active ? "#fff" : "#2a2a2a",
                        }}
                      >
                        {done ? "✓" : active ? "▶" : "○"}
                      </span>
                      <span
                        style={{
                          color: done ? "#555" : active ? "#b3b3b3" : "#2a2a2a",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  // ── PHASE: RESULT ───────────────────────────────────────────────────────────
  if (phase === "result" && result)
    return (
      <div ref={topRef} style={{ backgroundColor: "#0a0a0a" }}>
        <div className="pt-14">
          {/* User message bar */}
          <div
            className="border-b px-8 lg:px-16 py-4"
            style={{ borderColor: "#1a1a1a", backgroundColor: "#0d0d0d" }}
          >
            <div className="flex items-start gap-3 max-w-5xl">
              <div
                className="w-6 h-6 border flex-shrink-0 flex items-center justify-center text-xs mt-0.5"
                style={{ borderColor: "#2a2a2a", color: "#555" }}
              >
                U
              </div>
              <div>
                {submittedAttach && (
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-mono border px-2 py-0.5 mr-3"
                    style={{ borderColor: "#2a2a2a", color: "#666" }}
                  >
                    <span style={{ color: "#4caf50" }}>●</span>
                    {submittedAttach === "image"
                      ? "screenshot.png"
                      : submittedAttach === "audio"
                        ? "call_recording.mp3"
                        : submittedAttach === "video"
                          ? "video_clip.mp4"
                          : submittedAttach === "voice"
                            ? "voice_note.webm"
                            : "document.pdf"}
                  </span>
                )}
                <span className="text-sm" style={{ color: "#888" }}>
                  {submittedText || "Content submitted for analysis"}
                </span>
              </div>
            </div>
          </div>

          {/* Result content */}
          <div className="px-8 lg:px-16 py-10">
            <div className="flex items-start gap-4">
              <div
                className="w-6 h-6 border flex-shrink-0 flex items-center justify-center mt-1"
                style={{ borderColor: "#333", backgroundColor: "#1a1a1a" }}
              >
                <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                  <circle cx="10" cy="10" r="2" fill="#fff" />
                </svg>
              </div>

              <div className="flex-1 space-y-8 pb-16">
                {/* Risk header */}
                <div className="flex flex-wrap items-center gap-4">
                  <RiskBadge level={result.riskLevel} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {result.fraudType}
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    <span
                      className="text-xs font-mono"
                      style={{ color: "#555" }}
                    >
                      Confidence
                    </span>
                    <div
                      className="w-20 h-1"
                      style={{ backgroundColor: "#222" }}
                    >
                      <div
                        className="h-full"
                        style={{
                          width: `${result.confidence}%`,
                          backgroundColor:
                            result.riskLevel === "HIGH"
                              ? "#ef5350"
                              : result.riskLevel === "LOW"
                                ? "#4caf50"
                                : "#f59e0b",
                        }}
                      />
                    </div>
                    <span
                      className="text-xs font-mono font-semibold"
                      style={{ color: "#b3b3b3" }}
                    >
                      {result.confidence}%
                    </span>
                  </div>
                </div>

                {/* Summary — streaming */}
                <div>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "#c8c8c8" }}
                  >
                    {streamedSummary}
                    {!summaryDone && (
                      <span className="animate-pulse" style={{ color: "#444" }}>
                        ▋
                      </span>
                    )}
                  </p>
                </div>

                {summaryDone && (
                  <>
                    {/* Indicators */}
                    <div>
                      <div
                        className="text-xs font-mono mb-4 pb-2 border-b"
                        style={{ color: "#555", borderColor: "#1a1a1a" }}
                      >
                        FRAUD INDICATORS · {result.indicators.length} DETECTED
                      </div>
                      <div className="space-y-4">
                        {result.indicators.map((ind, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="flex-shrink-0 mt-0.5">
                              <span
                                className="text-xs font-mono"
                                style={{ color: "#ef5350" }}
                              >
                                ▸
                              </span>
                            </div>
                            <div>
                              <div
                                className="text-sm font-semibold mb-1"
                                style={{ color: "#fff" }}
                              >
                                {ind.title}
                              </div>
                              <div
                                className="text-sm leading-relaxed"
                                style={{ color: "#777" }}
                              >
                                {ind.detail}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social engineering tactics */}
                    {result.tactics.length > 0 && (
                      <div>
                        <div
                          className="text-xs font-mono mb-4 pb-2 border-b"
                          style={{ color: "#555", borderColor: "#1a1a1a" }}
                        >
                          SOCIAL ENGINEERING TACTICS
                        </div>
                        <div className="space-y-3">
                          {result.tactics.map((tac, i) => (
                            <div
                              key={i}
                              className="flex gap-4 p-4 border"
                              style={{
                                borderColor: "#1e1e1e",
                                backgroundColor: "#0d0d0d",
                              }}
                            >
                              <div
                                className="text-xs font-mono font-semibold flex-shrink-0 mt-0.5 border px-2 py-0.5 self-start"
                                style={{
                                  borderColor: "#2a2a2a",
                                  color: "#b3b3b3",
                                }}
                              >
                                {tac.name}
                              </div>
                              <div
                                className="text-sm"
                                style={{ color: "#666" }}
                              >
                                {tac.explanation}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Steps */}
                    <div>
                      <div
                        className="text-xs font-mono mb-4 pb-2 border-b"
                        style={{ color: "#555", borderColor: "#1a1a1a" }}
                      >
                        RECOMMENDED ACTIONS — FOLLOW IN ORDER
                      </div>
                      <div className="space-y-2">
                        {result.steps.map((step, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 p-3 border"
                            style={{ borderColor: "#1a1a1a" }}
                          >
                            <span
                              className="text-xs font-mono flex-shrink-0 mt-0.5"
                              style={{ color: "#4caf50" }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className="text-sm"
                              style={{ color: "#b3b3b3" }}
                            >
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Warning */}
                    <div
                      className="p-4 border"
                      style={{
                        borderColor: "#3a1a1a",
                        backgroundColor: "#120505",
                      }}
                    >
                      <div
                        className="text-xs font-mono mb-2"
                        style={{ color: "#ef5350" }}
                      >
                        ⚠ IMPORTANT
                      </div>
                      <div
                        className="text-sm leading-relaxed"
                        style={{ color: "#c8a0a0" }}
                      >
                        {result.warning}
                      </div>
                    </div>

                    {/* Footer meta */}
                    <div
                      className="flex items-center justify-between pt-2 border-t text-xs font-mono"
                      style={{ borderColor: "#1a1a1a", color: "#333" }}
                    >
                      <span>
                        Analysis by BlackTrace ·{" "}
                        {new Date().toLocaleTimeString()}
                      </span>
                      <span>BLACKTRACE</span>
                    </div>

                    {/* Reset CTA */}
                    <div className="flex justify-center pt-4">
                      <button
                        onClick={reset}
                        className="flex items-center gap-2.5 px-6 py-3 border text-sm font-semibold transition-colors"
                        style={{
                          borderColor: "#333",
                          color: "#fff",
                          backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "#111";
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "#555";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "transparent";
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "#333";
                        }}
                      >
                        Scan Another Piece of Content
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return null;
}

// ─── Section: Problem ─────────────────────────────────────────────────────────

// function Problem() {
//   const channels = [
//     {
//       label: "SMS",
//       desc: "Fake OTPs and bank alerts with credential-harvesting links",
//     },
//     {
//       label: "WhatsApp",
//       desc: "Forwarded lottery wins, KYC scams, investment groups",
//     },
//     {
//       label: "Email",
//       desc: "Phishing impersonating banks, UIDAI, income tax portals",
//     },
//     {
//       label: "Social Media",
//       desc: "Investment fraud through verified-looking profiles",
//     },
//     {
//       label: "Voice Calls",
//       desc: "Vishing — impersonating RBI, bank, or CBI officers",
//     },
//     {
//       label: "Video",
//       desc: "Deepfake celebrity endorsements for fake schemes",
//     },
//   ];
//   const cats = [
//     { name: "Banking Phishing", risk: "HIGH" as RiskLevel },
//     { name: "Investment Fraud", risk: "HIGH" as RiskLevel },
//     { name: "UPI / Payment Scam", risk: "HIGH" as RiskLevel },
//     { name: "Job Scam", risk: "MEDIUM" as RiskLevel },
//     { name: "Lottery Scam", risk: "MEDIUM" as RiskLevel },
//     { name: "Fake Customer Care", risk: "MEDIUM" as RiskLevel },
//   ];
//   return (
//     <section
//       id="problem"
//       className="border-t border-b"
//       style={{ borderColor: "#222" }}
//     >
//       <div className="w-full px-8 lg:px-16 py-20">
//         <div className="mb-12">
//           <div className="text-xs font-mono mb-3" style={{ color: "#555" }}>
//             01 / THE PROBLEM
//           </div>
//           <h2
//             className="text-3xl lg:text-4xl font-bold tracking-tight"
//             style={{ color: "#fff" }}
//           >
//             Digital Fraud Is Becoming
//             <br />
//             Harder To Detect
//           </h2>
//           <p
//             className="mt-4 max-w-2xl text-sm leading-relaxed"
//             style={{ color: "#b3b3b3" }}
//           >
//             Scammers now deploy AI-generated content across every communication
//             channel, mimicking trusted institutions with near-perfect precision.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <div
//               className="text-xs font-mono mb-4 pb-2 border-b"
//               style={{ color: "#555", borderColor: "#1a1a1a" }}
//             >
//               ATTACK VECTORS
//             </div>
//             {channels.map((c, i) => (
//               <div
//                 key={c.label}
//                 className="flex items-start gap-4 py-3 border-b"
//                 style={{ borderColor: "#1a1a1a" }}
//               >
//                 <span
//                   className="font-mono text-xs w-5 mt-0.5 flex-shrink-0"
//                   style={{ color: "#444" }}
//                 >
//                   {String(i + 1).padStart(2, "0")}
//                 </span>
//                 <div>
//                   <div
//                     className="text-sm font-medium"
//                     style={{ color: "#fff" }}
//                   >
//                     {c.label}
//                   </div>
//                   <div className="text-xs mt-0.5" style={{ color: "#666" }}>
//                     {c.desc}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div>
//             <div
//               className="text-xs font-mono mb-4 pb-2 border-b"
//               style={{ color: "#555", borderColor: "#1a1a1a" }}
//             >
//               FRAUD CATEGORIES DETECTED
//             </div>
//             <div
//               className="grid grid-cols-2 gap-px"
//               style={{ backgroundColor: "#1a1a1a" }}
//             >
//               {cats.map((cat) => (
//                 <div
//                   key={cat.name}
//                   className="p-4 flex items-center justify-between gap-2"
//                   style={{ backgroundColor: "#0a0a0a" }}
//                 >
//                   <span
//                     className="text-xs font-medium"
//                     style={{ color: "#b3b3b3" }}
//                   >
//                     {cat.name}
//                   </span>
//                   <RiskBadge level={cat.risk} />
//                 </div>
//               ))}
//             </div>
//             <div
//               className="mt-5 p-4 border"
//               style={{ borderColor: "#222", backgroundColor: "#111" }}
//             >
//               <div className="text-xs font-mono mb-1" style={{ color: "#555" }}>
//                 INDIA · CYBER FRAUD LOSSES · 2023
//               </div>
//               <div className="text-3xl font-bold" style={{ color: "#fff" }}>
//                 ₹10,319 Cr
//               </div>
//               <div className="text-xs mt-1" style={{ color: "#555" }}>
//                 reported to MHA I4C portal · ~1.12M complaints
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── Section: Real Fraud Cases ────────────────────────────────────────────────

function FraudCases() {
  const cases = [
    {
      id: "BT-IND-0142",
      title: "Digital Arrest Campaign",
      region: "India",
      status: "Confirmed Fraud",
      threatScore: 97,
      confidence: "99.2%",
      loss: "$415K",
      source: "Victim Submission",
      date: "18 Jul 2025",
      channel: "Voice Call + WhatsApp",

      summary:
        "Attackers impersonated law-enforcement officials and coerced the victim into remaining on a monitored video call while transferring funds to a fraudulent verification account.",

      findings: [
        "Authority impersonation",
        "Fear-based manipulation",
        "Video call isolation",
        "Fraudulent verification account",
      ],

      timeline: [
        "Initial contact established",
        "Law-enforcement identity claimed",
        "Victim threatened with arrest",
        "Funds transferred to attacker account",
      ],

      assessment:
        "High-confidence Digital Arrest fraud. No legitimate government agency requests account verification through fund transfers or continuous monitored video calls.",
    },

    {
      id: "BT-USA-0068",
      title: "Business Email Compromise",
      region: "United States",
      status: "Confirmed Fraud",
      threatScore: 96,
      confidence: "98.8%",
      loss: "$3.8M",
      source: "Corporate Investigation",
      date: "07 Jun 2025",
      channel: "Corporate Email",

      summary:
        "An executive impersonation campaign attempted to redirect a high-value corporate wire transfer by exploiting urgency and authority.",

      findings: [
        "Executive impersonation",
        "Urgent payment request",
        "Modified banking details",
        "Financial diversion attempt",
      ],

      timeline: [
        "Spoofed executive email received",
        "Urgent acquisition referenced",
        "Bank account change introduced",
        "Wire transfer requested",
      ],

      assessment:
        "Classic BEC operation targeting finance departments. Attackers rely on trust, urgency, and organisational hierarchy to bypass verification procedures.",
    },

    {
      id: "BT-RUS-0031",
      title: "Bank Credential Harvesting",
      region: "Russia",
      status: "Confirmed Fraud",
      threatScore: 95,
      confidence: "99.1%",
      loss: "$5.6M",
      source: "Banking Threat Feed",
      date: "22 May 2025",
      channel: "SMS + Phishing Site",

      summary:
        "A spoofed banking domain was used to collect payment card details, CVV codes, and one-time passwords from victims.",

      findings: [
        "Bank impersonation",
        "Spoofed domain",
        "Credential harvesting",
        "OTP theft",
      ],

      timeline: [
        "Fraud SMS distributed",
        "Victim redirected to fake portal",
        "Card details submitted",
        "Account takeover attempted",
      ],

      assessment:
        "High-confidence banking phishing operation. Legitimate banks do not request CVV codes, passwords, or OTPs through SMS links or external websites.",
    },
  ];

  return (
    <section id="cases" className="border-y" style={{ borderColor: "#171717" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        {/* Header */}

        <div className="mb-16">
          <div
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: "#666" }}
          >
            Threat Intelligence Reports
          </div>

          <h2
            className="text-4xl lg:text-6xl font-semibold tracking-tight"
            style={{ color: "#fff" }}
          >
            Documented Fraud Incidents.
          </h2>

          <p
            className="max-w-2xl mt-5 text-base leading-relaxed"
            style={{ color: "#888" }}
          >
            Publicly documented fraud patterns analysed through the BLACKTRACE
            investigation framework to identify tactics, indicators, and attack
            behaviour.
          </p>
        </div>

        {/* Cases */}

        <div className="space-y-8">
          {cases.map((c) => (
            <div
              key={c.id}
              className="border rounded-none"
              style={{
                borderColor: "#1c1c1c",
                background: "#0b0b0b",
              }}
            >
              {/* Top Bar */}

              <div
                className="flex flex-wrap items-center justify-between gap-4 p-5 border-b"
                style={{ borderColor: "#171717" }}
              >
                <div>
                  <div
                    className="font-mono text-xs mb-1"
                    style={{ color: "#666" }}
                  >
                    {c.id}
                  </div>

                  <h3 className="text-xl font-medium" style={{ color: "#fff" }}>
                    {c.title}
                  </h3>
                </div>

                <div className="flex gap-8 text-sm">
                  <div>
                    <div style={{ color: "#666" }}>Threat Score</div>
                    <div style={{ color: "#ef5350" }}>{c.threatScore}/100</div>
                  </div>

                  <div>
                    <div style={{ color: "#666" }}>Confidence</div>
                    <div style={{ color: "#4caf50" }}>{c.confidence}</div>
                  </div>

                  <div>
                    <div style={{ color: "#666" }}>Estimated Loss</div>
                    <div style={{ color: "#fff" }}>{c.loss}</div>
                  </div>
                </div>
              </div>

              {/* Metadata */}

              <div
                className="grid md:grid-cols-5 gap-4 p-5 border-b"
                style={{ borderColor: "#171717" }}
              >
                <Meta label="Region" value={c.region} />
                <Meta label="Status" value={c.status} />
                <Meta label="Source" value={c.source} />
                <Meta label="Channel" value={c.channel} />
                <Meta label="Analysed" value={c.date} />
              </div>

              {/* Summary */}

              <div className="p-5">
                <div
                  className="font-mono text-xs mb-3 uppercase"
                  style={{ color: "#666" }}
                >
                  Incident Summary
                </div>

                <p className="leading-relaxed" style={{ color: "#bdbdbd" }}>
                  {c.summary}
                </p>
              </div>

              {/* Findings */}

              <div className="grid lg:grid-cols-2">
                <div
                  className="p-5 border-t lg:border-r"
                  style={{
                    borderColor: "#171717",
                  }}
                >
                  <div
                    className="font-mono text-xs mb-4 uppercase"
                    style={{ color: "#666" }}
                  >
                    Blacktrace Findings
                  </div>

                  <div className="space-y-2">
                    {c.findings.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "#ef5350" }}
                        />
                        <span style={{ color: "#cfcfcf" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="p-5 border-t"
                  style={{ borderColor: "#171717" }}
                >
                  <div
                    className="font-mono text-xs mb-4 uppercase"
                    style={{ color: "#666" }}
                  >
                    Attack Timeline
                  </div>

                  <div className="space-y-3">
                    {c.timeline.map((step, i) => (
                      <div key={step} className="flex gap-3">
                        <span className="font-mono" style={{ color: "#444" }}>
                          0{i + 1}
                        </span>

                        <span style={{ color: "#bdbdbd" }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assessment */}

              <div
                className="p-5 border-t"
                style={{
                  borderColor: "#1f2d1f",
                  background: "#071107",
                }}
              >
                <div
                  className="font-mono text-xs mb-2 uppercase"
                  style={{ color: "#4caf50" }}
                >
                  Analysis Assessment
                </div>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#9ccc9c" }}
                >
                  {c.assessment}
                </p>

                <div
                  className="mt-4 pt-4 border-t font-mono text-xs"
                  style={{
                    borderColor: "#123012",
                    color: "#567856",
                  }}
                >
                  Processed by BLACKTRACE Intelligence Engine
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase mb-1" style={{ color: "#666" }}>
        {label}
      </div>
      <div style={{ color: "#fff" }}>{value}</div>
    </div>
  );
}
// ─── Section: Capabilities ────────────────────────────────────────────────────

function Capabilities() {
  const capabilities = [
    {
      title: "Communication Intelligence",
      code: "CI-01",
      description:
        "Analyse conversations, messages, and communications used in phishing, impersonation, and social-engineering attacks.",
      evidence: [
        "SMS Messages",
        "Email Communications",
        "WhatsApp Conversations",
        "Telegram Messages",
        "Social Media Messages",
      ],
      detects: [
        "Phishing Campaigns",
        "Authority Impersonation",
        "Investment Fraud",
        "Credential Theft",
      ],
    },

    {
      title: "Document & Visual Forensics",
      code: "VF-02",
      description:
        "Inspect screenshots, documents, advertisements, and visual evidence for signs of manipulation and fraud.",
      evidence: [
        "Screenshots",
        "Identity Documents",
        "Bank Statements",
        "Payment Receipts",
        "QR Codes",
      ],
      detects: [
        "Fake Documents",
        "Payment Fraud",
        "Brand Impersonation",
        "Visual Manipulation",
      ],
    },

    {
      title: "Voice Intelligence",
      code: "VI-03",
      description:
        "Evaluate recorded calls and voice messages for behavioural indicators commonly found in scam operations.",
      evidence: [
        "Recorded Calls",
        "Voice Notes",
        "Customer Support Calls",
        "Sales Pitches",
        "Voicemail Recordings",
      ],
      detects: [
        "Vishing Attacks",
        "Pressure Tactics",
        "Synthetic Voices",
        "Government Scams",
      ],
    },

    {
      title: "Media Verification",
      code: "MV-04",
      description:
        "Assess video content for manipulation, deepfakes, fraudulent endorsements, and deceptive promotional campaigns.",
      evidence: [
        "Video Recordings",
        "Social Media Videos",
        "News Clips",
        "Promotional Content",
        "Interview Footage",
      ],
      detects: [
        "Deepfakes",
        "Fake Endorsements",
        "Manipulated Media",
        "Investment Scams",
      ],
    },
  ];

  return (
    <section
      id="capabilities"
      className="border-y"
      style={{ borderColor: "#171717" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        {/* Header */}

        <div className="mb-16">
          <div
            className="text-xs font-mono tracking-widest uppercase mb-4"
            style={{ color: "#666" }}
          >
            Investigation Capabilities
          </div>

          <h2
            className="text-4xl lg:text-6xl font-semibold tracking-tight"
            style={{ color: "#fff" }}
          >
            Threat Analysis Across Multiple Evidence Sources.
          </h2>

          <p
            className="max-w-3xl mt-5 leading-relaxed"
            style={{ color: "#8c8c8c" }}
          >
            BLACKTRACE processes communications, documents, media, and
            behavioural signals to identify fraud patterns, deception
            techniques, and malicious activity.
          </p>
        </div>

        {/* Stats */}

        <div
          className="grid grid-cols-2 lg:grid-cols-4 border mb-12"
          style={{ borderColor: "#171717" }}
        >
          {[
            ["4", "Investigation Modules"],
            ["100+", "Fraud Indicators"],
            ["20+", "Scam Categories"],
            ["Multi-Modal", "Analysis Engine"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="p-6 border-r last:border-r-0"
              style={{ borderColor: "#171717" }}
            >
              <div className="text-2xl font-semibold" style={{ color: "#fff" }}>
                {value}
              </div>

              <div className="text-xs uppercase mt-1" style={{ color: "#666" }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Modules */}

        <div className="space-y-6">
          {capabilities.map((cap) => (
            <div
              key={cap.code}
              className="border"
              style={{
                borderColor: "#171717",
                backgroundColor: "#0b0b0b",
              }}
            >
              <div className="p-6 border-b" style={{ borderColor: "#171717" }}>
                <div
                  className="font-mono text-xs mb-3"
                  style={{ color: "#555" }}
                >
                  {cap.code}
                </div>

                <h3
                  className="text-2xl font-medium mb-3"
                  style={{ color: "#fff" }}
                >
                  {cap.title}
                </h3>

                <p className="max-w-3xl" style={{ color: "#888" }}>
                  {cap.description}
                </p>
              </div>

              <div className="grid lg:grid-cols-2">
                {/* Evidence */}

                <div
                  className="p-6 border-r"
                  style={{ borderColor: "#171717" }}
                >
                  <div
                    className="font-mono text-xs uppercase mb-4"
                    style={{ color: "#666" }}
                  >
                    Evidence Sources
                  </div>

                  <div className="space-y-2">
                    {cap.evidence.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span style={{ color: "#555" }}>▸</span>

                        <span style={{ color: "#cfcfcf" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detection */}

                <div className="p-6">
                  <div
                    className="font-mono text-xs uppercase mb-4"
                    style={{ color: "#666" }}
                  >
                    Detection Focus
                  </div>

                  <div className="space-y-2">
                    {cap.detects.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span style={{ color: "#ef5350" }}>●</span>

                        <span style={{ color: "#cfcfcf" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="px-6 py-4 border-t flex justify-between items-center"
                style={{
                  borderColor: "#171717",
                  backgroundColor: "#090909",
                }}
              >
                <span className="font-mono text-xs" style={{ color: "#555" }}>
                  ACTIVE MODULE
                </span>

                <span
                  className="font-mono text-xs"
                  style={{ color: "#4caf50" }}
                >
                  OPERATIONAL
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: How It Works ────────────────────────────────────────────────────

function InvestigationWorkflow() {
  const workflow = [
    {
      step: "01",
      title: "Evidence Submission",
      description:
        "Suspicious content is submitted for investigation, including messages, emails, screenshots, documents, voice recordings, videos, or URLs.",
      outputs: ["Messages", "Documents", "Media Files", "Web Links"],
    },
    {
      step: "02",
      title: "Signal Extraction",
      description:
        "BLACKTRACE extracts textual, visual, behavioural, and contextual signals from submitted evidence to build an investigation profile.",
      outputs: [
        "Content Signals",
        "Metadata",
        "Behaviour Patterns",
        "Risk Indicators",
      ],
    },
    {
      step: "03",
      title: "Intelligence Analysis",
      description:
        "The intelligence engine evaluates language, persuasion tactics, impersonation attempts, urgency patterns, and known fraud characteristics.",
      outputs: [
        "Intent Analysis",
        "Scam Detection",
        "Pattern Recognition",
        "Threat Correlation",
      ],
      highlight: true,
    },
    {
      step: "04",
      title: "Threat Classification",
      description:
        "Detected indicators are correlated against fraud categories to determine the most probable threat type and confidence level.",
      outputs: [
        "Fraud Category",
        "Confidence Score",
        "Severity Level",
        "Threat Assessment",
      ],
    },
    {
      step: "05",
      title: "Risk Evaluation",
      description:
        "Multiple indicators are aggregated into a structured risk model to estimate likelihood, impact, and urgency.",
      outputs: [
        "Risk Score",
        "Priority Level",
        "Potential Impact",
        "Recommended Response",
      ],
    },
    {
      step: "06",
      title: "Investigation Report",
      description:
        "A complete investigation report is generated containing findings, evidence analysis, identified tactics, risk assessment, and next actions.",
      outputs: [
        "Executive Summary",
        "Key Findings",
        "Indicators",
        "Response Guidance",
      ],
    },
  ];

  return (
    <section
      id="workflow"
      className="border-y"
      style={{ borderColor: "#171717" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        {/* Header */}

        <div className="mb-20">
          <div
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: "#666" }}
          >
            Investigation Workflow
          </div>

          <h2
            className="text-4xl lg:text-6xl font-semibold tracking-tight"
            style={{ color: "#fff" }}
          >
            From Suspicious Evidence To Actionable Intelligence.
          </h2>

          <p
            className="max-w-3xl mt-6 leading-relaxed"
            style={{ color: "#888" }}
          >
            Every submission passes through a structured investigation workflow
            designed to identify fraud indicators, assess risk, and generate
            clear investigative findings.
          </p>
        </div>

        {/* Workflow */}

        <div className="space-y-6">
          {workflow.map((item, index) => (
            <div
              key={item.step}
              className="relative border"
              style={{
                borderColor: item.highlight ? "#2a2a2a" : "#171717",
                backgroundColor: item.highlight ? "#0f0f0f" : "#0b0b0b",
              }}
            >
              <div className="grid lg:grid-cols-[120px_1fr_350px]">
                {/* Step Number */}

                <div
                  className="p-6 border-r flex items-start"
                  style={{ borderColor: "#171717" }}
                >
                  <div>
                    <div
                      className="font-mono text-xs mb-2"
                      style={{ color: "#555" }}
                    >
                      STEP
                    </div>

                    <div
                      className="text-3xl font-semibold"
                      style={{
                        color: item.highlight ? "#fff" : "#777",
                      }}
                    >
                      {item.step}
                    </div>
                  </div>
                </div>

                {/* Main Content */}

                <div
                  className="p-6 border-r"
                  style={{ borderColor: "#171717" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <h3
                      className="text-xl font-medium"
                      style={{ color: "#fff" }}
                    >
                      {item.title}
                    </h3>

                    {item.highlight && (
                      <span
                        className="text-xs font-mono px-2 py-1 border"
                        style={{
                          borderColor: "#333",
                          color: "#fff",
                        }}
                      >
                        CORE ENGINE
                      </span>
                    )}
                  </div>

                  <p className="leading-relaxed" style={{ color: "#9a9a9a" }}>
                    {item.description}
                  </p>
                </div>

                {/* Outputs */}

                <div className="p-6">
                  <div
                    className="font-mono text-xs uppercase mb-4"
                    style={{ color: "#666" }}
                  >
                    Investigation Outputs
                  </div>

                  <div className="space-y-2">
                    {item.outputs.map((output) => (
                      <div key={output} className="flex items-center gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: item.highlight ? "#fff" : "#555",
                          }}
                        />

                        <span style={{ color: "#cfcfcf" }}>{output}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {index !== workflow.length - 1 && (
                <div className="absolute left-[60px] -bottom-6 z-10 flex justify-center w-0">
                  <div
                    className="h-6 w-px"
                    style={{ backgroundColor: "#222" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}

        <div
          className="mt-12 border p-5"
          style={{
            borderColor: "#171717",
            backgroundColor: "#090909",
          }}
        >
          <div
            className="font-mono text-xs uppercase mb-2"
            style={{ color: "#666" }}
          >
            Investigation Outcome
          </div>

          <p className="leading-relaxed" style={{ color: "#9a9a9a" }}>
            The final report includes threat classification, confidence
            assessment, detected indicators, behavioural patterns, supporting
            evidence, and recommended actions.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Gemma 4 ─────────────────────────────────────────────────────────

// function Gemma4() {
//   const caps = [
//     {
//       title: "Scam Classification",
//       desc: "Categorizes fraud type across 15+ categories with structured chain-of-thought reasoning.",
//     },
//     {
//       title: "Risk Assessment",
//       desc: "Calibrated probability scoring 0–100 with a full reasoning trace for each factor.",
//     },
//     {
//       title: "Social Engineering Detection",
//       desc: "Identifies manipulation tactics — urgency, authority, fear, greed — across modalities.",
//     },
//     {
//       title: "Structured Reasoning",
//       desc: "Explainable, auditable JSON output with step-by-step justification for every classification.",
//     },
//     {
//       title: "Multimodal Understanding",
//       desc: "Processes text, images, audio transcripts, and video frames in a unified context window.",
//     },
//     {
//       title: "Recommendation Generation",
//       desc: "Actionable, jurisdiction-aware guidance mapped to Indian cyber law and reporting portals.",
//     },
//   ];
//   return (
//     <section id="gemma-4" className="border-b" style={{ borderColor: "#222" }}>
//       <div className="w-full px-8 lg:px-16 py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12">
//           <div>
//             <div className="text-xs font-mono mb-3" style={{ color: "#555" }}>
//               05 / INTELLIGENCE ENGINE
//             </div>
//             <h2
//               className="text-3xl lg:text-4xl font-bold tracking-tight"
//               style={{ color: "#fff" }}
//             >
//               Powered by
//               <br />
//               Gemma 4
//             </h2>
//             <p
//               className="mt-4 text-sm leading-relaxed"
//               style={{ color: "#b3b3b3" }}
//             >
//               Gemma 4 is not a plugin or wrapper. It is the central intelligence
//               layer. Every classification, risk score, and recommendation flows
//               through Gemma 4's multimodal reasoning engine.
//             </p>
//             <div
//               className="mt-6 border"
//               style={{ borderColor: "#222", backgroundColor: "#111" }}
//             >
//               <div
//                 className="px-4 py-3 border-b"
//                 style={{ borderColor: "#1a1a1a" }}
//               >
//                 <span className="text-xs font-mono" style={{ color: "#555" }}>
//                   MODEL CONFIG
//                 </span>
//               </div>
//               {[
//                 ["model_id", "gemma-4-27b-it"],
//                 ["context_length", "128K tokens"],
//                 ["modalities", "text · image · audio"],
//                 ["temperature", "0.1"],
//                 ["output_format", "structured JSON"],
//               ].map(([k, v]) => (
//                 <div
//                   key={k}
//                   className="flex justify-between text-xs font-mono px-4 py-2.5 border-b last:border-0"
//                   style={{ borderColor: "#1a1a1a" }}
//                 >
//                   <span style={{ color: "#555" }}>{k}</span>
//                   <span style={{ color: "#b3b3b3" }}>{v}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div
//             className="grid grid-cols-1 sm:grid-cols-2 gap-px"
//             style={{ backgroundColor: "#1a1a1a" }}
//           >
//             {caps.map((cap) => (
//               <div
//                 key={cap.title}
//                 className="p-5"
//                 style={{ backgroundColor: "#0a0a0a" }}
//               >
//                 <div
//                   className="text-sm font-semibold mb-2"
//                   style={{ color: "#fff" }}
//                 >
//                   {cap.title}
//                 </div>
//                 <p
//                   className="text-xs leading-relaxed"
//                   style={{ color: "#555" }}
//                 >
//                   {cap.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── Section: Impact ──────────────────────────────────────────────────────────

function InvestigationOutcomes() {
  const cases = [
    {
      id: "CASE-001",
      title: "Employment Fraud Attempt",
      evidence:
        "Fraudulent internship offer requesting an upfront registration payment before onboarding.",
      threat: "Advance Fee Job Scam",
      risk: "HIGH",
      outcome: "Payment prevented before transfer.",
      findings: [
        "Employer identity unverifiable",
        "Advance fee request detected",
        "Recruitment process inconsistent",
      ],
    },

    {
      id: "CASE-002",
      title: "Government Impersonation Call",
      evidence:
        "Caller claimed to represent a financial regulator and requested OTP verification.",
      threat: "Authority Impersonation",
      risk: "CRITICAL",
      outcome: "Credential theft attempt blocked.",
      findings: [
        "OTP request detected",
        "False authority claim",
        "Urgency manipulation tactics",
      ],
    },

    {
      id: "CASE-003",
      title: "Invoice Payment Diversion",
      evidence:
        "Supplier invoice contained a modified payment identifier differing by a single character.",
      threat: "Payment Redirection Fraud",
      risk: "HIGH",
      outcome: "Transfer halted before settlement.",
      findings: [
        "Lookalike payment identifier",
        "Account mismatch",
        "Invoice tampering indicators",
      ],
    },

    {
      id: "CASE-004",
      title: "Fake E-Commerce Promotion",
      evidence:
        "Discount page advertised premium electronics at unrealistic prices outside the official checkout flow.",
      threat: "Online Shopping Scam",
      risk: "HIGH",
      outcome: "Fraudulent website identified.",
      findings: [
        "Domain inconsistency",
        "Fabricated interface elements",
        "Suspicious payment flow",
      ],
    },
  ];

  return (
    <section
      id="outcomes"
      className="border-y"
      style={{ borderColor: "#171717" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="mb-16">
          <div
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#666" }}
          >
            Investigation Outcomes
          </div>

          <h2
            className="text-4xl lg:text-6xl font-semibold tracking-tight"
            style={{ color: "#fff" }}
          >
            Fraud Identified Before Damage Occurs.
          </h2>

          <p
            className="max-w-3xl mt-5 leading-relaxed"
            style={{ color: "#888" }}
          >
            Examples of suspicious activity analysed through the BLACKTRACE
            investigation workflow.
          </p>
        </div>

        <div className="space-y-6">
          {cases.map((item) => (
            <div
              key={item.id}
              className="border"
              style={{
                borderColor: "#171717",
                backgroundColor: "#0b0b0b",
              }}
            >
              <div
                className="p-5 border-b flex items-center justify-between"
                style={{ borderColor: "#171717" }}
              >
                <div>
                  <div
                    className="font-mono text-xs mb-2"
                    style={{ color: "#555" }}
                  >
                    {item.id}
                  </div>

                  <h3 className="text-xl font-medium" style={{ color: "#fff" }}>
                    {item.title}
                  </h3>
                </div>

                <div
                  className="font-mono text-xs px-3 py-1 border"
                  style={{
                    borderColor: "#3b1f1f",
                    color: "#ef5350",
                  }}
                >
                  {item.risk}
                </div>
              </div>

              <div className="grid lg:grid-cols-3">
                <div
                  className="p-5 border-r"
                  style={{ borderColor: "#171717" }}
                >
                  <div
                    className="font-mono text-xs mb-3"
                    style={{ color: "#666" }}
                  >
                    EVIDENCE
                  </div>

                  <p style={{ color: "#bdbdbd" }}>{item.evidence}</p>
                </div>

                <div
                  className="p-5 border-r"
                  style={{ borderColor: "#171717" }}
                >
                  <div
                    className="font-mono text-xs mb-3"
                    style={{ color: "#666" }}
                  >
                    DETECTED THREAT
                  </div>

                  <div className="text-lg" style={{ color: "#fff" }}>
                    {item.threat}
                  </div>

                  <div className="mt-4 space-y-2">
                    {item.findings.map((finding) => (
                      <div key={finding} className="flex gap-3">
                        <span style={{ color: "#ef5350" }}>▸</span>

                        <span style={{ color: "#bdbdbd" }}>{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="p-5"
                  style={{
                    backgroundColor: "#071107",
                  }}
                >
                  <div
                    className="font-mono text-xs mb-3"
                    style={{ color: "#4caf50" }}
                  >
                    INVESTIGATION OUTCOME
                  </div>

                  <p
                    style={{
                      color: "#9ccc9c",
                    }}
                  >
                    {item.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// ─── Section: Team ────────────────────────────────────────────────────────────

// function Team() {
//   const members = [
//     {
//       name: "Arjun Sharma",
//       role: "AI Engineer",
//       focus: "Gemma 4 integration · prompt engineering · risk scoring",
//     },
//     {
//       name: "Priya Nair",
//       role: "Backend Engineer",
//       focus: "FastAPI · MongoDB Atlas · multimodal pipeline",
//     },
//     {
//       name: "Rohan Mehta",
//       role: "Frontend Engineer",
//       focus: "React · Vite · investigation workspace UI",
//     },
//   ];
//   return (
//     <section id="team" className="border-b" style={{ borderColor: "#222" }}>
//       <div className="w-full px-8 lg:px-16 py-20">
//         <div className="mb-10">
//           <div className="text-xs font-mono mb-3" style={{ color: "#555" }}>
//             07 / TEAM
//           </div>
//           <h2
//             className="text-3xl font-bold tracking-tight"
//             style={{ color: "#fff" }}
//           >
//             Team
//           </h2>
//         </div>
//         <div
//           className="grid grid-cols-1 sm:grid-cols-3 gap-px"
//           style={{ backgroundColor: "#1a1a1a" }}
//         >
//           {members.map((m) => (
//             <div
//               key={m.name}
//               className="p-6"
//               style={{ backgroundColor: "#0a0a0a" }}
//             >
//               <div
//                 className="w-9 h-9 border mb-4 flex items-center justify-center text-sm font-semibold"
//                 style={{ borderColor: "#2a2a2a", color: "#666" }}
//               >
//                 {m.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")}
//               </div>
//               <div className="text-sm font-semibold" style={{ color: "#fff" }}>
//                 {m.name}
//               </div>
//               <div
//                 className="text-xs font-mono mt-1"
//                 style={{ color: "#b3b3b3" }}
//               >
//                 {m.role}
//               </div>
//               <div className="text-xs mt-3" style={{ color: "#555" }}>
//                 {m.focus}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── Footer ───────────────────────────────────────────────────────────────────

// function Footer() {
//   return (
//     <footer className="border-t" style={{ borderColor: "#171717" }}>
//       <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
//         <div className="grid lg:grid-cols-3 gap-12 pb-12">
//           {/* Brand */}

//           <div>
//             <div className="flex items-center gap-3 mb-5">
//               <div
//                 className="w-2 h-2 rounded-full"
//                 style={{ backgroundColor: "#fff" }}
//               />

//               <span
//                 className="font-semibold tracking-wide"
//                 style={{ color: "#fff" }}
//               >
//                 BLACKTRACE
//               </span>
//             </div>

//             <p className="max-w-md leading-relaxed" style={{ color: "#777" }}>
//               Fraud investigation platform focused on analysing suspicious
//               digital activity, identifying threat patterns, and delivering
//               actionable intelligence.
//             </p>
//           </div>

//           {/* Platform */}

//           <div>
//             <div
//               className="font-mono text-xs uppercase tracking-widest mb-5"
//               style={{ color: "#555" }}
//             >
//               Platform
//             </div>

//             <div className="space-y-3">
//               {[
//                 "Investigation Workflow",
//                 "Threat Intelligence",
//                 "Case Reports",
//                 "Documentation",
//               ].map((item) => (
//                 <div key={item} style={{ color: "#888" }}>
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Resources */}

//           <div>
//             <div
//               className="font-mono text-xs uppercase tracking-widest mb-5"
//               style={{ color: "#555" }}
//             >
//               Resources
//             </div>

//             <div className="space-y-3">
//               {[
//                 "GitHub Repository",
//                 "API Reference",
//                 "Live Platform",
//                 "Contact",
//               ].map((item) => (
//                 <div key={item} style={{ color: "#888" }}>
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div
//           className="pt-8 border-t flex flex-col lg:flex-row justify-between gap-4"
//           style={{ borderColor: "#171717" }}
//         >
//           <div className="text-sm" style={{ color: "#555" }}>
//             © 2026 BLACKTRACE. All rights reserved.
//           </div>

//           <div className="font-mono text-xs" style={{ color: "#555" }}>
//             Built by TRINETRA · Version 1.0
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// ─── App ──────────────────────────────────────────────────────────────────────

export function Home() {
  return (
    <div style={{ backgroundColor: "#0a0a0a" }}>
      <Nav />
      <Hero />
      {/* <Problem /> */}
      <FraudCases />
      <Capabilities />
      <InvestigationWorkflow />
      {/* <Gemma4 /> */}
      <InvestigationOutcomes />
      {/* <Team />   */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sharedcases" element={<SharedCases />} />
      <Route path="/team" element={<Team />} />
      <Route path="/Contact" element={<Contact />} />
    </Routes>
  );
}
