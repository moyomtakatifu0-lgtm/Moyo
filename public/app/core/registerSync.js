export async function registerSync() {

  if (!("serviceWorker" in navigator)) return;

  const sw = await navigator.serviceWorker.ready;

  try {
    await sw.sync.register("sync-posts");
    console.log("Background sync registered");
  } catch (err) {
    console.log("Sync not supported, fallback active");
  }
}