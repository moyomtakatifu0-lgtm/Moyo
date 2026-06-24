import { db } from "../../core/firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* SIMPLE SEARCH (CLIENT SIDE) */
export async function searchBible(keyword){

  const results = [];

  const snap = await getDocs(
    collection(db, "bibleIndex")
  );

  snap.forEach(doc => {

    const data = doc.data();

    if(
      data.text &&
      data.text.toLowerCase()
      .includes(keyword.toLowerCase())
    ){
      results.push(data);
    }

  });

  return results;
}