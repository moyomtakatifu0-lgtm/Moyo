// ======================================================
// PROJECT: MoyoApp
// MODULE: Router (FIXED)
// FIREBASE v9 SAFE
// ======================================================

export function go(path) {

if (!path) {
console.error("Route path missing");
return;
}

if (
path.startsWith("http://") ||
path.startsWith("https://")
) {
window.location.href = path;
return;
}

if (path.startsWith("/")) {
window.location.href = path;
return;
}

const finalPath = path.includes(".html")
? "../" + path
: "../" + path + ".html";

console.log("NAVIGATING TO:", finalPath);

window.location.href = finalPath;
}

export function back() {
window.history.back();
}

export function reload() {
window.location.reload();
}