export type DemoRole = "pro" | "client";

export type DemoSession = {
  role: DemoRole;
  name: string;
  avatar: string;
};

const KEY = "snatchon-demo-session";
export const SESSION_EVENT = "snatchon-demo-session";

const PROFILES: Record<DemoRole, DemoSession> = {
  pro: {
    role: "pro",
    name: "Amara",
    avatar: "https://i.pravatar.cc/96?img=47",
  },
  client: {
    role: "client",
    name: "Rachel",
    avatar: "https://i.pravatar.cc/96?img=5",
  },
};

export function getSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { role?: DemoRole };
    return parsed.role ? PROFILES[parsed.role] : null;
  } catch {
    return null;
  }
}

export function setSession(role: DemoRole) {
  window.localStorage.setItem(KEY, JSON.stringify({ role }));
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function clearSession() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}
