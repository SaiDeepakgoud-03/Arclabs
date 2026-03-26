// ═══════════════════════════════════════════════════════
//  ARC LABS — Footer Component
//  src/components/Footer.jsx
// ═══════════════════════════════════════════════════════

import { Link } from "react-router-dom";
import "../styles/Footer.css";

const LINKS = {
  Programs: [
    { label: "School Labs",           to: "/lab-packages" },
    { label: "College Training",      to: "/programs" },
    { label: "Online Internships",    to: "/programs" },
    { label: "Teacher Certification", to: "/programs" },
  ],
  Company: [
    { label: "About Us",      to: "/" },
    { label: "CSR Partners",  to: "/csr-partners" },
    { label: "Products",      to: "/products" },
    { label: "Verify Cert",   to: "/verify" },
  ],
  Contact: [
    { label: "+91 40 3565 9806",  to: "tel:+914035659806" },
    { label: "+91 8699929532",    to: "tel:+918699929532" },
    { label: "hello@arclabs.in", to: "mailto:hello@arclabs.in" },
    { label: "sales@arclabs.in", to: "mailto:sales@arclabs.in" },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand column */}
        <div>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none", color: "var(--snow)", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem" }}>
            <span style={{ width: 8, height: 8, background: "var(--teal)", borderRadius: "50%", display: "inline-block" }} />
            ARC LABS
          </Link>
          <p className="footer-brand-desc">
            India's practical AI, IoT, and Robotics lab system for schools and colleges.
            Designed, built, and delivered from Hyderabad.
          </p>
          <div className="footer-msme">✓ MSME Registered · Made in India</div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, items]) => (
          <div key={heading} className="footer-col">
            <h4>{heading}</h4>
            {items.map((item) =>
              item.to.startsWith("tel:") || item.to.startsWith("mailto:") ? (
                <a key={item.label} href={item.to}>{item.label}</a>
              ) : (
                <Link key={item.label} to={item.to}>{item.label}</Link>
              )
            )}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span>© 2025 ARC LABS. All rights reserved. MSME Registered, Hyderabad.</span>

        <div className="footer-social">
          {[
            { icon: "in", href: "#" },
            { icon: "f",  href: "#" },
            { icon: "📷", href: "#" },
            { icon: "▶",  href: "#" },
          ].map((s) => (
            <a key={s.icon} href={s.href} className="social-btn" target="_blank" rel="noreferrer">
              {s.icon}
            </a>
          ))}
        </div>

        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
