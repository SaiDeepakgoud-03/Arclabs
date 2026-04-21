import {
  TECHNOLOGIES,
  SKILLS_MAP,
  PIN_MAP,
  GRADE,
  PERFORMANCE_GRADES,
} from "../data/certificationConstants.js";

/* ═══════════════════════════════════════ HELPERS ═══════════════════════════════════════ */
export function genCertId() {
  return (
    "ARC" +
    Math.random().toString(36).substring(2, 6).toUpperCase() +
    Math.random().toString(36).substring(2, 4).toUpperCase()
  );
}

export function lookupPin(pin) {
  const p = parseInt(pin.substring(0, 3));
  return PIN_MAP[p] || null;
}

export function fmtDate(d) {
  if (!d) return "—";
  const [y, m, dy] = d.split("-");
  const date = new Date(y, m - 1, dy);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getSkills(tech, days) {
  const base = SKILLS_MAP[tech] || [];
  return days >= 5 ? base : base.slice(0, days + 2);
}

export function getTechObj(id) {
  return TECHNOLOGIES.find((t) => t.id === id) || TECHNOLOGIES[0];
}

export function getDurLabel(days) {
  if (days === 2) return "2-Day Workshop";
  if (days === 3) return "3-Day Intensive";
  if (days === 5) return "5-Day Bootcamp";
  return `${days}-Day Program`;
}

export function getHours(days) {
  if (days === 2) return "14 hrs";
  if (days === 3) return "21 hrs";
  if (days === 5) return "35 hrs";
  return `${days * 7} hrs`;
}

/**
 * Fetch city & state from India Post API, fallback to local map
 */
export async function fetchPincode(pin) {
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data = await res.json();
    if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
      const po = data[0].PostOffice[0];
      return { city: po.District || po.Block || po.Name, state: po.State };
    }
  } catch (_) {
    /* fallback */
  }
  // Fallback to local map
  const p = parseInt(pin.substring(0, 3));
  const entry = PIN_MAP[p];
  return entry ? { city: entry.c, state: entry.s } : null;
}

/**
 * Get grade from performance rating
 */
export function getGrade(performance) {
  return PERFORMANCE_GRADES[performance] || "B";
}

/**
 * Copy text to clipboard, returns true on success
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    return false;
  }
}

/* ═══════════════════════════════════════ FUNCTION ALIASES (RegisterPanel compatibility) ═══════════════════════════════════════ */
export const generateCertId = genCertId;
export const localPincodeLookup = lookupPin;
export const getSkillsForCert = getSkills;
export const formatDate = fmtDate;
export const getTech = getTechObj;
export const getDurationLabel = getDurLabel;
export const getTrainingHours = getHours;
