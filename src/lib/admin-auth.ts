// Real backend-based admin authentication.
// Admin accounts are created directly in the database — there is no
// admin "register" flow. This file only handles login/session for an
// existing admin account.

import { endpoints, setAdminToken, getAdminToken, ApiError } from "@/lib/api";

export function isAdminAuthenticated(): boolean {
  return !!getAdminToken();
}

export async function signInAdmin(
  username: string,
  password: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const res = await endpoints.admin.login({ username, password });
    setAdminToken(res.token);
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof ApiError ? err.message : "Invalid username or password.",
    };
  }
}

export function signOutAdmin() {
  setAdminToken(null);
}