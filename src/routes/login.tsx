import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, LogIn, User, BookOpen, Building2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useAuth, DEMO_ACCOUNTS, DASHBOARD_PATH, type Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Droosy" }] }),
  component: LoginPage,
});

const ROLE_META: Record<Role, { icon: typeof User; ar: string; en: string }> = {
  student: { icon: User, ar: "طالب", en: "Student" },
  teacher: { icon: BookOpen, ar: "مدرس", en: "Teacher" },
  center: { icon: Building2, ar: "سنتر", en: "Center" },
};

function LoginPage() {
  const { t, lang } = useI18n();
  const { signIn, user, ready } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ready && user) {
      navigate({ to: DASHBOARD_PATH[user.role], replace: true });
    }
  }, [ready, user, navigate]);

  const fill = (role: Role) => {
    const acc = DEMO_ACCOUNTS.find((a) => a.role === role)!;
    setEmail(acc.email);
    setPassword(acc.password);
    setError(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = signIn(email, password);
    if (!res.ok) {
      setError(lang === "ar" ? "البريد أو كلمة المرور غير صحيحة" : "Invalid email or password");
      return;
    }
    navigate({ to: DASHBOARD_PATH[res.user.role], replace: true });
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 lg:px-8 py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">
            <GraduationCap className="size-3.5" />
            {lang === "ar" ? "تسجيل الدخول" : "Sign in"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            {lang === "ar" ? "أهلاً بعودتك إلى دروسي" : "Welcome back to Droosy"}
          </h1>
          <p className="text-muted-foreground max-w-md">
            {lang === "ar"
              ? "اختر نوع حسابك لتجربة لوحة التحكم الخاصة به."
              : "Pick an account type to preview its dedicated dashboard."}
          </p>

          <div className="grid gap-3">
            {(Object.keys(ROLE_META) as Role[]).map((role) => {
              const acc = DEMO_ACCOUNTS.find((a) => a.role === role)!;
              const Icon = ROLE_META[role].icon;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => fill(role)}
                  className="text-start p-4 rounded-2xl border border-border/60 bg-card hover:border-primary/60 hover:shadow-card transition-all flex items-center gap-3"
                >
                  <div className="size-10 rounded-xl bg-secondary text-primary grid place-items-center">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{lang === "ar" ? ROLE_META[role].ar : ROLE_META[role].en}</div>
                    <div className="text-xs text-muted-foreground font-mono">{acc.email} · {acc.password}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-border/60 bg-card p-8 shadow-card space-y-5"
        >
          <h2 className="text-2xl font-bold">{lang === "ar" ? "ادخل بياناتك" : "Enter your credentials"}</h2>

          <div className="space-y-2">
            <Label htmlFor="email">{lang === "ar" ? "البريد الإلكتروني" : "Email"}</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required dir="ltr" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{lang === "ar" ? "كلمة المرور" : "Password"}</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required dir="ltr" />
          </div>

          {error && <div className="text-sm text-destructive font-medium">{error}</div>}

          <Button type="submit" size="lg" className="w-full bg-hero text-primary-foreground hover:opacity-95 shadow-elegant">
            <LogIn className="size-4" />
            {lang === "ar" ? "تسجيل الدخول" : "Sign in"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            {lang === "ar" ? "تجربة عرض - بدون باك اند فعلي." : "Demo only — no real backend."}{" "}
            <Link to="/" className="underline hover:text-foreground">
              {lang === "ar" ? "العودة للرئيسية" : "Back home"}
            </Link>
          </p>
        </form>
      </section>
    </SiteLayout>
  );
}
