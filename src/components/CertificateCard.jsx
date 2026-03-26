// ═══════════════════════════════════════════════════════
//  ARC LABS — CertificateCard Component
//  src/components/CertificateCard.jsx
//  Renders the full printable digital certificate
// ═══════════════════════════════════════════════════════

import {
  getTech,
  getDurationLabel,
  getTrainingHours,
  formatDate,
} from "../utils/certificationHelpers.js";

export default function CertificateCard({ cert }) {
  const tech = getTech(cert.technology);
  const gradeColor =
    cert.grade === "A+"
      ? "var(--lime)"
      : cert.grade === "A"
        ? "var(--teal)"
        : "var(--gold)";

  const DETAILS = [
    { key: "Student Name", val: cert.fullName },
    { key: "Phone Number", val: cert.phone },
    { key: "Institution", val: cert.institution },
    {
      key: "Institution Type",
      val:
        cert.institutionType?.charAt(0).toUpperCase() +
        cert.institutionType?.slice(1),
    },
    { key: "Training Date", val: formatDate(cert.trainingDate) },
    { key: "Certificate Issued", val: formatDate(cert.issueDate) },
    { key: "City / State", val: `${cert.city}, ${cert.state}` },
    { key: "PIN Code", val: cert.pincode },
    { key: "Technology", val: cert.technology },
    {
      key: "Duration",
      val: `${cert.durationDays} Days (${getTrainingHours(cert.durationDays)})`,
    },
    { key: "Performance Grade", val: `${cert.grade} — ${cert.performance}` },
    { key: "Capstone Project", val: cert.projectTitle || "—" },
    { key: "Trainer", val: cert.trainer || "ARC LABS Certified Trainer" },
    { key: "Certificate Status", val: "✓ ACTIVE & VERIFIED", active: true },
  ];

  return (
    <div className="digital-cert">
      {/* Diagonal top rainbow bar */}
      <div className="dc-topbar" />

      {/* Background watermark */}
      <div className="dc-watermark">ARC LABS</div>

      <div className="dc-inner">
        {/* ── Header row ── */}
        <div className="dc-header">
          <div className="dc-brand">
            <div className="dc-brand-dot" />
            <div>
              <div className="dc-brand-name">ARC LABS</div>
              <div className="dc-brand-sub">
                MSME REGISTERED · HYDERABAD, INDIA
              </div>
            </div>
          </div>
          <div className="dc-cert-id-chip">
            <span style={{ opacity: 0.55, marginRight: 3 }}>#</span>
            {cert.certId}
          </div>
        </div>

        {/* ── Name block ── */}
        <div className="dc-center">
          <div className="dc-certifies">This is to certify that</div>
          <div className="dc-name">{cert.fullName}</div>
          <div className="dc-completion">
            has successfully completed the{" "}
            <strong>
              {getDurationLabel(cert.durationDays)} in {tech.label}
            </strong>{" "}
            with Grade{" "}
            <strong style={{ color: gradeColor }}>{cert.grade}</strong> —{" "}
            {cert.performance} Performance
          </div>
        </div>

        {/* ── Program strip ── */}
        <div className="dc-program-strip">
          <div className="dc-prog-label">Program Completed</div>
          <div className="dc-prog-name">
            {tech.icon} {tech.label}
          </div>
          <div className="dc-prog-sub">
            {getDurationLabel(cert.durationDays)} ·{" "}
            {getTrainingHours(cert.durationDays)} of Practical Training
          </div>
        </div>

        {/* ── Details grid ── */}
        <div className="dc-details-grid">
          {DETAILS.map((d) => (
            <div className="dc-cell" key={d.key}>
              <div className="dc-cell-key">{d.key}</div>
              <div className={`dc-cell-val${d.active ? " active" : ""}`}>
                {d.val}
              </div>
            </div>
          ))}
        </div>

        {/* ── Skills ── */}
        <div className="dc-skills-section">
          <div className="dc-skills-label">
            Skills & Competencies Demonstrated
          </div>
          <div className="dc-chips">
            {cert.skills.map((skill, i) => (
              <span key={skill} className={`dc-chip${i < 2 ? " hi" : ""}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="dc-footer">
          <div className="dc-sig">
            <div className="dc-sig-line" />
            <div className="dc-sig-name">
              {cert.trainer || "ARC LABS Trainer"}
            </div>
            <div className="dc-sig-role">CERTIFIED TRAINER · ARC LABS</div>
          </div>
          <div className="dc-seal">🏛️</div>
          <div className="dc-sig">
            <div className="dc-sig-line" />
            <div className="dc-sig-name">ARC LABS Academy</div>
            <div className="dc-sig-role">DIRECTOR · CERTIFICATION PROGRAM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
