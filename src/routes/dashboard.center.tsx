import { createFileRoute } from "@tanstack/react-router";
import { Wallet, CalendarCheck, Users, DoorOpen, GraduationCap } from "lucide-react";
import { DashboardShell, KpiCard, Panel } from "@/components/DashboardShell";
import { useI18n } from "@/lib/i18n";
import { TEACHERS, WEEKLY_INCOME } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/center")({
  head: () => ({ meta: [{ title: "Center Dashboard — Droosy" }] }),
  component: CenterDash,
});

function CenterDash() {
  const { t, lang } = useI18n();
  const max = Math.max(...WEEKLY_INCOME.map((w) => w.v));
  return (
    <DashboardShell role={t("dash.center.title")} title={`${t("dash.welcome")} ${lang === "ar" ? "سنتر النجوم" : "Stars Academy"}`}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label={t("dash.kpi.income")} value="86,200 EGP" hint="+22%" icon={<Wallet className="size-4" />} />
        <KpiCard label={t("dash.kpi.sessions")} value="312" hint="+34" icon={<CalendarCheck className="size-4" />} />
        <KpiCard label={t("dash.kpi.teachers")} value="18" icon={<GraduationCap className="size-4" />} />
        <KpiCard label={t("dash.kpi.rooms")} value="6" icon={<DoorOpen className="size-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Panel title={t("dash.weekly")}>
            <div className="grid grid-cols-7 gap-2 h-44 items-end">
              {WEEKLY_INCOME.map((w) => (
                <div key={w.d} className="flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full rounded-t-lg bg-accent-gradient" style={{ height: `${(w.v / max) * 95}%` }} />
                  <span className="text-xs text-muted-foreground">{t(`dash.day.${w.d}`)}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={lang === "ar" ? "أبرز المدرسين" : "Top tutors"}>
            <div className="divide-y divide-border/60">
              {TEACHERS.slice(0, 5).map((tt) => (
                <div key={tt.id} className="py-3 flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-hero text-primary-foreground grid place-items-center font-bold">{tt.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{tt.name[lang]}</div>
                    <div className="text-xs text-muted-foreground">{tt.subject[lang]} · {tt.students} {t("card.students")}</div>
                  </div>
                  <div className="text-sm font-bold">{tt.pricePerHour}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title={lang === "ar" ? "إشغال القاعات" : "Room occupancy"}>
            <div className="space-y-3">
              {["Hall A", "Hall B", "Hall C", "Lab 1", "Lab 2", "Studio"].map((r, i) => {
                const pct = 90 - i * 9;
                return (
                  <div key={r}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">{r}</span>
                      <span className="text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-hero" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title={t("dash.subjects")}>
            <div className="flex flex-wrap gap-2">
              {["Math", "Physics", "Chemistry", "Biology", "English", "Arabic"].map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold flex items-center gap-2">
                  <Users className="size-3" /> {s}
                </span>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
