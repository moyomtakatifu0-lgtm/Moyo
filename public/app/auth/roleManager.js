// PROJECT: MoyoApp
// MODULE: Role Manager
// FIREBASE v9
// RESPONSIBILITY:
// - Role-based dashboard routing
// - CMS workflow routing safety layer

/* =========================
   DASHBOARD ROUTING
========================= */
export function getDashboard(role) {

  switch (role) {

    case "admin":
      return "/pages/admin/approval.html";

    case "editor":
      return "/pages/editor/home.html";

    case "writer":
      return "/pages/writer/home.html";

    default:
      return "/pages/devotion/home.html";
  }
}

/* =========================
   MENU ROLE NORMALIZER
========================= */
export function getMenuRole(role) {
  return role || "user";
}

/* =========================
   ROLE VALIDATOR (NEW)
   protects system from invalid roles
========================= */
export function isValidRole(role) {

  const allowed = ["admin", "editor", "writer", "user"];

  return allowed.includes(role);
}

/* =========================
   WORKFLOW CONTEXT (NEW)
   helps CMS decide UI behavior
========================= */
export function getWorkflowPermissions(role) {

  switch (role) {

    case "admin":
      return {
        canApprove: true,
        canPublish: true,
        canSchedule: true,
        canDelete: true
      };

    case "editor":
      return {
        canApprove: true,
        canPublish: false,
        canSchedule: false,
        canDelete: false
      };

    case "writer":
      return {
        canApprove: false,
        canPublish: false,
        canSchedule: false,
        canDelete: false
      };

    default:
      return {
        canApprove: false,
        canPublish: false,
        canSchedule: false,
        canDelete: false
      };
  }
}