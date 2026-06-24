import { getRole } from "../core/session.js";

const MATRIX = {

  admin: [
    "users.read",
    "users.write",
    "posts.read",
    "posts.write",
    "approval.manage",
    "permissions.manage"
  ],

  editor: [
    "posts.read",
    "posts.write",
    "approval.manage"
  ],

  writer: [
    "posts.write",
    "posts.read"
  ],

  user: [
    "posts.read"
  ]
};

export function can(permission) {

  const role = getRole();

  const perms = MATRIX[role] || [];

  if (role === "admin") return true;

  return perms.includes(permission);
}