import { getRole } from "../core/session.js";

export function buildMenu() {

  const role = getRole();

  const base = [
    { key: "bible", label: "Biblia", icon: "📖", path: "/pages/biblia.html" },
    { key: "rosary", label: "Rozari", icon: "✝️", path: "/pages/rozari-reader.html" },
    { key: "novena", label: "Novena", icon: "🙏", path: "/pages/novena-reader.html" },
    { key: "calendar", label: "Kalenda", icon: "📅", path: "/pages/kalenda.html" },
    { key: "history", label: "Historia", icon: "🏛️", path: "/pages/historia.html" }
  ];

  const extras = {

    writer: [
      { key: "create", label: "Create Devotion", icon: "✍️", path: "/pages/writer/create.html" }
    ],

    editor: [
      { key: "review", label: "Review Posts", icon: "📝", path: "/pages/editor/review.html" }
    ],

    admin: [
      { key: "users", label: "Users", icon: "👥", path: "/pages/admin/users.html" },
      { key: "posts", label: "Posts", icon: "📄", path: "/pages/admin/posts.html" },
      { key: "permissions", label: "Permissions", icon: "🔐", path: "/pages/admin/permision.html" }
    ]
  };

  return [...base, ...(extras[role] || [])];
}