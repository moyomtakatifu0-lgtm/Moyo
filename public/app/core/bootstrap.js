import { getSession } from "./session.js";
import { getDashboard } from "../auth/roleManager.js";

/* =========================
   APP BOOTSTRAP CONTROLLER (SAFE)
========================= */

export function initApp() {

  const user = getSession();

  /* =========================
     1. NO SESSION → LOGIN
  ========================= */
  if (!user) {
    redirectOnce("/pages/login.html");
    return;
  }

  /* =========================
     2. ROLE DASHBOARD RESOLVE
  ========================= */
  const dashboard = getDashboard(user.role);

  if (!dashboard) {
    console.error("No dashboard found for role:", user.role);
    redirectOnce("/pages/login.html");
    return;
  }

  /* =========================
     3. CURRENT PATH SAFE CHECK
  ========================= */
  const currentPath = window.location.pathname;

  const normalizedCurrent = normalizePath(currentPath);
  const normalizedDashboard = normalizePath(dashboard);

  if (normalizedCurrent !== normalizedDashboard) {
    redirectOnce(dashboard);
    return;
  }

  /* =========================
     4. APP IS READY
  ========================= */
  console.log("App initialized:", user.role);
}

/* =========================
   HELPERS
========================= */

function normalizePath(path) {
  return path.split("?")[0].replace(/\/+$/, "");
}

/* prevent loop-safe redirect */
let redirecting = false;

function redirectOnce(url) {
  if (redirecting) return;
  redirecting = true;
  window.location.replace(url);
}