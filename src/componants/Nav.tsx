import {Link} from "react-router-dom";
import icon from "../assets/icon.png"

export default function Nav() {
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