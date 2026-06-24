import { db } from "../core/firebase.js";
import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export async function trackEvent(userId, event) {

  try {

    await addDoc(collection(db, "analytics"), {
      userId,
      event,
      createdAt: serverTimestamp()
    });

  } catch (e) {
    console.error("Analytics error:", e);
  }
}