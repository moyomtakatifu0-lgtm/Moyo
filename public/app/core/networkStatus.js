export function initNetworkStatus() {
  const indicator = document.getElementById("networkStatus");

  function update() {
    if (!indicator) return;

    if (navigator.onLine) {
      indicator.innerText = "🟢 Online";
      indicator.style.color = "green";
    } else {
      indicator.innerText = "🔴 Offline";
      indicator.style.color = "red";
    }
  }

  window.addEventListener("online", update);
  window.addEventListener("offline", update);

  update();
}