import { syncCMS } from "./syncCMS.js";

let isSyncing = false;
let lastSyncTime = 0;

const MIN_SYNC_INTERVAL = 30000; // 30 sec safe interval

export function initCMSAutoSync() {

  // ONLINE TRIGGER (instant sync)
  window.addEventListener("online", () => {
    safeSync("online-event");
  });

  // PERIODIC SYNC (controlled)
  setInterval(() => {
    safeSync("interval");
  }, 30000);
}