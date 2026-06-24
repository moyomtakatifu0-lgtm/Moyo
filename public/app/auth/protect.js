import { getSession } from "../core/session.js";

/**
 * Protect page by role list
 * Example:
 * protect(["admin","editor"])
 */
export function protect(allowedRoles = []) {

  const user = getSession();

  if (!user) {
    location.href = "/pages/login.html";
    return false;
  }

  if (allowedRoles.length === 0) return true;

  if (!allowedRoles.includes(user.role) && user.role !== "admin") {
    location.href = "/pages/unauthorised.html";
    return false;
  }

  return true;
}