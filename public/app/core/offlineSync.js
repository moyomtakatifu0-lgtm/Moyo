import { openDB } from "./offlineCMS.js";
import { db } from "./firebase.js";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";

/* =========================
OFFLINE SYNC ENGINE v2
========================= */
export async function syncCMS() {

  if (!navigator.onLine) return;

  const localDB = await openDB();

  const tx = localDB.transaction("posts", "readwrite");
  const store = tx.objectStore("posts");

  const all = await store.getAll();

  for (const post of all) {

    try {

      /* UPDATE */
      if (post.firestoreId) {

        await updateDoc(doc(db, "posts", post.firestoreId), {
          title: post.title,
          content: post.content,
          tafakari: post.tafakari,
          sala: post.sala,
          updatedAt: serverTimestamp()
        });

      }

      /* CREATE */
      else {

        const ref = await addDoc(collection(db, "posts"), {
          title: post.title,
          content: post.content,
          tafakari: post.tafakari,
          sala: post.sala,
          status: "draft",
          createdAt: serverTimestamp()
        });

        post.firestoreId = ref.id;
      }

      post.syncStatus = "synced";
      store.put(post);

    } catch (err) {
      console.error("Sync failed:", err);
    }
  }
}

/* =========================
AUTO SYNC TRIGGER (SMART)
========================= */
export function initAutoSync() {

  window.addEventListener("online", () => {
    syncCMS();
  });

  setInterval(() => {
    if (navigator.onLine) {
      syncCMS();
    }
  }, 15000);
}