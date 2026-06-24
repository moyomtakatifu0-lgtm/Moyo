// ======================================================
// PROJECT: MoyoApp
// MODULE: Router (CLEAN FIXED)
// FIREBASE: v9 SAFE
// ======================================================

const BASE_PATH = "./"; // FIX: relative path safe for all environments

export function go(path) {

  if (!path) {
    console.error("Route path missing");
    return;
  }

  // FULL URL SUPPORT
  if (path.startsWith("http://") || path.startsWith("https://")) {
    window.location.href = path;
    return;
  }

  // ABSOLUTE PATH SUPPORT (optional safe)
  if (path.startsWith("/")) {
    window.location.href = path;
    return;
  }

  // NORMAL ROUTES
  const finalPath = path.includes(".html")
    ? BASE_PATH + path
    : BASE_PATH + path + ".html";

  console.log("NAVIGATING TO:", finalPath);

  window.location.href = finalPath;
}

export function back() {
  window.history.back();
}

export function reload() {
  window.location.reload();
}