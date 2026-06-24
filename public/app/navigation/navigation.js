import { getRole } from "../core/session.js";

export function getMenuItems() {

  const role = getRole();

  const base = [
    { name: "Home", path: "/pages/devotion/home.html", icon: "🏠" },
    { name: "Menu", path: "/pages/menu.html", icon: "☰" },
    { name: "Profile", path: "/pages/profile.html", icon: "👤" }
  ];

  const roleMenus = {

    writer: [
      { name: "Create", path: "/pages/writer/create.html", icon: "✍️" }
    ],

    editor: [
      { name: "Review", path: "/pages/editor/review.html", icon: "📝" }
    ],

    admin: [
      { name: "Dashboard", path: "/pages/admin/home.html", icon: "📊" },
      { name: "Users", path: "/pages/admin/users.html", icon: "👥" }
    ]
  };

  return [
    ...base,
    ...(roleMenus[role] || [])
  ];
}