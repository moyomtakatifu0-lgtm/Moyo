import { getChapters, getVerses } 
from "../services/bookEngine.js";

/* =========================
   SAVE BOOK OFFLINE
========================= */
export async function cacheBook(bookId){

  const chapters = await getChapters(bookId);

  const fullData = {};

  for(const ch of chapters){
    const verses = await getVerses(bookId, ch.id);

    fullData[ch.id] = {
      chapter: ch,
      verses
    };
  }

  localStorage.setItem(
    "book_" + bookId,
    JSON.stringify(fullData)
  );

  return true;
}

/* =========================
   LOAD OFFLINE BOOK
========================= */
export function getCachedBook(bookId){

  const data = localStorage.getItem("book_" + bookId);

  return data ? JSON.parse(data) : null;
}