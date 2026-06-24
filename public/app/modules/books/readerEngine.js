/* ==========================================
   PROJECT : MoyoApp
   MODULE  : Reader Engine
   FIREBASE: v9
   RESPONSIBILITY:
   Universal Book Reader
========================================== */

export function renderChapter(container, chapterData){

    if(!container) return;

    container.innerHTML = "";

    chapterData.forEach(verse=>{

        const row = document.createElement("div");

        row.className = "verse";

        row.innerHTML = `
            <span class="verse-number">
                ${verse.number}
            </span>

            <span class="verse-text">
                ${verse.text}
            </span>
        `;

        container.appendChild(row);

    });

}