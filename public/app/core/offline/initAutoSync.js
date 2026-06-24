import { syncCMS } from "./syncEngine.js";

export function initAutoSync() {

  window.addEventListener("online", () => {
    syncCMS();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      syncCMS();
    }
  });

  setInterval(() => {
    if (navigator.onLine) {
      syncCMS();
    }
  }, 30000); // every 30s safe fallback
}