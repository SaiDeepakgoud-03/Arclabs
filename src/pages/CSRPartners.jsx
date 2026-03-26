import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   STYLES  — Premium editorial, corporate-grade
   Palette: Near-black canvas · Warm white type · Gold accent
   Fonts:   Fraunces (editorial serif headlines) + DM Sans + JetBrains Mono
═══════════════════════════════════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,700;1,9..144,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --ink:      #08080F;
  --deep:     #0D0D18;
  --panel:    #111120;
  --card:     #161628;
  --card2:    #1C1C34;
  --raised:   #222240;
  --line:     rgba(255,255,255,0.07);
  --line2:    rgba(255,255,255,0.12);
  --line3:    rgba(255,255,255,0.18);
  --cream:    #F5F0E8;
  --warm:     #C8C0B0;
  --muted:    #7A7A90;
  --gold:     #E8B84B;
  --gold2:    #F5D07A;
  --teal:     #2DD4BF;
  --sky:      #38BDF8;
  --rose:     #FB7185;
  --sage:     #86EFAC;
  --glow-g:   rgba(232,184,75,0.15);
  --glow-t:   rgba(45,212,191,0.12);
}

html{scroll-behavior:smooth}
body{
  background:var(--ink); color:var(--cream);
  font-family:'DM Sans',sans-serif;
  line-height:1.65; overflow-x:hidden;
}
::selection{background:var(--gold);color:var(--ink)}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:var(--ink)}
::-webkit-scrollbar-thumb{background:var(--gold)}

/* Subtle diagonal grain */
body::before{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:
    repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.008) 0px,
      rgba(255,255,255,0.008) 1px,
      transparent 1px,
      transparent 8px
    );
}

/* ── NAV ─────────────────────────────────────── */
.cnav{
  position:sticky;top:0;z-index:300;height:68px;padding:0 5vw;
  display:flex;align-items:center;justify-content:space-between;
  background:rgba(8,8,15,0.94);backdrop-filter:blur(24px);
  border-bottom:1px solid var(--line);
}
.cnav-logo{
  font-family:'Fraunces',serif;font-weight:700;font-size:1.25rem;
  color:var(--cream);text-decoration:none;
  display:flex;align-items:center;gap:10px;letter-spacing:-.01em;
}
.cgold-dot{
  width:9px;height:9px;background:var(--gold);border-radius:50%;
  animation:gpulse 2.5s ease-in-out infinite;
}
@keyframes gpulse{
  0%,100%{box-shadow:0 0 0 0 rgba(232,184,75,0.5)}
  50%{box-shadow:0 0 0 8px rgba(232,184,75,0)}
}
.cnav-links{display:flex;align-items:center;gap:1.5rem}
.cnav-link{font-size:.8rem;color:var(--muted);text-decoration:none;transition:color .2s;letter-spacing:.02em}
.cnav-link:hover{color:var(--cream)}
.cnav-cta{
  background:var(--gold);color:var(--ink);
  font-weight:700;font-size:.82rem;padding:9px 22px;
  border-radius:7px;border:none;cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:all .22s;text-decoration:none;
}
.cnav-cta:hover{background:var(--gold2);box-shadow:0 4px 20px var(--glow-g);transform:translateY(-1px)}

/* ── HERO — split editorial layout ──────────── */
.chero{
  min-height:100vh;display:grid;
  grid-template-columns:1fr 1fr;
  position:relative;overflow:hidden;
}
@media(max-width:900px){.chero{grid-template-columns:1fr;min-height:auto}}

.chero-left{
  padding:120px 5vw 80px;
  display:flex;flex-direction:column;justify-content:center;
  position:relative;z-index:1;
  border-right:1px solid var(--line);
}
@media(max-width:900px){.chero-left{padding:100px 5vw 60px;border-right:none;border-bottom:1px solid var(--line)}}

.chero-eyebrow{
  display:inline-flex;align-items:center;gap:8px;margin-bottom:2rem;
  font-family:'JetBrains Mono',monospace;font-size:.68rem;
  color:var(--gold);letter-spacing:.12em;text-transform:uppercase;
}
.ceyebrow-line{
  width:32px;height:1px;background:var(--gold);opacity:.6;
}

.chero-left h1{
  font-family:'Fraunces',serif;font-weight:900;
  font-size:clamp(3rem,5.5vw,5.2rem);
  line-height:.98;letter-spacing:-.04em;margin-bottom:2rem;
  color:var(--cream);
}
.chero-left h1 em{
  font-style:italic;color:var(--gold);
  display:block;
}
.chero-deck{
  font-size:1.05rem;font-weight:300;color:var(--warm);
  max-width:420px;line-height:1.8;margin-bottom:2.5rem;
}
.chero-ctas{display:flex;gap:.8rem;flex-wrap:wrap}

/* Compliance badge */
.compliance-badge{
  margin-top:2.5rem;display:inline-flex;align-items:center;gap:10px;
  background:rgba(232,184,75,0.07);border:1px solid rgba(232,184,75,0.2);
  border-radius:10px;padding:12px 16px;max-width:380px;
}
.comp-icon{font-size:1.3rem}
.comp-text{font-size:.78rem;color:var(--warm);line-height:1.55}
.comp-text strong{color:var(--gold);display:block;margin-bottom:2px;font-size:.8rem}

/* Hero right — impact wall */
.chero-right{
  display:flex;flex-direction:column;justify-content:center;
  padding:80px 5vw 80px 4vw;
  background:var(--deep);position:relative;
}
.chero-right::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% 30%,rgba(232,184,75,0.04),transparent 70%);
  pointer-events:none;
}
.impact-wall-label{
  font-family:'JetBrains Mono',monospace;font-size:.6rem;
  color:var(--gold);letter-spacing:.14em;text-transform:uppercase;
  margin-bottom:1.5rem;opacity:.7;
}
.impact-wall{
  display:grid;grid-template-columns:1fr 1fr;
  gap:1px;background:var(--line);border:1px solid var(--line);
  border-radius:16px;overflow:hidden;
}
.iw-cell{
  background:var(--panel);padding:24px 22px;
  position:relative;overflow:hidden;
  transition:background .2s;
}
.iw-cell:hover{background:var(--card)}
.iw-cell::before{
  content:'';position:absolute;
  top:0;left:0;right:0;height:2px;
  background:var(--iw-color,var(--gold));
  opacity:.5;
}
.iw-num{
  font-family:'Fraunces',serif;font-weight:900;
  font-size:2.4rem;line-height:1;letter-spacing:-.04em;
  color:var(--iw-color,var(--gold));margin-bottom:.3rem;
}
.iw-label{font-size:.76rem;color:var(--warm);line-height:1.5}
.iw-sub{
  font-family:'JetBrains Mono',monospace;font-size:.58rem;
  color:var(--muted);margin-top:.5rem;letter-spacing:.04em;
}

/* ── DIVIDER MARQUEE ─────────────────────── */
.marquee-bar{
  border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  padding:18px 0;overflow:hidden;background:var(--deep);
}
.marquee-track{
  display:flex;gap:3.5rem;white-space:nowrap;
  animation:marquee 25s linear infinite;
}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.mq-item{
  display:flex;align-items:center;gap:10px;flex-shrink:0;
  font-family:'JetBrains Mono',monospace;font-size:.68rem;
  color:var(--muted);letter-spacing:.08em;
}
.mq-item::before{content:'◆';font-size:.4rem;color:var(--gold);opacity:.6}

/* ── SECTION COMMON ──────────────────────── */
.csec{padding:80px 5vw;position:relative;z-index:1}
.csec-dark{background:var(--deep);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.sec-kicker{
  font-family:'JetBrains Mono',monospace;font-size:.65rem;
  color:var(--gold);letter-spacing:.14em;text-transform:uppercase;
  margin-bottom:1rem;display:flex;align-items:center;gap:10px;
}
.sec-kicker::before{content:'—';opacity:.4}
.sec-headline{
  font-family:'Fraunces',serif;font-weight:900;
  font-size:clamp(2rem,4vw,3.2rem);
  letter-spacing:-.04em;line-height:1.05;margin-bottom:.8rem;
}
.sec-headline em{font-style:italic;color:var(--gold)}
.sec-body{
  font-size:.97rem;font-weight:300;color:var(--warm);
  max-width:520px;line-height:1.8;
}

/* ── WHY CSR SECTION ─────────────────────── */
.why-grid{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
  gap:1px;margin-top:3rem;
  background:var(--line);border:1px solid var(--line);border-radius:16px;overflow:hidden;
}
.why-card{
  background:var(--panel);padding:30px 28px;
  position:relative;overflow:hidden;
  transition:background .25s;
}
.why-card:hover{background:var(--card)}
.why-card::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--wc-color,var(--gold)),transparent);
  transform:scaleX(0);transform-origin:left;transition:transform .3s;
}
.why-card:hover::after{transform:scaleX(1)}
.why-icon{
  width:48px;height:48px;border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  font-size:1.3rem;margin-bottom:1.2rem;
}
.why-card h3{
  font-family:'Fraunces',serif;font-weight:700;font-size:1.1rem;
  letter-spacing:-.02em;margin-bottom:.5rem;
}
.why-card p{font-size:.83rem;color:var(--warm);line-height:1.7}
.why-stat{
  margin-top:1rem;
  font-family:'JetBrains Mono',monospace;font-size:.68rem;
  color:var(--wc-color,var(--gold));letter-spacing:.05em;
  background:rgba(232,184,75,0.06);border:1px solid rgba(232,184,75,0.15);
  display:inline-block;padding:3px 10px;border-radius:4px;
}

/* ── SCHEDULE VII ────────────────────────── */
.sch7-layout{
  display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;
}
@media(max-width:800px){.sch7-layout{grid-template-columns:1fr;gap:2.5rem}}

.sch7-doc{
  background:var(--card);border:1px solid var(--line2);border-radius:16px;
  overflow:hidden;
}
.sch7-doc-header{
  padding:20px 24px;border-bottom:1px solid var(--line);
  display:flex;align-items:center;gap:12px;
}
.doc-chip{
  font-family:'JetBrains Mono',monospace;font-size:.6rem;
  background:rgba(232,184,75,0.1);border:1px solid rgba(232,184,75,0.25);
  color:var(--gold);padding:3px 10px;border-radius:4px;letter-spacing:.06em;
}
.sch7-doc-body{padding:24px}
.sch7-clause{
  display:flex;gap:14px;padding:12px 0;
  border-bottom:1px solid var(--line);
  transition:background .15s;
}
.sch7-clause:last-child{border-bottom:none}
.sch7-clause-num{
  font-family:'JetBrains Mono',monospace;font-size:.62rem;
  color:var(--gold);width:30px;flex-shrink:0;margin-top:2px;
}
.sch7-clause-text{font-size:.82rem;color:var(--warm);line-height:1.6}
.sch7-clause-text strong{color:var(--cream);font-weight:600}
.sch7-eligible{
  margin-top:1rem;
  background:rgba(45,212,191,0.06);border:1px solid rgba(45,212,191,0.2);
  border-radius:10px;padding:14px 16px;
  display:flex;align-items:flex-start;gap:10px;
}
.sch7-elig-icon{font-size:1.1rem;flex-shrink:0;margin-top:1px}
.sch7-elig-text{font-size:.8rem;color:var(--teal);line-height:1.6}
.sch7-elig-text strong{display:block;margin-bottom:3px;font-size:.83rem}

.sch7-right{}
.sch7-steps{list-style:none;counter-reset:steps}
.sch7-step{
  display:flex;gap:16px;padding:16px 0;
  border-bottom:1px solid var(--line);
}
.sch7-step:last-child{border-bottom:none}
.step-num{
  width:32px;height:32px;border-radius:50%;
  background:rgba(232,184,75,0.1);border:1px solid rgba(232,184,75,0.3);
  color:var(--gold);font-family:'Fraunces',serif;font-weight:700;font-size:.9rem;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.step-title{
  font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:600;
  margin-bottom:.3rem;
}
.step-desc{font-size:.8rem;color:var(--warm);line-height:1.6}

.docs-we-provide{
  margin-top:2rem;background:var(--card);
  border:1px solid var(--line2);border-radius:12px;padding:18px 20px;
}
.docs-we-provide h4{
  font-family:'JetBrains Mono',monospace;font-size:.62rem;
  color:var(--gold);letter-spacing:.1em;text-transform:uppercase;
  margin-bottom:.9rem;
}
.doc-list{list-style:none;display:flex;flex-direction:column;gap:.5rem}
.doc-list li{
  font-size:.8rem;color:var(--warm);
  display:flex;align-items:center;gap:8px;
  padding:6px 0;border-bottom:1px dashed var(--line);
}
.doc-list li:last-child{border-bottom:none}
.doc-list li::before{content:'↳';color:var(--gold);font-size:.75rem}

/* ── SECTOR TARGETING ────────────────────── */
.sectors-grid{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
  gap:1rem;margin-top:2.8rem;
}
.sector-card{
  background:var(--card);border:1px solid var(--line);border-radius:14px;
  padding:22px 20px;cursor:pointer;transition:all .28s;
  position:relative;overflow:hidden;
}
.sector-card:hover{
  border-color:var(--sc-color,var(--gold));transform:translateY(-3px);
  box-shadow:0 16px 40px rgba(0,0,0,.4);
}
.sector-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--sc-color,var(--gold));transform:scaleX(0);transform-origin:left;
  transition:transform .3s;
}
.sector-card:hover::before{transform:scaleX(1)}
.sc-icon{font-size:1.8rem;margin-bottom:.9rem}
.sc-name{
  font-family:'Fraunces',serif;font-weight:700;font-size:1rem;
  letter-spacing:-.02em;margin-bottom:.4rem;
}
.sc-desc{font-size:.77rem;color:var(--warm);line-height:1.6;margin-bottom:.8rem}
.sc-csr{
  font-family:'JetBrains Mono',monospace;font-size:.58rem;
  color:var(--sc-color,var(--gold));letter-spacing:.06em;
}

/* ── IMPACT METRICS ──────────────────────── */
.impact-strip{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  gap:1px;background:var(--line);border-radius:16px;overflow:hidden;
  border:1px solid var(--line);margin-top:3rem;
}
.imp-cell{
  background:var(--panel);padding:28px 20px;text-align:center;
}
.imp-num{
  font-family:'Fraunces',serif;font-weight:900;
  font-size:2.2rem;letter-spacing:-.04em;line-height:1;
  color:var(--gold);margin-bottom:.3rem;
}
.imp-label{font-size:.76rem;color:var(--warm);text-transform:uppercase;letter-spacing:.06em}
.imp-sub{font-size:.68rem;color:var(--muted);margin-top:.3rem}

/* ── CASE STUDIES ─────────────────────────── */
.cases-grid{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));
  gap:1.5rem;margin-top:3rem;
}
.case-card{
  background:var(--card);border:1px solid var(--line);border-radius:16px;
  overflow:hidden;transition:all .3s;
}
.case-card:hover{border-color:var(--line2);transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.4)}
.case-card-top{
  height:5px;
  background:linear-gradient(90deg,var(--cc-color,var(--gold)),transparent);
}
.case-body{padding:24px}
.case-sector{
  display:inline-flex;align-items:center;gap:6px;margin-bottom:.9rem;
  font-family:'JetBrains Mono',monospace;font-size:.6rem;
  color:var(--cc-color,var(--gold));letter-spacing:.08em;
  background:rgba(232,184,75,0.07);border:1px solid rgba(232,184,75,0.18);
  padding:3px 10px;border-radius:4px;
}
.case-name{
  font-family:'Fraunces',serif;font-weight:700;font-size:1.1rem;
  letter-spacing:-.02em;margin-bottom:.3rem;
}
.case-location{font-size:.76rem;color:var(--muted);margin-bottom:.9rem}
.case-metrics{
  display:grid;grid-template-columns:1fr 1fr 1fr;
  gap:8px;margin-bottom:1rem;
}
.case-metric{
  background:var(--panel);border-radius:8px;padding:10px 8px;text-align:center;
}
.cm-num{
  font-family:'Fraunces',serif;font-weight:700;font-size:1rem;
  color:var(--cc-color,var(--gold));line-height:1;
}
.cm-label{font-size:.62rem;color:var(--muted);margin-top:3px;line-height:1.3}
.case-quote{
  font-size:.8rem;color:var(--warm);line-height:1.7;
  border-left:2px solid var(--cc-color,var(--gold));
  padding-left:12px;font-style:italic;margin-top:.5rem;
}
.case-attribution{
  margin-top:.7rem;font-size:.72rem;color:var(--muted);font-style:normal;
}

/* ── REPORTING SECTION ───────────────────── */
.report-layout{
  display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;
}
@media(max-width:800px){.report-layout{grid-template-columns:1fr;gap:2.5rem}}

.report-doc-preview{
  background:var(--card);border:1px solid var(--line2);
  border-radius:16px;overflow:hidden;
  box-shadow:0 20px 60px rgba(0,0,0,.4);
}
.rdp-header{
  background:var(--raised);padding:14px 18px;
  display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--line);
}
.rdp-dots{display:flex;gap:6px}
.rdp-dot{width:10px;height:10px;border-radius:50%}
.rdp-title{
  font-family:'JetBrains Mono',monospace;font-size:.62rem;
  color:var(--muted);letter-spacing:.06em;
}
.rdp-body{padding:22px}
.rdp-row{
  display:flex;justify-content:space-between;align-items:center;
  padding:10px 0;border-bottom:1px solid var(--line);
}
.rdp-row:last-child{border-bottom:none}
.rdp-key{font-size:.78rem;color:var(--warm)}
.rdp-val{
  font-family:'JetBrains Mono',monospace;font-size:.72rem;
  color:var(--gold);font-weight:600;
}
.rdp-bar-row{padding:12px 0;border-bottom:1px solid var(--line)}
.rdp-bar-label{
  display:flex;justify-content:space-between;
  font-size:.72rem;color:var(--warm);margin-bottom:6px;
}
.rdp-bar{height:5px;background:var(--line);border-radius:3px;overflow:hidden}
.rdp-bar-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--gold),var(--teal))}

.report-items{display:flex;flex-direction:column;gap:1rem}
.report-item{
  background:var(--card);border:1px solid var(--line);border-radius:12px;
  padding:18px 20px;display:flex;gap:14px;align-items:flex-start;
  transition:border-color .2s;
}
.report-item:hover{border-color:var(--line2)}
.ri-icon{
  width:40px;height:40px;border-radius:10px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;font-size:1rem;
}
.ri-name{
  font-family:'DM Sans',sans-serif;font-size:.87rem;font-weight:600;margin-bottom:3px;
}
.ri-desc{font-size:.77rem;color:var(--warm);line-height:1.55}
.ri-badge{
  display:inline-block;margin-top:6px;
  font-family:'JetBrains Mono',monospace;font-size:.56rem;
  padding:2px 8px;border-radius:3px;letter-spacing:.05em;
}

/* ── CSR PLATFORMS ───────────────────────── */
.platforms-band{
  padding:52px 5vw;
  border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  background:var(--deep);
}
.platforms-label{
  text-align:center;
  font-family:'JetBrains Mono',monospace;font-size:.65rem;
  color:var(--muted);letter-spacing:.12em;text-transform:uppercase;
  margin-bottom:2rem;
}
.platforms-row{
  display:flex;justify-content:center;align-items:center;
  gap:1.5rem;flex-wrap:wrap;
}
.platform-badge{
  display:flex;align-items:center;gap:10px;
  background:var(--card);border:1px solid var(--line2);
  border-radius:10px;padding:14px 20px;
  transition:all .22s;cursor:default;
}
.platform-badge:hover{border-color:rgba(232,184,75,.35);background:var(--card2)}
.pb-icon{font-size:1.4rem}
.pb-name{
  font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:600;
}
.pb-status{
  font-family:'JetBrains Mono',monospace;font-size:.6rem;
  color:var(--teal);margin-top:2px;letter-spacing:.04em;
}

/* ── PARTNERSHIP TIERS ───────────────────── */
.ptiers-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:1rem;margin-top:3rem;
}
.ptier-card{
  background:var(--card);border:1px solid var(--line);
  border-radius:16px;padding:28px 24px;
  position:relative;overflow:hidden;
  transition:all .3s;
}
.ptier-card.gold-tier{
  border-color:var(--gold);
  background:linear-gradient(155deg,rgba(232,184,75,0.06),var(--card));
  box-shadow:0 0 0 1px var(--gold),0 16px 48px rgba(232,184,75,0.1);
}
.ptier-card:hover{transform:translateY(-4px)}
.ptier-icon{font-size:2rem;margin-bottom:1rem}
.ptier-tier{
  font-family:'JetBrains Mono',monospace;font-size:.62rem;
  letter-spacing:.1em;color:var(--pt-color,var(--gold));margin-bottom:.4rem;
}
.ptier-name{
  font-family:'Fraunces',serif;font-weight:700;font-size:1.2rem;
  letter-spacing:-.02em;margin-bottom:.3rem;
}
.ptier-budget{
  font-family:'JetBrains Mono',monospace;font-size:.75rem;
  color:var(--pt-color,var(--gold));margin-bottom:1rem;
}
.ptier-features{list-style:none;margin-bottom:1.2rem}
.ptier-features li{
  font-size:.8rem;color:var(--warm);padding:6px 0;
  border-bottom:1px solid var(--line);
  display:flex;align-items:flex-start;gap:8px;
}
.ptier-features li:last-child{border-bottom:none}
.ptier-features li::before{content:'→';color:var(--pt-color,var(--gold));font-size:.7rem;flex-shrink:0;margin-top:2px}
.ptier-students{
  font-family:'JetBrains Mono',monospace;font-size:.65rem;
  color:var(--muted);
}
.ptier-students strong{color:var(--pt-color,var(--gold));font-size:.75rem}

/* ── CONTACT SECTION ─────────────────────── */
.ccontact-layout{
  display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;
}
@media(max-width:800px){.ccontact-layout{grid-template-columns:1fr;gap:2.5rem}}
.contact-info{}
.ci-item{
  display:flex;gap:14px;align-items:flex-start;
  padding:16px 0;border-bottom:1px solid var(--line);
}
.ci-item:last-child{border-bottom:none}
.ci-icon{
  width:38px;height:38px;border-radius:9px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-size:1rem;
}
.ci-title{font-size:.85rem;font-weight:600;margin-bottom:2px}
.ci-val{font-size:.82rem;color:var(--warm)}
.ci-val a{color:var(--gold);text-decoration:none}
.ci-val a:hover{text-decoration:underline}

/* ── MODAL ─────────────────────────────── */
.cmodal-overlay{
  position:fixed;inset:0;z-index:500;
  background:rgba(8,8,15,.92);backdrop-filter:blur(18px);
  display:flex;align-items:center;justify-content:center;
  padding:1.5rem;animation:mfade .2s;
}
@keyframes mfade{from{opacity:0}to{opacity:1}}
.cmodal{
  background:var(--card2);border:1px solid var(--line2);
  border-radius:22px;width:100%;max-width:580px;
  max-height:92vh;overflow-y:auto;
  animation:mscale .32s cubic-bezier(.34,1.56,.64,1);position:relative;
}
@keyframes mscale{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
.cmodal-close{
  position:absolute;top:14px;right:14px;
  background:rgba(255,255,255,.07);border:none;color:var(--muted);
  width:30px;height:30px;border-radius:7px;font-size:.9rem;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all .2s;
}
.cmodal-close:hover{background:rgba(255,255,255,.13);color:var(--cream)}
.cmodal-header{
  padding:32px 32px 20px;border-bottom:1px solid var(--line);
}
.cmodal-header h3{
  font-family:'Fraunces',serif;font-weight:900;font-size:1.4rem;
  letter-spacing:-.03em;margin-bottom:.4rem;
}
.cmodal-header p{font-size:.83rem;color:var(--warm);line-height:1.65}
.cmodal-tier-sel{
  display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem;
}
.cts-badge{
  font-family:'JetBrains Mono',monospace;font-size:.62rem;
  padding:4px 11px;border-radius:5px;
  background:rgba(232,184,75,0.08);border:1px solid rgba(232,184,75,0.22);
  color:var(--gold);letter-spacing:.04em;
}
.cmodal-body{padding:22px 32px 32px}
.cf-row{margin-bottom:.9rem}
.cf-row label{
  display:block;font-size:.74rem;font-weight:600;
  color:var(--warm);margin-bottom:5px;letter-spacing:.03em;
}
.cf-row input,.cf-row select,.cf-row textarea{
  width:100%;background:var(--card);
  border:1px solid var(--line2);border-radius:8px;
  color:var(--cream);font-family:'DM Sans',sans-serif;
  font-size:.86rem;padding:10px 13px;outline:none;
  transition:border-color .2s;-webkit-appearance:none;
}
.cf-row input:focus,.cf-row select:focus,.cf-row textarea:focus{
  border-color:var(--gold);box-shadow:0 0 0 3px rgba(232,184,75,.07);
}
.cf-row select option{background:var(--card2)}
.cf-row textarea{resize:vertical;min-height:80px}
.cf-2{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
@media(max-width:460px){.cf-2{grid-template-columns:1fr}}
.cf-submit{
  width:100%;background:var(--gold);color:var(--ink);
  font-weight:700;font-size:.95rem;padding:14px;border-radius:10px;
  border:none;cursor:pointer;font-family:'DM Sans',sans-serif;
  transition:all .24s;margin-top:.4rem;
  display:flex;align-items:center;justify-content:center;gap:7px;
}
.cf-submit:hover{background:var(--gold2);box-shadow:0 5px 22px var(--glow-g);transform:translateY(-1px)}
.cf-submit:disabled{opacity:.6;cursor:not-allowed;transform:none}
.cf-note{font-size:.7rem;color:var(--muted);text-align:center;margin-top:.8rem}
.cmodal-success{padding:52px 32px;text-align:center}
.csuccess-icon{font-size:3rem;margin-bottom:.9rem}
.cmodal-success h3{
  font-family:'Fraunces',serif;font-size:1.5rem;font-weight:900;
  color:var(--gold);margin-bottom:.5rem;letter-spacing:-.03em;
}
.cmodal-success p{color:var(--warm);font-size:.86rem;line-height:1.75}

/* ── BUTTONS ─────────────────────────────── */
.btn-gold{
  background:var(--gold);color:var(--ink);font-weight:700;font-size:.9rem;
  padding:13px 28px;border-radius:8px;border:none;cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:all .22s;
  display:inline-flex;align-items:center;gap:7px;text-decoration:none;
}
.btn-gold:hover{background:var(--gold2);box-shadow:0 5px 22px var(--glow-g);transform:translateY(-1px)}
.btn-outline-gold{
  background:transparent;color:var(--gold);font-weight:500;font-size:.9rem;
  padding:13px 28px;border-radius:8px;
  border:1px solid rgba(232,184,75,.35);cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:all .22s;
  display:inline-flex;align-items:center;gap:7px;text-decoration:none;
}
.btn-outline-gold:hover{background:rgba(232,184,75,.07);border-color:var(--gold)}
.btn-ghost-c{
  background:transparent;color:var(--cream);font-weight:500;font-size:.9rem;
  padding:13px 28px;border-radius:8px;
  border:1px solid var(--line2);cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:all .22s;
  display:inline-flex;align-items:center;gap:7px;text-decoration:none;
}
.btn-ghost-c:hover{background:rgba(255,255,255,.04);border-color:var(--line3)}

/* ── BOTTOM CTA ──────────────────────────── */
.cbottom-cta{
  padding:110px 5vw;text-align:center;
  background:var(--deep);border-top:1px solid var(--line);
  position:relative;overflow:hidden;
}
.cbottom-cta::before{
  content:'';position:absolute;top:50%;left:50%;
  transform:translate(-50%,-50%);width:700px;height:500px;
  background:radial-gradient(ellipse,rgba(232,184,75,0.06),transparent 65%);
  pointer-events:none;
}
.cbottom-cta h2{
  font-family:'Fraunces',serif;font-weight:900;
  font-size:clamp(2.2rem,5vw,4rem);letter-spacing:-.04em;
  line-height:1.02;margin-bottom:1rem;position:relative;
}
.cbottom-cta h2 em{font-style:italic;color:var(--gold)}
.cbottom-cta p{color:var(--warm);font-size:.97rem;margin-bottom:2.2rem;position:relative;max-width:520px;margin-left:auto;margin-right:auto}
.cbottom-btns{display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap;position:relative}

/* Footer */
.cpfooter{
  border-top:1px solid var(--line);padding:22px 5vw;
  display:flex;justify-content:space-between;align-items:center;
  flex-wrap:wrap;gap:1rem;font-size:.76rem;color:var(--muted);
}
.cpfooter a{color:var(--muted);text-decoration:none;transition:color .2s}
.cpfooter a:hover{color:var(--gold)}

/* WA Float */
.wa-float{
  position:fixed;bottom:24px;right:24px;width:50px;height:50px;
  border-radius:50%;background:#25D366;
  display:flex;align-items:center;justify-content:center;
  font-size:1.35rem;cursor:pointer;z-index:99;text-decoration:none;
  box-shadow:0 4px 18px rgba(37,211,102,.35);
  animation:wab 3s ease-in-out infinite;
}
@keyframes wab{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
`;

/* ═══════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════ */

const IMPACT_WALL = [
  {
    num: "25,000+",
    label: "Students Reached",
    sub: "via CSR-funded programs",
    color: "#E8B84B",
  },
  {
    num: "₹800",
    label: "Min. Cost Per Beneficiary",
    sub: "lowest in EdTech CSR segment",
    color: "#2DD4BF",
  },
  {
    num: "500+",
    label: "Labs Installed",
    sub: "across Telangana & AP",
    color: "#86EFAC",
  },
  {
    num: "10+",
    label: "Years Delivering",
    sub: "MSME-registered, Hyderabad",
    color: "#F5D07A",
  },
  {
    num: "100%",
    label: "Documentation Provided",
    sub: "Schedule VII compliant",
    color: "#E8B84B",
  },
  {
    num: "3 Yrs",
    label: "Outcome Tracking",
    sub: "available for long-term CSR",
    color: "#38BDF8",
  },
];

const WHY_ITEMS = [
  {
    icon: "📋",
    title: "Schedule VII Compliant",
    color: "#E8B84B",
    iconBg: "rgba(232,184,75,0.12)",
    desc: "Our programs fall directly under Item (ii) of Schedule VII — 'Promoting education, including special education and employment enhancing vocation skills.' Your CSR spend is fully eligible and defensible.",
    stat: "Companies Act 2013 — Schedule VII",
  },
  {
    icon: "📊",
    title: "Board-Ready Reporting",
    color: "#2DD4BF",
    iconBg: "rgba(45,212,191,0.1)",
    desc: "We deliver structured impact reports with student headcount, sessions completed, certification rates, and before/after skill assessments — exactly what your Board and CSR Committee need annually.",
    stat: "Annual Impact Report Included",
  },
  {
    icon: "💰",
    title: "Highest Impact per Rupee",
    color: "#86EFAC",
    iconBg: "rgba(134,239,172,0.1)",
    desc: "At ₹800–₹2,000 per direct beneficiary, ARC LABS delivers one of the lowest cost-per-student ratios in STEM education CSR — well below the ₹5,000–₹8,000 typical for comparable programs.",
    stat: "₹800–₹2,000 per student",
  },
  {
    icon: "🏫",
    title: "Permanent Infrastructure",
    color: "#FB7185",
    iconBg: "rgba(251,113,133,0.1)",
    desc: "Unlike one-time workshops, our labs are permanent installations. Students, faculty, and communities benefit year after year from a single CSR investment — compounding impact over time.",
    stat: "3–5 year recurring impact",
  },
  {
    icon: "🔍",
    title: "Third-Party Verifiable",
    color: "#E8B84B",
    iconBg: "rgba(232,184,75,0.12)",
    desc: "Lab installations, student attendance, and faculty certifications are documented with photographs, sign-in sheets, and institutional records — independently verifiable for CSR audits.",
    stat: "Audit-ready documentation",
  },
  {
    icon: "🤝",
    title: "Co-Branding Available",
    color: "#38BDF8",
    iconBg: "rgba(56,189,248,0.1)",
    desc: "Gold and Platinum tier partners receive co-branded lab nameplates, certificates, and collateral — giving your CSR program visible recognition within the institution and community.",
    stat: "Gold & Platinum tiers only",
  },
];

const SCH7_CLAUSES = [
  {
    num: "(i)",
    text: "Eradicating hunger, poverty and malnutrition...",
    highlight: false,
  },
  {
    num: "(ii)",
    text: (
      <>
        <strong style={{ color: "#E8B84B" }}>
          Promoting education, including special education and employment
          enhancing vocation skills especially among children, women, elderly,
          and the differently abled and livelihood enhancement projects.
        </strong>{" "}
        — ARC LABS programs qualify directly under this clause.
      </>
    ),
    highlight: true,
  },
  {
    num: "(iv)",
    text: "Ensuring environmental sustainability, ecological balance...",
    highlight: false,
  },
  { num: "(x)", text: "Rural development projects...", highlight: false },
];

const SCH7_STEPS = [
  {
    num: "1",
    title: "Identify the Program",
    desc: "Select the ARC LABS lab package appropriate for your CSR budget and beneficiary targets.",
  },
  {
    num: "2",
    title: "Due Diligence",
    desc: "We provide MSME certificate, PAN, bank details, prior impact reports, and institutional references.",
  },
  {
    num: "3",
    title: "CSR Agreement",
    desc: "A formal implementation agreement is signed between your company, ARC LABS, and the beneficiary institution.",
  },
  {
    num: "4",
    title: "Fund Transfer & Execution",
    desc: "CSR funds are transferred per your company's process. Lab installation begins within 2 weeks of receipt.",
  },
  {
    num: "5",
    title: "Impact Documentation",
    desc: "During and after the program, we document student data, attendance, certifications, and outcomes.",
  },
  {
    num: "6",
    title: "Annual Report Delivery",
    desc: "Full impact report delivered to your CSR team annually — formatted for board presentation.",
  },
];

const DOCS_WE_PROVIDE = [
  "MSME Certificate and PAN Card",
  "Audited financials (previous 3 years)",
  "80G exemption certificate",
  "Prior CSR impact reports with photographs",
  "Institutional MoU templates",
  "Student-level beneficiary data (anonymized)",
  "Certification records for faculty and students",
  "Cost per beneficiary calculation sheet",
  "Schedule VII eligibility declaration",
  "Annual impact report (formatted for BRSR/Annual Report)",
];

const SECTORS = [
  {
    icon: "🏭",
    name: "Manufacturing",
    desc: "Large workforces and plant locations near schools — natural fit for community STEM labs.",
    csr: "₹25L–₹2Cr typical CSR budget",
    color: "#E8B84B",
  },
  {
    icon: "💊",
    name: "Pharma & Life Sciences",
    desc: "Hyderabad's largest CSR spenders. Strong alignment with science education outcomes.",
    csr: "₹50L–₹5Cr typical CSR budget",
    color: "#2DD4BF",
  },
  {
    icon: "💻",
    name: "IT & Technology",
    desc: "Tech companies aligning CSR with digital literacy and future workforce development goals.",
    csr: "₹20L–₹1Cr typical CSR budget",
    color: "#86EFAC",
  },
  {
    icon: "⚡",
    name: "Energy & Power",
    desc: "PSUs like NTPC, BHEL, NMDC — mandated CSR with large education allocations.",
    csr: "₹1Cr–₹10Cr typical CSR budget",
    color: "#FB7185",
  },
  {
    icon: "🏦",
    name: "Banking & Finance",
    desc: "Banks with rural and semi-urban branch networks — strong interest in community education.",
    csr: "₹30L–₹3Cr typical CSR budget",
    color: "#38BDF8",
  },
  {
    icon: "🚗",
    name: "Automotive & Engineering",
    desc: "Tier 1 suppliers and OEMs supporting STEM skills to develop future engineering talent.",
    csr: "₹25L–₹2Cr typical CSR budget",
    color: "#E8B84B",
  },
];

const CASE_STUDIES = [
  {
    sector: "MANUFACTURING · CSR",
    name: "Govt. High School, Zaheerabad",
    location: "Sangareddy District, Telangana",
    metrics: [
      { num: "240", label: "Students/Year" },
      { num: "₹4.8L", label: "CSR Investment" },
      { num: "₹2,000", label: "Per Student" },
    ],
    quote:
      "Before the lab, our students had never touched a circuit board. Within 6 months, three students won district-level robotics competitions.",
    attribution: "— Principal, Govt. HS Zaheerabad",
    color: "#E8B84B",
  },
  {
    sector: "PHARMA · CSR",
    name: "St. Joseph's High School, Hyderabad",
    location: "Secunderabad, Telangana",
    metrics: [
      { num: "380", label: "Students/Year" },
      { num: "₹9.5L", label: "CSR Investment" },
      { num: "₹1,250", label: "Per Student" },
    ],
    quote:
      "The ARC LABS team handled everything — installation, training, and annual reporting. Our CSR head presented the impact report directly to our board.",
    attribution: "— CSR Manager, Pharma Company",
    color: "#2DD4BF",
  },
  {
    sector: "IT SECTOR · CSR",
    name: "Polytechnic College, Warangal",
    location: "Warangal, Telangana",
    metrics: [
      { num: "520", label: "Students/Year" },
      { num: "₹14L", label: "CSR Investment" },
      { num: "₹900", label: "Per Student" },
    ],
    quote:
      "Our IoT and Embedded lab directly improved placement rates. 68% of IoT-certified students received job offers within 3 months of certification.",
    attribution: "— Principal, Polytechnic College Warangal",
    color: "#86EFAC",
  },
];

const PARTNERSHIP_TIERS = [
  {
    tier: "SILVER PARTNER",
    name: "Community Impact",
    icon: "🥈",
    budget: "₹5L – ₹15L / year",
    color: "#C0C0C0",
    features: [
      "1 School or College Lab Setup",
      "50–150 students benefited annually",
      "Schedule VII documentation",
      "Annual impact report",
      "ARC LABS CSR Partner certificate",
    ],
    students: "50–150",
  },
  {
    tier: "GOLD PARTNER",
    name: "District-Level Impact",
    icon: "🥇",
    budget: "₹15L – ₹50L / year",
    color: "#E8B84B",
    goldTier: true,
    features: [
      "3–5 School / College Labs",
      "300–800 students benefited annually",
      "Co-branded lab nameplates",
      "Quarterly impact updates",
      "CSR Board presentation deck",
      "Dedicated ARC LABS account manager",
    ],
    students: "300–800",
  },
  {
    tier: "PLATINUM PARTNER",
    name: "State-Level Impact",
    icon: "🏆",
    budget: "₹50L+ / year",
    color: "#38BDF8",
    features: [
      "10+ Labs across districts",
      "1,000+ students annually",
      "Full co-branding program",
      "Featured in ARC LABS Annual Report",
      "BRSR-ready impact documentation",
      "Press release and media coverage",
      "Executive quarterly review meetings",
    ],
    students: "1,000+",
  },
];

const REPORT_ITEMS = [
  {
    icon: "📊",
    bg: "rgba(232,184,75,0.1)",
    color: "#E8B84B",
    name: "Executive Impact Summary",
    desc: "1-page board-ready summary of beneficiaries, outcomes, and spend.",
    badge: "BOARD READY",
    badgeBg: "rgba(232,184,75,0.1)",
    badgeColor: "#E8B84B",
  },
  {
    icon: "👥",
    bg: "rgba(45,212,191,0.1)",
    color: "#2DD4BF",
    name: "Student Beneficiary Data",
    desc: "Anonymized student count, demographics, attendance, and certification rates.",
    badge: "ANONYMIZED",
    badgeBg: "rgba(45,212,191,0.1)",
    badgeColor: "#2DD4BF",
  },
  {
    icon: "🎓",
    bg: "rgba(134,239,172,0.1)",
    color: "#86EFAC",
    name: "Faculty Certification Records",
    desc: "Teacher certification numbers and training hours documented.",
    badge: "CERTIFIED RECORDS",
    badgeBg: "rgba(134,239,172,0.1)",
    badgeColor: "#86EFAC",
  },
  {
    icon: "📸",
    bg: "rgba(251,113,133,0.1)",
    color: "#FB7185",
    name: "Photo & Video Documentation",
    desc: "Timestamped installation photos, student activity images, and lab videos.",
    badge: "VISUAL PROOF",
    badgeBg: "rgba(251,113,133,0.1)",
    badgeColor: "#FB7185",
  },
  {
    icon: "📑",
    bg: "rgba(232,184,75,0.1)",
    color: "#E8B84B",
    name: "BRSR / Annual Report Content",
    desc: "Pre-formatted content blocks ready to paste into your BRSR or Annual Report.",
    badge: "BRSR READY",
    badgeBg: "rgba(232,184,75,0.1)",
    badgeColor: "#E8B84B",
  },
  {
    icon: "🔒",
    bg: "rgba(56,189,248,0.1)",
    color: "#38BDF8",
    name: "Audit Evidence Package",
    desc: "All documents in a single zip — ready for CA or third-party CSR auditor review.",
    badge: "AUDIT READY",
    badgeBg: "rgba(56,189,248,0.1)",
    badgeColor: "#38BDF8",
  },
];

const PLATFORMS = [
  { icon: "🟦", name: "CSR Box", status: "LISTED & VERIFIED" },
  { icon: "🟩", name: "GiveIndia Corporate", status: "REGISTERED" },
  { icon: "🟨", name: "Sattva Platform", status: "REGISTERED" },
  { icon: "🟧", name: "GeM Portal", status: "EMPANELLED" },
  { icon: "🏛️", name: "TSSC Telangana", status: "EMPANELLED" },
];

/* ═══════════════════════════════════════════════════════════════════
   MODAL
═══════════════════════════════════════════════════════════════════ */
function CSRModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    budget: "",
    sector: "",
    timeline: "",
    geography: "",
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
      className="cmodal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="cmodal">
        <button className="cmodal-close" onClick={onClose}>
          ✕
        </button>
        {done ? (
          <div className="cmodal-success">
            <div className="csuccess-icon">🤝</div>
            <h3>Partnership Enquiry Received</h3>
            <p>
              Thank you. Our CSR partnerships team will reach out within{" "}
              <strong style={{ color: "#fff" }}>48 hours</strong> with a
              tailored proposal including impact projections, documentation
              samples, and implementation timeline.
              <br />
              <br />
              For immediate response:
              <br />
              <strong style={{ color: "#E8B84B" }}>hello@arclabs.in</strong>
              <br />
              <strong style={{ color: "#25D366" }}>
                +91 8699929532 (WhatsApp)
              </strong>
            </p>
          </div>
        ) : (
          <>
            <div className="cmodal-header">
              <h3>CSR Partnership Enquiry</h3>
              <p>
                Our team will prepare a tailored proposal with impact
                projections, documentation samples, and lab implementation plan
                within 48 hours.
              </p>
              <div className="cmodal-tier-sel">
                {[
                  "Schedule VII Eligible",
                  "Impact Report Included",
                  "BRSR-Ready Documentation",
                  "Co-branding Available",
                ].map((t) => (
                  <span className="cts-badge" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="cmodal-body">
              <form onSubmit={submit}>
                <div className="cf-2">
                  <div className="cf-row">
                    <label>Your Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={h}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="cf-row">
                    <label>Designation *</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={h}
                      placeholder="CSR Head / CFO / Trustee"
                      required
                    />
                  </div>
                </div>
                <div className="cf-row">
                  <label>Company / Organisation *</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={h}
                    placeholder="Company name"
                    required
                  />
                </div>
                <div className="cf-2">
                  <div className="cf-row">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={h}
                      placeholder="csr@company.com"
                      required
                    />
                  </div>
                  <div className="cf-row">
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
                <div className="cf-2">
                  <div className="cf-row">
                    <label>Annual CSR Budget (approx)</label>
                    <select name="budget" value={form.budget} onChange={h}>
                      <option value="">Select range</option>
                      <option>Under ₹5 Lakhs</option>
                      <option>₹5L – ₹15L</option>
                      <option>₹15L – ₹50L</option>
                      <option>₹50L – ₹1 Crore</option>
                      <option>Above ₹1 Crore</option>
                    </select>
                  </div>
                  <div className="cf-row">
                    <label>Industry Sector</label>
                    <select name="sector" value={form.sector} onChange={h}>
                      <option value="">Select sector</option>
                      <option>Manufacturing</option>
                      <option>Pharma / Life Sciences</option>
                      <option>IT / Technology</option>
                      <option>Energy / Power / PSU</option>
                      <option>Banking / Finance / NBFC</option>
                      <option>Automotive / Engineering</option>
                      <option>FMCG / Consumer</option>
                      <option>Infrastructure / Real Estate</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="cf-2">
                  <div className="cf-row">
                    <label>Implementation Timeline</label>
                    <select name="timeline" value={form.timeline} onChange={h}>
                      <option value="">When to start?</option>
                      <option>This financial year (before March)</option>
                      <option>Q1 next year (Apr–Jun)</option>
                      <option>Q2 next year (Jul–Sep)</option>
                      <option>Planning phase only</option>
                    </select>
                  </div>
                  <div className="cf-row">
                    <label>Preferred Geography</label>
                    <input
                      name="geography"
                      value={form.geography}
                      onChange={h}
                      placeholder="e.g. Telangana, AP, PAN India"
                    />
                  </div>
                </div>
                <div className="cf-row">
                  <label>Additional Context</label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={h}
                    placeholder="Number of beneficiaries you want to target, specific districts, co-branding requirements, or any other requirements..."
                  />
                </div>
                <button type="submit" className="cf-submit" disabled={loading}>
                  {loading
                    ? "Submitting..."
                    : "🤝 Submit Partnership Enquiry →"}
                </button>
                <p className="cf-note">
                  Your details are used only to prepare your proposal. ARC LABS
                  does not share contact information with third parties.
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
export default function CSRPartnersPage() {
  const [showModal, setShowModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const FAQS = [
    {
      q: "Is ARC LABS registered and CSR-eligible?",
      a: "Yes. ARC LABS is registered under the Ministry of MSME, holds a valid PAN, and maintains audited financial statements. Our programs qualify under Schedule VII Item (ii) of the Companies Act 2013. We can provide all due diligence documents within 24 hours of request.",
    },
    {
      q: "How do you calculate cost per beneficiary?",
      a: "Cost per beneficiary is calculated as total CSR grant divided by total number of students who complete at least 60% of the program in a given year. We use a conservative 3-year model — spreading the one-time lab cost over three years of student cohorts — resulting in ₹800–₹2,000 per student depending on package.",
    },
    {
      q: "Can we select specific schools or districts for the lab?",
      a: "Yes. You can specify geographic preferences, school type (government, aided, private), student demographics, or any other criteria. We will identify suitable institutions within your preferred geography and share their profiles before any commitment.",
    },
    {
      q: "What happens after the CSR period ends?",
      a: "Labs installed by ARC LABS are permanent school infrastructure. After the CSR term ends, the institution can continue using the lab independently — teachers are trained to operate without ARC LABS' ongoing presence. Annual support contracts can be renewed as a recurring CSR program.",
    },
    {
      q: "Do you work with government-run schools?",
      a: "Yes, and we prefer them for CSR programs because they serve the highest-need students. We have experience working with Telangana state government schools, Andhra Pradesh government institutions, and kendriya vidyalayas. We handle all government paperwork and coordination.",
    },
    {
      q: "Can we get an 80G deduction on this CSR spend?",
      a: "ARC LABS holds an 80G exemption certificate. However, please note that CSR expenditure under Section 135 of the Companies Act is not automatically eligible for 80G deduction in addition to CSR compliance — this depends on whether the spend is routed through an implementing agency. We recommend consulting your CA on the structuring.",
    },
  ];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="cnav">
        <a href="/" className="cnav-logo">
          <span className="cgold-dot" />
          ARC LABS
        </a>
        <div className="cnav-links">
          <a href="/" className="cnav-link">
            ← Back to Home
          </a>
          <a href="/programs" className="cnav-link">
            Programs
          </a>
          <a href="/products" className="cnav-link">
            Products
          </a>
          <a href="/lab-packages" className="cnav-link">
            Lab Packages
          </a>
          <button className="cnav-cta" onClick={() => setShowModal(true)}>
            Partner With Us →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="chero">
        <div className="chero-left">
          <div className="chero-eyebrow">
            <span className="ceyebrow-line" />
            CSR PARTNERSHIP PROGRAM
          </div>
          <h1>
            Turn your
            <br />
            CSR budget into
            <br />
            <em>lasting impact.</em>
          </h1>
          <p className="chero-deck">
            ARC LABS installs permanent AI, IoT, and Robotics labs in schools
            and colleges across India — funded by corporate CSR. One investment.
            Years of student impact. Board-ready documentation included.
          </p>
          <div className="chero-ctas">
            <button className="btn-gold" onClick={() => setShowModal(true)}>
              🤝 Become a Partner →
            </button>
            <a href="#how-it-works" className="btn-ghost-c">
              See How It Works
            </a>
          </div>
          <div className="compliance-badge">
            <span className="comp-icon">⚖️</span>
            <div className="comp-text">
              <strong>Schedule VII Compliant — Companies Act 2013</strong>
              Programs qualify under Item (ii): Promoting education and
              employment-enhancing vocational skills.
            </div>
          </div>
        </div>

        <div className="chero-right">
          <div className="impact-wall-label">IMPACT AT A GLANCE</div>
          <div className="impact-wall">
            {IMPACT_WALL.map((item) => (
              <div
                className="iw-cell"
                key={item.label}
                style={{ "--iw-color": item.color }}
              >
                <div className="iw-num">{item.num}</div>
                <div className="iw-label">{item.label}</div>
                <div className="iw-sub">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[
            "Schedule VII Compliant",
            "₹800 Minimum Per Beneficiary",
            "Permanent Lab Infrastructure",
            "BRSR-Ready Reporting",
            "Co-branding Available",
            "Government School Focus",
            "Audit-Ready Documentation",
            "25,000+ Students Impacted",
            "MSME Registered",
            "Telangana & AP Reach",
            "Schedule VII Compliant",
            "₹800 Minimum Per Beneficiary",
            "Permanent Lab Infrastructure",
            "BRSR-Ready Reporting",
            "Co-branding Available",
            "Government School Focus",
            "Audit-Ready Documentation",
            "25,000+ Students Impacted",
          ].map((item, i) => (
            <span className="mq-item" key={i}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* WHY PARTNER */}
      <div className="csec">
        <div className="sec-kicker">Why Partner with ARC LABS</div>
        <h2 className="sec-headline">
          Six reasons CSR heads
          <br />
          choose <em>ARC LABS.</em>
        </h2>
        <p className="sec-body">
          We are built for institutional CSR — not one-off workshops. Every
          partnership is structured for compliance, impact, and visibility.
        </p>
        <div className="why-grid">
          {WHY_ITEMS.map((item) => (
            <div
              className="why-card"
              key={item.title}
              style={{ "--wc-color": item.color }}
            >
              <div
                className="why-icon"
                style={{
                  background: `rgba(${item.color === "#E8B84B" ? "232,184,75" : item.color === "#2DD4BF" ? "45,212,191" : item.color === "#86EFAC" ? "134,239,172" : item.color === "#FB7185" ? "251,113,133" : "56,189,248"},0.12)`,
                }}
              >
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="why-stat">{item.stat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SCHEDULE VII SECTION */}
      <div className="csec csec-dark" id="how-it-works">
        <div className="sec-kicker">Legal Framework</div>
        <h2 className="sec-headline">
          Schedule VII.
          <br />
          <em>Fully eligible.</em> Fully documented.
        </h2>
        <p className="sec-body" style={{ marginBottom: "3rem" }}>
          Every ARC LABS program is designed with Schedule VII compliance in
          mind. Here is the legal basis and the step-by-step process.
        </p>
        <div className="sch7-layout">
          <div>
            <div className="sch7-doc">
              <div className="sch7-doc-header">
                <div>
                  <div
                    style={{
                      fontFamily: "'Fraunces',serif",
                      fontWeight: 700,
                      fontSize: ".9rem",
                      marginBottom: "2px",
                    }}
                  >
                    Companies Act 2013
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: ".6rem",
                      color: "var(--muted)",
                    }}
                  >
                    Schedule VII — CSR Activities
                  </div>
                </div>
                <span className="doc-chip">ELIGIBLE</span>
              </div>
              <div className="sch7-doc-body">
                {SCH7_CLAUSES.map((c) => (
                  <div className="sch7-clause" key={c.num}>
                    <div className="sch7-clause-num">{c.num}</div>
                    <div className="sch7-clause-text">{c.text}</div>
                  </div>
                ))}
                <div className="sch7-eligible">
                  <span className="sch7-elig-icon">✅</span>
                  <div className="sch7-elig-text">
                    <strong>ARC LABS programs qualify under Item (ii)</strong>
                    All STEM lab installations, teacher training, and student
                    skill programs fall directly within this clause. No legal
                    ambiguity.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sch7-right">
            <h3
              style={{
                fontFamily: "'Fraunces',serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
                letterSpacing: "-.02em",
              }}
            >
              How the CSR process works
            </h3>
            <ol className="sch7-steps">
              {SCH7_STEPS.map((s) => (
                <li className="sch7-step" key={s.num}>
                  <span className="step-num">{s.num}</span>
                  <div>
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="docs-we-provide">
              <h4>Documents we provide for due diligence</h4>
              <ul className="doc-list">
                {DOCS_WE_PROVIDE.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* IMPACT METRICS */}
      <div className="csec">
        <div className="sec-kicker">Verified Impact</div>
        <h2 className="sec-headline">
          Numbers that hold up
          <br />
          in a <em>board meeting.</em>
        </h2>
        <p className="sec-body">
          Every metric below comes from documented programs with sign-in sheets,
          photos, and institutional sign-offs.
        </p>
        <div className="impact-strip">
          {[
            {
              num: "25,000+",
              label: "Direct Beneficiaries",
              sub: "Students trained across programs",
            },
            {
              num: "1,000+",
              label: "Faculty Certified",
              sub: "Trained & certified teachers",
            },
            {
              num: "500+",
              label: "Lab Installations",
              sub: "Permanent infrastructure",
            },
            {
              num: "₹800",
              label: "Min. Cost Per Student",
              sub: "3-year amortized basis",
            },
            {
              num: "10+",
              label: "Years Experience",
              sub: "MSME-registered delivery",
            },
            {
              num: "100%",
              label: "Documentation Rate",
              sub: "All programs documented",
            },
          ].map((m) => (
            <div className="imp-cell" key={m.label}>
              <div className="imp-num">{m.num}</div>
              <div className="imp-label">{m.label}</div>
              <div className="imp-sub">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TARGET SECTORS */}
      <div className="csec csec-dark">
        <div className="sec-kicker">Industry Sectors</div>
        <h2 className="sec-headline">
          Which companies partner
          <br />
          with <em>ARC LABS?</em>
        </h2>
        <p className="sec-body">
          Companies across six sectors have found ARC LABS programs to be an
          effective, high-impact use of their CSR education budget.
        </p>
        <div className="sectors-grid">
          {SECTORS.map((s) => (
            <div
              className="sector-card"
              key={s.name}
              style={{ "--sc-color": s.color }}
            >
              <div className="sc-icon">{s.icon}</div>
              <div className="sc-name">{s.name}</div>
              <div className="sc-desc">{s.desc}</div>
              <div className="sc-csr">{s.csr}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CASE STUDIES */}
      <div className="csec">
        <div className="sec-kicker">Impact Stories</div>
        <h2 className="sec-headline">
          Real labs. <em>Real outcomes.</em>
          <br />
          Real board reports.
        </h2>
        <p className="sec-body">
          Representative case studies from ARC LABS-installed programs across
          Telangana.
        </p>
        <div className="cases-grid">
          {CASE_STUDIES.map((c) => (
            <div className="case-card" key={c.name}>
              <div
                className="case-card-top"
                style={{
                  background: `linear-gradient(90deg,${c.color},transparent)`,
                }}
              />
              <div className="case-body">
                <div
                  className="case-sector"
                  style={{
                    color: c.color,
                    background: `rgba(${c.color === "#E8B84B" ? "232,184,75" : c.color === "#2DD4BF" ? "45,212,191" : "134,239,172"},0.08)`,
                    borderColor: `rgba(${c.color === "#E8B84B" ? "232,184,75" : c.color === "#2DD4BF" ? "45,212,191" : "134,239,172"},0.22)`,
                  }}
                >
                  {c.sector}
                </div>
                <div className="case-name">{c.name}</div>
                <div className="case-location">📍 {c.location}</div>
                <div className="case-metrics">
                  {c.metrics.map((m) => (
                    <div className="case-metric" key={m.label}>
                      <div className="cm-num" style={{ color: c.color }}>
                        {m.num}
                      </div>
                      <div className="cm-label">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="case-quote">{c.quote}</div>
                <div className="case-attribution">{c.attribution}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REPORTING & DOCUMENTATION */}
      <div className="csec csec-dark">
        <div className="sec-kicker">Impact Documentation</div>
        <h2 className="sec-headline">
          Everything your board,
          <br />
          auditor, and <em>BRSR needs.</em>
        </h2>
        <p className="sec-body" style={{ marginBottom: "3rem" }}>
          ARC LABS delivers a complete documentation package — no chasing for
          data, no formatting impact reports yourself.
        </p>
        <div className="report-layout">
          <div>
            <div className="report-doc-preview">
              <div className="rdp-header">
                <div className="rdp-dots">
                  <div className="rdp-dot" style={{ background: "#FF5F56" }} />
                  <div className="rdp-dot" style={{ background: "#FFBD2E" }} />
                  <div className="rdp-dot" style={{ background: "#27C93F" }} />
                </div>
                <span className="rdp-title">
                  ARC_LABS_CSR_Impact_Report_2024.pdf
                </span>
              </div>
              <div className="rdp-body">
                <div
                  style={{
                    fontFamily: "'Fraunces',serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    marginBottom: "1rem",
                    letterSpacing: "-.02em",
                  }}
                >
                  CSR Impact Report — FY 2024–25
                </div>
                {[
                  { k: "Partner Company", v: "[ Your Company ]" },
                  { k: "Program Name", v: "ARC LABS STEM Lab Program" },
                  { k: "Beneficiary Institutions", v: "3 Schools, Hyderabad" },
                  { k: "Direct Beneficiaries", v: "486 students" },
                  { k: "Faculty Trained", v: "12 teachers" },
                  { k: "CSR Spend", v: "₹12,50,000" },
                  { k: "Cost per Beneficiary", v: "₹857" },
                  { k: "Schedule VII Clause", v: "Item (ii)" },
                ].map((r) => (
                  <div className="rdp-row" key={r.k}>
                    <span className="rdp-key">{r.k}</span>
                    <span className="rdp-val">{r.v}</span>
                  </div>
                ))}
                {[
                  { label: "Session Completion Rate", val: "94%", fill: 94 },
                  { label: "Student Certification Rate", val: "78%", fill: 78 },
                  { label: "Teacher Confidence Score", val: "91%", fill: 91 },
                ].map((b) => (
                  <div className="rdp-bar-row" key={b.label}>
                    <div className="rdp-bar-label">
                      <span style={{ color: "var(--warm)" }}>{b.label}</span>
                      <span style={{ color: "var(--gold)" }}>{b.val}</span>
                    </div>
                    <div className="rdp-bar">
                      <div
                        className="rdp-bar-fill"
                        style={{ width: `${b.fill}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="report-items">
            {REPORT_ITEMS.map((item) => (
              <div className="report-item" key={item.name}>
                <div
                  className="ri-icon"
                  style={{ background: item.bg, color: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="ri-name">{item.name}</div>
                  <div className="ri-desc">{item.desc}</div>
                  <span
                    className="ri-badge"
                    style={{ background: item.badgeBg, color: item.badgeColor }}
                  >
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARTNERSHIP TIERS */}
      <div className="csec">
        <div className="sec-kicker">Partnership Tiers</div>
        <h2 className="sec-headline">
          Three levels of partnership.
          <br />
          <em>One clear framework.</em>
        </h2>
        <p className="sec-body">
          Choose the tier that matches your CSR budget and impact ambitions. All
          tiers include full documentation.
        </p>
        <div className="ptiers-grid">
          {PARTNERSHIP_TIERS.map((t) => (
            <div
              key={t.tier}
              className={`ptier-card${t.goldTier ? " gold-tier" : ""}`}
              style={{ "--pt-color": t.color }}
            >
              <div className="ptier-icon">{t.icon}</div>
              <div className="ptier-tier">{t.tier}</div>
              <div className="ptier-name">{t.name}</div>
              <div className="ptier-budget">{t.budget}</div>
              <ul className="ptier-features">
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="ptier-students">
                Students impacted annually: <strong>{t.students}</strong>
              </div>
              <button
                className="pkg-btn-primary"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "9px",
                  border: "none",
                  background: t.goldTier ? t.color : "transparent",
                  color: t.goldTier ? "var(--ink)" : t.color,
                  border: t.goldTier ? "none" : `1px solid ${t.color}40`,
                  fontWeight: 700,
                  fontSize: ".85rem",
                  cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "all .22s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  marginTop: "1.2rem",
                }}
                onClick={() => setShowModal(true)}
              >
                Enquire About {t.name} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CSR PLATFORMS */}
      <div className="platforms-band">
        <div className="platforms-label">
          ARC LABS is registered on all major CSR discovery platforms
        </div>
        <div className="platforms-row">
          {PLATFORMS.map((p) => (
            <div className="platform-badge" key={p.name}>
              <span className="pb-icon">{p.icon}</span>
              <div>
                <div className="pb-name">{p.name}</div>
                <div className="pb-status">{p.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="csec csec-dark">
        <div className="sec-kicker">Common Questions</div>
        <h2 className="sec-headline">
          Questions your <em>legal and finance</em>
          <br />
          team will ask — answered.
        </h2>
        <div style={{ maxWidth: "780px", marginTop: "2.5rem" }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                marginBottom: ".8rem",
                borderColor:
                  openFaq === i ? "rgba(232,184,75,0.3)" : "var(--line)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "border-color .2s",
              }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div
                style={{
                  padding: "18px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    fontSize: ".88rem",
                    fontWeight: 600,
                    lineHeight: 1.5,
                  }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "6px",
                    flexShrink: 0,
                    background:
                      openFaq === i ? "rgba(232,184,75,0.12)" : "var(--raised)",
                    color: openFaq === i ? "var(--gold)" : "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: ".8rem",
                    transition: "all .2s",
                  }}
                >
                  {openFaq === i ? "−" : "+"}
                </span>
              </div>
              {openFaq === i && (
                <div
                  style={{
                    padding: "0 20px 18px",
                    fontSize: ".83rem",
                    color: "var(--warm)",
                    lineHeight: 1.75,
                    borderTop: "1px solid var(--line)",
                    animation: "mfade .22s ease",
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="csec">
        <div className="sec-kicker">Get in Touch</div>
        <h2 className="sec-headline">
          Talk to our
          <br />
          <em>CSR partnerships team.</em>
        </h2>
        <div className="ccontact-layout" style={{ marginTop: "2.5rem" }}>
          <div className="contact-info">
            {[
              {
                icon: "📞",
                bg: "rgba(232,184,75,0.1)",
                title: "Direct Line",
                val: (
                  <>
                    <a href="tel:+918699929532">+91 8699929532</a> ·{" "}
                    <a href="tel:+914035659806">+91 40 3565 9806</a>
                  </>
                ),
              },
              {
                icon: "✉️",
                bg: "rgba(45,212,191,0.1)",
                title: "Email",
                val: <a href="mailto:hello@arclabs.in">hello@arclabs.in</a>,
              },
              {
                icon: "💬",
                bg: "rgba(37,211,102,0.1)",
                title: "WhatsApp",
                val: (
                  <a
                    href="https://wa.me/918699929532"
                    target="_blank"
                    rel="noreferrer"
                  >
                    +91 8699929532 — preferred for quick response
                  </a>
                ),
              },
              {
                icon: "📍",
                bg: "rgba(232,184,75,0.1)",
                title: "Office",
                val: "4-7-138/1, Narendra Nagar, Habsiguda, Hyderabad – 500007",
              },
              {
                icon: "🏛️",
                bg: "rgba(134,239,172,0.1)",
                title: "Registration",
                val: "MSME Registered · PAN: Available on request · 80G Certificate: Available",
              },
            ].map((c) => (
              <div className="ci-item" key={c.title}>
                <div className="ci-icon" style={{ background: c.bg }}>
                  {c.icon}
                </div>
                <div>
                  <div className="ci-title">{c.title}</div>
                  <div className="ci-val">{c.val}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div
              style={{
                background: "var(--card)",
                border: "1px solid rgba(232,184,75,0.2)",
                borderRadius: "16px",
                padding: "28px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Fraunces',serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  marginBottom: ".5rem",
                  letterSpacing: "-.02em",
                }}
              >
                Ready to start a conversation?
              </div>
              <p
                style={{
                  fontSize: ".85rem",
                  color: "var(--warm)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                Submit your partnership enquiry and our team will prepare a
                tailored impact proposal — including projected beneficiaries,
                cost-per-student calculation, lab options, and implementation
                timeline — within 48 hours.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".7rem",
                }}
              >
                <button
                  className="btn-gold"
                  style={{ justifyContent: "center" }}
                  onClick={() => setShowModal(true)}
                >
                  🤝 Submit Partnership Enquiry →
                </button>
                <a
                  href="https://wa.me/918699929532"
                  className="btn-ghost-c"
                  style={{ justifyContent: "center" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  💬 WhatsApp Our CSR Team
                </a>
                <a
                  href="mailto:hello@arclabs.in?subject=CSR Partnership Enquiry"
                  className="btn-outline-gold"
                  style={{ justifyContent: "center" }}
                >
                  ✉ Email for Due Diligence Documents
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="cbottom-cta">
        <h2>
          Your CSR rupee can build
          <br />a lab that teaches <em>for years.</em>
        </h2>
        <p>
          One permanent lab. Hundreds of students. Year after year. That is what
          ARC LABS delivers with your CSR investment.
        </p>
        <div className="cbottom-btns">
          <button className="btn-gold" onClick={() => setShowModal(true)}>
            🤝 Become a Partner
          </button>
          <a href="/lab-packages" className="btn-ghost-c">
            View Lab Packages →
          </a>
          <a
            href="https://wa.me/918699929532"
            className="btn-ghost-c"
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <div className="cpfooter">
        <span>
          © 2025 ARC LABS — MSME Registered · Made in India · Hyderabad
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="/lab-packages">Lab Packages</a>
          <a href="/programs">Programs</a>
          <a href="/products">Products</a>
          <a href="mailto:hello@arclabs.in">hello@arclabs.in</a>
        </div>
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

      {/* Modal */}
      {showModal && <CSRModal onClose={() => setShowModal(false)} />}
    </>
  );
}
