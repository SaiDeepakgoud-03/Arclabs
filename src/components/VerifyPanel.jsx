// ═══════════════════════════════════════════════════════
//  ARC LABS — VerifyPanel Component
//  src/components/VerifyPanel.jsx
//  Handles certificate ID lookup and display
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import CertificateDisplay from "./CertificateDisplay";

export default function VerifyPanel({ allCerts, onSuccess }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const doVerify = (id) => {
    const sid = (id || q).trim().toUpperCase();
    if (!sid) return;
    setLoading(true);
    setError("");
    setResult(null);
    setTimeout(() => {
      const cert = allCerts[sid];
      if (cert) {
        setResult(cert);
        onSuccess && onSuccess(cert);
      } else
        setError(
          `No certificate found with ID "${sid}". Check the ID and try again.`,
        );
      setLoading(false);
    }, 850);
  };

  const copy = () => {
    navigator.clipboard.writeText(result?.certId || "").catch(() => {});
    setToast("Certificate ID copied!");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
      <div className="vcard">
        <div className="vcard-eye">Certificate Verification</div>
        <div className="vcard-title">Verify Authenticity</div>
        <div className="vcard-sub">
          Enter the ARC LABS Certificate ID (7 characters, e.g. ARC4F2K) to
          instantly verify and view the complete certificate record.
        </div>
        <div className="srow">
          <input
            className="cert-inp"
            placeholder="Enter Certificate ID — e.g. ARC4F2K"
            value={q}
            maxLength={9}
            onChange={(e) => setQ(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && doVerify()}
          />
          <button
            className="btn-v"
            onClick={() => doVerify()}
            disabled={loading || !q.trim()}
          >
            {loading ? "⏳ Verifying..." : "🔍 Verify"}
          </button>
        </div>
      </div>

      {error && <div className="verr">❌ {error}</div>}

      {result && (
        <div style={{ animation: "fadein .4s ease" }}>
          <div className="vsuccess-badge">
            <span className="vsb-icon">✅</span>
            <div className="vsb-text">
              <strong>Certificate Verified — Authentic & Active</strong>
              <span>
                Issued by ARC LABS · Certificate ID:{" "}
                <span
                  style={{
                    fontFamily: "monospace",
                    letterSpacing: ".05em",
                    color: "var(--teal)",
                  }}
                >
                  {result.certId}
                </span>
              </span>
            </div>
          </div>
          <CertificateDisplay cert={result} />
          <div className="cert-acts" style={{ marginTop: "1rem" }}>
            <button className="btn-act primary" onClick={copy}>
              📋 Copy Certificate ID
            </button>
            <button className="btn-act ghost" onClick={() => window.print()}>
              🖨️ Print
            </button>
            <a
              className="btn-act ghost"
              href={`https://wa.me/?text=My ARC LABS Certificate: ${result.certId} — Verify at arclabs.in/verify`}
              target="_blank"
              rel="noreferrer"
            >
              💬 Share
            </a>
          </div>
        </div>
      )}

      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  );
}
