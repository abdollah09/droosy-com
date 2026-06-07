import { createFileRoute } from "@tanstack/react-router";
import { Wallet, CalendarCheck, Users, TrendingUp, Clock } from "lucide-react";
import { DashboardShell, KpiCard, Panel } from "@/components/DashboardShell";
import { useI18n } from "@/lib/i18n";
import { UPCOMING_SESSIONS, WEEKLY_INCOME } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/teacher")({
  head: () => ({ meta: [{ title: "Teacher Dashboard — Droosy" }] }),
  component: TeacherDash,
});

function TeacherDash() {
  const { t, lang } = useI18n();
  const max = Math.max(...WEEKLY_INCOME.map((w) => w.v));
  return (
    <DashboardShell role={t("dash.teacher.title")} title={`${t("dash.welcome")} أ. أحمد`} subtitle={t("brand.tagline")}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label={t("dash.kpi.income")} value="12,450 EGP" hint="+18%" icon={<Wallet className="size-4" />} />
        <KpiCard label={t("dash.kpi.sessions")} value="48" hint="+6" icon={<CalendarCheck className="size-4" />} />
        <KpiCard label={t("dash.kpi.students")} value="124" hint="+12" icon={<Users className="size-4" />} />
        <KpiCard label={t("dash.kpi.attendance")} value="92%" hint="+3%" icon={<TrendingUp className="size-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Panel title={t("dash.weekly")}>
            <div className="flex items-end gap-3 h-44">
              {WEEKLY_INCOME.map((w) => (
                <div key={w.d} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-hero"
                    style={{ height: `${(w.v / max) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{t(`dash.day.${w.d}`)}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={t("dash.upcoming")}>
            <div className="divide-y divide-border/60">
              {UPCOMING_SESSIONS.map((s) => (
                <div key={s.id} className="py-3 flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-secondary text-primary grid place-items-center">
                    <Clock className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{s.student[lang]}</div>
                    <div className="text-xs text-muted-foreground">{s.subject[lang]} · {lang === "ar" ? s.time : s.timeEn}</div>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title={t("dash.attendance")}>
            <div className="space-y-3">
              {["محمد علي", "ليلى أحمد", "يوسف حسن", "نور إبراهيم"].map((n, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-hero text-primary-foreground grid place-items-center text-xs font-bold">
                    {n.charAt(0)}
                  </div>
                  <div className="flex-1 text-sm font-medium">{lang === "ar" ? n : ["M. Ali", "L. Ahmed", "Y. Hassan", "N. Ibrahim"][i]}</div>
                  <div className="flex-1">
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-success" style={{ width: `${85 - i * 8}%` }} />
                    </div>
                  </div>
                  <span className="text-xs font-semibold w-10 text-end">{85 - i * 8}%</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={t("dash.subjects")}>
            <div className="grid grid-cols-2 gap-2">
              {["Math", "Physics", "Chemistry", "Biology"].map((s, i) => (
                <div key={s} className="p-3 rounded-xl bg-surface">
                  <div className="text-xs text-muted-foreground">{s}</div>
                  <div className="text-lg font-bold mt-1">{32 - i * 5}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}

function StatusBadge({ status }: { status: "confirmed" | "pending" | "completed" }) {
  const { t } = useI18n();
  const map = {
    confirmed: "bg-success/15 text-success",
    pending: "bg-warning/20 text-warning-foreground",
    completed: "bg-secondary text-secondary-foreground",
  };
  return <span className={`text-[11px] px-2 py-1 rounded-full font-semibold ${map[status]}`}>{t(`status.${status}`)}</span>;
}
