// ======================================================
// PROJECT: Moyo App
// MODULE: Notification Service
// FIREBASE: v9
// RESPONSIBILITY:
// - Send notifications
// - Listen notifications
// - Store alerts per user
// ======================================================

import { db } from "../core/firebase.js";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/**
 * SEND NOTIFICATION
 */
export async function sendNotification({ to, title, message, type = "info" }) {

  try {

    await addDoc(collection(db, "notifications"), {
      to,
      title,
      message,
      type,
      read: false,
      createdAt: serverTimestamp()
    });

  } catch (err) {
    console.error("Notification error:", err);
  }
}

/**
 * LISTEN USER NOTIFICATIONS (REAL TIME)
 */
export function listenNotifications(uid, callback) {

  const q = query(
    collection(db, "notifications"),
    where("to", "==", uid)
  );

  return onSnapshot(q, (snapshot) => {

    const items = [];

    snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });

    callback(items);
  });
}