export function registerPWA(){

  if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("/sw.js")
      .then(() => {
        console.log("PWA Registered");
      })
      .catch(err => {
        console.log("SW error", err);
      });
  }
}