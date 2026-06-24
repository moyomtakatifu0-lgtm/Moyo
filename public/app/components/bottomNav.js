// ======================================================
// PROJECT: Moyo App
// MODULE: Global Bottom Navigation
// FIREBASE: v9
// RESPONSIBILITY:
// - Role Based Navigation (AUTO)
// - Global Routing Support
// - Session-aware UI
// ======================================================

import { getRole } from "../core/session.js";

export function loadBottomNav(active = "home") {

  // Global router fallback
  if (typeof window.go !== "function") {
    window.go = function (page) {
      window.location.href = page;
    };
  }

  // AUTO DETECT ROLE (NO NEED TO PASS IT)
  const role = getRole();

  let homePage = "/pages/devotion/home.html";

  switch (role) {

    case "admin":
      homePage = "/pages/admin/home.html";
      break;

    case "editor":
      homePage = "/pages/editor/home.html";
      break;

    case "writer":
      homePage = "/pages/writer/home.html";
      break;

    default:
      homePage = "/pages/devotion/home.html";
      break;
  }

  return `
    <div class="bottom-nav">

      <!-- HOME -->
      <button
        class="nav-item ${active === "home" ? "active" : ""}"
        onclick="window.go('${homePage}')">

        <span class="icon">🏠</span>
        <small>Home</small>

      </button>

      <!-- MENU -->
      <button
        class="nav-item ${active === "menu" ? "active" : ""}"
        onclick="window.go('/pages/menu.html')">

        <span class="icon">☰</span>
        <small>Menu</small>

      </button>

      <!-- PROFILE -->
      <button
        class="nav-item ${active === "profile" ? "active" : ""}"
        onclick="window.go('/pages/profile.html')">

        <span class="icon">👤</span>
        <small>Profile</small>

      </button>

    </div>
  `;
}