import { Link, useNavigate } from "@tanstack/react-router";
import { Languages, GraduationCap, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { useAuth, DASHBOARD_PATH } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { t, lang, setLang } = useI18n();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/teachers", label: t("nav.teachers") },
    { to: "/centers", label: t("nav.centers") },
  ];

  const handleSignOut = () => {
    signOut();
    setOpen(false);
    navigate({ to: "/login", replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-9 rounded-xl bg-hero grid place-items-center text-primary-foreground shadow-elegant">
              <GraduationCap className="size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">{t("brand.name")}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-muted transition-colors"
                activeProps={{ className: "text-foreground bg-muted" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="gap-1.5"
            >
              <Languages className="size-4" />
              <span className="text-xs font-semibold">{lang === "ar" ? "EN" : "ع"}</span>
            </Button>

            {user ? (
              <>
                <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex gap-1.5">
                  <Link to={DASHBOARD_PATH[user.role]}>
                    <LayoutDashboard className="size-4" />
                    <span className="max-w-[120px] truncate">{user.name}</span>
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleSignOut}
                  className="hidden sm:inline-flex gap-1.5"
                  aria-label={lang === "ar" ? "تسجيل الخروج" : "Sign out"}
                >
                  <LogOut className="size-4" />
                </Button>
              </>
            ) : (
              <Button
                asChild
                size="sm"
                className="hidden sm:inline-flex bg-foreground text-background hover:bg-foreground/90"
              >
                <Link to="/login">{t("nav.signin")}</Link>
              </Button>
            )}

            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              aria-label="menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border/60 bg-background/95">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
                >
                  {n.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to={DASHBOARD_PATH[user.role]}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2"
                  >
                    <LayoutDashboard className="size-4" />
                    {lang === "ar" ? "لوحة التحكم" : "Dashboard"} · {user.name}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-start px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2 text-destructive"
                  >
                    <LogOut className="size-4" />
                    {lang === "ar" ? "تسجيل الخروج" : "Sign out"}
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
                >
                  {t("nav.signin")}
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-border/60 bg-surface/60">
        <div className="container mx-auto px-4 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="size-9 rounded-xl bg-hero grid place-items-center text-primary-foreground">
                <GraduationCap className="size-5" />
              </div>
              <span className="text-lg font-bold">{t("brand.name")}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("footer.tag")}</p>
          </div>
          <FooterCol title={t("footer.product")} links={[
            { to: "/teachers", label: t("nav.teachers") },
            { to: "/centers", label: t("nav.centers") },
            { to: "/login", label: t("nav.signin") },
          ]} />
          <FooterCol title={t("footer.company")} links={[
            { to: "/", label: t("footer.about") },
            { to: "/", label: t("footer.contact") },
          ]} />
          <FooterCol title={t("footer.support")} links={[
            { to: "/", label: t("footer.privacy") },
            { to: "/", label: t("footer.terms") },
          ]} />
        </div>
        <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t("brand.name")} · {t("footer.rights")}
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3">{title}</h4>
      <ul className="space-y-2">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
