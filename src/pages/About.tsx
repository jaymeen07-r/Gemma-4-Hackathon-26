import Footer from "@/componants/Footer";
import Nav from "@/componants/Nav";

export default function About() {
  return (
    <>
      <Nav />
      <AboutDescription />
      <Footer />
    </>
  );
}

function AboutDescription() {
  const philosophy = [
    {
      title: "Evidence First",
      desc: "Every finding should be supported by observable indicators and evidence rather than assumptions.",
    },
    {
      title: "Context Matters",
      desc: "Messages, screenshots, calls, and media rarely tell the full story in isolation.",
    },
    {
      title: "Explainable Findings",
      desc: "Users should understand why something is suspicious instead of receiving unexplained scores.",
    },
  ];

  const principles = [
    "Transparency",
    "Practicality",
    "Accessibility",
    "Continuous Improvement",
  ];

  const audiences = [
    {
      title: "Individuals",
      desc: "Investigate suspicious communications before taking action.",
    },
    {
      title: "Families",
      desc: "Help protect vulnerable family members from scams and impersonation attempts.",
    },
    {
      title: "Professionals",
      desc: "Review payment requests, invoices, and business communications.",
    },
    {
      title: "Organisations",
      desc: "Improve awareness around fraud and social engineering risks.",
    },
  ];

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
            About BLACKTRACE
          </div>

          <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight max-w-5xl leading-none">
            Built To Help People Understand Suspicious Digital Activity.
          </h1>

          <p
            className="max-w-3xl mt-8 text-lg leading-relaxed"
            style={{ color: "#B3B3B3" }}
          >
            BLACKTRACE is a digital threat investigation platform designed to
            analyse suspicious content, identify fraud indicators, and transform
            complex evidence into understandable intelligence.
          </p>
        </div>
      </section>

      {/* WHY IT EXISTS */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <div
                className="text-xs font-mono uppercase tracking-widest mb-6"
                style={{ color: "#666" }}
              >
                Why BLACKTRACE Exists
              </div>

              <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight">
                Fraud Has Become Increasingly Difficult To Recognise.
              </h2>
            </div>

            <div>
              <p
                className="leading-relaxed text-lg"
                style={{ color: "#B3B3B3" }}
              >
                Modern scams no longer rely on obvious warning signs. Attackers
                imitate trusted organisations, exploit urgency, manipulate
                emotions, and use convincing digital content to appear
                legitimate.
              </p>

              <p
                className="leading-relaxed text-lg mt-6"
                style={{ color: "#B3B3B3" }}
              >
                Many victims only discover the deception after money,
                credentials, or sensitive information have already been lost.
                BLACKTRACE was created to help users investigate before they
                trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div
            className="text-xs font-mono uppercase tracking-widest mb-10"
            style={{ color: "#666" }}
          >
            Investigation Philosophy
          </div>

          <div
            className="grid md:grid-cols-3 gap-px"
            style={{ backgroundColor: "#171717" }}
          >
            {philosophy.map((item) => (
              <div
                key={item.title}
                className="p-8"
                style={{ backgroundColor: "#0F0F0F" }}
              >
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>

                <p className="leading-relaxed" style={{ color: "#888" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT BLACKTRACE IS NOT */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div
            className="text-xs font-mono uppercase tracking-widest mb-10"
            style={{ color: "#666" }}
          >
            What BLACKTRACE Is Not
          </div>

          <div className="space-y-px" style={{ backgroundColor: "#171717" }}>
            {[
              {
                title: "Not Antivirus Software",
                desc: "BLACKTRACE does not scan operating systems for malware.",
              },
              {
                title: "Not Law Enforcement",
                desc: "BLACKTRACE assists with analysis and understanding but does not replace official investigations.",
              },
              {
                title: "Not Financial Advice",
                desc: "Investigation findings should not be interpreted as financial or investment advice.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8"
                style={{ backgroundColor: "#0F0F0F" }}
              >
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>

                <p style={{ color: "#888" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div
            className="text-xs font-mono uppercase tracking-widest mb-10"
            style={{ color: "#666" }}
          >
            Core Principles
          </div>

          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ backgroundColor: "#171717" }}
          >
            {principles.map((item) => (
              <div
                key={item}
                className="p-10"
                style={{ backgroundColor: "#0F0F0F" }}
              >
                <div
                  className="text-sm font-semibold"
                  style={{ color: "#FFF" }}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div
            className="text-xs font-mono uppercase tracking-widest mb-10"
            style={{ color: "#666" }}
          >
            Built For The Real World
          </div>

          <div
            className="grid md:grid-cols-2 gap-px"
            style={{ backgroundColor: "#171717" }}
          >
            {audiences.map((item) => (
              <div
                key={item.title}
                className="p-8"
                style={{ backgroundColor: "#0F0F0F" }}
              >
                <h3 className="text-2xl font-medium mb-4">{item.title}</h3>

                <p style={{ color: "#888" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRINETRA */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div
            className="text-xs font-mono uppercase tracking-widest mb-6"
            style={{ color: "#666" }}
          >
            About TRINETRA
          </div>

          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight max-w-4xl mb-8">
            The Organisation Behind BLACKTRACE
          </h2>

          <div className="max-w-4xl">
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "#B3B3B3" }}
            >
              BLACKTRACE is developed by TRINETRA, an organisation focused on
              building technology that addresses real-world challenges through
              software, intelligence systems, and digital innovation.
            </p>

            <p className="text-lg leading-relaxed" style={{ color: "#B3B3B3" }}>
              BLACKTRACE represents one initiative within a broader vision to
              create tools that improve safety, trust, and decision-making in
              digital environments.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING */}

      <section>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-32">
          <div className="max-w-5xl">
            <h2 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-none mb-8">
              Investigate Before You Trust.
            </h2>

            <p
              className="max-w-3xl text-lg leading-relaxed"
              style={{ color: "#888" }}
            >
              The internet moves quickly. Decisions move even faster. BLACKTRACE
              exists to help people pause, investigate, and understand what they
              are interacting with before risk becomes reality.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
