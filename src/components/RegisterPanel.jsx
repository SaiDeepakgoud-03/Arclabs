import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import {
  generateCertId,
  fetchPincode,
  getSkillsForCert,
} from "../utils/certificationHelpers.js";

import {
  TECHNOLOGIES,
  DURATION_OPTIONS,
  INDIAN_STATES,
} from "../data/certificationConstants.js";

export default function RegisterPanel() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState("");

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

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

  const submit = async () => {
    setLoading(true);

    try {
      const certId = generateCertId();

      const cert = {
        ...form,
        certId,
        durationDays: parseInt(form.durationDays),
        skills: getSkillsForCert(form.technology, form.durationDays),
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
    <div className="vcard">
      <div className="vcard-eye">Certificate Registration</div>
      <div className="vcard-title">Register Certificate</div>
      <div className="vcard-sub">
        Fill all details to generate your certificate ID
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.2rem",
        }}
      >
        {[
          {
            label: "Full Name",
            placeholder: "Enter name",
            field: (
              <input
                className="cert-inp"
                onChange={(e) => set("fullName", e.target.value)}
              />
            ),
          },
          {
            label: "Phone Number",
            placeholder: "Enter phone number",
            field: (
              <input
                className="cert-inp"
                onChange={(e) =>
                  set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                }
              />
            ),
          },
          {
            label: "Institution Type",
            field: (
              <select
                className="cert-inp"
                onChange={(e) => set("institutionType", e.target.value)}
              >
                <option value="">Select Institution Type</option>
                <option value="school">🏫 School</option>
                <option value="college">🏛️ College</option>
                <option value="university">🎓 University</option>
                <option value="corporate">🏢 Corporate</option>
                <option value="individual">👤 Individual</option>
              </select>
            ),
          },
          {
            label: "Institution Name",
            placeholder: "Enter institution name",
            field: (
              <input
                className="cert-inp"
                onChange={(e) => set("institution", e.target.value)}
              />
            ),
          },
          {
            label: "Training Date",
            field: (
              <input
                type="date"
                className="cert-inp"
                onChange={(e) => set("trainingDate", e.target.value)}
              />
            ),
          },
          {
            label: "Pincode",
            placeholder: "Enter pincode",
            field: (
              <input
                className="cert-inp"
                onChange={(e) => handlePin(e.target.value)}
              />
            ),
          },
          {
            label: "City",
            placeholder: "Enter city",
            field: (
              <input
                className="cert-inp"
                value={form.city || ""}
                onChange={(e) => set("city", e.target.value)}
              />
            ),
          },
          {
            label: "State",
            field: (
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
            ),
          },
          {
            label: "Technology",
            field: (
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
            ),
          },
          {
            label: "Duration",
            field: (
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
            ),
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontSize: "0.8rem",
                color: "#aaa",
                marginBottom: "4px",
              }}
            >
              {item.label}
            </label>

            {item.placeholder
              ? React.cloneElement(item.field, {
                  placeholder: item.placeholder,
                })
              : item.field}
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
        <button className="btn-v" onClick={submit} disabled={loading}>
          {loading ? "⏳ Registering..." : "🎓 Register Certificate"}
        </button>
      </div>

      {/* SUCCESS */}
      {successId && (
        <div style={{ marginTop: "1rem", textAlign: "center", color: "#00FFC6" }}>
          ✅ Certificate ID: <strong>{successId}</strong>
        </div>
      )}
    </div>
  );
}