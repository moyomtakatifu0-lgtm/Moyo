import { openDB } from "./offlineDB.js";
import { db } from "../firebase.js";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  writeBatch,
  serverTimestamp
} from "firebase/firestore";

let isSyncing = false;

/**
 * MAIN SYNC ENGINE (PRODUCTION SAFE)
 */
export async function syncCMS() {

  if (!navigator.onLine) return;
  if (isSyncing) return;

  isSyncing = true;

  try {

    const localDB = await openDB();
    const tx = localDB.transaction("posts", "readwrite");
    const store = tx.objectStore("posts");

    const all = await store.getAll();

    if (!all.length) {
      isSyncing = false;
      return;
    }

    const batch = writeBatch(db);

    let processed = 0;

    for (const post of all) {

      try {

        const payload = {
          title: post.title,
          content: post.content,
          tafakari: post.tafakari,
          sala: post.sala,
          status: post.status || "draft",
          updatedAt: serverTimestamp(),
          clientId: post.clientId || post.id
        };

        // 🔁 UPDATE EXISTING
        if (post.firestoreId) {

          const ref = doc(db, "posts", post.firestoreId);
          batch.update(ref, payload);

        } 
        // 🆕 CREATE NEW
        else {

          const ref = doc(collection(db, "posts"));
          batch.set(ref, {
            ...payload,
            createdAt: serverTimestamp()
          });

          post.firestoreId = ref.id;
        }

        post.syncStatus = "synced";
        post.retryCount = 0;
        post.lastError = null;

        store.put(post);
        processed++;

      } catch (err) {

        post.syncStatus = "failed";
        post.retryCount = (post.retryCount || 0) + 1;
        post.lastError = err.message;

        store.put(post);
      }
    }

    // 🚀 COMMIT BATCH
    await batch.commit();

    console.log(`✔ SYNC COMPLETE: ${processed} items`);

  } catch (err) {
    console.error("SYNC ENGINE ERROR:", err);

  } finally {
    isSyncing = false;
  }
}