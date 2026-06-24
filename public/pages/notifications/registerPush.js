import { getMessaging, getToken } from "firebase/messaging";
import { db } from "../app/core/firebase.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const messaging = getMessaging();

/* =========================
REQUEST PERMISSION + SAVE TOKEN
========================= */
export async function initPushNotifications(userId) {

  try {

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notifications denied");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: "YOUR_VAPID_KEY"
    });

    if (!token) {
      console.log("No token generated");
      return;
    }

    await updateDoc(doc(db, "users", userId), {
      fcmTokens: arrayUnion(token)
    });

    console.log("Push enabled + token saved");

  } catch (err) {
    console.error("Push init error:", err);
  }
}