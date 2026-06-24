// PROJECT: MoyoApp
// MODULE: Auth Guard (OFFLINE SAFE)
// FIREBASE v9

import { getSession, isLoggedIn } from "../core/session.js";

/* =========================
   BASIC AUTH CHECK
========================= */
export function requireAuth() {

  const sessionUser = getSession();

  // 🔥 OFFLINE SAFE FALLBACK
  if (!sessionUser && !isLoggedIn()) {
    location.href = "/pages/login.html";
    return false;
  }

  return true;
}

/* =========================
   ROLE CHECK (ADMIN OVERRIDE)
========================= */
export function requireRole(role) {

  const user = getSession();

  if (!user) {
    location.href = "/pages/login.html";
    return false;
  }

  const userRole = user.role;

  // ADMIN OVERRIDE
  if (userRole === "admin") {
    return true;
  }

  if (Array.isArray(role)) {

    if (role.includes(userRole)) {
      return true;
    }

  } else {

    if (userRole === role) {
      return true;
    }
  }

  location.href = "/pages/unauthorised.html";
  return false;
}

/* =========================
   STRICT ROLE CHECK
========================= */
export function requireExactRole(role) {

  const user = getSession();

  if (!user) {
    location.href = "/pages/login.html";
    return false;
  }

  if (user.role !== role) {
    location.href = "/pages/unauthorised.html";
    return false;
  }

  return true;
}