// ======================================================
// MODULE: Calendar Import Parser
// RESPONSIBILITY:
// - Read DOCX file
// - Extract date + title
// - Return structured events
// ======================================================

import * as mammoth from "https://unpkg.com/mammoth/mammoth.browser.min.js";

/**
 * Expected format inside DOCX:
 * 15/07/2026 - Mkutano wa MMY
 * 20/07/2026 - Semina ya Walei
 */

export async function importCalendarData(file) {

  const arrayBuffer = await file.arrayBuffer();

  const result = await mammoth.extractRawText({ arrayBuffer });

  const text = result.value;

  const lines = text.split("\n");

  const events = [];

  for (let line of lines) {

    line = line.trim();

    if (!line.includes("-")) continue;

    const parts = line.split("-");

    if (parts.length < 2) continue;

    let dateRaw = parts[0].trim();
    let title = parts.slice(1).join("-").trim();

    const date = normalizeDate(dateRaw);

    if (date && title) {
      events.push({
        date,
        title
      });
    }
  }

  return events;
}

/* DATE NORMALIZER */
function normalizeDate(input) {

  // supports 15/07/2026 or 15-07-2026
  const cleaned = input.replace(/-/g, "/");

  const parts = cleaned.split("/");

  if (parts.length !== 3) return null;

  const [day, month, year] = parts;

  return `${year}-${month.padStart(2,"0")}-${day.padStart(2,"0")}`;
}