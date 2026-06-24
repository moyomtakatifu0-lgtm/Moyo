/* =========================================================
PROJECT : MOYO APP
MODULE  : LITURGICAL THEME ENGINE (FULL AUTO SWITCHER)
RESPONSIBILITY:
- Auto theme switching by liturgical calendar
- Global theme persistence
- Offline-safe storage
========================================================= */

/* ================= SEASON DETECTION ================= */
export function getLiturgicalSeason(date = new Date()) {

  const month = date.getMonth() + 1;
  const day = date.getDate();

  // ADVENT
  if (month === 12 && day <= 24) return "advent";

  // CHRISTMAS
  if ((month === 12 && day >= 25) || (month === 1 && day <= 6)) {
    return "christmas";
  }

  // LENT (simplified)
  if (month === 2 || month === 3) return "lent";

  // EASTER (simplified)
  if (month === 4) return "easter";

  return "ordinary";
}

/* ================= APPLY THEME ================= */
export function applyTheme(season = null) {

  const theme = season || getLiturgicalSeason();

  document.body.setAttribute("data-theme", theme);

  localStorage.setItem("liturgical_theme", theme);

  return theme;
}

/* ================= INIT ENGINE (AUTO SWITCH) ================= */
export function initThemeEngine() {

  // 1. LOAD SAVED THEME
  let saved = localStorage.getItem("liturgical_theme");

  // 2. ALWAYS RE-EVALUATE CALENDAR (AUTO SWITCH LOGIC)
  const currentSeason = getLiturgicalSeason();

  // 3. IF DIFFERENT → UPDATE (AUTO SWITCH)
  if (saved !== currentSeason) {
    applyTheme(currentSeason);
  } else {
    applyTheme(saved || currentSeason);
  }

  // 4. SAFETY: RECHECK DAILY (OPTIONAL REFRESH TRIGGER)
  scheduleDailyThemeCheck();
}

/* ================= DAILY AUTO REFRESH ================= */
function scheduleDailyThemeCheck() {

  const now = new Date();
  const nextMidnight = new Date();
  nextMidnight.setHours(24,0,0,0);

  const timeout = nextMidnight.getTime() - now.getTime();

  setTimeout(() => {

    const newSeason = getLiturgicalSeason();
    applyTheme(newSeason);

    scheduleDailyThemeCheck();

  }, timeout);
}