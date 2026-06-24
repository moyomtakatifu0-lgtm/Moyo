// ======================================================
// PROJECT: Moyo App
// MODULE: Book Engine (UNIFIED CORE)
// FIREBASE v9
// RESPONSIBILITY:
// - Handle all books (Bible, Nyimbo, Devotion)
// - Unified reader engine
// - Search across books
// - Chapter/Verse abstraction
// ======================================================

import { db } from "../core/firebase.js";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* =========================
   GET BOOK META
========================= */
export async function getBook(bookId) {

  const snap = await getDoc(doc(db, "books", bookId));

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data()
  };
}

/* =========================
   GET CHAPTERS
========================= */
export async function getChapters(bookId) {

  const q = query(
    collection(db, "books", bookId, "chapters")
  );

  const snap = await getDocs(q);

  const chapters = [];

  snap.forEach(d => {
    chapters.push({
      id: d.id,
      ...d.data()
    });
  });

  // sort by order if exists
  chapters.sort((a,b)=>(a.order||0)-(b.order||0));

  return chapters;
}

/* =========================
   GET VERSES / ITEMS
========================= */
export async function getVerses(bookId, chapterId) {

  const q = query(
    collection(db, "books", bookId, "chapters", chapterId, "verses")
  );

  const snap = await getDocs(q);

  const verses = [];

  snap.forEach(d => {
    verses.push({
      id: d.id,
      ...d.data()
    });
  });

  verses.sort((a,b)=>(a.number||0)-(b.number||0));

  return verses;
}

/* =========================
   SEARCH ACROSS ALL BOOKS
========================= */
export async function searchBooks(keyword) {

  const booksSnap = await getDocs(collection(db, "books"));

  const results = [];

  for (const bookDoc of booksSnap.docs) {

    const bookId = bookDoc.id;

    const chapters = await getChapters(bookId);

    for (const chapter of chapters) {

      const verses = await getVerses(bookId, chapter.id);

      verses.forEach(v => {

        if (
          (v.title && v.title.toLowerCase().includes(keyword.toLowerCase())) ||
          (v.content && v.content.toLowerCase().includes(keyword.toLowerCase()))
        ) {
          results.push({
            bookId,
            chapterId: chapter.id,
            ...v
          });
        }

      });

    }
  }

  return results;
}

/* =========================
   GET READER CONTEXT (MAIN FUNCTION)
========================= */
export async function getReader(bookId, chapterId) {

  const [book, chapters, verses] = await Promise.all([
    getBook(bookId),
    getChapters(bookId),
    getVerses(bookId, chapterId)
  ]);

  return {
    book,
    chapters,
    verses
  };
}

/* =========================
   BOOK TYPE HELPER
========================= */
export function isValidBookType(type) {

  const allowed = ["bible", "nyimbo", "devotion"];

  return allowed.includes(type);
}

/* =========================
   DEFAULT EXPORT (OPTIONAL)
========================= */
export default {
  getBook,
  getChapters,
  getVerses,
  searchBooks,
  getReader,
  isValidBookType
};