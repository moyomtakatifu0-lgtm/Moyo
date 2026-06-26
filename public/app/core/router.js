/*
PROJECT: MoyoApp
MODULE: Router (STABLE FIXED)
FIREBASE v9 SAFE NAVIGATION
*/

export function go(path) {

if (!path) {
console.error("Route path missing");
return;
}

// External links
if (
path.startsWith("http://") ||
path.startsWith("https://")
) {
window.location.href = path;
return;
}

// Absolute path
if (path.startsWith("/")) {
window.location.href = path;
return;
}

// CLEAN RELATIVE ROUTING (FIX)
let finalPath = path;

if (!path.endsWith(".html")) {
finalPath = path + ".html";
}

console.log("NAVIGATING TO:", finalPath);

window.location.href = finalPath;
}

export function back() {
window.history.back();
}

export function reload() {
window.location.reload();
}