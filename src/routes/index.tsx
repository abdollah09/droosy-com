import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, ClipboardCheck, BarChart3, CreditCard, Sparkles, Star, Users, GraduationCap } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { TEACHERS, CENTERS } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Droosy — Book private lessons with confidence" },
      { name: "description", content: "Droosy connects students with tutors and learning centers. Instant booking, attendance tracking and clear payments." },
      { property: "og:title", content: "Droosy — Book private lessons with confidence" },
      { property: "og:description", content: "Tutors, centers and students in one organized platform." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t, lang } = useI18n();
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 pt-16 lg:pt-24 pb-12 lg:pb-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">
              <Sparkles className="size-3.5" /> {t("hero.eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05]">
              <span className="block">{t("hero.title.1")}</span>
              <span className="block bg-hero bg-clip-text text-transparent">{t("hero.title.2")}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">{t("hero.sub")}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-hero text-primary-foreground hover:opacity-95 shadow-elegant">
                <Link to="/teachers">
                  {t("hero.cta.browse")}
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/centers">{t("hero.cta.centers")}</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <Stat n="1,240+" l={t("hero.stat.teachers")} />
              <Stat n="180+" l={t("hero.stat.centers")} />
              <Stat n="32k" l={t("hero.stat.lessons")} />
              <Stat n="4.9★" l={t("hero.stat.rating")} />
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <HeroCard />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t("features.title")}</h2>
          <p className="text-muted-foreground">{t("features.sub")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Feature icon={<CalendarCheck className="size-5" />} title={t("feat.booking.t")} desc={t("feat.booking.d")} />
          <Feature icon={<ClipboardCheck className="size-5" />} title={t("feat.attend.t")} desc={t("feat.attend.d")} />
          <Feature icon={<BarChart3 className="size-5" />} title={t("feat.dash.t")} desc={t("feat.dash.d")} />
          <Feature icon={<CreditCard className="size-5" />} title={t("feat.pay.t")} desc={t("feat.pay.d")} />
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">{t("how.title")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative p-6 rounded-2xl bg-card shadow-card border border-border/60">
              <div className="absolute -top-4 start-6 size-10 rounded-xl bg-accent-gradient text-accent-foreground font-bold grid place-items-center shadow-glow">
                {i}
              </div>
              <h3 className="text-lg font-bold mt-4 mb-2">{t(`how.${i}.t`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`how.${i}.d`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured teachers preview */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">{t("teachers.title")}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t("teachers.sub")}</p>
          </div>
          <Link to="/teachers" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
            {t("filter.all")} <ArrowRight className="size-3.5 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEACHERS.slice(0, 3).map((tt) => (
            <div key={tt.id} className="p-5 rounded-2xl bg-card border border-border/60 shadow-card hover:shadow-elegant transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-xl bg-hero grid place-items-center text-primary-foreground font-bold">
                  {tt.avatar}
                </div>
                <div>
                  <div className="font-semibold">{tt.name[lang]}</div>
                  <div className="text-xs text-muted-foreground">{tt.subject[lang]} · {tt.city[lang]}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1 text-warning"><Star className="size-4 fill-current" />{tt.rating}</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground"><Users className="size-4" />{tt.students}</span>
                <span className="font-bold">{tt.pricePerHour} <span className="text-xs font-normal text-muted-foreground">{t("card.price_hour")}</span></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="rounded-3xl bg-hero p-8 sm:p-12 text-primary-foreground shadow-elegant relative overflow-hidden">
          <div className="absolute -top-12 -end-12 size-64 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">{t("cta.banner.t")}</h3>
              <p className="opacity-85">{t("cta.banner.d")}</p>
            </div>
            <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground shadow-glow hover:opacity-95">
              <Link to="/dashboard/teacher">
                {t("cta.banner.btn")} <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Centers preview */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">{t("centers.title")}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t("centers.sub")}</p>
          </div>
          <Link to="/centers" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
            {t("filter.all")} <ArrowRight className="size-3.5 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CENTERS.map((c) => (
            <div key={c.id} className="rounded-2xl overflow-hidden bg-card border border-border/60 shadow-card">
              <div className="h-28 bg-hero relative">
                <div className="absolute inset-0 bg-accent-gradient opacity-30" />
                <div className="absolute bottom-3 start-3 text-primary-foreground">
                  <GraduationCap className="size-7" />
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold">{c.name[lang]}</div>
                <div className="text-xs text-muted-foreground mb-2">{c.city[lang]}</div>
                <div className="flex justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-warning"><Star className="size-3.5 fill-current" />{c.rating}</span>
                  <span className="font-bold">{c.pricePerSession} {t("card.price_session")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-extrabold">{n}</div>
      <div className="text-xs text-muted-foreground mt-1">{l}</div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-card hover:-translate-y-1 hover:shadow-elegant transition-all">
      <div className="size-11 rounded-xl bg-secondary text-primary grid place-items-center mb-4">{icon}</div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function HeroCard() {
  const { t, lang } = useI18n();
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-hero rounded-[2rem] blur-2xl opacity-30" />
      <div className="relative rounded-3xl bg-card border border-border/60 shadow-elegant p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">{t("dash.upcoming")}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-success/15 text-success font-semibold">Live</span>
        </div>
        {TEACHERS.slice(0, 3).map((tt, i) => (
          <div key={tt.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface">
            <div className="size-10 rounded-lg bg-hero grid place-items-center text-primary-foreground font-bold text-sm">{tt.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{tt.name[lang]}</div>
              <div className="text-xs text-muted-foreground">{tt.subject[lang]} · {["5:00م", "6:30م", "8:00م"][i]}</div>
            </div>
            <span className="text-xs font-semibold text-success">{t("status.confirmed")}</span>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <MiniStat v="84%" l={t("dash.kpi.attendance")} />
          <MiniStat v="32" l={t("dash.kpi.sessions")} />
          <MiniStat v="12k" l={t("dash.kpi.income")} />
        </div>
      </div>
    </div>
  );
}

function MiniStat({ v, l }: { v: string; l: string }) {
  return (
    <div className="p-3 rounded-xl bg-surface text-center">
      <div className="font-bold">{v}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5 truncate">{l}</div>
    </div>
  );
}
