import {
  getTechObj,
  getDurLabel,
  getHours,
  fmtDate,
} from "../utils/certificationHelpers.js";

export default function CertCard({ cert }) {
  const tech = getTechObj(cert.technology);
  return (
    <div className="dcert">
      <div className="dc-wm">ARC LABS</div>
      <div className="dcert-topbar" />
      <div className="dcert-inner">
        {/* Header */}
        <div className="dc-hd">
          <div className="dc-brand">
            <div className="dc-brand-dot" />
            <div>
              <div className="dc-brand-name">ARC LABS</div>
              <div className="dc-brand-tag">
                MSME REGISTERED · HYDERABAD, INDIA
              </div>
            </div>
          </div>
          <div className="dc-id-chip">
            <span style={{ opacity: 0.55, marginRight: 3 }}>#</span>
            {cert.certId}
          </div>
        </div>

        {/* Name */}
        <div className="dc-center">
          <div className="dc-certifies">This is to certify that</div>
          <div className="dc-name">{cert.fullName}</div>
          <div className="dc-completed">
            has successfully completed the{" "}
            <strong>
              {getDurLabel(cert.durationDays)} in {tech.label}
            </strong>{" "}
          </div>
        </div>

        {/* Program */}
        <div className="dc-prog">
          <div className="dc-prog-lbl">Program Completed</div>
          <div className="dc-prog-name">
            {tech.icon} {tech.label}
          </div>
          <div className="dc-prog-sub">{getDurLabel(cert.durationDays)}</div>
        </div>

        {/* Details grid */}
        <div className="dc-grid">
          {[
            { k: "Student Name", v: cert.fullName },
            { k: "Phone Number", v: cert.phone },
            { k: "Institution", v: cert.institution },
            {
              k: "Institution Type",
              v:
                cert.institutionType?.charAt(0).toUpperCase() +
                cert.institutionType?.slice(1),
            },
            { k: "Training Date", v: fmtDate(cert.trainingDate) },
            { k: "Certificate Issued", v: fmtDate(cert.issueDate) },
            { k: "City / State", v: `${cert.city}, ${cert.state}` },
            { k: "PIN Code", v: cert.pincode },
            { k: "Technology", v: cert.technology },
            {
              k: "Duration",
              v: `${cert.durationDays} Days (${getHours(cert.durationDays)})`,
            },
            {
              k: "Certificate Type",
              v: `${cert.performance}`,
            },
            { k: "Trainer", v: cert.trainer || "ARC LABS Certified Trainer" },
            { k: "Certificate Status", v: "✓ ACTIVE & VERIFIED" },
          ].map((d) => (
            <div className="dc-cell" key={d.k}>
              <div className="dc-cell-k">{d.k}</div>
              <div
                className="dc-cell-v"
                style={
                  d.k === "Certificate Status" ? { color: "var(--lime)" } : {}
                }
              >
                {d.v}
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="dc-skills">
          <div className="dc-skills-lbl">
            Skills & Competencies Demonstrated
          </div>
          <div className="dc-chips">
            {cert.skills.map((s, i) => (
              <span key={s} className={`dc-chip${i < 2 ? " hi" : ""}`}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="dc-ft">
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
