import { useState, useEffect, useRef } from "react";

/* ─── STYLES ──────────────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --black:#07070D;--dark:#0C0C18;--card:#111120;--card2:#161628;--card3:#1B1B30;
  --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.13);
  --white:#F4F4FF;--off:#8080A0;--off2:#B0B0CC;
  --green:#00F5A0;--blue:#00BFFF;--orange:#FF8C42;--gold:#FFD166;
  --glow-g:rgba(0,245,160,0.15);--glow-b:rgba(0,191,255,0.15);--glow-o:rgba(255,140,66,0.15);
}
html{scroll-behavior:smooth}
body{background:var(--black);color:var(--white);font-family:'DM Sans',sans-serif;line-height:1.6;overflow-x:hidden}
::selection{background:var(--green);color:var(--black)}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--black)}::-webkit-scrollbar-thumb{background:var(--green)}

body::before{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(255,255,255,0.013) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,0.013) 1px,transparent 1px);
  background-size:52px 52px;
}

/* NAV */
.pnav{
  position:sticky;top:0;z-index:300;height:66px;
  background:rgba(7,7,13,0.93);backdrop-filter:blur(22px);
  border-bottom:1px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;padding:0 5vw;
}
.pnav-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;
  color:var(--white);text-decoration:none;display:flex;align-items:center;gap:8px}
.ndot{width:8px;height:8px;background:var(--green);border-radius:50%;animation:ndpulse 2s infinite}
@keyframes ndpulse{0%,100%{box-shadow:0 0 0 0 rgba(0,245,160,0.4)}50%{box-shadow:0 0 0 7px rgba(0,245,160,0)}}
.pnav-right{display:flex;align-items:center;gap:1rem}
.pnav-back{font-size:0.8rem;color:var(--off);text-decoration:none;transition:color .2s}
.pnav-back:hover{color:var(--white)}
.pnav-cart-btn{
  display:flex;align-items:center;gap:7px;
  background:var(--card2);border:1px solid var(--border2);
  color:var(--white);padding:8px 16px;border-radius:8px;
  font-size:0.82rem;font-weight:500;cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:all .2s;
}
.pnav-cart-btn:hover{border-color:var(--green);color:var(--green)}
.cart-count{
  background:var(--green);color:var(--black);
  font-size:0.62rem;font-weight:800;
  width:18px;height:18px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-family:'JetBrains Mono',monospace;
}

/* HERO */
.ph-hero{
  padding:72px 5vw 52px;text-align:center;position:relative;overflow:hidden;
}
.ph-hero::before{
  content:'';position:absolute;top:-80px;left:50%;transform:translateX(-50%);
  width:900px;height:400px;pointer-events:none;
  background:radial-gradient(ellipse,rgba(0,245,160,0.05) 0%,rgba(0,191,255,0.03) 45%,transparent 70%);
}
.ph-eyebrow{
  display:inline-flex;align-items:center;gap:7px;
  background:rgba(0,245,160,0.07);border:1px solid rgba(0,245,160,0.18);
  border-radius:100px;padding:5px 15px;margin-bottom:1.6rem;
  font-family:'JetBrains Mono',monospace;font-size:0.68rem;
  color:var(--green);letter-spacing:0.09em;
}
.ph-edot{width:5px;height:5px;background:var(--green);border-radius:50%;animation:ndpulse 1.5s infinite}
.ph-hero h1{
  font-family:'Syne',sans-serif;font-weight:800;
  font-size:clamp(2rem,5vw,3.6rem);letter-spacing:-.03em;
  line-height:1.08;margin-bottom:1rem;position:relative;
}
.ph-hero h1 em{font-style:normal;color:var(--green)}
.ph-hero p{color:var(--off);font-size:.97rem;font-weight:300;max-width:500px;margin:0 auto 2.2rem;line-height:1.75}

/* Filter bar */
.filter-bar{
  display:flex;justify-content:center;gap:.5rem;flex-wrap:wrap;
  padding:0 5vw 48px;position:relative;z-index:1;
}
.filter-btn{
  background:var(--card);border:1px solid var(--border2);color:var(--off2);
  font-size:.78rem;font-weight:500;padding:8px 18px;border-radius:7px;
  cursor:pointer;transition:all .22s;font-family:'DM Sans',sans-serif;
  display:flex;align-items:center;gap:6px;
}
.filter-btn.active,.filter-btn:hover{
  background:rgba(0,245,160,0.08);border-color:var(--green);color:var(--green);
}

/* PRODUCT CARDS GRID */
.products-wrap{padding:0 5vw 80px;position:relative;z-index:1}
.products-grid{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));
  gap:1.5rem;
}

/* PRODUCT CARD */
.pcard{
  background:var(--card);border:1px solid var(--border);border-radius:20px;
  overflow:hidden;transition:all .3s;cursor:pointer;position:relative;
}
.pcard:hover{border-color:var(--pc-color,var(--green));transform:translateY(-5px);
  box-shadow:0 24px 60px rgba(0,0,0,0.45)}
.pcard.selected{border-color:var(--pc-color,var(--green));
  box-shadow:0 0 0 1px var(--pc-color,var(--green)),0 20px 60px rgba(0,0,0,0.4)}

/* Card top image area */
.pc-visual{
  height:220px;position:relative;overflow:hidden;
  background:linear-gradient(135deg,var(--dark),var(--card2));
  display:flex;align-items:center;justify-content:center;
}
.pc-visual::after{
  content:'';position:absolute;inset:0;
  background:radial-gradient(circle at 50% 60%,rgba(var(--pc-glow),0.12),transparent 65%);
}
.pc-emoji{font-size:4.5rem;position:relative;z-index:1;
  filter:drop-shadow(0 8px 24px rgba(0,0,0,0.5))}
.pc-badge-wrap{position:absolute;top:14px;left:14px;display:flex;gap:6px;z-index:2}
.pc-badge{
  font-family:'JetBrains Mono',monospace;font-size:.62rem;font-weight:600;
  padding:4px 10px;border-radius:5px;letter-spacing:.06em;
}
.pc-best{
  position:absolute;top:14px;right:14px;z-index:2;
  background:var(--gold);color:var(--black);
  font-family:'JetBrains Mono',monospace;font-size:.6rem;font-weight:700;
  padding:4px 10px;border-radius:5px;letter-spacing:.06em;
}
.pc-circuit{
  position:absolute;bottom:0;left:0;right:0;height:60px;
  background:linear-gradient(transparent,var(--card));z-index:1;
}

/* Card body */
.pc-body{padding:22px 22px 0}
.pc-tier{
  font-family:'JetBrains Mono',monospace;font-size:.62rem;
  letter-spacing:.1em;text-transform:uppercase;margin-bottom:.4rem;
}
.pc-name{
  font-family:'Syne',sans-serif;font-weight:800;
  font-size:1.12rem;letter-spacing:-.02em;margin-bottom:.4rem;
}
.pc-tagline{font-size:.8rem;color:var(--off);line-height:1.55;margin-bottom:1rem}
.pc-chips{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:1rem}
.pc-chip{
  font-family:'JetBrains Mono',monospace;font-size:.6rem;
  padding:3px 8px;border-radius:4px;
  background:rgba(255,255,255,0.04);border:1px solid var(--border);color:var(--off2);
}

/* Price */
.pc-price-row{
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 0;border-top:1px solid var(--border);
}
.pc-price{
  font-family:'Syne',sans-serif;font-weight:800;font-size:1.6rem;
  letter-spacing:-.02em;
}
.pc-price span{font-size:.85rem;color:var(--off);font-weight:400}
.pc-old-price{
  font-size:.78rem;color:var(--off);
  text-decoration:line-through;margin-top:2px;
}

/* Card footer */
.pc-footer{
  display:grid;grid-template-columns:1fr 1fr;gap:.5rem;
  padding:14px 22px 18px;
}
.pc-btn-detail{
  background:transparent;border:1px solid var(--border2);color:var(--off2);
  font-size:.78rem;font-weight:500;padding:9px;border-radius:8px;
  cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;
}
.pc-btn-detail:hover{color:var(--white);border-color:rgba(255,255,255,.25)}
.pc-btn-buy{
  border:none;color:var(--black);font-size:.78rem;font-weight:700;
  padding:9px;border-radius:8px;cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:all .2s;
}
.pc-btn-buy:hover{filter:brightness(1.1);transform:translateY(-1px)}

/* ── PRODUCT DETAIL DRAWER ─────────────────────────────── */
.detail-drawer{
  margin-top:1.5rem;background:var(--card2);
  border:1px solid var(--border2);border-radius:20px;overflow:hidden;
  animation:drawerIn .38s cubic-bezier(.4,0,.2,1);
  grid-column:1/-1;
}
@keyframes drawerIn{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:translateY(0)}}

.dd-header{
  display:flex;align-items:flex-start;justify-content:space-between;
  padding:32px 36px 24px;border-bottom:1px solid var(--border);
  gap:2rem;flex-wrap:wrap;
}
.dd-hl{flex:1;min-width:240px}
.dd-eyebrow{
  font-family:'JetBrains Mono',monospace;font-size:.62rem;
  letter-spacing:.1em;text-transform:uppercase;margin-bottom:.5rem;
}
.dd-hl h2{
  font-family:'Syne',sans-serif;font-weight:800;
  font-size:clamp(1.4rem,3vw,2rem);letter-spacing:-.025em;margin-bottom:.4rem;
}
.dd-hl p{font-size:.87rem;color:var(--off);line-height:1.7;max-width:520px}
.dd-hr{display:flex;flex-direction:column;align-items:flex-end;gap:.8rem;flex-shrink:0}
.dd-price-big{
  font-family:'Syne',sans-serif;font-weight:800;font-size:2.4rem;letter-spacing:-.03em;
  text-align:right;
}
.dd-price-big span{font-size:1rem;font-weight:400;color:var(--off)}

/* Tabs */
.dd-tabs{
  display:flex;border-bottom:1px solid var(--border);
  overflow-x:auto;scrollbar-width:none;
}
.dd-tabs::-webkit-scrollbar{display:none}
.dd-tab{
  flex-shrink:0;padding:14px 24px;font-size:.82rem;font-weight:500;cursor:pointer;
  border:none;background:none;color:var(--off);font-family:'DM Sans',sans-serif;
  border-bottom:2px solid transparent;transition:all .2s;white-space:nowrap;
}
.dd-tab.active{color:var(--tab-c,var(--green));border-bottom-color:var(--tab-c,var(--green))}
.dd-tab:hover:not(.active){color:var(--off2)}

/* Tab content */
.dd-content{padding:28px 36px 36px}

/* Specs tab */
.spec-sections{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.2rem}
.spec-section{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:18px 20px}
.spec-section h4{
  font-family:'Syne',sans-serif;font-size:.82rem;font-weight:700;
  margin-bottom:12px;display:flex;align-items:center;gap:8px;
}
.spec-section h4::before{content:'';width:3px;height:14px;background:var(--ss-c,var(--green));border-radius:2px}
.spec-list{list-style:none}
.spec-list li{
  font-size:.78rem;color:var(--off2);padding:6px 0;
  border-bottom:1px dashed var(--border);display:flex;align-items:flex-start;gap:8px;
}
.spec-list li:last-child{border-bottom:none}
.spec-list li::before{content:'→';color:var(--ss-c,var(--green));font-size:.72rem;flex-shrink:0;margin-top:1px}

/* In-box tab */
.inbox-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem}
.inbox-item{
  background:var(--card);border:1px solid var(--border);border-radius:10px;
  padding:16px;display:flex;align-items:flex-start;gap:10px;
}
.inbox-icon{font-size:1.3rem;flex-shrink:0}
.inbox-name{font-size:.82rem;font-weight:600;margin-bottom:2px}
.inbox-desc{font-size:.74rem;color:var(--off);line-height:1.5}

/* Use Cases tab */
.usecase-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem}
.usecase-card{
  background:var(--card);border:1px solid var(--border);border-radius:12px;
  padding:18px;position:relative;overflow:hidden;
}
.usecase-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--uc-c,var(--green)),transparent);
}
.usecase-num{
  font-family:'JetBrains Mono',monospace;font-size:.58rem;
  color:var(--uc-c,var(--green));margin-bottom:.4rem;letter-spacing:.08em;
}
.usecase-title{font-family:'Syne',sans-serif;font-size:.9rem;font-weight:700;margin-bottom:.4rem}
.usecase-desc{font-size:.78rem;color:var(--off);line-height:1.6}

/* Compare tab */
.compare-table{width:100%;border-collapse:collapse;font-size:.8rem}
.compare-table th{
  text-align:left;padding:12px 16px;
  font-family:'Syne',sans-serif;font-size:.75rem;font-weight:700;
  text-transform:uppercase;letter-spacing:.06em;
  border-bottom:1px solid var(--border);
}
.compare-table th:first-child{color:var(--off);font-size:.7rem;font-weight:500;text-transform:none;letter-spacing:0}
.compare-table td{
  padding:11px 16px;border-bottom:1px solid var(--border);
  vertical-align:middle;color:var(--off2);
}
.compare-table td:first-child{color:var(--off);font-size:.76rem}
.compare-table tr:last-child td{border-bottom:none}
.compare-table tr:hover td{background:rgba(255,255,255,0.02)}
.ct-yes{color:var(--green)!important;font-weight:600}
.ct-no{color:var(--off)!important}
.ct-partial{color:var(--gold)!important}
.ct-highlight{background:rgba(0,245,160,0.04)!important}

/* CTA inside drawer */
.dd-cta{
  border-top:1px solid var(--border);padding:22px 36px;
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:1rem;
}
.dd-cta-note{font-size:.8rem;color:var(--off)}
.dd-cta-note strong{color:var(--white)}
.dd-cta-btns{display:flex;gap:.7rem;flex-wrap:wrap}

/* ── COMPARISON SECTION ─────────────────────── */
.compare-section{
  padding:80px 5vw;background:var(--dark);
  border-top:1px solid var(--border);border-bottom:1px solid var(--border);
}
.sec-eyebrow{
  font-family:'JetBrains Mono',monospace;font-size:.67rem;
  color:var(--green);letter-spacing:.13em;text-transform:uppercase;
  margin-bottom:.8rem;display:flex;align-items:center;gap:8px;
}
.sec-eyebrow::before{content:'//';opacity:.35}
.sec-title{
  font-family:'Syne',sans-serif;font-weight:800;
  font-size:clamp(1.7rem,3.5vw,2.5rem);
  letter-spacing:-.025em;line-height:1.1;margin-bottom:.7rem;
}
.sec-sub{color:var(--off);font-size:.94rem;font-weight:300;max-width:460px;line-height:1.7;margin-bottom:2.8rem}

.full-compare-table{width:100%;border-collapse:separate;border-spacing:0}
.fct thead tr th{
  padding:14px 18px;font-family:'Syne',sans-serif;font-size:.78rem;
  font-weight:800;text-transform:uppercase;letter-spacing:.05em;
  border-bottom:2px solid var(--border2);text-align:center;
}
.fct thead tr th:first-child{text-align:left;color:var(--off);font-weight:500;font-size:.72rem;text-transform:none;letter-spacing:0}
.fct thead .th-lite{color:var(--orange)}
.fct thead .th-kit{color:var(--green)}
.fct thead .th-pro{color:var(--blue)}
.fct tbody tr:hover td{background:rgba(255,255,255,0.02)}
.fct tbody td{
  padding:12px 18px;border-bottom:1px solid var(--border);
  font-size:.8rem;color:var(--off2);text-align:center;vertical-align:middle;
}
.fct tbody td:first-child{text-align:left;color:var(--off);font-size:.76rem}
.fct-cat td{
  background:var(--card)!important;
  font-family:'Syne',sans-serif;font-size:.72rem;font-weight:700;
  text-transform:uppercase;letter-spacing:.07em;color:var(--off)!important;
  text-align:left!important;padding:10px 18px!important;
}
.fct-yes{color:var(--green)!important;font-size:1rem}
.fct-no{color:rgba(255,255,255,.15)!important;font-size:1rem}
.fct-val{color:var(--white)!important;font-weight:600}
.fct-best{
  color:var(--black)!important;font-weight:700;font-size:.7rem;
  background:var(--gold);padding:3px 8px;border-radius:4px;display:inline-block;
}
.price-row-fct td{
  font-family:'Syne',sans-serif!important;font-size:1.2rem!important;
  font-weight:800!important;padding:18px 18px!important;
}
.price-row-fct td:nth-child(2){color:var(--orange)!important}
.price-row-fct td:nth-child(3){color:var(--green)!important}
.price-row-fct td:nth-child(4){color:var(--blue)!important}

/* ── BOTTOM CTA ─────────────────────────── */
.pcta-section{
  padding:90px 5vw;text-align:center;
  background:var(--black);position:relative;overflow:hidden;
}
.pcta-section::before{
  content:'';position:absolute;top:50%;left:50%;
  transform:translate(-50%,-50%);width:600px;height:400px;
  background:radial-gradient(ellipse,rgba(0,245,160,0.06),transparent 65%);
  pointer-events:none;
}
.pcta-section h2{
  font-family:'Syne',sans-serif;font-weight:800;
  font-size:clamp(1.8rem,4vw,3rem);letter-spacing:-.025em;
  margin-bottom:.8rem;position:relative;
}
.pcta-section p{color:var(--off);font-size:.95rem;margin-bottom:2rem;position:relative}
.pcta-btns{display:flex;gap:.7rem;justify-content:center;flex-wrap:wrap;position:relative}

/* ── BUTTONS ─────────────────────────── */
.btn-g{
  background:var(--green);color:var(--black);font-weight:700;font-size:.88rem;
  padding:12px 26px;border-radius:8px;border:none;cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:all .22s;
  display:inline-flex;align-items:center;gap:7px;text-decoration:none;
}
.btn-g:hover{box-shadow:0 5px 22px rgba(0,245,160,0.3);transform:translateY(-1px)}
.btn-o{
  background:transparent;color:var(--white);font-weight:500;font-size:.88rem;
  padding:12px 26px;border-radius:8px;border:1px solid var(--border2);cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:all .22s;
  display:inline-flex;align-items:center;gap:7px;text-decoration:none;
}
.btn-o:hover{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.25)}
.btn-close-dd{
  background:none;border:1px solid var(--border);color:var(--off);
  padding:8px 16px;border-radius:6px;font-size:.75rem;cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:all .2s;
}
.btn-close-dd:hover{color:var(--white);border-color:var(--border2)}

/* ── ORDER MODAL ─────────────────────── */
.modal-overlay{
  position:fixed;inset:0;z-index:500;
  background:rgba(7,7,13,.9);backdrop-filter:blur(14px);
  display:flex;align-items:center;justify-content:center;
  padding:1.5rem;animation:mfade .2s ease;
}
@keyframes mfade{from{opacity:0}to{opacity:1}}
.modal{
  background:var(--card2);border:1px solid var(--border2);border-radius:20px;
  width:100%;max-width:540px;max-height:90vh;overflow-y:auto;
  animation:mscale .3s cubic-bezier(.34,1.56,.64,1);position:relative;
}
@keyframes mscale{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
.modal-close{
  position:absolute;top:14px;right:14px;
  background:rgba(255,255,255,.07);border:none;color:var(--off);
  width:30px;height:30px;border-radius:7px;font-size:.9rem;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all .2s;
}
.modal-close:hover{background:rgba(255,255,255,.13);color:var(--white)}
.modal-head{padding:28px 28px 20px;border-bottom:1px solid var(--border)}
.modal-head h3{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;margin-bottom:.3rem;letter-spacing:-.02em}
.modal-head p{font-size:.82rem;color:var(--off);line-height:1.6}
.modal-product-sel{
  display:flex;align-items:center;gap:10px;margin-top:1rem;
  background:var(--card);border:1px solid var(--border2);border-radius:10px;padding:12px 14px;
}
.mps-icon{font-size:1.6rem}
.mps-name{font-family:'Syne',sans-serif;font-size:.88rem;font-weight:700}
.mps-price{font-size:.75rem;color:var(--off);margin-top:2px}
.mps-price strong{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800}

.modal-body{padding:20px 28px 28px}
.form-row{margin-bottom:.9rem}
.form-row label{display:block;font-size:.74rem;font-weight:600;color:var(--off2);margin-bottom:5px;letter-spacing:.03em}
.form-row input,.form-row select,.form-row textarea{
  width:100%;background:var(--card);border:1px solid var(--border2);border-radius:8px;
  color:var(--white);font-family:'DM Sans',sans-serif;font-size:.86rem;
  padding:10px 13px;outline:none;transition:border-color .2s;-webkit-appearance:none;
}
.form-row input:focus,.form-row select:focus,.form-row textarea:focus{
  border-color:var(--green);box-shadow:0 0 0 3px rgba(0,245,160,0.07);
}
.form-row select option{background:var(--card2)}
.form-row textarea{resize:vertical;min-height:72px}
.form-2{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
@media(max-width:460px){.form-2{grid-template-columns:1fr}}
.qty-row{display:flex;align-items:center;gap:10px}
.qty-btn{
  width:34px;height:34px;background:var(--card);border:1px solid var(--border2);
  color:var(--white);border-radius:7px;font-size:1.1rem;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all .2s;flex-shrink:0;
}
.qty-btn:hover{border-color:var(--green);color:var(--green)}
.qty-val{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;
  width:36px;text-align:center}
.qty-total{font-size:.78rem;color:var(--off);margin-left:auto}
.qty-total strong{color:var(--green);font-family:'Syne',sans-serif;font-size:.95rem}

.form-submit{
  width:100%;background:var(--green);color:var(--black);
  font-weight:700;font-size:.93rem;padding:13px;border-radius:9px;
  border:none;cursor:pointer;font-family:'DM Sans',sans-serif;
  transition:all .24s;margin-top:.4rem;
  display:flex;align-items:center;justify-content:center;gap:7px;
}
.form-submit:hover{box-shadow:0 5px 22px rgba(0,245,160,0.28);transform:translateY(-1px)}
.form-submit:disabled{opacity:.6;cursor:not-allowed;transform:none}
.form-note{font-size:.7rem;color:var(--off);text-align:center;margin-top:.7rem}
.modal-success{padding:44px 28px;text-align:center}
.success-icon{font-size:2.8rem;margin-bottom:.8rem}
.modal-success h3{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:var(--green);margin-bottom:.5rem}
.modal-success p{color:var(--off);font-size:.85rem;line-height:1.7}

/* WhatsApp float */
.wa-float{
  position:fixed;bottom:24px;right:24px;width:50px;height:50px;border-radius:50%;
  background:#25D366;display:flex;align-items:center;justify-content:center;
  font-size:1.35rem;cursor:pointer;z-index:99;text-decoration:none;
  box-shadow:0 4px 18px rgba(37,211,102,.35);animation:wab 3s ease-in-out infinite;
}
@keyframes wab{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}

/* Footer */
.p-footer{
  border-top:1px solid var(--border);padding:22px 5vw;
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;
  font-size:.76rem;color:var(--off);
}

/* Responsive */
@media(max-width:768px){
  .dd-header{padding:22px 20px 18px}
  .dd-content{padding:20px}
  .dd-cta{padding:16px 20px}
  .compare-section{padding:52px 4vw}
}
`;

/* ─── PRODUCT DATA ──────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: "lite",
    tier: "TIER 01 · STARTER",
    name: "ARC LABS IoT Lite Kit",
    short: "IoT Lite Kit",
    tagline:
      "Compact, beginner-friendly IoT training board for Arduino & ESP32.",
    price: 15000,
    oldPrice: 18000,
    color: "#FF8C42",
    glow: "255,140,66",
    emoji: "🔌",
    image: "/images/products/lite-kit.jpg",
    badge: "BEGINNER",
    badgeBg: "rgba(255,140,66,0.15)",
    badgeColor: "#FF8C42",
    overview:
      "The ARC LABS IoT Lite Kit is a compact, budget-friendly training platform designed for beginners, students, and aspiring innovators entering the world of IoT and embedded systems. Dual microcontroller support (Arduino UNO + ESP32) with a curated sensor set and plug-and-play design.",
    controllers: [
      "Arduino UNO (ATmega328P)",
      "ESP32 (Dual-core Wi-Fi + Bluetooth)",
      "Dual MCU slots for flexible usage",
    ],
    sensors: [
      "DHT11 — Temperature & Humidity",
      "HC-SR04 — Ultrasonic Distance",
      "IR Obstacle Sensor — Digital proximity",
      "Touch Sensor — Capacitive input",
      "LDR — Light detection",
      "MQ Gas Sensor — Gas leakage",
      "Potentiometer — Analog ADC testing",
    ],
    display: [
      "0.96″ OLED Display (I2C)",
      "RGB LED Indicators",
      "Active Buzzer Output",
    ],
    actuators: ["Dual Relay Modules (AC/DC control)", "Tactile Push Buttons"],
    connectivity: [
      "Onboard 5V/3.3V regulated rails",
      "Screw terminals for relay",
      "UART, SPI, I2C, GPIO breakout headers",
    ],
    includes: [
      {
        icon: "🔧",
        name: "Assembled Lite Kit Board",
        desc: "Fully built, ready-to-use",
      },
      { icon: "💻", name: "Sample Codes", desc: "Arduino & ESP32 examples" },
      { icon: "📖", name: "Sensor Datasheets", desc: "All onboard sensors" },
      {
        icon: "📋",
        name: "Basic User Manual",
        desc: "Setup and getting started",
      },
      { icon: "🎧", name: "Technical Support", desc: "ARC LABS expert team" },
    ],
    useCases: [
      {
        title: "Academic IoT Lab",
        desc: "Perfect for school and college IoT labs — students can start without any prior electronics experience.",
      },
      {
        title: "Embedded Systems Basics",
        desc: "Learn GPIO, sensors, actuators, and communication protocols from scratch.",
      },
      {
        title: "DIY & Hobby Projects",
        desc: "Build smart home prototypes, weather stations, and automation controllers.",
      },
      {
        title: "Early Prototyping",
        desc: "Rapid proof-of-concept for IoT product ideas — from idea to working demo in hours.",
      },
    ],
    for: [
      "School Students (Class 9–12)",
      "Engineering Year 1",
      "Beginners & Hobbyists",
      "Academic Labs",
    ],
  },
  {
    id: "experience",
    tier: "TIER 02 · FLAGSHIP",
    name: "ARC LABS IoT Experience Kit",
    short: "IoT Experience Kit",
    tagline:
      "All-in-one multi-MCU trainer — the most versatile kit in the lineup.",
    price: 12000,
    oldPrice: 15000,
    color: "#00F5A0",
    glow: "0,245,160",
    emoji: "⚡",
    image: "/images/products/experience-kit.jpg",
    badge: "BEST SELLER",
    badgeBg: "rgba(0,245,160,0.12)",
    badgeColor: "#00F5A0",
    isBest: true,
    overview:
      "The ARC LABS IoT Experience Kit is a comprehensive, all-in-one embedded systems trainer designed to bridge the gap between theoretical knowledge and hands-on practice. Supporting 5 microcontrollers — Arduino, ESP32, STM32, Raspberry Pi Pico, and Raspberry Pi 4/5 — with LoRa, GSM/4G, RS485, and full sensor coverage.",
    controllers: [
      "Arduino UNO (ATmega328P) — Beginner dev",
      "ESP32 DevKit — Dual-core Wi-Fi + BT",
      "STM32 DevKit — ARM Cortex-M industrial",
      "Raspberry Pi Pico/W — RP2040 + Wi-Fi",
      "Raspberry Pi 4/5 Header — 40-pin GPIO",
    ],
    sensors: [
      "BMP180 — Barometric pressure & temp",
      "DHT11 — Temperature & Humidity",
      "Ultrasonic HC-SR04 — Distance",
      "IR Obstacle Detection",
      "INA219 — Current & Voltage monitoring",
      "Potentiometer — Analog ADC input",
    ],
    display: [
      "1.8″ TFT Color Display (SPI)",
      "RGB LED — Full color",
      "Active Buzzer",
      "4× DP Switches with onboard LEDs",
    ],
    actuators: [
      "Dual Relay Module (RELAY1 & RELAY2)",
      "Servo Motor Port",
      "Digital Output Headers",
    ],
    connectivity: [
      "LoRa Module Interface — Long range",
      "GSM/4G Module (SIMCOM) — SIM slot",
      "RS485 — Industrial serial",
      "I2C & UART Headers",
      "USB-Powered",
      "GPIO Breakout Headers",
    ],
    includes: [
      {
        icon: "🔧",
        name: "Pre-assembled Training Board",
        desc: "Ready to use — plug in and start",
      },
      {
        icon: "⚡",
        name: "Optional Power Supply",
        desc: "External 5V supply supported",
      },
      {
        icon: "💻",
        name: "Sample Codes & Manuals",
        desc: "All 5 controller platforms covered",
      },
      {
        icon: "☁️",
        name: "Cloud Platform Access",
        desc: "Arc Lab Cloud, Blynk, MQTT ready",
      },
      {
        icon: "🎧",
        name: "Expert Technical Support",
        desc: "ARC LABS certified team",
      },
    ],
    useCases: [
      {
        title: "Wireless Sensor Networks",
        desc: "Use LoRa and GSM to build long-range IoT sensor networks for agriculture, smart cities, or industry.",
      },
      {
        title: "Embedded Systems R&D",
        desc: "Experiment with 5 different MCU platforms — compare performance, power, and code on real hardware.",
      },
      {
        title: "Cloud IoT Integration",
        desc: "Connect to Arc Lab Cloud, Blynk, or custom MQTT servers and build live dashboards.",
      },
      {
        title: "Industrial Monitoring",
        desc: "Use RS485, current sensing, and relay control to simulate industrial automation scenarios.",
      },
      {
        title: "Smart Home Systems",
        desc: "Build complete smart home automation with sensors, relays, cloud alerts, and remote control.",
      },
      {
        title: "AIoT Projects",
        desc: "Combine sensor data with edge AI on Raspberry Pi — build intelligent IoT systems.",
      },
    ],
    for: [
      "Engineering Year 1–3",
      "IoT Professionals",
      "R&D Labs",
      "Academic Institutions",
      "Training Programs",
    ],
  },
  {
    id: "pro",
    tier: "TIER 03 · ADVANCED",
    name: "ARC LABS IoT Pro Kit",
    short: "IoT Pro Kit",
    tagline:
      "High-performance development board for advanced IoT, edge AI, and Raspberry Pi.",
    price: 25000,
    oldPrice: 28000,
    color: "#00BFFF",
    glow: "0,191,255",
    emoji: "🚀",
    image: "/images/products/pro-kit.jpg",
    badge: "ADVANCED",
    badgeBg: "rgba(0,191,255,0.12)",
    badgeColor: "#00BFFF",
    overview:
      "The ARC LABS IoT Pro Kit is a high-performance development and prototyping board designed for advanced learners, researchers, and developers. Dual-controller support for Raspberry Pi 4 and ESP32 with shared I/O zones — ideal for edge computing, AIoT, sensor fusion, and complex data acquisition projects.",
    controllers: [
      "Raspberry Pi 4 — 40-pin GPIO interface",
      "ESP32 DevKit — Wi-Fi + Bluetooth",
      "Shared I/O zones for hybrid Pi + ESP32 experiments",
    ],
    sensors: [
      "BMP180 — Barometric Pressure & Temp",
      "DHT11 — Temperature & Humidity",
      "HC-SR04 — Ultrasonic Distance",
      "MQ-135 — Gas & Air Quality",
      "ADXL345 — 3-Axis Accelerometer",
      "Touch Sensor — Capacitive",
      "IR Obstacle Detection",
      "LDR — Light Dependent Resistor",
      "Potentiometer — ADC testing",
    ],
    display: [
      "1.8″ SPI TFT Color Display",
      "RGB LED Output",
      "1-Digit 7-Segment Display",
      "3× Push Buttons",
      "Onboard 3.3V & 5V Power Indicators",
    ],
    actuators: ["Dual Relay Module", "Active Buzzer", "GPIO Breakout Headers"],
    connectivity: [
      "Isolated 3.3V and 5V power rails",
      "MCP3008 ADC — analog sensor inputs",
      "GPIO expansion for Pi + ESP32",
      "USB / Power connectivity",
    ],
    includes: [
      {
        icon: "🔧",
        name: "Assembled IoT Pro Kit Board",
        desc: "Fully built and tested",
      },
      {
        icon: "🎀",
        name: "Ribbon Cable for Raspberry Pi",
        desc: "40-pin GPIO ribbon included",
      },
      {
        icon: "💻",
        name: "Sample Codes & Tutorials",
        desc: "Python (Pi) + Arduino (ESP32)",
      },
      {
        icon: "📚",
        name: "Full Documentation",
        desc: "Online tutorials + schematic",
      },
      {
        icon: "🎧",
        name: "Arc Lab Technical Support",
        desc: "Priority support access",
      },
    ],
    useCases: [
      {
        title: "Edge Computing & AIoT",
        desc: "Run TensorFlow Lite models on Raspberry Pi while ESP32 handles real-time sensor acquisition.",
      },
      {
        title: "Environmental Monitoring",
        desc: "Multi-sensor data logging with gas, temperature, pressure, light, and motion — cloud-connected.",
      },
      {
        title: "Wireless Data Logging",
        desc: "ESP32 Wi-Fi + Raspberry Pi Linux stack for enterprise-grade wireless sensor deployments.",
      },
      {
        title: "Industrial Training",
        desc: "Simulate real industrial sensor systems — accelerometer, gas, relay control, and current sensing.",
      },
      {
        title: "Research Projects",
        desc: "Ideal for dissertation, publication, and advanced research in embedded systems and IoT.",
      },
      {
        title: "Product Development",
        desc: "Use as a rapid-development platform to validate IoT product concepts before PCB design.",
      },
    ],
    for: [
      "Engineering Year 3–4",
      "Postgraduate Students",
      "Researchers & R&D Teams",
      "IoT Professionals",
      "Product Developers",
    ],
  },
];

/* ─── COMPARISON DATA ──────────────────────────────────────────── */
const COMPARE_ROWS = [
  { cat: true, label: "Controllers" },
  { label: "Arduino UNO", lite: "✓", exp: "✓", pro: "—" },
  { label: "ESP32", lite: "✓", exp: "✓", pro: "✓" },
  { label: "STM32", lite: "—", exp: "✓", pro: "—" },
  { label: "Raspberry Pi Pico/W", lite: "—", exp: "✓", pro: "—" },
  { label: "Raspberry Pi 4/5", lite: "—", exp: "✓", pro: "✓" },
  { cat: true, label: "Sensors" },
  { label: "DHT11 Temp & Humidity", lite: "✓", exp: "✓", pro: "✓" },
  { label: "Ultrasonic HC-SR04", lite: "✓", exp: "✓", pro: "✓" },
  { label: "BMP180 Barometric", lite: "—", exp: "✓", pro: "✓" },
  { label: "INA219 Current/Voltage", lite: "—", exp: "✓", pro: "—" },
  { label: "MQ-135 Gas & Air Quality", lite: "✓", exp: "—", pro: "✓" },
  { label: "ADXL345 Accelerometer", lite: "—", exp: "—", pro: "✓" },
  { label: "LDR Light Sensor", lite: "✓", exp: "—", pro: "✓" },
  { label: "Touch Sensor", lite: "✓", exp: "—", pro: "✓" },
  { label: "IR Obstacle Sensor", lite: "✓", exp: "✓", pro: "✓" },
  { cat: true, label: "Display & Output" },
  { label: "OLED 0.96″ (I2C)", lite: "✓", exp: "—", pro: "—" },
  { label: "TFT 1.8″ Color (SPI)", lite: "—", exp: "✓", pro: "✓" },
  { label: "7-Segment Display", lite: "—", exp: "—", pro: "✓" },
  { label: "RGB LEDs", lite: "✓", exp: "✓", pro: "✓" },
  { label: "Active Buzzer", lite: "✓", exp: "✓", pro: "✓" },
  { cat: true, label: "Connectivity" },
  { label: "Wi-Fi + Bluetooth (ESP32)", lite: "✓", exp: "✓", pro: "✓" },
  { label: "LoRa Interface", lite: "—", exp: "✓", pro: "—" },
  { label: "GSM/4G (SIMCOM)", lite: "—", exp: "✓", pro: "—" },
  { label: "RS485 Industrial", lite: "—", exp: "✓", pro: "—" },
  { label: "MCP3008 ADC Expansion", lite: "—", exp: "—", pro: "✓" },
  { cat: true, label: "Pricing" },
  {
    label: "Price (incl. GST)",
    lite: "₹12,000",
    exp: "₹10,000",
    pro: "₹20,000",
    priceRow: true,
  },
  { label: "Best For", lite: "Beginners", exp: "All levels", pro: "Advanced" },
];

/* ─── ORDER MODAL ──────────────────────────────────────────────── */
function OrderModal({ product, onClose }) {
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    org: "",
    city: "",
    type: "",
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
  const total = (product.price * qty).toLocaleString("en-IN");

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {done ? (
          <div className="modal-success">
            <div className="success-icon">🎉</div>
            <h3>Order Enquiry Received!</h3>
            <p>
              Thank you! Our team will contact you within{" "}
              <strong style={{ color: "#fff" }}>24 hours</strong> to confirm
              your order for the{" "}
              <strong style={{ color: "#fff" }}>{product.short}</strong> (×{qty}
              ).
              <br />
              <br />
              For faster processing, WhatsApp us:
              <br />
              <strong style={{ color: "#25D366" }}>+91 8699929532</strong>
            </p>
          </div>
        ) : (
          <>
            <div className="modal-head">
              <h3>Place Order Enquiry</h3>
              <p>
                Submit your details and we'll confirm stock, dispatch timeline,
                and invoice within 24 hrs.
              </p>
              <div className="modal-product-sel">
                <span className="mps-icon">{product.emoji}</span>
                <div>
                  <div className="mps-name">{product.short}</div>
                  <div className="mps-price">
                    <strong style={{ color: product.color }}>
                      ₹{product.price.toLocaleString("en-IN")}
                    </strong>{" "}
                    per unit · IobiT by ARC LABS
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <form onSubmit={submit}>
                <div className="form-row">
                  <label>Quantity</label>
                  <div className="qty-row">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      −
                    </button>
                    <span className="qty-val">{qty}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setQty((q) => q + 1)}
                    >
                      +
                    </button>
                    <span className="qty-total">
                      Total: <strong>₹{total}</strong>
                    </span>
                  </div>
                </div>
                <div className="form-2">
                  <div className="form-row">
                    <label>Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={h}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-row">
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
                <div className="form-row">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={h}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="form-2">
                  <div className="form-row">
                    <label>Buyer Type</label>
                    <select name="type" value={form.type} onChange={h}>
                      <option value="">Select</option>
                      <option>Individual / Student</option>
                      <option>School / College</option>
                      <option>Corporate / R&D Lab</option>
                      <option>Government Institution</option>
                      <option>CSR / NGO</option>
                      <option>Reseller / Distributor</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>City</label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={h}
                      placeholder="Your city"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <label>Institution / Organization</label>
                  <input
                    name="org"
                    value={form.org}
                    onChange={h}
                    placeholder="School, college, company name"
                  />
                </div>
                <div className="form-row">
                  <label>Additional Notes</label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={h}
                    placeholder="Bulk order discount enquiry, specific delivery requirements, GST invoice needed..."
                  />
                </div>
                <button
                  type="submit"
                  className="form-submit"
                  style={{ background: product.color }}
                  disabled={loading}
                >
                  {loading
                    ? "Placing Enquiry..."
                    : `🛒 Enquire for ${qty > 1 ? `${qty} units · ₹${total}` : `₹${total}`}`}
                </button>
                <p className="form-note">
                  Bulk orders (5+ units) qualify for institutional pricing.
                  We'll confirm via WhatsApp or email.
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── DETAIL DRAWER ──────────────────────────────────────────────── */
function DetailDrawer({ product, onClose, onOrder }) {
  const [tab, setTab] = useState("specs");
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(
      () => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80,
    );
  }, []);

  const TABS = [
    { id: "specs", label: "📐 Specifications" },
    { id: "inbox", label: "📦 What's Included" },
    { id: "usecases", label: "🎯 Use Cases" },
    { id: "compare", label: "⚖️ Compare All Kits" },
  ];

  return (
    <div className="detail-drawer" ref={ref}>
      {/* Header */}
      <div className="dd-header">
        <div className="dd-hl">
          <div className="dd-eyebrow" style={{ color: product.color }}>
            {product.tier}
          </div>
          <h2>{product.name}</h2>
          <p>{product.overview}</p>
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              marginTop: "1rem",
            }}
          >
            {product.for.map((f) => (
              <span
                key={f}
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: ".62rem",
                  padding: "3px 9px",
                  borderRadius: "4px",
                  background: product.badgeBg,
                  color: product.color,
                  border: `1px solid ${product.color}40`,
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="dd-hr">
          <div className="dd-price-big" style={{ color: product.color }}>
            ₹{product.price.toLocaleString("en-IN")} <span>/ unit</span>
          </div>
          <div
            style={{
              textDecoration: "line-through",
              fontSize: ".8rem",
              color: "var(--off)",
              textAlign: "right",
            }}
          >
            MRP ₹{product.oldPrice.toLocaleString("en-IN")}
          </div>
          <button className="btn-close-dd" onClick={onClose}>
            ✕ Close
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="dd-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`dd-tab${tab === t.id ? " active" : ""}`}
            style={{ "--tab-c": product.color }}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="dd-content">
        {tab === "specs" && (
          <div className="spec-sections">
            {[
              { title: "Controllers / MCUs", items: product.controllers },
              { title: "Sensors", items: product.sensors },
              { title: "Display & Output", items: product.display },
              { title: "Actuators", items: product.actuators },
              { title: "Connectivity & Power", items: product.connectivity },
            ].map((sec) => (
              <div
                className="spec-section"
                key={sec.title}
                style={{ "--ss-c": product.color }}
              >
                <h4>{sec.title}</h4>
                <ul className="spec-list">
                  {sec.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === "inbox" && (
          <div className="inbox-grid">
            {product.includes.map((item) => (
              <div className="inbox-item" key={item.name}>
                <span className="inbox-icon">{item.icon}</span>
                <div>
                  <div className="inbox-name">{item.name}</div>
                  <div className="inbox-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "usecases" && (
          <div className="usecase-grid">
            {product.useCases.map((uc, i) => (
              <div
                className="usecase-card"
                key={uc.title}
                style={{ "--uc-c": product.color }}
              >
                <div className="usecase-num">
                  USE CASE {String(i + 1).padStart(2, "0")}
                </div>
                <div className="usecase-title">{uc.title}</div>
                <div className="usecase-desc">{uc.desc}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "compare" && (
          <div style={{ overflowX: "auto" }}>
            <table className="full-compare-table fct">
              <thead>
                <tr>
                  <th style={{ minWidth: "200px" }}> </th>
                  <th className="th-lite">
                    IoT Lite Kit
                    <br />
                    <span
                      style={{
                        fontSize: ".65rem",
                        fontWeight: 400,
                        color: "var(--off)",
                      }}
                    >
                      Beginner
                    </span>
                  </th>
                  <th className="th-kit">
                    IoT Experience Kit
                    <br />
                    <span
                      style={{
                        fontSize: ".65rem",
                        fontWeight: 400,
                        color: "var(--off)",
                      }}
                    >
                      Flagship ★
                    </span>
                  </th>
                  <th className="th-pro">
                    IoT Pro Kit
                    <br />
                    <span
                      style={{
                        fontSize: ".65rem",
                        fontWeight: 400,
                        color: "var(--off)",
                      }}
                    >
                      Advanced
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => {
                  if (row.cat)
                    return (
                      <tr className="fct-cat" key={i}>
                        <td colSpan={4}>{row.label}</td>
                      </tr>
                    );
                  const cellClass = (v) => {
                    if (v === "✓") return "fct-yes";
                    if (v === "—") return "fct-no";
                    if (row.priceRow) return "fct-val";
                    return "";
                  };
                  return (
                    <tr key={i} className={row.priceRow ? "price-row-fct" : ""}>
                      <td>{row.label}</td>
                      <td className={cellClass(row.lite)}>{row.lite}</td>
                      <td
                        className={cellClass(row.exp)}
                        style={row.exp !== "—" && row.exp !== "✓" ? {} : {}}
                      >
                        {row.exp}
                        {row.label === "Best For" && (
                          <span
                            className="fct-best"
                            style={{ marginLeft: "6px" }}
                          >
                            ★ BEST
                          </span>
                        )}
                      </td>
                      <td className={cellClass(row.pro)}>{row.pro}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="dd-cta">
        <div className="dd-cta-note">
          <strong>{product.short}</strong> · ₹
          {product.price.toLocaleString("en-IN")} · Made in India · IobiT by ARC
          LABS
        </div>
        <div className="dd-cta-btns">
          <a
            href="https://wa.me/918699929532"
            className="btn-o"
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp
          </a>
          <button
            className="btn-g"
            style={{ background: product.color }}
            onClick={() => onOrder(product)}
          >
            🛒 Order This Kit →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT CARD ───────────────────────────────────────────────── */
function ProductCard({ product, isSelected, onSelect, onOrder }) {
  return (
    <div
      className={`pcard${isSelected ? " selected" : ""}`}
      style={{ "--pc-color": product.color, "--pc-glow": product.glow }}
    >
      {/* Visual */}
      <div className="pc-visual">
        <div className="pc-badge-wrap">
          <span
            className="pc-badge"
            style={{ background: product.badgeBg, color: product.badgeColor }}
          >
            {product.badge}
          </span>
        </div>
        {product.isBest && <span className="pc-best">★ BEST SELLER</span>}
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "relative",
              zIndex: 1,
              filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))"
            }}
          />
        ) : (
          <span className="pc-emoji">{product.emoji}</span>
        )}
        <div className="pc-circuit" />
      </div>

      {/* Body */}
      <div className="pc-body">
        <div className="pc-tier" style={{ color: product.color }}>
          {product.tier}
        </div>
        <div className="pc-name">{product.name}</div>
        <div className="pc-tagline">{product.tagline}</div>
        <div className="pc-chips">
          {product.controllers.slice(0, 3).map((c) => (
            <span className="pc-chip" key={c}>
              {c.split("—")[0].split("(")[0].trim()}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="pc-price-row">
          <div>
            <div className="pc-price" style={{ color: product.color }}>
              ₹{product.price.toLocaleString("en-IN")} <span>/ unit</span>
            </div>
            <div className="pc-old-price">
              MRP ₹{product.oldPrice.toLocaleString("en-IN")}
            </div>
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: ".62rem",
              color: product.color,
              background: product.badgeBg,
              padding: "4px 10px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            SAVE
            <br />₹{(product.oldPrice - product.price).toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pc-footer">
        <button className="pc-btn-detail" onClick={() => onSelect(product.id)}>
          {isSelected ? "▲ Hide Details" : "📐 Full Specs"}
        </button>
        <button
          className="pc-btn-buy"
          style={{ background: product.color }}
          onClick={() => onOrder(product)}
        >
          🛒 Order Now
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────── */
export default function ProductsPage() {
  const [selected, setSelected] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleSelect = (id) => setSelected((prev) => (prev === id ? null : id));

  const filtered =
    filter === "all"
      ? PRODUCTS
      : filter === "beginner"
        ? PRODUCTS.filter((p) => p.id === "lite")
        : filter === "flagship"
          ? PRODUCTS.filter((p) => p.id === "experience")
          : PRODUCTS.filter((p) => p.id === "pro");

  const selectedProduct = PRODUCTS.find((p) => p.id === selected);

  const FILTERS = [
    { id: "all", label: "🔍 All Kits" },
    { id: "beginner", label: "🔌 Beginner" },
    { id: "flagship", label: "⚡ Flagship" },
    { id: "advanced", label: "🚀 Advanced" },
  ];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="pnav">
        <a href="/" className="pnav-logo">
          <span className="ndot" />
          ARC LABS
        </a>
        <div className="pnav-right">
          <a href="/" className="pnav-back">
            ← Back to Home
          </a>
          <a href="/programs" className="pnav-back">
            Programs
          </a>
          {/* <a href="/products" className="pnav-back">
            Products
          </a> */}
          <a href="/lab-packages" className="pnav-back">
            Lab Packages
          </a>
          <a href="/csr-partners" className="pnav-back">
            CSR Partners
          </a>
          <button
            className="pnav-cart-btn"
            onClick={() => setOrderProduct(PRODUCTS[1])}
          >
            🛒 Order a Kit
            <span className="cart-count">3</span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="ph-hero">
        <div className="ph-eyebrow">
          <span className="ph-edot" />
          IobiT Hardware — by ARC LABS · Made in India
        </div>
        <h1>
          Built for Real
          <br />
          <em>Hands-On Learning.</em>
        </h1>
        <p>
          Three development boards. Every major microcontroller. Every sensor
          you need. Designed in Hyderabad for Indian classrooms and labs.
        </p>
      </div>

      {/* FILTER */}
      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`filter-btn${filter === f.id ? " active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID + INLINE DRAWER */}
      <div className="products-wrap">
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selected === product.id}
              onSelect={handleSelect}
              onOrder={setOrderProduct}
            />
          ))}
        </div>

        {/* Drawer renders below grid when a product is selected */}
        {selected && selectedProduct && (
          <DetailDrawer
            key={selected}
            product={selectedProduct}
            onClose={() => setSelected(null)}
            onOrder={setOrderProduct}
          />
        )}
      </div>

      {/* FULL COMPARISON SECTION */}
      <div className="compare-section">
        <div className="sec-eyebrow">Side-by-Side Comparison</div>
        <h2 className="sec-title">Which kit is right for you?</h2>
        <p className="sec-sub">
          Compare all three kits across controllers, sensors, connectivity, and
          price — in one table.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table className="full-compare-table fct">
            <thead>
              <tr>
                <th style={{ minWidth: "210px" }}>Feature</th>
                <th className="th-lite">
                  IoT Lite Kit
                  <br />
                  <span
                    style={{
                      fontSize: ".65rem",
                      fontWeight: 400,
                      color: "var(--off)",
                    }}
                  >
                    ₹15,000
                  </span>
                </th>
                <th className="th-kit">
                  IoT Experience Kit
                  <br />
                  <span
                    style={{
                      fontSize: ".65rem",
                      fontWeight: 400,
                      color: "var(--off)",
                    }}
                  >
                    ₹12,000 ★
                  </span>
                </th>
                <th className="th-pro">
                  IoT Pro Kit
                  <br />
                  <span
                    style={{
                      fontSize: ".65rem",
                      fontWeight: 400,
                      color: "var(--off)",
                    }}
                  >
                    ₹25,000
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => {
                if (row.cat)
                  return (
                    <tr className="fct-cat" key={i}>
                      <td colSpan={4}>{row.label}</td>
                    </tr>
                  );
                const cell = (v) => {
                  if (v === "✓") return <span className="fct-yes">✓</span>;
                  if (v === "—") return <span className="fct-no">—</span>;
                  return <span className="fct-val">{v}</span>;
                };
                return (
                  <tr key={i} className={row.priceRow ? "price-row-fct" : ""}>
                    <td>{row.label}</td>
                    <td>{cell(row.lite)}</td>
                    <td>
                      {cell(row.exp)}
                      {row.label === "Best For" && (
                        <span
                          className="fct-best"
                          style={{ marginLeft: "6px" }}
                        >
                          ★
                        </span>
                      )}
                    </td>
                    <td>{cell(row.pro)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="pcta-section">
        <h2>
          Need help choosing
          <br />
          the{" "}
          <em style={{ fontStyle: "normal", color: "var(--green)" }}>
            right kit?
          </em>
        </h2>
        <p>
          Talk to our team. We'll recommend the right board for your lab,
          budget, and curriculum.
        </p>
        <div className="pcta-btns">
          <a href="tel:+918699929532" className="btn-g">
            📞 Call Us
          </a>
          <a
            href="https://wa.me/918699929532"
            className="btn-o"
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp
          </a>
          <a href="mailto:hello@arclabs.in" className="btn-o">
            ✉ Email Us
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-footer">
        <span>
          © 2025 ARC LABS · IobiT Hardware · Made in India · MSME Registered,
          Hyderabad
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

      {/* Order Modal */}
      {orderProduct && (
        <OrderModal
          product={orderProduct}
          onClose={() => setOrderProduct(null)}
        />
      )}
    </>
  );
}
