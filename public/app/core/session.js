// PROJECT: MoyoApp
// MODULE: Session Manager
// FIREBASE v9
// RESPONSIBILITY:
// - Store & retrieve authenticated user session
// - Provide role helper
// - Safe parsing (prevents crashes)

const SESSION_KEY = "moyo_user";

export function saveSession(userData) {

  if (!userData || typeof userData !== "object") {
    console.warn("Invalid session data");
    return;
  }

  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify(userData)
  );
}

export function getSession() {

  try {

    const raw = sessionStorage.getItem(SESSION_KEY);

    if (!raw) return null;

    return JSON.parse(raw);

  } catch (err) {

    console.error("Session parse error:", err);
    clearSession();
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getRole() {

  const user = getSession();

  return user?.role || "user";
}

export function isLoggedIn() {
  return !!getSession();
}

export function getUID() {
  const user = getSession();
  return user?.uid || null;
}