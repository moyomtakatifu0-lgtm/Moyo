import { db } from "../core/firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/**
 * WRITER CREATES DEVOTION
 */
export async function createDevotion(data) {

  return await addDoc(collection(db, "devotions"), {
    ...data,
    status: "draft",
    createdAt: serverTimestamp()
  });
}

/**
 * EDITOR REVIEWS DEVOTION
 */
export async function submitForReview(id) {

  const ref = doc(db, "devotions", id);

  await updateDoc(ref, {
    status: "review",
    updatedAt: serverTimestamp()
  });
}

/**
 * ADMIN APPROVES
 */
export async function approveDevotion(id) {

  const ref = doc(db, "devotions", id);

  await updateDoc(ref, {
    status: "published",
    publishedAt: serverTimestamp()
  });
}