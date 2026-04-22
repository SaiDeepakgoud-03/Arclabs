import { useState } from "react";
import "../styles/Certification.css";
import VerifyPanel from "../components/VerifyPanel";
import RegisterPanel from "../components/RegisterPanel";

export default function CertificationPage() {
  const [tab, setTab] = useState("verify");
  const [recentlyVerified, setRecentlyVerified] = useState([]);

  const handleVerified = (cert) => {
    setRecentlyVerified((prev) =>
      [cert, ...prev.filter((c) => c.certId !== cert.certId)].slice(0, 5)
    );
  };

  return (
    <>
      {/* NAV */}
      <nav className="vnav">
        <a href="/" className="vnav-logo">
          <span className="vdot" />
          ARC LABS
        </a>
        <div className="vnav-links">
          <a href="/" className="vnav-link">← Home</a>
          <a href="/programs" className="vnav-link">Programs</a>
          <a href="/products" className="vnav-link">Products</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="vhero">
        <div className="vtag">
          <span className="vtdot" />
          Official Certification Registry · ARC LABS
        </div>
        <h1>
          Verify or Register
          <br />
          your <em>ARC LABS Certificate.</em>
        </h1>
        <p>
          Verify any certificate instantly, or register your training to receive
          a unique Certificate ID.
        </p>
      </div>

      {/* TABS */}
      <div className="mtabs">
        <button
          className={`mtab${tab === "verify" ? " active" : ""}`}
          onClick={() => setTab("verify")}
        >
          🔍 Verify Certificate
        </button>

        <button
          className={`mtab${tab === "register" ? " active" : ""}`}
          onClick={() => setTab("register")}
        >
          📝 Register Certificate
        </button>
      </div>

      {/* CONTENT */}
      <div className="vcontent">
        {tab === "verify" && (
          <VerifyPanel onSuccess={handleVerified} />
        )}

        {tab === "register" && (
          <RegisterPanel onRegistered={handleVerified} />
        )}
      </div>

      {/* FOOTER */}
      <footer className="vfoot">
        <span>© 2024 ARC LABS. All rights reserved.</span>
        <a href="mailto:contact@arclabs.in" className="vnav-link">
          Get in Touch
        </a>
      </footer>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919876543210"
        className="wa-f"
        target="_blank"
        rel="noreferrer"
      >
        💬
      </a>
    </>
  );
}