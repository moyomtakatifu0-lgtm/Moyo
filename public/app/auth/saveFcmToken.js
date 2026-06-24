import { getMessaging, getToken } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js";

import { doc, updateDoc, arrayUnion } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import { db, app } from "../core/firebase.js";

/* INIT MESSAGING */
const messaging = getMessaging(app);

/**
 * SAVE FCM TOKEN AFTER LOGIN
 */
export async function saveFcmToken(userId) {

  try {

    const token = await getToken(messaging, {
      vapidKey: "YOUR_VAPID_KEY_HERE"
    });

    if (!token) {
      console.log("⚠️ No FCM token generated");
      return;
    }

    await updateDoc(doc(db, "users", userId), {
      fcmTokens: arrayUnion(token)
    });

    console.log("✔ FCM token saved successfully");

  } catch (err) {
    console.error("❌ FCM Token Error:", err);
  }
}