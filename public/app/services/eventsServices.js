// ======================================================
// PROJECT: Moyo App
// MODULE: Events Service
// FIREBASE v9
// RESPONSIBILITY:
// - Save imported calendar events
// - Fetch events by diocese/year
// - Basic CRUD for reminders
// ======================================================

import { db } from "../core/firebase.js";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  writeBatch,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/**
 * SAVE IMPORTED CALENDAR
 * Called from admin import page
 */
export async function saveCalendarImport({ dioceseId, year, events }) {

  if (!events || events.length === 0) return;

  const batch = writeBatch(db);

  const colRef = collection(db, "reminders");

  events.forEach((event) => {

    const ref = doc(colRef);

    batch.set(ref, {
      title: event.title,
      date: event.date,
      dioceseId,
      year: Number(year),
      type: "calendar",
      createdAt: serverTimestamp(),
      active: true
    });

  });

  await batch.commit();

  return true;
}

/**
 * GET EVENTS BY USER DIOCESE
 */
export async function getEventsByDiocese(dioceseId) {

  const q = query(
    collection(db, "reminders"),
    where("dioceseId", "==", dioceseId),
    where("active", "==", true)
  );

  const snap = await getDocs(q);

  const events = [];

  snap.forEach(docSnap => {
    events.push({
      id: docSnap.id,
      ...docSnap.data()
    });
  });

  return events;
}

/**
 * DELETE SINGLE EVENT (ADMIN)
 */
export async function deleteEvent(eventId) {

  await deleteDoc(doc(db, "reminders", eventId));

  return true;
}

/**
 * OPTIONAL: CLEAN YEAR (ADMIN RESET)
 */
export async function deleteByYear(year) {

  const q = query(
    collection(db, "reminders"),
    where("year", "==", year)
  );

  const snap = await getDocs(q);

  const batch = writeBatch(db);

  snap.forEach(d => {
    batch.delete(d.ref);
  });

  await batch.commit();

  return true;
}