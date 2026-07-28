import Footer from "@/componants/Footer";
import Nav from "@/componants/Nav";

export default function Contact() {
  return (
    <>
      <Nav />
      <ContactDescription />
      <Footer />
    </>
  );
}

function ContactDescription() {
  const channels = [
    {
      title: "General Inquiries",
      desc: "Questions regarding BLACKTRACE, platform capabilities, and product information.",
    },
    {
      title: "Threat Reports",
      desc: "Report suspicious campaigns, phishing attempts, impersonation attacks, or fraud activity.",
    },
    {
      title: "Partnership Requests",
      desc: "Collaboration opportunities, research initiatives, and organisational partnerships.",
    },
    {
      title: "Technical Support",
      desc: "Platform issues, feature requests, and investigation workflow feedback.",
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
            Contact BLACKTRACE
          </div>

          <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-none max-w-5xl">
            Communication & Intelligence Reports.
          </h1>

          <p
            className="max-w-3xl mt-8 text-lg leading-relaxed"
            style={{ color: "#B3B3B3" }}
          >
            Whether you're reporting suspicious activity, exploring partnership
            opportunities, or seeking technical assistance, our team is
            available through the channels below.
          </p>
        </div>
      </section>

      {/* CHANNELS */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div
            className="text-xs font-mono uppercase tracking-widest mb-10"
            style={{ color: "#666" }}
          >
            Communication Channels
          </div>

          <div
            className="grid md:grid-cols-2 gap-px"
            style={{ backgroundColor: "#171717" }}
          >
            {channels.map((item) => (
              <div
                key={item.title}
                className="p-8"
                style={{
                  backgroundColor: "#0F0F0F",
                }}
              >
                <h3 className="text-2xl font-medium mb-4">{item.title}</h3>

                <p className="leading-relaxed" style={{ color: "#888" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT GRID */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div className="grid lg:grid-cols-[420px_1fr] gap-12">
            {/* LEFT PANEL */}

            <div
              className="border h-fit"
              style={{
                borderColor: "#171717",
                backgroundColor: "#0F0F0F",
              }}
            >
              <div className="p-8">
                <div
                  className="text-xs font-mono uppercase mb-6"
                  style={{ color: "#666" }}
                >
                  Contact Information
                </div>

                <div className="space-y-8">
                  <div>
                    <div
                      className="text-xs font-mono mb-2"
                      style={{ color: "#555" }}
                    >
                      EMAIL
                    </div>

                    <div style={{ color: "#B3B3B3" }}>
                      blacktrace.security@gmail.com
                    </div>
                  </div>

                  <div>
                    <div
                      className="text-xs font-mono mb-2"
                      style={{ color: "#555" }}
                    >
                      LOCATION
                    </div>

                    <div style={{ color: "#B3B3B3" }}>
                      Ahmedabad, Gujarat, India
                    </div>
                  </div>

                  <div>
                    <div
                      className="text-xs font-mono mb-2"
                      style={{ color: "#555" }}
                    >
                      RESPONSE TARGET
                    </div>

                    <div style={{ color: "#B3B3B3" }}>Within 24 Hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM */}

            <div
              className="border"
              style={{
                borderColor: "#171717",
                backgroundColor: "#0F0F0F",
              }}
            >
              <div className="p-8 lg:p-10">
                <div
                  className="text-xs font-mono uppercase mb-8"
                  style={{ color: "#666" }}
                >
                  Send Message
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-xs font-mono mb-3"
                        style={{ color: "#666" }}
                      >
                        FULL NAME
                      </label>

                      <input
                        type="text"
                        className="w-full px-4 py-4 border outline-none"
                        style={{
                          backgroundColor: "#0A0A0A",
                          borderColor: "#222",
                          color: "#FFF",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-xs font-mono mb-3"
                        style={{ color: "#666" }}
                      >
                        EMAIL ADDRESS
                      </label>

                      <input
                        type="email"
                        className="w-full px-4 py-4 border outline-none"
                        style={{
                          backgroundColor: "#0A0A0A",
                          borderColor: "#222",
                          color: "#FFF",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-mono mb-3"
                      style={{ color: "#666" }}
                    >
                      INQUIRY TYPE
                    </label>

                    <select
                      className="w-full px-4 py-4 border outline-none"
                      style={{
                        backgroundColor: "#0A0A0A",
                        borderColor: "#222",
                        color: "#FFF",
                      }}
                    >
                      <option>General Inquiry</option>
                      <option>Threat Report</option>
                      <option>Partnership</option>
                      <option>Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-mono mb-3"
                      style={{ color: "#666" }}
                    >
                      MESSAGE
                    </label>

                    <textarea
                      rows={8}
                      className="w-full px-4 py-4 border resize-none outline-none"
                      style={{
                        backgroundColor: "#0A0A0A",
                        borderColor: "#222",
                        color: "#FFF",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-4 border text-sm font-medium"
                    style={{
                      borderColor: "#2A2A2A",
                    }}
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSE POLICY */}

      <section className="border-b" style={{ borderColor: "#171717" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <div
            className="text-xs font-mono uppercase tracking-widest mb-8"
            style={{ color: "#666" }}
          >
            Response Policy
          </div>

          <div className="max-w-4xl">
            <p className="text-lg leading-relaxed" style={{ color: "#B3B3B3" }}>
              BLACKTRACE reviews all submissions individually. Threat reports
              and security-related communications are prioritised. Response
              times may vary depending on investigation volume and request
              complexity.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING */}

      <section>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-32">
          <h2 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-none mb-8 max-w-5xl">
            Report. Investigate. Understand.
          </h2>

          <p
            className="max-w-3xl text-lg leading-relaxed"
            style={{ color: "#888" }}
          >
            Every report contributes to a better understanding of evolving fraud
            tactics and emerging threats.
          </p>
        </div>
      </section>
    </main>
  );
}
