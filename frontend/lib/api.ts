"use client";

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  points: number;
  dailyStreak: number;
  progress: Record<string, number>;
  badges: Array<{ id?: string; title?: string; level?: string }>;
  inventory: Record<string, number>;
};

type ApiErrorPayload = {
  error?: {
    message?: string;
  };
};

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api").replace(/\/$/, "");

export function getAuthToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("authToken") || "";
}

export function saveAuthSession(token: string, user: ApiUser) {
  localStorage.setItem("authToken", token);
  localStorage.setItem("isLoggedIn", "true");
  syncUserToLocalStorage(user);
}

export function clearAuthSession() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("isLoggedIn");
}

export function getPathProgress(pathId: string) {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(`${pathId}Progress`) || 0);
}

export function getCompletedModules(pathId: string) {
  if (typeof window === "undefined") return [];

  try {
    const value = JSON.parse(localStorage.getItem(`${pathId}CompletedModules`) || "[]");
    return Array.isArray(value) ? value.map(Number).filter((item) => Number.isFinite(item) && item > 0) : [];
  } catch {
    return [];
  }
}

export function getEffectivePathProgress(pathId: string) {
  const progress = getPathProgress(pathId);
  const highestCompletedModule = Math.max(0, ...getCompletedModules(pathId));
  return Math.max(progress, highestCompletedModule + (highestCompletedModule > 0 ? 1 : 0));
}

export function setPathProgress(pathId: string, progress: number) {
  const nextProgress = Math.max(getEffectivePathProgress(pathId), Number(progress || 0));
  localStorage.setItem(`${pathId}Progress`, String(nextProgress));
  window.dispatchEvent(new CustomEvent("finlit-progress", { detail: { pathId, progress: nextProgress } }));
  return nextProgress;
}

export function markModuleCompleted(pathId: string, moduleNumber: number) {
  const completed = new Set(getCompletedModules(pathId));
  completed.add(moduleNumber);
  localStorage.setItem(`${pathId}CompletedModules`, JSON.stringify([...completed].sort((a, b) => a - b)));
  return setPathProgress(pathId, moduleNumber + 1);
}

export function syncUserToLocalStorage(user: ApiUser) {
  localStorage.setItem("profileName", user.name);
  const localPoints = Number(localStorage.getItem("totalPoints") || 0);
  localStorage.setItem("totalPoints", String(Math.max(localPoints, user.points || 0)));
  const localStreak = Number(localStorage.getItem("dailyStreak") || 0);
  localStorage.setItem("dailyStreak", String(Math.max(localStreak, user.dailyStreak || 0)));

  const mergedProgress: Record<string, number> = {};
  for (const [pathId, progress] of Object.entries(user.progress || {})) {
    const nextProgress = setPathProgress(pathId, progress);
    mergedProgress[pathId] = nextProgress;
  }

  return {
    ...user,
    progress: {
      ...user.progress,
      ...mergedProgress,
    },
  };
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });
  const payload = (await response.json().catch(() => ({}))) as ApiErrorPayload;

  if (!response.ok) {
    throw new Error(payload.error?.message || "Request API gagal.");
  }

  return payload as T;
}
