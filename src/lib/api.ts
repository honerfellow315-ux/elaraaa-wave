/**
 * ELARAWAVE API service.
 *
 * All backend calls MUST go through this file.
 * Never hardcode backend URLs inside components.
 *
 * The backend base URL comes from `.env`:
 *   VITE_API_URL=https://your-backend-domain.com
 *
 * Change that value and the entire website switches backends
 * without a single code change.
 */

const RAW = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, "") || "";

if (!RAW && typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.warn(
    "[api] VITE_API_URL is not set. Set it in .env to enable backend calls.",
  );
}

export const API_BASE_URL = RAW;

type Query = Record<string, string | number | boolean | undefined | null>;

function buildUrl(path: string, query?: Query): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${p}`;
  if (!query) return url;
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null) continue;
    sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `${url}?${qs}` : url;
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("ew_token");
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem("ew_token", token);
  else window.localStorage.removeItem("ew_token");
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("ew_admin_token");
}

export function setAdminToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem("ew_admin_token", token);
  else window.localStorage.removeItem("ew_admin_token");
}

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(status: number, message: string, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  method: string,
  path: string,
  opts: { body?: unknown; query?: Query; auth?: boolean; adminAuth?: boolean; signal?: AbortSignal } = {},
): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.adminAuth) {
    const token = getAdminToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  } else if (opts.auth !== false) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(buildUrl(path, opts.query), {
    method,
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal,
    credentials: "include",
  });

  const ct = res.headers.get("content-type") || "";
  const payload: unknown = ct.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) {
    const msg =
      (payload && typeof payload === "object" && "message" in payload
        ? String((payload as { message: unknown }).message)
        : null) || `Request failed (${res.status})`;
    throw new ApiError(res.status, msg, payload);
  }
  return payload as T;
}

export const api = {
  base: API_BASE_URL,
  get: <T>(path: string, query?: Query, opts?: { auth?: boolean; adminAuth?: boolean; signal?: AbortSignal }) =>
    request<T>("GET", path, { query, ...opts }),
  post: <T>(path: string, body?: unknown, opts?: { auth?: boolean; adminAuth?: boolean; signal?: AbortSignal }) =>
    request<T>("POST", path, { body, ...opts }),
  put: <T>(path: string, body?: unknown, opts?: { auth?: boolean; adminAuth?: boolean; signal?: AbortSignal }) =>
    request<T>("PUT", path, { body, ...opts }),
  patch: <T>(path: string, body?: unknown, opts?: { auth?: boolean; adminAuth?: boolean; signal?: AbortSignal }) =>
    request<T>("PATCH", path, { body, ...opts }),
  delete: <T>(path: string, opts?: { auth?: boolean; adminAuth?: boolean; signal?: AbortSignal }) =>
    request<T>("DELETE", path, opts),
};

/* --------------------------------------------------------------------------
 * Endpoint helpers — every domain of the site uses these.
 * Backend routes are conventions; adjust to match your API paths.
 * -------------------------------------------------------------------------- */

export type Review = {
  id: string | number;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  source?: "google" | "site";
};

export type Product = {
  id: string | number;
  slug: string;
  title: string;
  description: string;
  image: string;
  price?: number;
  category?: string;
  size?: string;
};

export type GalleryImage = {
  id: string | number;
  url: string;
  alt?: string;
};

export type User = {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: "user" | "admin" | string;
  createdAt?: string;
};

export type NewsletterSubscriber = {
  id: string | number;
  email: string;
  createdAt?: string;
  source?: string;
};

export type ContactMessage = {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt?: string;
  read?: boolean;
};

export type BrandingRequest = {
  id: string | number;
  name: string;
  brand: string;
  email: string;
  phone?: string;
  size: string;
  quantity: string;
  brief: string;
  createdAt?: string;
  read?: boolean;
};

export type SeoSettings = {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  favicon?: string;
  robots?: string;
  sitemap?: string;
};

export type SiteSettings = {
  brandName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  currency?: string;
  [k: string]: unknown;
};

export type DashboardStats = {
  users?: number;
  subscribers?: number;
  messages?: number;
  products?: number;
  revenue?: number;
  orders?: number;
  conversion?: number;
  [k: string]: unknown;
};

export type BrandingSettings = Record<string, unknown>;

export const endpoints = {
  // Auth
  login: (body: { email: string; password: string }) =>
    api.post<{ token: string; user: User }>("/api/auth/login", body, { auth: false }),
  register: (body: { name: string; email: string; password: string }) =>
    api.post<{ token: string; user: User }>("/api/auth/register", body, { auth: false }),
  me: () => api.get<User>("/api/auth/me"),
  logout: () => api.post<{ ok: true }>("/api/auth/logout", {}),
  refresh: () => api.post<{ token: string }>("/api/auth/refresh", {}),
  forgotPassword: (body: { email: string }) =>
    api.post<{ ok: true }>("/api/auth/password/forgot", body, { auth: false }),
  resetPassword: (body: { token: string; password: string }) =>
    api.post<{ ok: true }>("/api/auth/password/reset", body, { auth: false }),
  verifyRegistrationOtp: (body: { email: string; otp: string }) =>
    api.post<{ token: string; user: User }>("/api/auth/verify-otp", body, { auth: false }),
  resendOtp: (body: { email: string }) =>
    api.post<{ ok: true }>("/api/auth/resend-otp", body, { auth: false }),

  // Profile
  updateProfile: (body: Partial<Pick<User, "name" | "email" | "phone" | "avatar">>) =>
    api.put<User>("/api/auth/profile", body),
  uploadAvatar: async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const token = getToken();
    const res = await fetch(buildUrl("/api/auth/avatar"), {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: fd,
      credentials: "include",
    });
    if (!res.ok) throw new ApiError(res.status, "Avatar upload failed", null);
    return (await res.json()) as { url: string };
  },

  // Password change with OTP
  requestPasswordOtp: (body: { email: string }) =>
    api.post<{ ok: true }>("/api/auth/password/otp/request", body),
  verifyPasswordOtp: (body: { email: string; otp: string; newPassword: string }) =>
    api.post<{ ok: true }>("/api/auth/password/otp/verify", body),

  // Products
  products: (query?: Query) => api.get<Product[] | { data: Product[]; total?: number }>("/api/products", query),
  product: (idOrSlug: string | number) => api.get<Product>(`/api/products/${idOrSlug}`),

  // Gallery
  gallery: () => api.get<GalleryImage[]>("/api/gallery"),

  // Wishlist
  wishlist: () => api.get<Product[]>("/api/wishlist"),
  wishlistAdd: (productId: string | number) =>
    api.post<{ ok: true }>("/api/wishlist", { productId }),
  wishlistRemove: (productId: string | number) =>
    api.delete<{ ok: true }>(`/api/wishlist/${productId}`),

  // Contact & newsletter
  contact: (body: { name: string; email: string; phone?: string; message: string }) =>
    api.post<{ ok: true }>("/api/contact", body, { auth: false }),
  subscribe: (body: { email: string }) =>
    api.post<{ ok: true }>("/api/newsletter/subscribe", body, { auth: false }),
  brandingRequest: (body: { name: string; brand: string; email: string; phone?: string; size: string; quantity: string; brief: string }) =>
    api.post<{ ok: true }>("/api/branding-requests", body, { auth: false }),

  // SEO
  seo: (path: string) => api.get<{ title?: string; description?: string }>("/api/seo", { path }),

  // Reviews (Google + site submissions)
  reviews: () => api.get<Review[]>("/api/reviews"),
  submitReview: (body: { name: string; rating: number; text: string; email?: string }) =>
    api.post<{ ok: true }>("/api/reviews", body, { auth: false }),

  // Customizer
  customizerSettings: () => api.get<BrandingSettings>("/api/customizer/settings", undefined, { auth: false }),
  customizerSubmit: (body: Record<string, unknown>) =>
    api.post<{ ok: true }>("/api/customizer", body, { auth: false }),

  // Admin
  admin: {
    login: (body: { username: string; password: string }) =>
      api.post<{ token: string }>("/api/admin/auth/login", body, { auth: false }),
    stats: () => api.get<DashboardStats>("/api/admin/stats", undefined, { adminAuth: true }),
    users: () => api.get<User[]>("/api/admin/users", undefined, { adminAuth: true }),
    user: (id: string | number) => api.get<User>(`/api/admin/users/${id}`, undefined, { adminAuth: true }),
    deleteUser: (id: string | number) => api.delete<{ ok: true }>(`/api/admin/users/${id}`, { adminAuth: true }),
    subscribers: () => api.get<NewsletterSubscriber[]>("/api/admin/newsletter", undefined, { adminAuth: true }),
    deleteSubscriber: (id: string | number) => api.delete<{ ok: true }>(`/api/admin/newsletter/${id}`, { adminAuth: true }),
    messages: () => api.get<ContactMessage[]>("/api/admin/messages", undefined, { adminAuth: true }),
    message: (id: string | number) => api.get<ContactMessage>(`/api/admin/messages/${id}`, undefined, { adminAuth: true }),
    deleteMessage: (id: string | number) => api.delete<{ ok: true }>(`/api/admin/messages/${id}`, { adminAuth: true }),
    brandingRequests: () => api.get<BrandingRequest[]>("/api/admin/branding-requests", undefined, { adminAuth: true }),
    deleteBrandingRequest: (id: string | number) => api.delete<{ ok: true }>(`/api/admin/branding-requests/${id}`, { adminAuth: true }),
    getSeo: () => api.get<SeoSettings>("/api/admin/seo", undefined, { adminAuth: true }),
    saveSeo: (body: SeoSettings) => api.put<SeoSettings>("/api/admin/seo", body, { adminAuth: true }),
    getSettings: () => api.get<SiteSettings>("/api/admin/settings", undefined, { adminAuth: true }),
    saveSettings: (body: SiteSettings) => api.put<SiteSettings>("/api/admin/settings", body, { adminAuth: true }),
    changeCredentials: (body: { username?: string; currentPassword: string; newPassword?: string }) =>
      api.post<{ ok: true }>("/api/admin/credentials", body, { adminAuth: true }),
  },
};