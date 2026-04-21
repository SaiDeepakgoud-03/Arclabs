// ═══════════════════════════════════════════════════════
//  ARC LABS — Home Page
//  src/pages/Home.jsx
// ═══════════════════════════════════════════════════════

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Carousel from "react-bootstrap/Carousel";

// ─── Hero ───────────────────────────────────────────────
function Hero() {
  const STATS = [
    { num: "25K+", label: "Students Upskilled" },
    { num: "1K+", label: "Faculty Trained" },
    { num: "10+", label: "Years Experience" },
    { num: "500+", label: "Institutions" },
  ];

  const LAB_PACKAGES = [
    {
      name: "Starter Lab",
      tag: "Entry Level",
      features: [
        "IobiT Hardware Kit",
        "AI + IoRT Curriculum",
        "2-Day Teacher Training",
        "Installation Support",
      ],
      highlight: false,
    },
    {
      name: "Standard Lab",
      tag: "Most Preferred",
      features: [
        "Advanced Robotics Kit",
        "NEP 2020 Aligned Curriculum",
        "Faculty Certification",
        "Annual Maintenance Support",
      ],
      highlight: false,
    },
    {
      name: "Premier Lab",
      tag: "Full Infrastructure",
      features: [
        "Complete AI + IoRT Suite",
        "Multi-Classroom Setup",
        "Dedicated Trainer Support",
        "1-Year Lab Partnership",
      ],
      highlight: false,
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % LAB_PACKAGES.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? LAB_PACKAGES.length - 1 : prev - 1));
  };

  return (
    <section className="hero">
      <div className="hero-bg" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          MSME Registered · Made in India · Hyderabad
        </div>

        <h1>
          India's Practical
          <br />
          <span className="ht">AI + IoRT</span> Lab
          <br />
          System for <span className="hb">Schools</span>
        </h1>

        <p className="hero-sub">
          Designed and built in Hyderabad. Delivered across India. Full lab
          setup — hardware, curriculum, teacher training, and annual support.
          One partner, zero complexity.
        </p>

        <div className="hero-actions">
          <Link to="/lab-packages" className="btn-primary">
            Set Up a Lab →
          </Link>
          <Link to="/programs" className="btn-secondary">
            Explore Programs
          </Link>
        </div>

        <div className="hero-stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="hero-stat-num">
                <span>{s.num}</span>
              </div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating visual — desktop only */}
      <div className="hero-visual">
        <Carousel
          interval={2000}
          controls={true}
          indicators={false}
          pause="hover"
          fade
        >
          {LAB_PACKAGES.map((pkg, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-card">
                <span className="package-tag">{pkg.tag}</span>

                <h3>{pkg.name}</h3>

                <ul>
                  {pkg.features.map((feature, i) => (
                    <li key={i}>✔ {feature}</li>
                  ))}
                </ul>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

// ─── Trust Marquee ──────────────────────────────────────
function TrustBar() {
  const ITEMS = [
    "IIT Programs Delivered",
    "NEP 2020 Aligned",
    "MSME Registered",
    "Made-in-India Hardware",
    "25,000+ Students",
    "CSR-Ready Labs",
    "IoRT + AI Systems",
    "ATL Compatible Kits",
    "Teacher Certification",
    "IIT Programs Delivered",
    "NEP 2020 Aligned",
    "MSME Registered",
    "Made-in-India Hardware",
    "25,000+ Students",
    "CSR-Ready Labs",
    "IoRT + AI Systems",
    "ATL Compatible Kits",
    "Teacher Certification",
  ];
  return (
    <div className="trust-bar">
      <div className="trust-track">
        {ITEMS.map((item, i) => (
          <span className="trust-item" key={i}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Services ───────────────────────────────────────────
function Services() {
  const SERVICES = [
    {
      icon: "🏫",
      bg: "rgba(0,232,212,0.11)",
      title: "School Lab Setup & STEM Programs",
      desc: "End-to-end IoRT + AI lab installation for Classes 3–10. Hardware, curriculum, installation, and ongoing support bundled in one package.",
    },
    {
      icon: "🎓",
      bg: "rgba(0,184,255,0.11)",
      title: "College Training — IoT, AI & Embedded",
      desc: "Industry-driven curriculum in IoT, AI, Cloud, and Embedded Systems. Real projects, live hardware, and certification for engineering students.",
    },
    {
      icon: "💻",
      bg: "rgba(125,255,107,0.09)",
      title: "Online Certification & Internships",
      desc: "Structured online programs with mentor-led sessions, hands-on projects, and industry-recognized certification. Learn anytime, anywhere.",
    },
    {
      icon: "🏭",
      bg: "rgba(255,209,102,0.09)",
      title: "CSR Lab Implementation",
      desc: "Complete CSR-funded lab setup with impact reporting, cost-per-beneficiary data, and measurable learning outcomes for corporate partners.",
    },
    {
      icon: "📋",
      bg: "rgba(168,85,247,0.09)",
      title: "Teacher Training & Certification",
      desc: "Two-level certification program that makes teachers independently capable of delivering IoT and Robotics education without external support.",
    },
    {
      icon: "🔧",
      bg: "rgba(255,92,135,0.09)",
      title: "Custom Hardware & R&D Solutions",
      desc: "Made-in-India development boards and educational kits. Custom IoT and embedded system design for institutions and government programs.",
    },
  ];

  return (
    <section className="services-section" id="services">
      <div className="section-tag">Our Programs</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h2 className="section-title">
          Everything a school or college needs.
          <br />
          <span style={{ color: "var(--teal)" }}>One partner.</span>
        </h2>
        <p className="section-sub" style={{ marginBottom: 0 }}>
          From lab design to curriculum delivery — we handle it all.
        </p>
      </div>

      <div className="services-grid">
        {SERVICES.map((s) => (
          <div className="service-card" key={s.title}>
            <div className="service-icon" style={{ background: s.bg }}>
              {s.icon}
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="service-arrow">Learn more →</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Stats Band ─────────────────────────────────────────
function StatsBand() {
  const STATS = [
    {
      num: "25,000+",
      label: "Students Upskilled",
      desc: "Across schools, colleges & corporates",
    },
    {
      num: "1,000+",
      label: "Faculty Certified",
      desc: "Including IIT & NIT programs",
    },
    {
      num: "3,000+",
      label: "Training Sessions",
      desc: "Delivered across India",
    },
    {
      num: "10+",
      label: "Years in EdTech",
      desc: "MSME-registered, Hyderabad",
    },
    {
      num: "500+",
      label: "Institutions",
      desc: "Schools, colleges & labs served",
    },
  ];
  return (
    <div className="stats-band">
      <div className="stats-grid">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Products Preview ────────────────────────────────────
function Products() {
  const PRODUCTS = [
    {
      emoji: "⚡",
      image: "/images/products/lite-kit.jpg",
      label: "STARTER",
      name: "IobiT IoT Lite Kit",
      desc: "Beginner IoT development board with Arduino & ESP32 support. Includes essential sensors for classroom learning.",
      tags: ["Arduino", "ESP32", "IoT Basics"],
    },
    {
      emoji: "🚀",
      image: "/images/products/pro-kit.jpg",
      label: "PRO",
      name: "IobiT IoT Pro Kit",
      desc: "Advanced IoT and Embedded Systems board. Features Raspberry Pi & ESP32, industrial sensors, and cloud connectivity.",
      tags: ["Raspberry Pi", "ESP32", "Cloud IoT"],
    },
    {
      emoji: "🔬",
      image: "/images/products/experience-kit.jpg",
      label: "ADVANCED",
      name: "IoT Experience Kit",
      desc: "All-in-one platform supporting Arduino, ESP32, STM32. Versatile for research and advanced lab projects.",
      tags: ["Arduino", "STM32", "Research"],
    },
  ];
  return (
    <section className="products-section" id="products">
      <div className="products-header">
        <div>
          <div className="section-tag">IobiT Hardware — by ARC LABS</div>
          <h2 className="section-title">
            Made-in-India.
            <br />
            <span style={{ color: "var(--teal)" }}>Built for classrooms.</span>
          </h2>
        </div>
        <Link to="/products" className="btn-secondary">
          View All Products →
        </Link>
      </div>
      <div className="products-grid">
        {PRODUCTS.map((p) => (
          <Link to="/products" className="product-card" key={p.name}>
            <div className="product-img">
              {p.image ? (
                <img 
                  src={p.image} 
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <span>{p.emoji}</span>
              )}
              <span className="product-label">{p.label}</span>
            </div>
            <div className="product-body">
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="product-tags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Packages Preview ────────────────────────────────────
function Packages() {
  const TIERS = [
    {
      tier: "TIER 01",
      name: "Starter Lab",
      price: "₹2.5L",
      period: "one-time setup",
      featured: false,
      features: [
        { text: "IobiT IoT Lite Kit (15 units)", hi: false },
        { text: "NEP 2020 aligned curriculum — Level 1", hi: false },
        { text: "2-day teacher onsite training", hi: false },
        { text: "Lab branding & installation", hi: false },
        { text: "6-month support contract", hi: false },
        { text: "Digital student workbooks", hi: true },
      ],
    },
    {
      tier: "TIER 02",
      name: "Standard Lab",
      price: "₹5L",
      period: "one-time setup",
      featured: true,
      features: [
        { text: "IobiT IoT Pro Kit (20 units)", hi: false },
        { text: "Full curriculum — Levels 1 & 2", hi: false },
        { text: "3-day teacher certification program", hi: false },
        { text: "Complete lab installation & branding", hi: false },
        { text: "Annual support + curriculum updates", hi: true },
        { text: "Student assessment portal access", hi: true },
      ],
    },
    {
      tier: "TIER 03",
      name: "Premier Lab",
      price: "₹10L+",
      period: "custom quote",
      featured: false,
      features: [
        { text: "Full IoRT + AI lab — custom design", hi: false },
        { text: "Robotics + AI + IoT complete stack", hi: false },
        { text: "5-day teacher certification", hi: false },
        { text: "Priority installation & dedicated support", hi: false },
        { text: "CSR impact reporting & documentation", hi: true },
        { text: "Co-branded lab with ARC LABS", hi: true },
      ],
    },
  ];

  return (
    <section className="packages-section" id="packages">
      <div className="section-tag">Lab Packages</div>
      <h2 className="section-title">
        Clear packages.
        <br />
        <span style={{ color: "var(--teal)" }}>No custom quoting.</span>
      </h2>
      <p className="section-sub">
        Three fixed tiers for schools. Every tier includes hardware, curriculum,
        training, and support.
      </p>

      <div className="packages-grid">
        {TIERS.map((t) => (
          <div
            className={`package-card${t.featured ? " featured" : ""}`}
            key={t.name}
          >
            <div className="package-tier">{t.tier}</div>
            <h3>{t.name}</h3>
            <div className="package-price">
              {t.price} <span>/ {t.period}</span>
            </div>
            <ul className="package-features">
              {t.features.map((f) => (
                <li className={f.hi ? "hi" : ""} key={f.text}>
                  {f.text}
                </li>
              ))}
            </ul>
            <Link
              to="/lab-packages"
              className={t.featured ? "btn-primary" : "btn-secondary"}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Get This Package →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CSR Section ─────────────────────────────────────────
function CSR() {
  const METRICS = [
    { val: "₹800", label: "Min. cost per beneficiary" },
    { val: "3 Yrs", label: "Outcome tracking available" },
    { val: "Sch VII", label: "Companies Act eligible" },
    { val: "100%", label: "Documentation provided" },
  ];
  const CHECKLIST = [
    "Complete lab setup funded by CSR allocation",
    "Impact documentation for annual CSR reports",
    "Cost per beneficiary from ₹800–₹2,000",
    "Eligible under Schedule VII — Education clause",
    "3-year outcome tracking available",
  ];

  return (
    <section className="csr-section" id="csr">
      <div className="csr-inner">
        <div>
          <div className="section-tag">CSR Partners</div>
          <h2 className="section-title">
            Turn your CSR budget into
            <br />
            <span style={{ color: "var(--teal)" }}>measurable impact.</span>
          </h2>
          <p className="section-sub" style={{ marginBottom: "1.8rem" }}>
            ARC LABS delivers CSR-funded lab implementations with full
            documentation — cost per beneficiary, student outcomes, and impact
            reports aligned with Schedule VII of the Companies Act.
          </p>
          <ul className="csr-checklist">
            {CHECKLIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link to="/csr-partners" className="btn-primary">
            Discuss CSR Partnership →
          </Link>
        </div>

        <div className="csr-metrics-grid">
          {METRICS.map((m) => (
            <div className="csr-metric" key={m.label}>
              <div className="csr-metric-val">{m.val}</div>
              <div className="csr-metric-label">{m.label}</div>
            </div>
          ))}
          <div className="csr-metric csr-wide">
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: ".68rem",
                color: "var(--teal)",
                marginBottom: "7px",
              }}
            >
              LISTED ON
            </div>
            <div
              style={{
                fontSize: ".83rem",
                color: "var(--fog)",
                lineHeight: 1.7,
              }}
            >
              CSR Box · GiveIndia Corporate · Sattva Platform
              <br />
              <span style={{ color: "var(--snow)", fontWeight: 600 }}>
                ARC LABS is listed on all major CSR platforms.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────
function Testimonials() {
  const TESTIMONIALS = [
    {
      stars: 5,
      text: "The IoRT lab setup at our school was seamless. Students are building real projects from week two. The teacher training made our faculty genuinely confident.",
      author: "Principal, CBSE School",
      role: "Hyderabad, Telangana",
    },
    {
      stars: 5,
      text: "ARC LABS delivered a complete IoT training module for our engineering students. Industry-relevant, practical, and very well structured. Our placement numbers improved.",
      author: "HOD, Electronics Dept.",
      role: "Engineering College, Vijayawada",
    },
    {
      stars: 5,
      text: "Our CSR funding for STEM labs was perfectly executed by ARC LABS. The impact documentation they provided made our board reporting straightforward.",
      author: "CSR Head",
      role: "Manufacturing Company, Hyderabad",
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="section-tag">Impact Stories</div>
      <h2 className="section-title">
        What institutions say about{" "}
        <span style={{ color: "var(--teal)" }}>ARC LABS.</span>
      </h2>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t) => (
          <div className="tcard" key={t.author}>
            <div className="tcard-stars">{"★".repeat(t.stars)}</div>
            <p className="tcard-text">"{t.text}"</p>
            <div className="tcard-author">{t.author}</div>
            <div className="tcard-role">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────
function CTASection() {
  return (
    <div className="cta-section" id="contact">
      <h2>
        Ready to build your lab?
        <br />
        <span style={{ color: "var(--teal)" }}>Let's talk.</span>
      </h2>
      <p>
        Schools, colleges, CSR officers — reach out. We'll get back within 24
        hours.
      </p>
      <div className="cta-buttons">
        <a href="tel:+918699929532" className="btn-primary">
          📞 +91 8699929532
        </a>
        <a href="mailto:hello@arclabs.in" className="btn-secondary">
          ✉ hello@arclabs.in
        </a>
        <a
          href="https://wa.me/918699929532"
          className="btn-secondary"
          target="_blank"
          rel="noreferrer"
        >
          💬 WhatsApp Us
        </a>
      </div>
      <p className="cta-address">
        4-7-138/1, Narendra Nagar, Habsiguda, Hyderabad – 500007 · GST &amp;
        MSME Registered
      </p>
    </div>
  );
}

// ─── Main Home Page ──────────────────────────────────────
export default function Home() {
  // Scroll-triggered fade-up (optional — add class fade-up to elements)
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <StatsBand />
      <Products />
      <Packages />
      <CSR />
      <Testimonials />
      <CTASection />
    </>
  );
}
