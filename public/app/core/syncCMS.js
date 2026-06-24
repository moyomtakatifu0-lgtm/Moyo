import { openDB } from "./offlineCMS.js";
import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

/* =========================
   CMS OFFLINE SYNC ENGINE
   FIREBASE v9 SAFE VERSION
========================= */

export async function syncCMS() {

  if (!navigator.onLine) return;

  const dbLocal = await openDB();

  const tx = dbLocal.transaction("posts", "readwrite");
  const store = tx.objectStore("posts");

  const all = await store.getAll();

  for (const post of all) {

    try {

      /* =========================
         UPDATE EXISTING POST
      ========================= */
      if (post.firestoreId) {

        await updateDoc(
          doc(db, "posts", post.firestoreId),
          {
            title: post.title || "",
            content: post.content || "",
            tafakari: post.tafakari || "",
            sala: post.sala || "",
            updatedAt: serverTimestamp(),
            syncStatus: "synced"
          }
        );

      }

      /* =========================
         CREATE NEW POST
      ========================= */
      else {

        const ref = await addDoc(
          collection(db, "posts"),
          {
            title: post.title || "",
            content: post.content || "",
            tafakari: post.tafakari || "",
            sala: post.sala || "",

            status: post.status || "draft",

            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            syncStatus: "synced"
          }
        );

        /* attach Firestore ID locally */
        post.firestoreId = ref.id;
      }

      /* =========================
         MARK LOCAL SYNC STATUS
      ========================= */
      post.syncStatus = "synced";
      store.put(post);

    } catch (err) {

      console.error("❌ Sync failed:", err);

      /* IMPORTANT:
         DO NOT mark as synced if failed
      */
      post.syncStatus = "failed";
      store.put(post);
    }
  }
}