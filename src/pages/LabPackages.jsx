import React from 'react';

/* ═══════════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink:     #060610;
  --deep:    #0A0A18;
  --panel:   #0F0F20;
  --card:    #141428;
  --card2:   #191932;
  --raised:  #1E1E3A;
  --line:    rgba(255,255,255,0.07);
  --line2:   rgba(255,255,255,0.12);
  --snow:    #EEF0FF;
  --mist:    #8080A8;
  --fog:     #B0B0CC;
  --lime:    #A8FF3E;
  --cyan:    #00E5FF;
  --amber:   #FFB930;
  --coral:   #FF5E5E;
  --violet:  #B06EFF;
  --glow-l:  rgba(168,255,62,0.12);
  --glow-c:  rgba(0,229,255,0.12);
  --glow-a:  rgba(255,185,48,0.12);
}

html { scroll-behavior: smooth; }
body {
  background: var(--ink);
  color: var(--snow);
  font-family: 'DM Sans', sans-serif;
  line-height: 1.65;
  overflow-x: hidden;
}
::selection { background: var(--lime); color: var(--ink); }
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--ink); }
::-webkit-scrollbar-thumb { background: var(--lime); }

/* Grid texture */
body::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.011) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.011) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── NAV ─────────────────────────────────────── */
.lnav {
  position: sticky; top: 0; z-index: 200;
  height: 68px; padding: 0 5vw;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(6,6,16,0.92); backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--line);
}
.lnav-logo {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.2rem;
  color: var(--snow); text-decoration: none;
  display: flex; align-items: center; gap: 9px;
}
.ldot {
  width: 9px; height: 9px; background: var(--lime); border-radius: 50%;
  animation: ldpulse 2s infinite;
}
@keyframes ldpulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(168,255,62,0.4); }
  50%      { box-shadow: 0 0 0 8px rgba(168,255,62,0); }
}
.lnav-right { display: flex; align-items: center; gap: 1rem; }
.lnav-link { font-size: .8rem; color: var(--mist); text-decoration: none; transition: color .2s; }
.lnav-link:hover { color: var(--snow); }
.lnav-cta {
  background: var(--lime); color: var(--ink);
  font-weight: 700; font-size: .82rem; padding: 9px 20px;
  border-radius: 7px; border: none; cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: all .2s; text-decoration: none;
}
.lnav-cta:hover { box-shadow: 0 4px 18px var(--glow-l); transform: translateY(-1px); }

/* ── HERO ─────────────────────────────────────── */
.lhero {
  padding: 80px 5vw 0; position: relative; overflow: hidden;
}
.lhero-bg {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 70% 50% at 50% 0%, rgba(168,255,62,0.055) 0%, transparent 65%),
    radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,229,255,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 30% 30% at 85% 30%, rgba(176,110,255,0.04) 0%, transparent 60%);
}
.lhero-inner {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center; padding-bottom: 80px;
}
@media(max-width:900px) { .lhero-inner { grid-template-columns: 1fr; gap: 2.5rem; } }

.lhero-tag {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(168,255,62,0.07); border: 1px solid rgba(168,255,62,0.2);
  border-radius: 100px; padding: 5px 15px; margin-bottom: 1.6rem;
  font-family: 'JetBrains Mono', monospace; font-size: .68rem;
  color: var(--lime); letter-spacing: .09em;
}
.ltag-dot { width: 5px; height: 5px; background: var(--lime); border-radius: 50%; animation: ldpulse 1.5s infinite; }

.lhero-text h1 {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  line-height: 1.06; letter-spacing: -.035em; margin-bottom: 1.2rem;
}
.lhero-text h1 em { font-style: normal; color: var(--lime); }
.lhero-text p {
  color: var(--mist); font-size: .97rem; font-weight: 300;
  max-width: 480px; line-height: 1.8; margin-bottom: 2rem; text-align: left;
}
.lhero-actions { display: flex; gap: .8rem; flex-wrap: wrap; }

/* Hero right — floating stat cards */
.lhero-right { display: flex; flex-direction: column; gap: 1rem; }
.hstat-card {
  background: var(--card);
  border: 1px solid var(--line2);
  border-radius: 14px; padding: 18px 20px;
  position: relative; overflow: hidden;
  transition: transform .3s;
}
.hstat-card:hover { transform: translateX(4px); }
.hstat-card::before {
  content: ''; position: absolute; top: 0; left: 0;
  width: 3px; height: 100%;
  background: var(--hs-color, var(--lime));
}
.hstat-row { display: flex; align-items: center; justify-content: space-between; }
.hstat-num {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: 1.7rem; line-height: 1;
  color: var(--hs-color, var(--lime));
}
.hstat-icon { font-size: 1.6rem; opacity: .8; }
.hstat-label { font-size: .78rem; color: var(--mist); margin-top: 4px; }
.hstat-bar { height: 3px; background: var(--line); border-radius: 2px; margin-top: 10px; overflow: hidden; }
.hstat-fill { height: 100%; border-radius: 2px; background: var(--hs-color, var(--lime)); animation: hfill 2s ease-out; }
@keyframes hfill { from { width: 0; } }

/* ── AUDIENCE SWITCHER ─────────────────────── */
.audience-bar {
  display: flex; justify-content: center; gap: .5rem;
  padding: 0 5vw 52px; position: relative; z-index: 1;
}
.aud-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 24px; border-radius: 9px;
  border: 1px solid var(--line2); background: var(--panel);
  color: var(--mist); font-size: .85rem; font-weight: 500;
  cursor: pointer; transition: all .25s;
  font-family: 'DM Sans', sans-serif;
}
.aud-btn.active {
  background: rgba(168,255,62,0.09);
  border-color: var(--lime); color: var(--lime);
}
.aud-btn:hover:not(.active) { color: var(--fog); border-color: var(--line2); }

/* ── PACKAGES SECTION ──────────────────────── */
.pkg-section { padding: 0 5vw 80px; position: relative; z-index: 1; }
.pkg-section-head { text-align: center; margin-bottom: 3.5rem; }
.sec-eye {
  font-family: 'JetBrains Mono', monospace; font-size: .67rem;
  color: var(--lime); letter-spacing: .14em; text-transform: uppercase;
  margin-bottom: .8rem; display: flex; align-items: center; justify-content: center; gap: 8px;
}
.sec-eye::before { content: '//'; opacity: .35; }
.sec-h {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  letter-spacing: -.03em; line-height: 1.1; margin-bottom: .7rem;
}
.sec-sub { color: var(--mist); font-size: .95rem; font-weight: 300; max-width: 480px; margin: 0 auto; line-height: 1.75; text-align: center; }

.packages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  align-items: start;
}
@media(max-width:900px) { .packages-grid { grid-template-columns: 1fr; } }
@media(min-width:901px) and (max-width:1100px) { .packages-grid { grid-template-columns: 1fr 1fr; } }

/* ── PACKAGE CARD ──────────────────────────── */
.pkg-card {
  border-radius: 20px; overflow: hidden;
  border: 1px solid var(--line);
  background: var(--card);
  position: relative;
  transition: all .35s cubic-bezier(.4,0,.2,1);
  display: flex; flex-direction: column;
}
.pkg-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 28px 70px rgba(0,0,0,.5);
}
.pkg-card.featured {
  border-color: var(--lime);
  background: linear-gradient(160deg, rgba(168,255,62,0.05) 0%, var(--card) 50%);
  box-shadow: 0 0 0 1px var(--lime), 0 20px 60px rgba(168,255,62,0.1);
}
.pkg-card.featured:hover { transform: translateY(-8px); box-shadow: 0 0 0 1px var(--lime), 0 36px 80px rgba(168,255,62,0.15); }

/* Top accent bar */
.pkg-top-bar {
  height: 4px;
  background: linear-gradient(90deg, var(--pkg-color, var(--lime)), transparent);
}

/* Card header */
.pkg-head { padding: 26px 26px 0; }
.pkg-label {
  font-family: 'JetBrains Mono', monospace; font-size: .62rem;
  letter-spacing: .1em; text-transform: uppercase;
  margin-bottom: .5rem;
}
.pkg-popular {
  position: absolute; top: 20px; right: 16px;
  background: var(--lime); color: var(--ink);
  font-family: 'JetBrains Mono', monospace; font-size: .58rem; font-weight: 700;
  padding: 4px 10px; border-radius: 5px; letter-spacing: .07em;
}
.pkg-name {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.35rem;
  letter-spacing: -.025em; margin-bottom: .3rem;
}
.pkg-tagline { font-size: .8rem; color: var(--mist); line-height: 1.55; margin-bottom: 1.2rem; }

/* Price block */
.pkg-price-block {
  background: var(--card2); border-radius: 12px;
  padding: 16px 18px; margin: 0 0 1.4rem;
  border: 1px solid var(--line);
}
.pkg-price {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 2.2rem;
  letter-spacing: -.03em; line-height: 1;
}
.pkg-price span { font-size: .9rem; font-weight: 400; color: var(--mist); }
.pkg-price-sub { font-size: .72rem; color: var(--mist); margin-top: 5px; }
.pkg-price-note {
  display: inline-flex; align-items: center; gap: 5px;
  margin-top: 8px;
  font-family: 'JetBrains Mono', monospace; font-size: .6rem;
  color: var(--lime); background: rgba(168,255,62,0.08);
  padding: 3px 10px; border-radius: 4px;
}

/* What's included */
.pkg-includes { padding: 0 26px; flex: 1; }
.pkg-includes h4 {
  font-family: 'JetBrains Mono', monospace; font-size: .62rem;
  color: var(--mist); letter-spacing: .1em; text-transform: uppercase;
  margin-bottom: .9rem;
}
.pkg-feature-list { list-style: none; margin-bottom: 1.2rem; padding-left: 0; }
.pkg-feature-list li {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: .82rem; color: var(--fog); padding: 7px 0 7px 18px;
  border-bottom: 1px solid var(--line);
  line-height: 1.5;
  position: relative;
}
.pkg-feature-list li::before {
  content: '•'; position: absolute; left: 0;
  color: var(--lime); font-weight: 700; font-size: 1rem;
}
.pkg-feature-list li:last-child { border-bottom: none; }
.pf-icon { flex-shrink: 0; font-size: .75rem; margin-top: 2px; }
.pf-text b { color: var(--snow); font-weight: 600; display: block; margin-bottom: 1px; }
.pf-text span { font-size: .75rem; }

/* Audience tags */
.pkg-audience {
  padding: 0 26px; margin-bottom: 1.2rem;
  display: flex; gap: 5px; flex-wrap: wrap;
}
.pkg-aud-tag {
  font-size: .68rem; padding: 3px 9px; border-radius: 4px;
  background: rgba(255,255,255,0.04); border: 1px solid var(--line);
  color: var(--mist);
}

/* Card footer */
.pkg-footer { padding: 16px 26px 22px; display: flex; flex-direction: column; gap: .6rem; }
.pkg-btn-primary {
  width: 100%; padding: 13px; border-radius: 10px; border: none;
  font-weight: 700; font-size: .9rem; cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: all .25s;
  display: flex; align-items: center; justify-content: center; gap: 7px;
}
.pkg-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
.pkg-btn-secondary {
  width: 100%; padding: 11px; border-radius: 10px;
  border: 1px solid var(--line2); background: transparent;
  color: var(--fog); font-size: .82rem; font-weight: 500; cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: all .2s;
}
.pkg-btn-secondary:hover { border-color: var(--line2); background: rgba(255,255,255,0.03); color: var(--snow); }

/* ── WHAT'S INSIDE EXPANDABLE ──────────────── */
.inside-section {
  padding: 0 5vw 80px; position: relative; z-index: 1;
}
.inside-tabs {
  display: flex; gap: .5rem; margin-bottom: 2rem; flex-wrap: wrap;
}
.ins-tab {
  padding: 9px 20px; border-radius: 8px;
  border: 1px solid var(--line2); background: transparent;
  color: var(--mist); font-size: .8rem; font-weight: 500;
  cursor: pointer; transition: all .22s; font-family: 'DM Sans', sans-serif;
  display: flex; align-items: center; gap: 7px;
}
.ins-tab.active { background: var(--card2); border-color: var(--line2); color: var(--snow); }

.inside-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}
.inside-item {
  background: var(--card); border: 1px solid var(--line); border-radius: 12px;
  padding: 18px 18px; display: flex; gap: 13px; align-items: flex-start;
  transition: border-color .2s;
}
.inside-item:hover { border-color: var(--line2); }
.ins-icon {
  width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 1rem;
}
.ins-name { font-family: 'Syne', sans-serif; font-size: .85rem; font-weight: 700; margin-bottom: 3px; }
.ins-desc { font-size: .75rem; color: var(--mist); line-height: 1.55; }
.ins-tag {
  display: inline-block; margin-top: 6px;
  font-family: 'JetBrains Mono', monospace; font-size: .58rem;
  padding: 2px 8px; border-radius: 3px; letter-spacing: .05em;
}

/* ── PROCESS TIMELINE ──────────────────────── */
.process-section {
  padding: 80px 5vw;
  background: var(--deep); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
}
.process-steps {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0; position: relative; margin-top: 3rem;
}
.process-steps::before {
  content: ''; position: absolute;
  top: 28px; left: 5%; right: 5%; height: 1px;
  background: linear-gradient(90deg, transparent, var(--lime), var(--cyan), var(--amber), transparent);
  opacity: .3;
}
.proc-step {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; padding: 0 12px; position: relative;
}
.proc-num {
  width: 56px; height: 56px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem;
  margin-bottom: 1rem; position: relative; z-index: 1;
  border: 2px solid var(--ps-color, var(--lime));
  background: var(--ink); color: var(--ps-color, var(--lime));
}
.proc-icon { font-size: 1.5rem; margin-bottom: .6rem; }
.proc-title { font-family: 'Syne', sans-serif; font-size: .9rem; font-weight: 700; margin-bottom: .3rem; }
.proc-desc { font-size: .77rem; color: var(--mist); line-height: 1.6; max-width: 160px; text-align: center; }
.proc-time {
  margin-top: .6rem;
  font-family: 'JetBrains Mono', monospace; font-size: .6rem;
  color: var(--ps-color, var(--lime)); letter-spacing: .08em;
  background: rgba(168,255,62,0.07); padding: 3px 10px; border-radius: 4px;
}

/* ── ROI CALCULATOR ────────────────────────── */
.roi-section {
  padding: 80px 5vw;
  position: relative; z-index: 1;
}
.roi-inner {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: start;
}
@media(max-width:768px) { .roi-inner { grid-template-columns: 1fr; gap: 2rem; } }

.roi-form { background: var(--card); border: 1px solid var(--line2); border-radius: 20px; padding: 32px; }
.roi-form h3 {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.2rem;
  letter-spacing: -.02em; margin-bottom: 1.5rem;
}
.roi-row { margin-bottom: 1.2rem; }
.roi-row label {
  display: flex; justify-content: space-between; align-items: center;
  font-size: .78rem; font-weight: 600; color: var(--fog); margin-bottom: 7px;
}
.roi-row label span {
  font-family: 'JetBrains Mono', monospace; font-size: .72rem;
  color: var(--lime); background: rgba(168,255,62,0.1);
  padding: 2px 9px; border-radius: 4px;
}
.roi-slider {
  width: 100%; -webkit-appearance: none; appearance: none;
  height: 4px; border-radius: 2px; outline: none; cursor: pointer;
  background: var(--line2);
}
.roi-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 18px; height: 18px;
  background: var(--lime); border-radius: 50%; cursor: pointer;
  box-shadow: 0 0 10px rgba(168,255,62,0.4);
}

.roi-results { display: flex; flex-direction: column; gap: 1rem; }
.roi-results h3 {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.2rem;
  letter-spacing: -.02em; margin-bottom: .5rem;
}
.roi-metric {
  background: var(--card); border: 1px solid var(--line); border-radius: 14px;
  padding: 20px; position: relative; overflow: hidden;
}
.roi-metric::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--rm-color, var(--lime)), transparent);
}
.roi-metric-label { font-size: .72rem; color: var(--mist); text-transform: uppercase; letter-spacing: .07em; margin-bottom: 6px; font-family: 'JetBrains Mono', monospace; }
.roi-metric-val {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.8rem;
  letter-spacing: -.025em; color: var(--rm-color, var(--lime));
}
.roi-metric-sub { font-size: .75rem; color: var(--mist); margin-top: 3px; }
.roi-metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

/* ── CSR CALLOUT ───────────────────────────── */
.csr-callout {
  margin: 0 5vw 80px; padding: 40px;
  background: linear-gradient(135deg, rgba(168,255,62,0.05), rgba(0,229,255,0.05));
  border: 1px solid rgba(168,255,62,0.2); border-radius: 20px;
  position: relative; overflow: hidden; z-index: 1;
}
.csr-callout::before {
  content: 'CSR';
  position: absolute; right: -10px; top: -20px;
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 8rem;
  opacity: .03; letter-spacing: -.05em; color: var(--lime); pointer-events: none;
}
.csr-callout-inner { display: grid; grid-template-columns: 1fr auto; gap: 2rem; align-items: center; flex-wrap: wrap; }
@media(max-width:640px) { .csr-callout-inner { grid-template-columns: 1fr; } }
.csr-callout h3 {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem;
  letter-spacing: -.025em; margin-bottom: .5rem;
}
.csr-callout p { font-size: .87rem; color: var(--mist); line-height: 1.7; max-width: 520px; text-align: left; }
.csr-pills { display: flex; gap: .5rem; flex-wrap: wrap; margin-top: 1rem; }
.csr-pill {
  font-size: .72rem; padding: 4px 12px; border-radius: 100px;
  background: rgba(168,255,62,0.08); border: 1px solid rgba(168,255,62,0.2);
  color: var(--lime); font-family: 'JetBrains Mono', monospace; letter-spacing: .04em;
}

/* ── FAQ ───────────────────────────────────── */
.faq-section { padding: 80px 5vw; background: var(--deep); border-top: 1px solid var(--line); }
.faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2.8rem; }
@media(max-width:768px) { .faq-grid { grid-template-columns: 1fr; } }
.faq-item {
  background: var(--card); border: 1px solid var(--line); border-radius: 12px;
  overflow: hidden; cursor: pointer; transition: border-color .2s;
}
.faq-item:hover { border-color: var(--line2); }
.faq-item.open { border-color: rgba(168,255,62,0.25); }
.faq-q {
  padding: 18px 20px; display: flex; justify-content: space-between; align-items: center;
  gap: 1rem;
}
.faq-q-text { font-size: .87rem; font-weight: 600; line-height: 1.45; }
.faq-toggle {
  width: 26px; height: 26px; border-radius: 6px; flex-shrink: 0;
  background: var(--raised); display: flex; align-items: center; justify-content: center;
  font-size: .75rem; color: var(--mist); transition: all .2s;
}
.faq-item.open .faq-toggle { background: rgba(168,255,62,0.1); color: var(--lime); }
.faq-a {
  padding: 0 20px 18px; font-size: .83rem; color: var(--mist); line-height: 1.7;
  border-top: 1px solid var(--line);
  animation: faqopen .25s ease;
}
@keyframes faqopen { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

/* ── BOTTOM CTA ─────────────────────────────── */
.lbottom-cta {
  padding: 100px 5vw; text-align: center;
  background: var(--ink); border-top: 1px solid var(--line);
  position: relative; overflow: hidden;
}
.lbottom-cta::before {
  content: ''; position: absolute; top: 50%; left: 50%;
  transform: translate(-50%,-50%); width: 700px; height: 500px;
  background: radial-gradient(ellipse, rgba(168,255,62,0.06) 0%, transparent 65%);
  pointer-events: none;
}
.lbottom-cta h2 {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(2rem, 4.5vw, 3.2rem); letter-spacing: -.03em; line-height: 1.08;
  margin-bottom: .8rem; position: relative;
}
.lbottom-cta h2 em { font-style: normal; color: var(--lime); }
.lbottom-cta p { color: var(--mist); font-size: .95rem; margin-bottom: 2.2rem; position: relative; }
.lcta-btns { display: flex; gap: .8rem; justify-content: center; flex-wrap: wrap; position: relative; }

/* ── BUTTONS ─────────────────────────── */
.btn-lime {
  background: var(--lime); color: var(--ink); font-weight: 700; font-size: .9rem;
  padding: 13px 28px; border-radius: 9px; border: none; cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: all .22s;
  display: inline-flex; align-items: center; gap: 7px; text-decoration: none;
}
.btn-lime:hover { box-shadow: 0 5px 22px var(--glow-l); transform: translateY(-1px); }
.btn-ghost {
  background: transparent; color: var(--snow); font-weight: 500; font-size: .9rem;
  padding: 13px 28px; border-radius: 9px; border: 1px solid var(--line2); cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: all .22s;
  display: inline-flex; align-items: center; gap: 7px; text-decoration: none;
}
.btn-ghost:hover { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.22); }

/* ── MODAL ─────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 500;
  background: rgba(6,6,16,.9); backdrop-filter: blur(16px);
  display: flex; align-items: center; justify-content: center; padding: 1.5rem;
  animation: mfade .2s ease;
}
@keyframes mfade { from{opacity:0} to{opacity:1} }
.lmodal {
  background: var(--card2); border: 1px solid var(--line2);
  border-radius: 22px; width: 100%; max-width: 560px;
  max-height: 92vh; overflow-y: auto;
  animation: mscale .32s cubic-bezier(.34,1.56,.64,1); position: relative;
}
@keyframes mscale { from{opacity:0;transform:scale(.91)} to{opacity:1;transform:scale(1)} }
.lmodal-close {
  position: absolute; top: 14px; right: 14px;
  background: rgba(255,255,255,.07); border: none; color: var(--mist);
  width: 30px; height: 30px; border-radius: 7px; font-size: .9rem;
  cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s;
}
.lmodal-close:hover { background: rgba(255,255,255,.13); color: var(--snow); }
.lmodal-head { padding: 30px 30px 20px; border-bottom: 1px solid var(--line); }
.lmodal-head h3 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.25rem; margin-bottom: .3rem; letter-spacing: -.02em; }
.lmodal-head p { font-size: .82rem; color: var(--mist); line-height: 1.6; }

.modal-pkg-sel {
  margin-top: 1rem; padding: 14px 16px;
  background: var(--card); border: 1px solid var(--line2); border-radius: 10px;
  display: flex; align-items: center; gap: 12px;
}
.mps-icon2 { font-size: 1.8rem; }
.mps-info {}
.mps-name { font-family: 'Syne', sans-serif; font-size: .9rem; font-weight: 700; }
.mps-meta { font-size: .72rem; color: var(--mist); margin-top: 2px; }
.mps-meta strong { font-family: 'Syne', sans-serif; font-size: .85rem; font-weight: 800; }

.lmodal-body { padding: 22px 30px 30px; }
.lform-row { margin-bottom: .9rem; }
.lform-row label { display: block; font-size: .74rem; font-weight: 600; color: var(--fog); margin-bottom: 5px; letter-spacing: .03em; }
.lform-row input, .lform-row select, .lform-row textarea {
  width: 100%; background: var(--card); border: 1px solid var(--line2);
  border-radius: 8px; color: var(--snow); font-family: 'DM Sans', sans-serif;
  font-size: .86rem; padding: 10px 13px; outline: none; transition: border-color .2s;
  -webkit-appearance: none;
}
.lform-row input:focus, .lform-row select:focus, .lform-row textarea:focus {
  border-color: var(--lime); box-shadow: 0 0 0 3px rgba(168,255,62,.07);
}
.lform-row select option { background: var(--card2); }
.lform-row textarea { resize: vertical; min-height: 74px; }
.lform-2 { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; }
@media(max-width:460px) { .lform-2 { grid-template-columns: 1fr; } }

.lform-submit {
  width: 100%; background: var(--lime); color: var(--ink);
  font-weight: 700; font-size: .95rem; padding: 14px; border-radius: 10px;
  border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
  transition: all .24s; margin-top: .5rem;
  display: flex; align-items: center; justify-content: center; gap: 7px;
}
.lform-submit:hover { box-shadow: 0 5px 22px var(--glow-l); transform: translateY(-1px); }
.lform-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
.lform-note { font-size: .7rem; color: var(--mist); text-align: center; margin-top: .8rem; }

.lmodal-success { padding: 48px 30px; text-align: center; }
.lsuccess-icon { font-size: 3rem; margin-bottom: .9rem; }
.lmodal-success h3 { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; color: var(--lime); margin-bottom: .5rem; }
.lmodal-success p { color: var(--mist); font-size: .86rem; line-height: 1.75; }

/* Floating WA */
.wa-float {
  position: fixed; bottom: 24px; right: 24px;
  width: 50px; height: 50px; border-radius: 50%; background: #25D366;
  display: flex; align-items: center; justify-content: center; font-size: 1.35rem;
  cursor: pointer; z-index: 99; text-decoration: none;
  box-shadow: 0 4px 18px rgba(37,211,102,.35);
  animation: wabounce 3s ease-in-out infinite;
}
@keyframes wabounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

/* Footer */
.lpfooter {
  border-top: 1px solid var(--line); padding: 22px 5vw;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 1rem; font-size: .76rem; color: var(--mist);
}
`;

/* ═══════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════ */
const PACKAGES = {
  school: [
    {
      id: "school-starter",
      tier: "PACKAGE 01",
      name: "Starter Lab",
      tagline:
        "Launch a functional IoT classroom with minimal investment. Perfect for schools beginning their STEM journey.",
      price: "₹2.5L",
      priceNum: 250000,
      priceNote: "CSR funding eligible",
      color: "#FF8C42",
      featured: false,
      emoji: "🏫",
      audience: [
        "Primary & Middle School",
        "Classes 6–9",
        "50–100 Students/Year",
      ],
      features: [
        {
          icon: "",
          title: "IobiT IoT Lite Kit × 15 units",
          detail: "Arduino + ESP32, sensors, relay — all essentials",
        },
        {
          icon: "",
          title: "NEP 2020 Curriculum — Level 1",
          detail: "30 sessions mapped to CBSE skill subjects",
        },
        {
          icon: "",
          title: "Teacher Training — 2 Days",
          detail: "Onsite certification for 2 faculty members",
        },
        {
          icon: "",
          title: "Lab Branding & Installation",
          detail: "ARC LABS co-branded lab setup",
        },
        {
          icon: "",
          title: "6-Month Support Contract",
          detail: "Remote + 2 onsite visits included",
        },
        {
          icon: "",
          title: "Digital Student Workbooks",
          detail: "30 project-based worksheets",
        },
      ],
      specs: {
        students: "50–100/yr",
        space: "20×15 ft min",
        setup: "1–2 days",
        warranty: "1 year",
      },
    },
    {
      id: "school-standard",
      tier: "PACKAGE 02",
      name: "Standard Lab",
      tagline:
        "The complete school IoT + Robotics lab. Most popular package for CBSE schools seeking full STEM capability.",
      price: "₹5L",
      priceNum: 500000,
      priceNote: "ATL-compatible · CSR eligible",
      color: "#A8FF3E",
      featured: true,
      emoji: "⚡",
      audience: ["High School", "Classes 8–12", "100–200 Students/Year"],
      features: [
        {
          icon: "",
          title: "IobiT IoT Pro Kit × 20 units",
          detail: "Raspberry Pi + ESP32, full sensor suite",
        },
        {
          icon: "",
          title: "Robotics Starter Kit × 10 units",
          detail: "Wheeled robots with obstacle avoidance",
        },
        {
          icon: "",
          title: "Full Curriculum — Levels 1 & 2",
          detail: "60 sessions, IoT + Robotics tracks",
        },
        {
          icon: "",
          title: "Teacher Certification — 3 Days",
          detail: "Level 1 + Level 2 for up to 4 faculty",
        },
        {
          icon: "",
          title: "Complete Lab Installation",
          detail: "Co-branded, furniture layout, signage",
        },
        {
          icon: "",
          title: "Annual Support + Updates",
          detail: "Quarterly curriculum refresh included",
        },
        {
          icon: "",
          title: "Student Assessment Portal",
          detail: "Digital grading, progress tracking",
        },
        {
          icon: "",
          title: "Cloud Platform Access",
          detail: "Arc Lab Cloud for all student projects",
        },
      ],
      specs: {
        students: "100–200/yr",
        space: "25×20 ft min",
        setup: "2–3 days",
        warranty: "2 years",
      },
    },
    {
      id: "school-premier",
      tier: "PACKAGE 03",
      name: "Premier IoRT Lab",
      tagline:
        "ARC LABS' flagship school lab. Full IoRT + AI stack — the most advanced school STEM lab in India.",
      price: "₹10L+",
      priceNum: 1000000,
      priceNote: "Custom quote · CSR/Govt eligible",
      color: "#00E5FF",
      featured: false,
      emoji: "🚀",
      audience: ["Senior Secondary", "Classes 9–12", "200+ Students/Year"],
      features: [
        {
          icon: "",
          title: "Full IoRT + AI Lab — Custom Design",
          detail: "IoT Pro + Experience kits, AI modules",
        },
        {
          icon: "",
          title: "Advanced Robotics Stack",
          detail: "Autonomous bots, robotic arms, ROS intro",
        },
        {
          icon: "",
          title: "AI/ML Starter Modules",
          detail: "TinyML, Edge AI, image classification",
        },
        {
          icon: "",
          title: "Complete Curriculum — All Levels",
          detail: "IoT + Robotics + AI, 90 sessions",
        },
        {
          icon: "",
          title: "Faculty Cert — Both Levels",
          detail: "5-day intensive for up to 6 faculty",
        },
        {
          icon: "",
          title: "Priority Installation & Branding",
          detail: "Dedicated project manager assigned",
        },
        {
          icon: "",
          title: "3-Year Support SLA",
          detail: "Monthly visits + 24hr remote support",
        },
        {
          icon: "",
          title: "CSR Impact Documentation",
          detail: "Full reporting for annual CSR reports",
        },
        {
          icon: "",
          title: "Competition Prep Program",
          detail: "Smart India Hackathon, ATL Marathon",
        },
      ],
      specs: {
        students: "200+/yr",
        space: "30×25 ft min",
        setup: "3–5 days",
        warranty: "3 years",
      },
    },
  ],
  college: [
    {
      id: "college-essential",
      tier: "PACKAGE 01",
      name: "Essential IoT Lab",
      tagline:
        "Department-level IoT lab for Diploma and B.Tech Year 1–2. Get students building from day one.",
      price: "₹4L",
      priceNum: 400000,
      priceNote: "Institutional pricing available",
      color: "#FFB930",
      featured: false,
      emoji: "🏛️",
      audience: ["Diploma Programs", "B.Tech Year 1–2", "30–40 Students/Batch"],
      features: [
        {
          icon: "",
          title: "IobiT IoT Experience Kit × 20 units",
          detail: "5 MCU platforms, full sensor suite",
        },
        {
          icon: "",
          title: "Lab Manual — IoT Fundamentals",
          detail: "20 experiments mapped to KTU/JNTU/Anna syllabus",
        },
        {
          icon: "",
          title: "Faculty Training — 2 Days",
          detail: "Hands-on certification for 2 faculty",
        },
        {
          icon: "",
          title: "1-Year Technical Support",
          detail: "Remote support + annual review visit",
        },
        {
          icon: "",
          title: "Experiment Manuals",
          detail: "Step-by-step printed + digital lab manuals",
        },
      ],
      specs: {
        students: "30–40/batch",
        space: "20×15 ft min",
        setup: "1–2 days",
        warranty: "1 year",
      },
    },
    {
      id: "college-advanced",
      tier: "PACKAGE 02",
      name: "Advanced IoT & Embedded Lab",
      tagline:
        "Complete lab for ECE/EEE departments. IoT, Embedded Systems, and IIoT under one roof.",
      price: "₹8L",
      priceNum: 800000,
      priceNote: "NBA/NAAC accreditation ready",
      color: "#A8FF3E",
      featured: true,
      emoji: "⚡",
      audience: ["B.Tech ECE/EEE/CSE", "Year 2–4", "60–80 Students/Batch"],
      features: [
        {
          icon: "",
          title: "IoT Pro Kit × 20 + Experience Kit × 20",
          detail: "Dual kit setup for parallel experiment tracks",
        },
        {
          icon: "",
          title: "Complete Lab Manual — 3 Courses",
          detail: "IoT, Embedded Systems, IIoT — 60 experiments",
        },
        {
          icon: "",
          title: "Faculty Training — 5 Days",
          detail: "Level 1 + Level 2 cert for 4 faculty",
        },
        {
          icon: "",
          title: "Online Student Portal Access",
          detail: "Recorded sessions + assignments + assessments",
        },
        {
          icon: "",
          title: "2-Year Support Contract",
          detail: "Quarterly visits + remote helpdesk",
        },
        {
          icon: "",
          title: "NBA/NAAC Lab Documentation",
          detail: "CO-PO mapping, outcome reports",
        },
        {
          icon: "",
          title: "Cloud Platform License",
          detail: "50-seat Arc Lab Cloud access",
        },
      ],
      specs: {
        students: "60–80/batch",
        space: "30×20 ft min",
        setup: "3–4 days",
        warranty: "2 years",
      },
    },
    {
      id: "college-research",
      tier: "PACKAGE 03",
      name: "R&D Innovation Lab",
      tagline:
        "For departments with active research, startup incubation, or Centre of Excellence ambitions.",
      price: "₹15L+",
      priceNum: 1500000,
      priceNote: "RUSA / DST / AICTE funding eligible",
      color: "#B06EFF",
      featured: false,
      emoji: "🧪",
      audience: ["M.Tech / Ph.D.", "Research Centers", "CoE / Incubation Labs"],
      features: [
        {
          icon: "",
          title: "Complete Hardware Stack — All 3 Kits",
          detail: "IoT Lite + Experience + Pro, custom quantities",
        },
        {
          icon: "",
          title: "Advanced Robotics + ROS Setup",
          detail: "ROS2 workstations, LIDAR, robotic arms",
        },
        {
          icon: "",
          title: "AIoT Research Platform",
          detail: "Edge AI modules, GPU server integration",
        },
        {
          icon: "",
          title: "Research-Grade Lab Manuals",
          detail: "Customized to dept. syllabus + research needs",
        },
        {
          icon: "",
          title: "Expert Faculty Training — 5 Days",
          detail: "All tracks, all levels, up to 8 faculty",
        },
        {
          icon: "",
          title: "3-Year Premium SLA",
          detail: "Dedicated account manager, 24hr support",
        },
        {
          icon: "",
          title: "AICTE/RUSA Grant Documentation",
          detail: "Full grant application support",
        },
        {
          icon: "",
          title: "Industry Connect Program",
          detail: "Internship pipeline, R&D collaboration",
        },
        {
          icon: "",
          title: "Student Project Mentoring",
          detail: "6 mentoring sessions per year included",
        },
      ],
      specs: {
        students: "Research batches",
        space: "40×30 ft min",
        setup: "5–7 days",
        warranty: "3 years",
      },
    },
  ],
};

const INSIDE_TABS = [
  { id: "hardware", label: "🔧 Hardware", color: "#A8FF3E" },
  { id: "curriculum", label: "📚 Curriculum", color: "#00E5FF" },
  { id: "training", label: "🎓 Training", color: "#FFB930" },
  { id: "support", label: "🔄 Support", color: "#B06EFF" },
];

const INSIDE_ITEMS = {
  hardware: [
    {
      icon: "⚡",
      iconBg: "rgba(168,255,62,0.12)",
      iconColor: "#A8FF3E",
      name: "IobiT Development Boards",
      desc: "Made-in-India boards supporting Arduino, ESP32, STM32, Raspberry Pi — depending on package tier.",
      tag: "MADE IN INDIA",
      tagBg: "rgba(168,255,62,0.1)",
      tagColor: "#A8FF3E",
    },
    {
      icon: "📡",
      iconBg: "rgba(0,229,255,0.1)",
      iconColor: "#00E5FF",
      name: "Sensor & Module Set",
      desc: "DHT11, BMP180, Ultrasonic, IR, LDR, Touch, MQ gas, potentiometer — all onboard.",
      tag: "PRE-INSTALLED",
      tagBg: "rgba(0,229,255,0.1)",
      tagColor: "#00E5FF",
    },
    {
      icon: "🖥️",
      iconBg: "rgba(255,185,48,0.1)",
      iconColor: "#FFB930",
      name: "Display & Output Devices",
      desc: "TFT/OLED displays, RGB LEDs, buzzers, 7-segment display — visual feedback for all projects.",
      tag: "PLUG & PLAY",
      tagBg: "rgba(255,185,48,0.1)",
      tagColor: "#FFB930",
    },
    {
      icon: "🔌",
      iconBg: "rgba(176,110,255,0.1)",
      iconColor: "#B06EFF",
      name: "Relay & Actuator Modules",
      desc: "Dual relay for AC/DC load switching, servo ports, digital output headers for external devices.",
      tag: "INDUSTRIAL GRADE",
      tagBg: "rgba(176,110,255,0.1)",
      tagColor: "#B06EFF",
    },
    {
      icon: "🌐",
      iconBg: "rgba(255,94,94,0.1)",
      iconColor: "#FF5E5E",
      name: "Communication Interfaces",
      desc: "LoRa, GSM/4G (SIMCOM), RS485, Wi-Fi, BLE — available depending on package tier.",
      tag: "MULTI-PROTOCOL",
      tagBg: "rgba(255,94,94,0.1)",
      tagColor: "#FF5E5E",
    },
    {
      icon: "🤖",
      iconBg: "rgba(168,255,62,0.12)",
      iconColor: "#A8FF3E",
      name: "Robotics Kit (Standard+)",
      desc: "Wheeled robot chassis, motor driver, sensors — for autonomous bot experiments.",
      tag: "STANDARD & ABOVE",
      tagBg: "rgba(168,255,62,0.08)",
      tagColor: "#A8FF3E",
    },
  ],
  curriculum: [
    {
      icon: "📖",
      iconBg: "rgba(0,229,255,0.1)",
      iconColor: "#00E5FF",
      name: "NEP 2020 Aligned Content",
      desc: "All school curriculum mapped to National Education Policy 2020 skill subject requirements.",
      tag: "NEP ALIGNED",
      tagBg: "rgba(0,229,255,0.1)",
      tagColor: "#00E5FF",
    },
    {
      icon: "🧪",
      iconBg: "rgba(255,185,48,0.1)",
      iconColor: "#FFB930",
      name: "Project-Based Sessions",
      desc: "Every session is built around a working project — not theory slides. Students build, test, debug.",
      tag: "HANDS-ON",
      tagBg: "rgba(255,185,48,0.1)",
      tagColor: "#FFB930",
    },
    {
      icon: "📱",
      iconBg: "rgba(168,255,62,0.12)",
      iconColor: "#A8FF3E",
      name: "Digital Student Workbooks",
      desc: "Interactive PDFs with circuit diagrams, code templates, and experiment sheets per session.",
      tag: "DIGITAL + PRINT",
      tagBg: "rgba(168,255,62,0.1)",
      tagColor: "#A8FF3E",
    },
    {
      icon: "🎯",
      iconBg: "rgba(176,110,255,0.1)",
      iconColor: "#B06EFF",
      name: "Assessment Framework",
      desc: "Rubric-based evaluation for each session. Student progress tracked across the year.",
      tag: "OUTCOME BASED",
      tagBg: "rgba(176,110,255,0.1)",
      tagColor: "#B06EFF",
    },
    {
      icon: "🔄",
      iconBg: "rgba(255,94,94,0.1)",
      iconColor: "#FF5E5E",
      name: "Quarterly Curriculum Updates",
      desc: "New projects and content added every quarter. Standard and Premier packages get auto-updates.",
      tag: "ALWAYS CURRENT",
      tagBg: "rgba(255,94,94,0.1)",
      tagColor: "#FF5E5E",
    },
    {
      icon: "🏫",
      iconBg: "rgba(0,229,255,0.1)",
      iconColor: "#00E5FF",
      name: "Syllabus Mapping (College)",
      desc: "College packages include CO-PO mapping and experiment lists aligned to your university syllabus.",
      tag: "COLLEGE ONLY",
      tagBg: "rgba(0,229,255,0.1)",
      tagColor: "#00E5FF",
    },
  ],
  training: [
    {
      icon: "🎓",
      iconBg: "rgba(255,185,48,0.1)",
      iconColor: "#FFB930",
      name: "Onsite Faculty Training",
      desc: "ARC LABS certified trainer comes to your campus. Hands-on, not classroom slides.",
      tag: "ONSITE",
      tagBg: "rgba(255,185,48,0.1)",
      tagColor: "#FFB930",
    },
    {
      icon: "📜",
      iconBg: "rgba(168,255,62,0.12)",
      iconColor: "#A8FF3E",
      name: "ARC LABS Certification",
      desc: "Teachers receive Level 1 or Level 2 certification. Nationally recognized, shareable credential.",
      tag: "CERTIFIED",
      tagBg: "rgba(168,255,62,0.1)",
      tagColor: "#A8FF3E",
    },
    {
      icon: "🎥",
      iconBg: "rgba(0,229,255,0.1)",
      iconColor: "#00E5FF",
      name: "Online Resource Library",
      desc: "Recorded sessions, how-to videos, project demos — accessible on Arc Lab Learning Portal.",
      tag: "LIFETIME ACCESS",
      tagBg: "rgba(0,229,255,0.1)",
      tagColor: "#00E5FF",
    },
    {
      icon: "👥",
      iconBg: "rgba(176,110,255,0.1)",
      iconColor: "#B06EFF",
      name: "Faculty Community Access",
      desc: "Join ARC LABS' network of 1,000+ certified teachers. Exchange projects, get help, share resources.",
      tag: "COMMUNITY",
      tagBg: "rgba(176,110,255,0.1)",
      tagColor: "#B06EFF",
    },
  ],
  support: [
    {
      icon: "📞",
      iconBg: "rgba(168,255,62,0.12)",
      iconColor: "#A8FF3E",
      name: "Dedicated Support Line",
      desc: "Direct access to ARC LABS' technical team via WhatsApp, phone, and email.",
      tag: "PRIORITY SUPPORT",
      tagBg: "rgba(168,255,62,0.1)",
      tagColor: "#A8FF3E",
    },
    {
      icon: "🔧",
      iconBg: "rgba(255,185,48,0.1)",
      iconColor: "#FFB930",
      name: "Onsite Visit Program",
      desc: "Scheduled physical visits by our team for maintenance, refresher training, and hardware checks.",
      tag: "PHYSICAL VISITS",
      tagBg: "rgba(255,185,48,0.1)",
      tagColor: "#FFB930",
    },
    {
      icon: "🔄",
      iconBg: "rgba(0,229,255,0.1)",
      iconColor: "#00E5FF",
      name: "Hardware Replacement Warranty",
      desc: "Faulty components replaced without questions within warranty period. Zero downtime labs.",
      tag: "WARRANTY BACKED",
      tagBg: "rgba(0,229,255,0.1)",
      tagColor: "#00E5FF",
    },
    {
      icon: "📊",
      iconBg: "rgba(176,110,255,0.1)",
      iconColor: "#B06EFF",
      name: "Annual Impact Report",
      desc: "Students trained, sessions completed, certification rates — delivered annually for admin and CSR reporting.",
      tag: "DOCUMENTATION",
      tagBg: "rgba(176,110,255,0.1)",
      tagColor: "#B06EFF",
    },
  ],
};

const PROCESS_STEPS = [
  {
    num: "01",
    icon: "📞",
    title: "Initial Call",
    desc: "30-min call with our team to understand your institution's needs and budget.",
    time: "Day 1",
    color: "#A8FF3E",
  },
  {
    num: "02",
    icon: "📋",
    title: "Proposal",
    desc: "Customised proposal with package recommendation, layout plan, and pricing sent within 48 hrs.",
    time: "Day 2–3",
    color: "#00E5FF",
  },
  {
    num: "03",
    icon: "✍️",
    title: "Agreement",
    desc: "MoU / Purchase Order signed. CSR or government documentation handled if applicable.",
    time: "Day 5–7",
    color: "#FFB930",
  },
  {
    num: "04",
    icon: "🔧",
    title: "Installation",
    desc: "ARC LABS team arrives for full lab setup. Hardware installed, tested, and commissioned.",
    time: "Week 2–3",
    color: "#B06EFF",
  },
  {
    num: "05",
    icon: "🎓",
    title: "Training",
    desc: "Onsite teacher training and certification program conducted immediately after installation.",
    time: "Week 3",
    color: "#FF5E5E",
  },
  {
    num: "06",
    icon: "🚀",
    title: "Go Live",
    desc: "Lab is operational. First batch of students starts learning. Support contract begins.",
    time: "Week 4",
    color: "#A8FF3E",
  },
];

const FAQS = [
  {
    q: "Do you provide installation support at our school/college campus?",
    a: "Yes. Every package includes onsite installation by the ARC LABS team. We come to your campus, set up the entire lab, test every unit, and don't leave until everything is working.",
  },
  {
    q: "Can the lab be funded through CSR contributions?",
    a: "Yes. All packages are eligible for CSR funding under Schedule VII of the Companies Act — specifically the Education clause. We provide complete documentation including cost per beneficiary, impact metrics, and outcome reports.",
  },
  {
    q: "Is the curriculum aligned to CBSE / state board requirements?",
    a: "Our school curriculum is mapped to NEP 2020 skill education requirements and is compatible with CBSE skill subjects. For college packages, we provide CO-PO mapping aligned to your affiliated university (KTU, JNTU, Anna, VTU, etc.).",
  },
  {
    q: "What happens if hardware breaks during use?",
    a: "All packages include a warranty period (1–3 years depending on tier) with full hardware replacement. We also have a dedicated support line for quick diagnosis. Faulty components are replaced, not repaired.",
  },
  {
    q: "Can teachers with no electronics background handle this lab?",
    a: "Yes — that is specifically why our teacher training program exists. After the 2 or 3-day certification, teachers can independently conduct all sessions without needing ARC LABS present. The curriculum is designed for non-specialists.",
  },
  {
    q: "Do you offer government or volume pricing for multiple schools?",
    a: "Yes. Government school chains, trust-run school groups, and multi-campus colleges get volume pricing. Contact us for a custom quote. We also support TSSC, Samagra Shiksha, and other state-level procurement frameworks.",
  },
  {
    q: "Can this be used for Atal Tinkering Lab (ATL) requirements?",
    a: "Our Standard and Premier packages are designed to be ATL-compatible. The hardware, curriculum, and lab layout meet AIM's ATL requirements. We can help with the ATL application documentation as well.",
  },
  {
    q: "What is the minimum space required for a lab?",
    a: "Starter lab requires a minimum 20×15 ft space. Standard labs need 25×20 ft, and Premier/R&D labs need 30×25 ft or larger. We provide a detailed layout plan as part of the proposal — including furniture arrangement and power point requirements.",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   ROI CALCULATOR
═══════════════════════════════════════════════════════════════════ */
function ROICalculator() {
  const [students, setStudents] = useState(100);
  const [pkg, setPkg] = useState(500000);
  const [years, setYears] = useState(3);

  const costPerStudent = Math.round(pkg / (students * years));
  const sessionsPerYear = Math.round(students * 0.6 * 30);
  const annualValue = Math.round(students * 2400);
  const roi = Math.round(((annualValue * years - pkg) / pkg) * 100);

  return (
    <div className="roi-section">
      <div className="sec-eye">Impact Calculator</div>
      <h2 className="sec-h">Measure your lab's return.</h2>
      <p className="sec-sub" style={{ marginBottom: "2.5rem" }}>
        Estimate the cost-per-student and 3-year ROI for your institution before
        you decide.
      </p>

      <div className="roi-inner">
        <div className="roi-form">
          <h3>📊 Configure Your Lab</h3>

          <div className="roi-row">
            <label>
              Students per year <span>{students}</span>
            </label>
            <input
              type="range"
              className="roi-slider"
              min="30"
              max="500"
              step="10"
              value={students}
              onChange={(e) => setStudents(+e.target.value)}
            />
          </div>

          <div className="roi-row">
            <label>
              Lab package budget <span>₹{(pkg / 100000).toFixed(1)}L</span>
            </label>
            <input
              type="range"
              className="roi-slider"
              min="250000"
              max="1500000"
              step="50000"
              value={pkg}
              onChange={(e) => setPkg(+e.target.value)}
            />
          </div>

          <div className="roi-row">
            <label>
              Years of operation <span>{years} yrs</span>
            </label>
            <input
              type="range"
              className="roi-slider"
              min="1"
              max="5"
              step="1"
              value={years}
              onChange={(e) => setYears(+e.target.value)}
            />
          </div>

          <div
            style={{
              padding: "14px",
              background: "var(--raised)",
              borderRadius: "10px",
              marginTop: "1rem",
              fontSize: ".78rem",
              color: "var(--mist)",
              lineHeight: 1.7,
            }}
          >
            Based on ₹2,400/student/year value (NEP skill subject credit value
            estimate). Actual returns vary by institution.
          </div>
        </div>

        <div className="roi-results">
          <h3>📈 Your Impact Metrics</h3>
          <div className="roi-metric-grid">
            <div className="roi-metric" style={{ "--rm-color": "#A8FF3E" }}>
              <div className="roi-metric-label">Cost Per Student</div>
              <div className="roi-metric-val">
                ₹{costPerStudent.toLocaleString("en-IN")}
              </div>
              <div className="roi-metric-sub">
                Over {years} year{years > 1 ? "s" : ""}
              </div>
            </div>
            <div className="roi-metric" style={{ "--rm-color": "#00E5FF" }}>
              <div className="roi-metric-label">Students Impacted</div>
              <div className="roi-metric-val">
                {(students * years).toLocaleString()}
              </div>
              <div className="roi-metric-sub">
                Over {years} year{years > 1 ? "s" : ""}
              </div>
            </div>
            <div className="roi-metric" style={{ "--rm-color": "#FFB930" }}>
              <div className="roi-metric-label">Annual Lab Sessions</div>
              <div className="roi-metric-val">
                {sessionsPerYear.toLocaleString()}
              </div>
              <div className="roi-metric-sub">Estimated practical sessions</div>
            </div>
            <div
              className="roi-metric"
              style={{ "--rm-color": roi >= 0 ? "#A8FF3E" : "#FF5E5E" }}
            >
              <div className="roi-metric-label">Estimated ROI</div>
              <div className="roi-metric-val">
                {roi > 0 ? "+" : ""}
                {roi}%
              </div>
              <div className="roi-metric-sub">vs lab investment cost</div>
            </div>
          </div>
          <div
            style={{
              padding: "16px",
              background: "var(--card)",
              border: "1px solid rgba(168,255,62,0.2)",
              borderRadius: "12px",
              fontSize: ".8rem",
              color: "var(--mist)",
              lineHeight: 1.7,
            }}
          >
            <strong style={{ color: "#A8FF3E" }}>CSR perspective:</strong> At ₹
            {costPerStudent.toLocaleString("en-IN")} per student, this qualifies
            as high-impact CSR spend — well below the ₹5,000/student benchmark
            for education CSR programs in India.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LEAD MODAL
═══════════════════════════════════════════════════════════════════ */
function LeadModal({ pkg, audience, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    inst: "",
    role: "",
    city: "",
    state: "",
    students: "",
    timeline: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const h = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="lmodal">
        <button className="lmodal-close" onClick={onClose}>
          ✕
        </button>
        {done ? (
          <div className="lmodal-success">
            <div className="lsuccess-icon">🎉</div>
            <h3>Proposal Request Sent!</h3>
            <p>
              Our team will prepare a{" "}
              <strong style={{ color: "#fff" }}>customised proposal</strong> for
              your institution within{" "}
              <strong style={{ color: "#fff" }}>48 hours</strong>.<br />
              <br />
              For faster response, WhatsApp us directly:
              <br />
              <strong style={{ color: "#25D366" }}>+91 8699929532</strong>
              <br />
              <br />
              <span style={{ fontSize: ".78rem" }}>
                Reference: {pkg?.name} ·{" "}
                {audience === "school" ? "School" : "College"}
              </span>
            </p>
          </div>
        ) : (
          <>
            <div className="lmodal-head">
              <h3>Request a Custom Proposal</h3>
              <p>
                Fill in your institution's details. We'll send a tailored
                proposal with pricing, layout plan, and curriculum breakdown
                within 48 hours.
              </p>
              {pkg && (
                <div className="modal-pkg-sel">
                  <span className="mps-icon2">{pkg.emoji}</span>
                  <div className="mps-info">
                    <div className="mps-name">
                      {pkg.name} —{" "}
                      {audience === "school" ? "School" : "College"}
                    </div>
                    <div className="mps-meta">
                      Starting at{" "}
                      <strong style={{ color: pkg.color }}>{pkg.price}</strong>{" "}
                      · ARC LABS Lab Package
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="lmodal-body">
              <form onSubmit={submit}>
                <div className="lform-2">
                  <div className="lform-row">
                    <label>Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={h}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="lform-row">
                    <label>Phone *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={h}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                </div>
                <div className="lform-row">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={h}
                    placeholder="you@school.edu.in"
                    required
                  />
                </div>
                <div className="lform-row">
                  <label>Institution Name *</label>
                  <input
                    name="inst"
                    value={form.inst}
                    onChange={h}
                    placeholder="School or college name"
                    required
                  />
                </div>
                <div className="lform-2">
                  <div className="lform-row">
                    <label>Your Role</label>
                    <select name="role" value={form.role} onChange={h}>
                      <option value="">Select</option>
                      <option>Principal / Director</option>
                      <option>Vice Principal</option>
                      <option>Head of Department</option>
                      <option>Lab In-charge</option>
                      <option>CSR / Trustee</option>
                      <option>Government Official</option>
                      <option>Procurement Officer</option>
                    </select>
                  </div>
                  <div className="lform-row">
                    <label>State</label>
                    <select name="state" value={form.state} onChange={h}>
                      <option value="">Select State</option>
                      {[
                        "Telangana",
                        "Andhra Pradesh",
                        "Karnataka",
                        "Tamil Nadu",
                        "Maharashtra",
                        "Kerala",
                        "Gujarat",
                        "Delhi",
                        "Rajasthan",
                        "Madhya Pradesh",
                        "West Bengal",
                        "Uttar Pradesh",
                        "Other",
                      ].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="lform-2">
                  <div className="lform-row">
                    <label>City</label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={h}
                      placeholder="City"
                    />
                  </div>
                  <div className="lform-row">
                    <label>Students per year (approx)</label>
                    <input
                      name="students"
                      value={form.students}
                      onChange={h}
                      placeholder="e.g. 120"
                    />
                  </div>
                </div>
                <div className="lform-row">
                  <label>Expected Timeline</label>
                  <select name="timeline" value={form.timeline} onChange={h}>
                    <option value="">When do you need the lab?</option>
                    <option>Within 1 month</option>
                    <option>1–3 months</option>
                    <option>3–6 months</option>
                    <option>Next academic year</option>
                    <option>Just exploring</option>
                  </select>
                </div>
                <div className="lform-row">
                  <label>Additional Requirements</label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={h}
                    placeholder="CSR funding interest, specific topics, space dimensions, any other requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="lform-submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "🚀 Request Proposal →"}
                </button>
                <p className="lform-note">
                  No spam. Your details are only used to prepare your proposal.
                  We respond within 48 hours.
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════ */
export default function LabPackagesPage() {
  const [audience, setAudience] = useState("school");
  const [insideTab, setInsideTab] = useState("hardware");
  const [openFaq, setOpenFaq] = useState(null);
  const [modal, setModal] = useState(null); // { pkg } or { pkg: null }

  const pkgs = PACKAGES[audience];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="lnav">
        <a href="/" className="lnav-logo">
          <span className="ldot" />
          ARC LABS
        </a>
        <div className="lnav-right">
          <a href="/" className="lnav-link">
            ← Back to Home
          </a>
          <a href="/programs" className="lnav-link">
            Programs
          </a>
          <a href="/products" className="lnav-link">
            Products
          </a>
          {/* <a href="/lab-packages" className="lnav-link">
            Lab Packages
          </a> */}
          <a href="/csr-partners" className="lnav-link">
            CSR Partners
          </a>
          <button className="lnav-cta" onClick={() => setModal({ pkg: null })}>
            Get a Proposal →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="lhero">
        <div className="lhero-bg" />
        <div className="lhero-inner">
          <div className="lhero-text">
            <div className="lhero-tag">
              <span className="ltag-dot" />
              Hardware + Curriculum + Training + Support
            </div>
            <h1>
              One Package.
              <br />
              Everything your
              <br />
              lab needs. <em>Done.</em>
            </h1>
            <p>
              No sourcing hardware separately. No writing curriculum. No finding
              trainers. ARC LABS delivers the complete lab — designed,
              installed, and supported — so your institution starts teaching
              from week one.
            </p>
            <div className="lhero-actions">
              <button
                className="btn-lime"
                onClick={() => setModal({ pkg: null })}
              >
                Get Custom Proposal →
              </button>
              <a href="#packages" className="btn-ghost">
                View All Packages
              </a>
            </div>
          </div>

          <div className="lhero-right">
            {[
              {
                num: "500+",
                label: "Labs installed across India",
                icon: "🏫",
                color: "#A8FF3E",
                fill: 85,
              },
              {
                num: "₹800",
                label: "Min. cost per student / CSR",
                icon: "💰",
                color: "#00E5FF",
                fill: 60,
              },
              {
                num: "4 Wks",
                label: "Avg. time from order to live lab",
                icon: "⚡",
                color: "#FFB930",
                fill: 70,
              },
              {
                num: "98%",
                label: "School renewal rate on support contracts",
                icon: "🔄",
                color: "#B06EFF",
                fill: 98,
              },
            ].map((s) => (
              <div
                className="hstat-card"
                key={s.label}
                style={{ "--hs-color": s.color }}
              >
                <div className="hstat-row">
                  <div className="hstat-num">{s.num}</div>
                  <div className="hstat-icon">{s.icon}</div>
                </div>
                <div className="hstat-label">{s.label}</div>
                <div className="hstat-bar">
                  <div
                    className="hstat-fill"
                    style={{ width: `${s.fill}%`, background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AUDIENCE SWITCHER */}
      <div className="audience-bar" id="packages">
        {[
          { id: "school", label: "🏫 For Schools", sub: "Classes 6–12" },
          {
            id: "college",
            label: "🏛️ For Colleges & Universities",
            sub: "Diploma, B.Tech, M.Tech, R&D",
          },
        ].map((a) => (
          <button
            key={a.id}
            className={`aud-btn${audience === a.id ? " active" : ""}`}
            onClick={() => setAudience(a.id)}
          >
            {a.label}
            <span
              style={{
                fontSize: ".72rem",
                color: "var(--mist)",
                marginLeft: "4px",
              }}
            >
              — {a.sub}
            </span>
          </button>
        ))}
      </div>

      {/* PACKAGES */}
      <div className="pkg-section">
        <div className="pkg-section-head">
          <div className="sec-eye">
            {audience === "school"
              ? "School Lab Packages"
              : "College & University Packages"}
          </div>
          <h2 className="sec-h">
            Fixed tiers.{" "}
            <em style={{ fontStyle: "normal", color: "var(--lime)" }}>
              No custom quoting.
            </em>
          </h2>
          <p className="sec-sub">
            Pick the tier that matches your budget and student count. We handle
            the rest.
          </p>
        </div>

        <div className="packages-grid">
          {pkgs.map((pkg) => (
            <div
              key={pkg.id}
              className={`pkg-card${pkg.featured ? " featured" : ""}`}
              style={{ "--pkg-color": pkg.color }}
            >
              <div
                className="pkg-top-bar"
                style={{
                  background: `linear-gradient(90deg, ${pkg.color}, transparent)`,
                }}
              />
              {pkg.featured && (
                <div className="pkg-popular">★ MOST POPULAR</div>
              )}

              <div className="pkg-head">
                <div className="pkg-label" style={{ color: pkg.color }}>
                  {pkg.tier} · {pkg.emoji}
                </div>
                <div className="pkg-name">{pkg.name}</div>
                <div className="pkg-tagline">{pkg.tagline}</div>

                <div className="pkg-price-block">
                  <div className="pkg-price" style={{ color: pkg.color }}>
                    {pkg.price} <span>/ lab setup</span>
                  </div>
                  <div className="pkg-price-sub">
                    One-time investment · Annual support contract separate
                  </div>
                  <div className="pkg-price-note">✓ {pkg.priceNote}</div>
                </div>
              </div>

              <div className="pkg-includes">
                <h4>What's included</h4>
                <ul className="pkg-feature-list">
                  {pkg.features.map((f) => (
                    <li key={f.title}>
                      <span className="pf-icon">{f.icon}</span>
                      <span className="pf-text">
                        <b>{f.title}</b>
                        <span>{f.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs strip */}
              <div
                style={{
                  display: "flex",
                  gap: ".5rem",
                  flexWrap: "wrap",
                  padding: "0 26px",
                  margin: "4px 0 10px",
                }}
              >
                {Object.entries(pkg.specs).map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      background: "var(--raised)",
                      borderRadius: "7px",
                      padding: "6px 10px",
                      fontSize: ".68rem",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--mist)",
                        textTransform: "capitalize",
                      }}
                    >
                      {k}:{" "}
                    </span>
                    <strong style={{ color: pkg.color }}>{v}</strong>
                  </div>
                ))}
              </div>

              <div className="pkg-audience">
                {pkg.audience.map((a) => (
                  <span key={a} className="pkg-aud-tag">
                    {a}
                  </span>
                ))}
              </div>

              <div className="pkg-footer">
                <button
                  className="pkg-btn-primary"
                  style={{
                    background: pkg.color,
                    color: pkg.color === "#A8FF3E" ? "#060610" : "#ffffff",
                  }}
                  onClick={() => setModal({ pkg })}
                >
                  🚀 Get This Package →
                </button>
                <a
                  href="https://wa.me/918699929532"
                  className="pkg-btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  💬 Ask on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT'S INSIDE */}
      <div className="inside-section">
        <div className="sec-eye">What's Inside Every Package</div>
        <h2 className="sec-h">
          Every detail.{" "}
          <em style={{ fontStyle: "normal", color: "var(--lime)" }}>
            Nothing missing.
          </em>
        </h2>
        <p className="sec-sub" style={{ marginBottom: "2rem" }}>
          Every ARC LABS lab package bundles four pillars — hardware,
          curriculum, training, and support. No sourcing separately.
        </p>
        <div className="inside-tabs">
          {INSIDE_TABS.map((t) => (
            <button
              key={t.id}
              className={`ins-tab${insideTab === t.id ? " active" : ""}`}
              style={
                insideTab === t.id
                  ? { borderColor: t.color, color: t.color }
                  : {}
              }
              onClick={() => setInsideTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="inside-grid" key={insideTab}>
          {INSIDE_ITEMS[insideTab].map((item) => (
            <div className="inside-item" key={item.name}>
              <div
                className="ins-icon"
                style={{ background: item.iconBg, color: item.iconColor }}
              >
                {item.icon}
              </div>
              <div>
                <div className="ins-name">{item.name}</div>
                <div className="ins-desc">{item.desc}</div>
                <span
                  className="ins-tag"
                  style={{ background: item.tagBg, color: item.tagColor }}
                >
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <div className="process-section">
        <div className="sec-eye" style={{ justifyContent: "center" }}>
          Implementation Process
        </div>
        <h2 className="sec-h" style={{ textAlign: "center" }}>
          From enquiry to live lab
          <br />
          in{" "}
          <em style={{ fontStyle: "normal", color: "var(--lime)" }}>
            4 weeks.
          </em>
        </h2>
        <div className="process-steps">
          {PROCESS_STEPS.map((step) => (
            <div
              className="proc-step"
              key={step.num}
              style={{ "--ps-color": step.color }}
            >
              <div className="proc-num">{step.num}</div>
              <div className="proc-icon">{step.icon}</div>
              <div className="proc-title">{step.title}</div>
              <div className="proc-desc">{step.desc}</div>
              <div className="proc-time">{step.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI CALCULATOR */}
      <ROICalculator />

      {/* CSR CALLOUT */}
      <div className="csr-callout">
        <div className="csr-callout-inner">
          <div>
            <h3>
              Funding your lab through CSR?
              <br />
              <em style={{ fontStyle: "normal", color: "var(--lime)" }}>
                We make it straightforward.
              </em>
            </h3>
            <p>
              ARC LABS handles all CSR documentation — cost per beneficiary
              calculation, impact reports, Schedule VII compliance, and annual
              outcome tracking. Corporate partners get everything they need for
              board reporting.
            </p>
            <div className="csr-pills">
              {[
                "Schedule VII Eligible",
                "Cost per Beneficiary Report",
                "3-Year Impact Tracking",
                "Board-Ready Documentation",
                "Listed on CSR Box & GiveIndia",
              ].map((p) => (
                <span className="csr-pill" key={p}>
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".7rem",
              flexShrink: 0,
            }}
          >
            <button
              className="btn-lime"
              onClick={() => setModal({ pkg: null })}
            >
              Discuss CSR Funding →
            </button>
            <a href="/csr-partners" className="btn-ghost">
              CSR Partners Page →
            </a>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <div className="sec-eye">Frequently Asked Questions</div>
        <h2 className="sec-h">
          Every question a principal or
          <br />
          HOD asks —{" "}
          <em style={{ fontStyle: "normal", color: "var(--lime)" }}>
            answered.
          </em>
        </h2>
        <div className="faq-grid">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`faq-item${openFaq === i ? " open" : ""}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="faq-q">
                <span className="faq-q-text">{faq.q}</span>
                <span className="faq-toggle">{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && <div className="faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="lbottom-cta">
        <h2>
          Ready to set up your lab?
          <br />
          <em>Let's build it together.</em>
        </h2>
        <p>
          Talk to our team. We'll design the right package, handle installation,
          and ensure your teachers are fully confident before we leave.
        </p>
        <div className="lcta-btns">
          <button className="btn-lime" onClick={() => setModal({ pkg: null })}>
            🚀 Request a Proposal
          </button>
          <a href="tel:+918699929532" className="btn-ghost">
            📞 +91 8699929532
          </a>
          <a
            href="https://wa.me/918699929532"
            className="btn-ghost"
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <div className="lpfooter">
        <span>
          © 2025 ARC LABS — MSME Registered · Made in India · Hyderabad
        </span>
        <span>hello@arclabs.in · +91 8699929532</span>
      </div>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/918699929532"
        className="wa-float"
        target="_blank"
        rel="noreferrer"
      >
        💬
      </a>

      {/* Lead Modal */}
      {modal && (
        <LeadModal
          pkg={modal.pkg}
          audience={audience}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
