/* ==========================================
   PROJECT : MoyoApp
   MODULE  : Bible Service
   FIREBASE: v9
   RESPONSIBILITY:
   Load Bible Content
========================================== */

export async function loadBibleChapter(
    book,
    chapter
){

    const res = await fetch(
      `/app/data/bible/${book}.json`
    );

    const data = await res.json();

    return data[chapter] || [];

}