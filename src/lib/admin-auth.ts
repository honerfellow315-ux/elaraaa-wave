// Local-storage-only admin authentication. No backend, no API.
// Session persists for 7 days, then auto-expires.

const KEY = "ew_admin_session";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const ADMIN_USERNAME = "elarawave123";
export const ADMIN_PASSWORD = "1234567890";

type Session = { username: string; expiresAt: number };

export function getAdminSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Session;
    if (!s?.expiresAt || Date.now() > s.expiresAt) {
      window.localStorage.removeItem(KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

export function isAdminAuthenticated(): boolean {
  return !!getAdminSession();
}

export function signInAdmin(username: string, password: string): boolean {
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) return false;
  const session: Session = { username, expiresAt: Date.now() + SEVEN_DAYS_MS };
  window.localStorage.setItem(KEY, JSON.stringify(session));
  return true;
}

export function signOutAdmin() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
