import Nav from "@/componants/Nav";
import Footer from "@/componants/Footer";

export default function Team() {
  return (
    <>
      <Nav />
      <TeamDescription />
      <Footer />
    </>
  );
}

function TeamDescription() {
  const members = [
    {
      name: "Jaymeen Vaghela",
      role: "backend & ai",
      responsibilities: [
        "Platform Architecture",
        "Frontend Development",
        "Backend Systems",
        "Threat Analysis Design",
        "Product Direction",
      ],
    },
    {
      name: "Raj Sangani",
      role: "ui/ux and frontend",
      responsibilities: [
        "Prompt Engineering",
        "Fraud Classification",
        "Response Optimisation",
        "Model Evaluation",
      ],
    },
    {
      name: "Manan Patel",
      role: "Research & Testing",
      responsibilities: [
        "Fraud Research",
        "Case Validation",
        "Testing",
        "Quality Assurance",
      ],
    },
  ];


  const timeline = [
    {
      phase: "Research",
      desc: "Studying scam patterns, social engineering tactics, and fraud reporting workflows.",
    },
    {
      phase: "Architecture",
      desc: "Designing the investigation pipeline and evidence analysis workflow.",
    },
    {
      phase: "Development",
      desc: "Building the platform interface, analysis engine, and reporting systems.",
    },
    {
      phase: "Testing",
      desc: "Validating investigation outputs and improving reliability.",
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
            Team
          </div>

          <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-none max-w-5xl">
            Meet The People Behind BLACKTRACE.
          </h1>

          <p
            className="max-w-3xl mt-8 text-lg leading-relaxed"
            style={{ color: "#B3B3B3" }}
          >
            BLACKTRACE is built through research, engineering, and continuous
            investigation of real-world fraud patterns. The project combines
            technical development, intelligence analysis, and user-focused
            design.
          </p>
        </div>
      </section>

      {/* RESPONSIBILITIES */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div
            className="text-xs font-mono uppercase tracking-widest mb-10"
            style={{ color: "#666" }}
          >
            Project Responsibilities
          </div>

          <div
            className="grid lg:grid-cols-3 gap-px"
            style={{ backgroundColor: "#171717" }}
          >
            {members.map((member) => (
              <div
                key={member.name}
                className="p-8"
                style={{ backgroundColor: "#0F0F0F" }}
              >
                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>

                <div
                  className="text-sm font-mono mb-6"
                  style={{ color: "#666" }}
                >
                  {member.role}
                </div>

                <div className="space-y-3">
                  {member.responsibilities.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: "#666" }}
                      />

                      <span className="text-sm" style={{ color: "#B3B3B3" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div
            className="text-xs font-mono uppercase tracking-widest mb-10"
            style={{ color: "#666" }}
          >
            Development Timeline
          </div>

          <div className="space-y-px" style={{ backgroundColor: "#171717" }}>
            {timeline.map((item, index) => (
              <div
                key={item.phase}
                className="flex flex-col lg:flex-row gap-8 p-8"
                style={{ backgroundColor: "#0F0F0F" }}
              >
                <div
                  className="font-mono text-sm w-20"
                  style={{ color: "#666" }}
                >
                  0{index + 1}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-medium mb-3">{item.phase}</h3>

                  <p style={{ color: "#888" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILDING BLACKTRACE */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div className="max-w-4xl">
            <div
              className="text-xs font-mono uppercase tracking-widest mb-6"
              style={{ color: "#666" }}
            >
              Building BLACKTRACE
            </div>

            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-8">
              From Research To Investigation.
            </h2>

            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "#B3B3B3" }}
            >
              BLACKTRACE began with a simple question: why do so many people
              recognise fraud only after financial damage occurs?
            </p>

            <p className="text-lg leading-relaxed" style={{ color: "#B3B3B3" }}>
              The platform was designed to bridge the gap between suspicious
              content and actionable understanding by transforming evidence into
              structured intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING */}

      <section>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-32">
          <h2 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-none mb-8 max-w-5xl">
            Technology Alone Doesn't Stop Fraud.
          </h2>

          <p
            className="max-w-3xl text-lg leading-relaxed"
            style={{ color: "#888" }}
          >
            Awareness, investigation, and informed decision-making remain the
            strongest defence. BLACKTRACE is built to support that process.
          </p>
        </div>
      </section>
    </main>
  );
}
