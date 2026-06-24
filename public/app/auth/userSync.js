import { auth, db } from "../core/firebase.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { saveSession } from "../core/session.js";

export function listenUserChanges(uid) {

  const ref = doc(db, "users", uid);

  return onSnapshot(ref, (snap) => {

    if (!snap.exists()) return;

    const data = snap.data();

    saveSession({
      uid,
      email: data.email,
      role: data.role,
      name: data.name || ""
    });

    console.log("🔄 User updated in real-time:", data);
  });
}