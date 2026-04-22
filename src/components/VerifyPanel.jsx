// ═══════════════════════════════════════════════════════
//  ARC LABS — VerifyPanel Component (Firebase Connected)
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import CertificateDisplay from "./CertificateDisplay";

export default function VerifyPanel({ onSuccess }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  // 🔥 Firebase Verify Function
  const doVerify = async (id) => {
    const sid = (id || q).trim().toUpperCase();
    if (!sid) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const ref = doc(db, "certificates", sid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const certData = snap.data();

        // Add certId for UI usage
        const finalData = { certId: sid, ...certData };

        setResult(finalData);
        onSuccess && onSuccess(finalData);
      } else {
        setError(
          `No certificate found with ID "${sid}". Check the ID and try again.`
        );
      }
    } catch (err) {
      console.log(err);
      setError("Database connection error ❌");
    }

    setLoading(false);
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
          Enter the ARC LABS Certificate ID to instantly verify and view the
          complete certificate record.
        </div>

        <div className="srow">
          <input
            className="cert-inp"
            placeholder="Enter Certificate ID — e.g. ARC4F2K"
            value={q}
            maxLength={20}
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