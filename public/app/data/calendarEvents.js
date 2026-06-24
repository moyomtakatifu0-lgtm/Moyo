/* =========================================================
PROJECT : MOYO APP
MODULE  : CALENDAR EVENTS (ANNUAL FIXED DATA)
VERSION : 1.0
DESCRIPTION : Kijimbo yearly recurring calendar events
========================================================= */

/**
 * 📅 EVENTS DATA
 * month: 1–12 (Jan = 1, Dec = 12)
 * day: day of month
 * type: feast | meeting | announcement
 */

export const calendarEvents = [

  // ================= JUNE =================
  {
    month: 6,
    day: 19,
    type: "feast",
    title: "Sikukuu ya Moyo Mtakatifu wa Yesu"
  },
  {
    month: 6,
    day: 25,
    type: "meeting",
    title: "Mkutano wa Vijana wa Kijimbo"
  },

  // ================= JULY =================
  {
    month: 7,
    day: 7,
    type: "meeting",
    title: "Semina ya Waamini wa Kijimbo"
  },

  // ================= OCTOBER =================
  {
    month: 10,
    day: 1,
    type: "feast",
    title: "Mwezi wa Rozari unaanza"
  },

  // ================= NOVEMBER =================
  {
    month: 11,
    day: 1,
    type: "feast",
    title: "Sikukuu ya Watakatifu Wote"
  }

];

/**
 * 🎯 ICON SYSTEM
 * Used in calendar UI + future notifications
 */

export function getEventIcon(type) {
  switch (type) {

    case "feast":
      return "❤️";

    case "meeting":
      return "👥";

    case "announcement":
      return "📢";

    default:
      return "📌";
  }
}

/**
 * 🎨 OPTIONAL: TYPE LABELS (future use)
 */

export function getEventLabel(type) {
  switch (type) {

    case "feast":
      return "Tukio Kuu";

    case "meeting":
      return "Mkutano";

    case "announcement":
      return "Tangazo";

    default:
      return "Tukio";
  }
}