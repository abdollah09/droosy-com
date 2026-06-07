import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "student" | "teacher" | "center";

export type AuthUser = {
  email: string;
  name: string;
  role: Role;
};

type Account = AuthUser & { password: string };

export const DEMO_ACCOUNTS: Account[] = [
  { email: "student@droosy.com", password: "student123", name: "Mariam Hassan", role: "student" },
  { email: "teacher@droosy.com", password: "teacher123", name: "Ahmed Saleh", role: "teacher" },
  { email: "center@droosy.com", password: "center123", name: "Nile Learning Center", role: "center" },
];

export const DASHBOARD_PATH: Record<Role, "/dashboard/student" | "/dashboard/teacher" | "/dashboard/center"> = {
  student: "/dashboard/student",
  teacher: "/dashboard/teacher",
  center: "/dashboard/center",
};

type Ctx = {
  user: AuthUser | null;
  ready: boolean;
  signIn: (email: string, password: string) => { ok: true; user: AuthUser } | { ok: false; error: string };
  signOut: () => void;
};

const AuthContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "droosy-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const signIn: Ctx["signIn"] = (email, password) => {
    const acc = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
    );
    if (!acc) return { ok: false, error: "invalid" };
    const u: AuthUser = { email: acc.email, name: acc.name, role: acc.role };
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {}
    return { ok: true, user: u };
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return <AuthContext.Provider value={{ user, ready, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
