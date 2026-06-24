export function openDB() {

  return new Promise((resolve, reject) => {

    const request = indexedDB.open("moyo_offline", 3);

    request.onupgradeneeded = () => {

      const db = request.result;

      if (!db.objectStoreNames.contains("posts")) {

        const store = db.createObjectStore("posts", {
          keyPath: "id",
          autoIncrement: true
        });

        store.createIndex("status", "status");
        store.createIndex("syncStatus", "syncStatus");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}