import { db, auth } from "../../core/firebase.js";
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* SAVE PROGRESS */
export async function saveProgress(book, chapter){

  const user = auth.currentUser;
  if(!user) return;

  await setDoc(
    doc(db, "users", user.uid, "readingProgress", "latest"),
    {
      book,
      chapter,
      updatedAt: serverTimestamp()
    }
  );
}

/* GET PROGRESS */
export async function getProgress(){

  const user = auth.currentUser;
  if(!user) return null;

  const snap = await getDoc(
    doc(db, "users", user.uid, "readingProgress", "latest")
  );

  if(!snap.exists()) return null;

  return snap.data();
}