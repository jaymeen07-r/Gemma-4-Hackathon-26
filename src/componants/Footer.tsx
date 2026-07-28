import icon from "../assets/icon.png";
export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "#171717" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-3 gap-12 pb-12">
          {/* Brand */}

          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={icon} className="icon w-9 h-9"></img>
              BLACKTRACE
            </div>

            <p className="max-w-md leading-relaxed" style={{ color: "#777" }}>
              Fraud investigation platform focused on analysing suspicious
              digital activity, identifying threat patterns, and delivering
              actionable intelligence.
            </p>
          </div>

          {/* Platform */}

          <div>
            <div
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: "#555" }}
            >
              Platform
            </div>

            <div className="space-y-3">
              {[
                "Investigation Workflow",
                "Threat Intelligence",
                "Case Reports",
                "Documentation",
              ].map((item) => (
                <div key={item} style={{ color: "#888" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}

          <div>
            <div
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: "#555" }}
            >
              Resources
            </div>

            <div className="space-y-3">
              {[
                "GitHub Repository",
                "API Reference",
                "Live Platform",
                "Contact",
              ].map((item) => (
                <div key={item} style={{ color: "#888" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col lg:flex-row justify-between gap-4"
          style={{ borderColor: "#171717" }}
        >
          <div className="text-sm" style={{ color: "#555" }}>
            © 2026 BLACKTRACE. All rights reserved.
          </div>

          <div className="font-mono text-xs" style={{ color: "#555" }}>
            Built by TRINETRA · Version 1.0
          </div>
        </div>
      </div>
    </footer>
  );
}
