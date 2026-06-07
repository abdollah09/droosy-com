import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, CheckCircle2, Wallet, BookOpen, ArrowRight } from "lucide-react";
import { DashboardShell, KpiCard, Panel } from "@/components/DashboardShell";
import { RoleGuard } from "@/components/RoleGuard";
import { useI18n } from "@/lib/i18n";
import { TEACHERS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/student")({
  head: () => ({ meta: [{ title: "Student Dashboard — Droosy" }] }),
  component: () => (
    <RoleGuard role="student">
      <StudentDash />
    </RoleGuard>
  ),
});

function StudentDash() {
  const { t, lang } = useI18n();
  return (
    <DashboardShell role={t("dash.student.title")} title={`${t("dash.welcome")} ${lang === "ar" ? "محمد" : "Mohamed"}`}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label={t("dash.kpi.upcoming")} value="4" icon={<CalendarCheck className="size-4" />} />
        <KpiCard label={t("dash.kpi.completed")} value="38" hint="+5" icon={<CheckCircle2 className="size-4" />} />
        <KpiCard label={t("dash.kpi.spend")} value="3,200 EGP" icon={<Wallet className="size-4" />} />
        <KpiCard label={lang === "ar" ? "المواد" : "Subjects"} value="3" icon={<BookOpen className="size-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Panel title={t("dash.upcoming")}>
            <div className="space-y-3">
              {TEACHERS.slice(0, 3).map((tt, i) => (
                <div key={tt.id} className="p-4 rounded-xl bg-surface flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-hero grid place-items-center text-primary-foreground font-bold">{tt.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{tt.name[lang]}</div>
                    <div className="text-xs text-muted-foreground">{tt.subject[lang]} · {["اليوم 5:00م", "غداً 6:30م", "السبت 4:00م"][i]}</div>
                  </div>
                  <Button size="sm" variant="outline">{lang === "ar" ? "انضم" : "Join"}</Button>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={lang === "ar" ? "المدرسون المقترحون" : "Recommended tutors"} action={
            <Link to="/teachers" className="text-xs font-semibold text-primary inline-flex items-center gap-1">
              {t("filter.all")} <ArrowRight className="size-3 rtl:rotate-180" />
            </Link>
          }>
            <div className="grid sm:grid-cols-2 gap-3">
              {TEACHERS.slice(3, 5).map((tt) => (
                <div key={tt.id} className="p-4 rounded-xl border border-border/60 flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-hero grid place-items-center text-primary-foreground font-bold text-sm">{tt.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{tt.name[lang]}</div>
                    <div className="text-xs text-muted-foreground">{tt.subject[lang]} · ★ {tt.rating}</div>
                  </div>
                  <Button asChild size="sm" className="bg-hero text-primary-foreground hover:opacity-95">
                    <Link to="/checkout" search={{ id: tt.id, type: "teacher" }}>{t("card.book")}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title={lang === "ar" ? "التقدم" : "Progress"}>
            <div className="space-y-4">
              {[
                { s: lang === "ar" ? "رياضيات" : "Math", v: 78 },
                { s: lang === "ar" ? "فيزياء" : "Physics", v: 62 },
                { s: lang === "ar" ? "كيمياء" : "Chemistry", v: 90 },
              ].map((p) => (
                <div key={p.s}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold">{p.s}</span>
                    <span className="text-muted-foreground">{p.v}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-hero" style={{ width: `${p.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <div className="p-5 rounded-2xl bg-hero text-primary-foreground shadow-elegant">
            <h3 className="font-bold mb-1">{lang === "ar" ? "اشترك في خطة شهرية" : "Go monthly & save"}</h3>
            <p className="text-sm opacity-85 mb-4">
              {lang === "ar" ? "احصل على خصم 15% على باقات الحصص." : "Get 15% off on bundled packages."}
            </p>
            <Button asChild className="bg-accent-gradient text-accent-foreground shadow-glow hover:opacity-95">
              <Link to="/checkout" search={{ id: "bundle", type: "bundle" }}>
                {lang === "ar" ? "عرض الخطط" : "View plans"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
