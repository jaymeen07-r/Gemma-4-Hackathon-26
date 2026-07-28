import Footer from "@/componants/Footer";
import Nav from "@/componants/Nav";
import { useState } from "react";

const cases = [
  {
    caseId: "BT-2025-0142",
    category: "Digital Arrest Scam",
    source: "Voice Call",
    risk: "HIGH",
    country: "India",
    status: "Verified",
    date: "2025-07-23",
  },
  {
    caseId: "BT-2025-0091",
    category: "Job Offer Fraud",
    source: "Email",
    risk: "MEDIUM",
    country: "India",
    status: "Verified",
    date: "2025-07-20",
  },
  {
    caseId: "BT-2025-0067",
    category: "Investment Scam",
    source: "WhatsApp",
    risk: "HIGH",
    country: "Singapore",
    status: "Verified",
    date: "2025-07-18",
  },
  {
    caseId: "BT-2025-0044",
    category: "Banking Phishing",
    source: "SMS",
    risk: "HIGH",
    country: "United Kingdom",
    status: "Verified",
    date: "2025-07-11",
  },
];

export default function SharedCases() {
  return (
    <>
      <Nav />
      <SharedCasesDescription />
      <Footer />
    </>
  );
}

function SharedCasesDescription() {
  const [risk, setRisk] = useState("ALL");

  const filtered =
    risk === "ALL" ? cases : cases.filter((c) => c.risk === risk);

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "#0A0A0A",
        color: "#FFFFFF",
      }}
    >
      {/* HERO */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-32">
          <div
            className="text-xs font-mono uppercase tracking-widest mb-6"
            style={{ color: "#666" }}
          >
            Community Intelligence
          </div>

          <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-none max-w-5xl">
            Shared Investigation Archive.
          </h1>

          <p
            className="max-w-3xl mt-8 text-lg leading-relaxed"
            style={{ color: "#B3B3B3" }}
          >
            A growing collection of fraud investigations, scam reports, and
            suspicious activity submitted by the community and organised into a
            searchable intelligence archive.
          </p>
        </div>
      </section>

      {/* STATS */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div
          className="max-w-7xl mx-auto px-8 lg:px-16"
          style={{ backgroundColor: "#0F0F0F" }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#171717]">
            {[
              ["147", "Cases"],
              ["31", "Scam Types"],
              ["12", "Countries"],
              ["91%", "Verified"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="p-8"
                style={{ backgroundColor: "#0F0F0F" }}
              >
                <div className="text-3xl font-semibold mb-2">{value}</div>

                <div className="text-sm font-mono" style={{ color: "#666" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTERS */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-8">
          <div className="flex flex-wrap gap-3">
            {["ALL", "HIGH", "MEDIUM", "LOW"].map((item) => (
              <button
                key={item}
                onClick={() => setRisk(item)}
                className="px-4 py-2 text-sm border transition-all"
                style={{
                  borderColor: risk === item ? "#444" : "#171717",
                  backgroundColor: risk === item ? "#111" : "transparent",
                  color: risk === item ? "#FFF" : "#666",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE */}

      <section>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
          <div className="border" style={{ borderColor: "#171717" }}>
            {/* HEADER */}

            <div
              className="grid grid-cols-6 p-5 text-xs font-mono uppercase border-b"
              style={{
                borderColor: "#171717",
                color: "#666",
              }}
            >
              <div>Case ID</div>
              <div>Category</div>
              <div>Source</div>
              <div>Country</div>
              <div>Risk</div>
              <div>Date</div>
            </div>

            {/* ROWS */}

            {filtered.map((item) => (
              <div
                key={item.caseId}
                className="grid grid-cols-6 p-5 border-b transition-all hover:bg-[#101010]"
                style={{
                  borderColor: "#171717",
                }}
              >
                <div className="font-mono text-sm" style={{ color: "#888" }}>
                  {item.caseId}
                </div>

                <div>{item.category}</div>

                <div style={{ color: "#888" }}>{item.source}</div>

                <div style={{ color: "#888" }}>{item.country}</div>

                <div>
                  <span
                    className="text-xs font-mono px-2 py-1 border"
                    style={{
                      borderColor: item.risk === "HIGH" ? "#7F1D1D" : "#3A3A3A",
                      color: item.risk === "HIGH" ? "#EF5350" : "#B3B3B3",
                    }}
                  >
                    {item.risk}
                  </span>
                </div>

                <div style={{ color: "#666" }}>{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="border-t" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-28">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
            Contribute Intelligence.
          </h2>

          <p
            className="max-w-3xl text-lg leading-relaxed mb-8"
            style={{ color: "#888" }}
          >
            Help improve community awareness by sharing suspicious messages,
            scam attempts, phishing emails, fake websites, or other
            fraud-related evidence.
          </p>

          <button
            className="px-6 py-3 border"
            style={{
              borderColor: "#2A2A2A",
            }}
          >
            Submit Investigation
          </button>
        </div>
      </section>
    </main>
  );
}
