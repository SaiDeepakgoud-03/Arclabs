// ═══════════════════════════════════════════════════════
//  ARC LABS — RegisterPanel Component
//  src/components/RegisterPanel.jsx
//  3-step form: Personal → Training → Performance
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  generateCertId,
  fetchPincode,
  localPincodeLookup,
  getSkillsForCert,
  getGrade,
  formatDate,
  getTech,
  getDurationLabel,
  getTrainingHours,
  copyToClipboard,
} from "../utils/certificationHelpers.js";
import {
  TECHNOLOGIES,
  DURATION_OPTIONS,
  PERFORMANCE_OPTIONS,
  INDIAN_STATES,
} from "../data/certificationConstants.js";

// ─── ProgressBar sub-component ─────────────────────────
function ProgressBar({ step, total }) {
  return (
    <div className="progress-bar">
      {Array.from({ length: total }, (_, i) => (
        <>
          <div
            key={`dot-${i}`}
            className={`pb-dot${i + 1 < step ? " done" : ""}${i + 1 === step ? " active" : ""}`}
          >
            {i + 1 < step ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div
              key={`seg-${i}`}
              className={`pb-seg${i + 2 <= step ? " done" : ""}${i + 2 === step ? " active" : ""}`}
            />
          )}
        </>
      ))}
    </div>
  );
}

// ─── Success screen ─────────────────────────────────────
function SuccessScreen({ cert, onReset }) {
  const [toast, setToast] = useState("");
  const tech = getTech(cert.technology);

  const handleCopy = async () => {
    const ok = await copyToClipboard(cert.certId);
    setToast(ok ? "Copied!" : "Copy failed");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="success-wrap">
      <span className="success-icon">🎓</span>
      <div className="success-title">Certificate Registered!</div>
      <p className="success-sub">
        Your ARC LABS certificate has been officially registered.
        <br />
        Save your Certificate ID — share it with employers, institutions, or
        anywhere credentials matter.
      </p>

      {/* ID box */}
      <div className="cert-id-box">
        <div className="cid-label">Your Certificate ID</div>
        <div className="cid-value">{cert.certId}</div>
        <button
          className={`cid-copy-btn${toast ? " copied" : ""}`}
          onClick={handleCopy}
        >
          {toast ? `✓ ${toast}` : "📋 Copy ID"}
        </button>
      </div>

      {/* Mini summary */}
      <div className="mini-cert">
        {[
          ["Full Name", cert.fullName],
          ["Technology", `${tech.icon} ${cert.technology}`],
          ["Program", getDurationLabel(cert.durationDays)],
          ["Training Date", formatDate(cert.trainingDate)],
          ["Institution", cert.institution],
          ["City / State", `${cert.city}, ${cert.state}`],
          ["Grade", `${cert.grade} — ${cert.performance}`],
          ["Issue Date", formatDate(cert.issueDate)],
        ].map(([k, v]) => (
          <div className="mc-row" key={k}>
            <span className="mc-key">{k}</span>
            <span className="mc-val">{v}</span>
          </div>
        ))}
      </div>

      <div className="success-actions">
        <Link to="/verify" className="btn-verify-now">
          🔍 Verify My Certificate
        </Link>
        <button className="btn-register-another" onClick={onReset}>
          + Register Another
        </button>
      </div>

      {toast && <div className="cert-toast">✓ {toast}</div>}
    </div>
  );
}

// ─── Main RegisterPanel ──────────────────────────────────
const EMPTY_FORM = {
  fullName: "",
  phone: "",
  email: "",
  institutionType: "college",
  institution: "",
  trainingDate: "",
  pincode: "",
  city: "",
  state: "",
  technology: "",
  durationDays: "",
  performance: "",
  projectTitle: "",
  trainer: "",
  achievement: "",
  notes: "",
};

export default function RegisterPanel({ onRegistered }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pinStatus, setPinStatus] = useState("idle"); // idle|loading|found|notfound
  const [submitting, setSubmitting] = useState(false);
  const [issued, setIssued] = useState(null);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  // ── Pincode handler ──
  const handlePin = async (raw) => {
    const pin = raw.replace(/\D/g, "").slice(0, 6);
    set("pincode", pin);
    set("city", "");
    set("state", "");

    if (pin.length === 6) {
      setPinStatus("loading");
      const found = await fetchPincode(pin);
      if (found) {
        set("city", found.city);
        set("state", found.state);
        setPinStatus("found");
      } else {
        setPinStatus("notfound");
      }
    } else {
      setPinStatus("idle");
    }
  };

  // ── Validation ──
  const step1ok =
    form.fullName.trim() &&
    form.phone.trim().length >= 10 &&
    form.institution.trim() &&
    form.trainingDate &&
    form.pincode.length === 6 &&
    form.city &&
    form.state;
  const step2ok = form.technology && form.durationDays;
  const step3ok = form.performance;

  // ── Submit ──
  const submit = () => {
    if (!step3ok) return;
    setSubmitting(true);
    setTimeout(() => {
      const certId = generateCertId();
      const days = parseInt(form.durationDays);
      const skills = getSkillsForCert(form.technology, days);
      const grade = getGrade(form.performance);
      const issueDate = new Date().toISOString().split("T")[0];
      const cert = {
        ...form,
        certId,
        durationDays: days,
        skills,
        grade,
        issueDate,
        status: "ACTIVE",
      };
      onRegistered(cert);
      setIssued(cert);
      setSubmitting(false);
    }, 1800);
  };

  const reset = () => {
    setIssued(null);
    setStep(1);
    setPinStatus("idle");
    setForm(EMPTY_FORM);
  };

  const today = new Date().toISOString().split("T")[0];

  // ── Success screen ──
  if (issued) {
    return (
      <div className="register-card">
        <div className="rc-body">
          <SuccessScreen cert={issued} onReset={reset} />
        </div>
      </div>
    );
  }

  return (
    <div className="register-card">
      {/* Header */}
      <div className="rc-header">
        <div className="rc-head-row">
          <div className="rc-title">Register Your Certificate</div>
          <div className="live-badge">
            <span className="live-dot" />
            LIVE SYSTEM
          </div>
        </div>
        <div className="rc-sub">
          Fill in your training details to receive a unique 7-character
          Certificate ID. This ID verifies your credential across institutions
          and employers.
        </div>
      </div>

      <div className="rc-body">
        <ProgressBar step={step} total={3} />

        <div className="step-label">
          Step <strong>{step}</strong> of 3 —{" "}
          {step === 1
            ? "Personal & Institution Details"
            : step === 2
              ? "Training Information"
              : "Performance & Extras"}
        </div>

        {/* ═══ STEP 1: Personal ═══ */}
        {step === 1 && (
          <>
            <div className="form-grid">
              <div className="form-row">
                <div className="form-label">
                  Full Name <span className="form-required">*</span>
                </div>
                <input
                  className="form-input"
                  placeholder="As it should appear on certificate"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-label">
                  Phone Number <span className="form-required">*</span>
                </div>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={(e) =>
                    set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  maxLength={10}
                />
              </div>

              <div className="form-row">
                <div className="form-label">Email Address</div>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Optional — for soft copy"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-label">
                  Training / Completion Date{" "}
                  <span className="form-required">*</span>
                </div>
                <input
                  className="form-input"
                  type="date"
                  value={form.trainingDate}
                  onChange={(e) => set("trainingDate", e.target.value)}
                  max={today}
                />
              </div>
            </div>

            {/* Institution type */}
            <div className="form-row">
              <div className="form-label">Institution Type</div>
              <div className="pills-row">
                {[
                  "school",
                  "college",
                  "university",
                  "corporate",
                  "individual",
                ].map((t) => (
                  <button
                    key={t}
                    className={`itype-btn${form.institutionType === t ? " selected" : ""}`}
                    onClick={() => set("institutionType", t)}
                  >
                    {t === "school"
                      ? "🏫"
                      : t === "college"
                        ? "🏛️"
                        : t === "university"
                          ? "🎓"
                          : t === "corporate"
                            ? "🏢"
                            : "👤"}{" "}
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Institution name */}
            <div className="form-row">
              <div className="form-label">
                Institution Name <span className="form-required">*</span>
              </div>
              <input
                className="form-input"
                placeholder="Full official name of your institution"
                value={form.institution}
                onChange={(e) => set("institution", e.target.value)}
              />
            </div>

            {/* Pincode */}
            <div className="form-grid">
              <div className="form-row">
                <div className="form-label">
                  PIN Code <span className="form-required">*</span>
                  <span className="form-label-hint">
                    Auto-fills city &amp; state
                  </span>
                </div>
                <div className="pin-wrap">
                  <input
                    className={`form-input${pinStatus === "loading" ? " loading" : ""}${pinStatus === "found" ? " ok" : ""}${pinStatus === "notfound" ? " err" : ""}`}
                    placeholder="6-digit PIN code"
                    value={form.pincode}
                    maxLength={6}
                    onChange={(e) => handlePin(e.target.value)}
                  />
                  {pinStatus === "loading" && <div className="pin-spinner" />}
                  {pinStatus === "found" && <div className="pin-check">✓</div>}
                </div>
                {pinStatus === "found" && (
                  <div className="form-hint ok">
                    ✓ Location auto-filled from PIN code
                  </div>
                )}
                {pinStatus === "notfound" && (
                  <div className="form-hint err">
                    PIN not found — fill city &amp; state manually
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-label">
                  City <span className="form-required">*</span>
                </div>
                <input
                  className="form-input"
                  placeholder="Your city"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">
                State <span className="form-required">*</span>
              </div>
              <select
                className="form-select"
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
              >
                <option value="">Select your state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-nav">
              <span />
              <button
                className="btn-submit"
                onClick={() => setStep(2)}
                disabled={!step1ok}
              >
                Next → Training Info
              </button>
            </div>
          </>
        )}

        {/* ═══ STEP 2: Training ═══ */}
        {step === 2 && (
          <>
            {/* Technology selector */}
            <div className="form-row">
              <div className="form-label">
                Technology Enrolled In <span className="form-required">*</span>
              </div>
              <div className="tech-grid">
                {TECHNOLOGIES.map((t) => (
                  <div
                    key={t.id}
                    className={`tech-option${form.technology === t.id ? " selected" : ""}`}
                    onClick={() => set("technology", t.id)}
                  >
                    <span className="tech-icon">{t.icon}</span>
                    <span>{t.id}</span>
                  </div>
                ))}
              </div>
              {form.technology && (
                <div className="form-hint ok">
                  ✓ {TECHNOLOGIES.find((t) => t.id === form.technology)?.label}
                </div>
              )}
            </div>

            {/* Duration */}
            <div className="form-row">
              <div className="form-label">
                Training Duration <span className="form-required">*</span>
              </div>
              <div className="pills-row">
                {DURATION_OPTIONS.map((d) => (
                  <button
                    key={d.val}
                    className={`pill${form.durationDays === d.val ? " selected" : ""}`}
                    onClick={() => set("durationDays", d.val)}
                  >
                    {d.label}{" "}
                    <span style={{ fontSize: ".72rem", opacity: 0.62 }}>
                      · {d.sub.split("·")[1]?.trim()}
                    </span>
                  </button>
                ))}
              </div>
              {form.durationDays && (
                <div className="form-hint ok">
                  ✓ {getDurationLabel(form.durationDays)} ·{" "}
                  {getTrainingHours(parseInt(form.durationDays))}
                </div>
              )}
            </div>

            <div className="form-grid">
              <div className="form-row">
                <div className="form-label">Trainer / Faculty Name</div>
                <input
                  className="form-input"
                  placeholder="ARC LABS certified trainer"
                  value={form.trainer}
                  onChange={(e) => set("trainer", e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-label">Capstone Project Title</div>
                <input
                  className="form-input"
                  placeholder="e.g. Smart Irrigation System"
                  value={form.projectTitle}
                  onChange={(e) => set("projectTitle", e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">Special Achievement / Award</div>
              <input
                className="form-input"
                placeholder="e.g. Best Project Award, First Place Hackathon"
                value={form.achievement}
                onChange={(e) => set("achievement", e.target.value)}
              />
            </div>

            <div className="form-nav">
              <button className="btn-back" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button
                className="btn-submit"
                onClick={() => setStep(3)}
                disabled={!step2ok}
              >
                Next → Performance
              </button>
            </div>
          </>
        )}

        {/* ═══ STEP 3: Performance ═══ */}
        {step === 3 && (
          <>
            <div className="form-row">
              <div className="form-label">
                Performance Rating <span className="form-required">*</span>
                <span className="form-label-hint">As assessed by trainer</span>
              </div>
              <div className="perf-row">
                {PERFORMANCE_OPTIONS.map((p) => {
                  const cls =
                    form.performance === p ? ` ${p.toLowerCase()}` : "";
                  const emoji =
                    p === "Excellent"
                      ? "🏆"
                      : p === "Good"
                        ? "⭐"
                        : p === "Satisfactory"
                          ? "👍"
                          : "📘";
                  return (
                    <button
                      key={p}
                      className={`perf-btn${cls}`}
                      onClick={() => set("performance", p)}
                    >
                      {emoji} {p}
                    </button>
                  );
                })}
              </div>
              {form.performance && (
                <div className="form-hint ok">
                  ✓ Grade: <strong>{getGrade(form.performance)}</strong> —{" "}
                  {form.performance}
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-label">Additional Notes</div>
              <textarea
                className="form-textarea"
                placeholder="Extra achievements, special mentions, topics covered..."
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                rows={3}
              />
            </div>

            {/* Preview before submit */}
            {form.performance && (
              <div className="preview-box">
                <div className="pb-label">Certificate Preview</div>
                {[
                  ["Name", form.fullName],
                  ["Institution", form.institution],
                  [
                    "Technology",
                    `${getTech(form.technology).icon} ${form.technology} — ${getDurationLabel(form.durationDays)}`,
                  ],
                  ["Location", `${form.city}, ${form.state} – ${form.pincode}`],
                  [
                    "Grade",
                    `${getGrade(form.performance)} (${form.performance})`,
                  ],
                ].map(([k, v]) => (
                  <div className="pb-row" key={k}>
                    <span className="pb-key">{k}</span>
                    <span className="pb-val">{v}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="form-nav">
              <button className="btn-back" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button
                className="btn-submit"
                onClick={submit}
                disabled={!step3ok || submitting}
              >
                {submitting
                  ? "⏳ Registering..."
                  : "🎓 Register & Get Certificate ID"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
