import { getProgress } from "./readingProgress.js";

export async function loadContinueReadingWidget(container){

  const data = await getProgress();

  if(!data){
    container.innerHTML = `
      <div style="padding:10px;color:#777;">
        Hakuna historia ya kusoma bado
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="
      background:#fff;
      padding:15px;
      border-radius:12px;
      box-shadow:0 2px 8px rgba(0,0,0,.08);
      cursor:pointer;
    "
    onclick="goToContinue('${data.book}', ${data.chapter})">

      📖 Endelea Kusoma<br>
      <b>${data.book.toUpperCase()} ${data.chapter}</b>

    </div>
  `;
}

window.goToContinue = (book, chapter) => {
  location.href =
  `book-reader.html?book=${book}&chapter=${chapter}`;
};