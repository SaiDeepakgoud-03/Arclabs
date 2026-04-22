import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import {
  generateCertId,
  fetchPincode,
  getSkillsForCert,
  getGrade,
} from "../utils/certificationHelpers.js";

import {
  TECHNOLOGIES,
  DURATION_OPTIONS,
  PERFORMANCE_OPTIONS,
  INDIAN_STATES,
} from "../data/certificationConstants.js";

export default function RegisterPanel() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState("");

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  // 🔥 PINCODE AUTO FETCH
  const handlePin = async (val) => {
    const pin = val.replace(/\D/g, "").slice(0, 6);
    set("pincode", pin);

    if (pin.length === 6) {
      const res = await fetchPincode(pin);
      if (res) {
        set("city", res.city);
        set("state", res.state);
      }
    }
  };

  // 🔥 SUBMIT TO FIREBASE
  const submit = async () => {
    setLoading(true);

    try {
      const certId = generateCertId();

      const cert = {
        ...form,
        certId,
        durationDays: parseInt(form.durationDays),
        skills: getSkillsForCert(form.technology, form.durationDays),
        grade: getGrade(form.performance),
        issueDate: new Date().toISOString().split("T")[0],
      };

      await setDoc(doc(db, "certificates", certId), cert);

      setSuccessId(certId);
    } catch (err) {
      console.log(err);
      alert("Error saving certificate ❌");
    }

    setLoading(false);
  };

  return (
    <div className="vcard" style={{ animation: "fadein .4s ease" }}>
      <div className="vcard-eye">Certificate Registration</div>
      <div className="vcard-title">Register Certificate</div>
      <div className="vcard-sub">
        Fill all details to generate your certificate ID
      </div>

      {/* FORM GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        {/* NAME & PHONE */}
        <input
          className="cert-inp"
          placeholder="Full Name"
          onChange={(e) => set("fullName", e.target.value)}
        />

        <input
          className="cert-inp"
          placeholder="Phone Number"
          onChange={(e) =>
            set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
          }
        />

        {/* INSTITUTION TYPE */}
        <select
          className="cert-inp"
          value={form.institutionType || ""}
          onChange={(e) => set("institutionType", e.target.value)}
        >
          <option value="">Select Institution Type</option>
          <option value="school">🏫 School</option>
          <option value="college">🏛️ College</option>
          <option value="university">🎓 University</option>
          <option value="corporate">🏢 Corporate</option>
          <option value="individual">👤 Individual</option>
        </select>

        {/* INSTITUTION NAME */}
        <input
          className="cert-inp"
          placeholder="Institution Name"
          value={form.institution || ""}
          onChange={(e) => set("institution", e.target.value)}
        />

        {/* DATE */}
        <input
          className="cert-inp"
          type="date"
          onChange={(e) => set("trainingDate", e.target.value)}
        />

        {/* PINCODE */}
        <input
          className="cert-inp"
          placeholder="Pincode"
          onChange={(e) => handlePin(e.target.value)}
        />

        {/* CITY */}
        <input
          className="cert-inp"
          placeholder="City"
          value={form.city || ""}
          onChange={(e) => set("city", e.target.value)}
        />

        {/* STATE */}
        <select
          className="cert-inp"
          value={form.state || ""}
          onChange={(e) => set("state", e.target.value)}
        >
          <option value="">Select State</option>
          {INDIAN_STATES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* TECHNOLOGY */}
        <select
          className="cert-inp"
          onChange={(e) => set("technology", e.target.value)}
        >
          <option value="">Select Technology</option>
          {TECHNOLOGIES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>

        {/* DURATION */}
        <select
          className="cert-inp"
          onChange={(e) => set("durationDays", e.target.value)}
        >
          <option value="">Select Duration</option>
          {DURATION_OPTIONS.map((d) => (
            <option key={d.val} value={d.val}>
              {d.label}
            </option>
          ))}
        </select>

        {/* PERFORMANCE */}
        <select
          className="cert-inp"
          onChange={(e) => set("performance", e.target.value)}
        >
          <option value="">Select Performance</option>
          {PERFORMANCE_OPTIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* BUTTON */}
      <button
        className="btn-v"
        style={{ marginTop: "1rem" }}
        onClick={submit}
        disabled={loading}
      >
        {loading ? "⏳ Registering..." : "🎓 Register Certificate"}
      </button>

      {/* SUCCESS */}
      {successId && (
        <div style={{ marginTop: "1rem", color: "#00FFC6" }}>
          ✅ Certificate ID: <strong>{successId}</strong>
        </div>
      )}
    </div>
  );
}