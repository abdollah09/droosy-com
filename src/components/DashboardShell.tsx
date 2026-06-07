import type { ReactNode } from "react";
import { SiteLayout } from "@/components/SiteLayout";

export function DashboardShell({
  title,
  subtitle,
  role,
  children,
}: {
  title: string;
  subtitle?: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 lg:px-8 pt-10 pb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-secondary px-2 py-1 rounded-md">
              {role}
            </span>
            <h1 className="text-4xl font-extrabold mt-3">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 lg:px-8 pb-16">{children}</section>
    </SiteLayout>
  );
}

export function KpiCard({ label, value, hint, icon }: { label: string; value: string; hint?: string; icon: ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">{label}</span>
        <div className="size-9 rounded-lg bg-secondary text-primary grid place-items-center">{icon}</div>
      </div>
      <div className="text-2xl font-extrabold mt-3">{value}</div>
      {hint && <div className="text-xs text-success mt-1 font-semibold">{hint}</div>}
    </div>
  );
}

export function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border/60 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
