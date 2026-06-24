import { db } from "../core/firebase.js";
import {
  collection,
  onSnapshot,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export function listenAdminStats(callback) {

  const q = query(collection(db, "devotions"));

  return onSnapshot(q, (snapshot) => {

    let draft = 0;
    let review = 0;
    let published = 0;

    snapshot.forEach(doc => {

      const status = doc.data().status;

      if (status === "draft") draft++;
      if (status === "review") review++;
      if (status === "published") published++;
    });

    callback({
      draft,
      review,
      published,
      total: snapshot.size
    });

  });
}