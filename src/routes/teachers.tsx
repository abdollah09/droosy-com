import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Star, Users, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import { TEACHERS, SUBJECTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/teachers")({
  head: () => ({ meta: [{ title: "Teachers — Droosy" }, { name: "description", content: "Browse private tutors on Droosy." }] }),
  component: TeachersPage,
});

function TeachersPage() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [subj, setSubj] = useState<string>("all");

  const items = useMemo(() => {
    return TEACHERS.filter((tt) => {
      const hay = `${tt.name.ar} ${tt.name.en} ${tt.subject.ar} ${tt.subject.en}`.toLowerCase();
      const passQ = !q || hay.includes(q.toLowerCase());
      const passS = subj === "all" || tt.subject.en === subj;
      return passQ && passS;
    });
  }, [q, subj]);

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 lg:px-8 pt-12 pb-6">
        <h1 className="text-4xl font-extrabold">{t("teachers.title")}</h1>
        <p className="text-muted-foreground mt-2">{t("teachers.sub")}</p>

        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("filter.search")} className="ps-10 h-12 bg-card" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <FilterChip active={subj === "all"} onClick={() => setSubj("all")}>{t("filter.all")}</FilterChip>
            {SUBJECTS.map((s) => (
              <FilterChip key={s.en} active={subj === s.en} onClick={() => setSubj(s.en)}>{s[lang]}</FilterChip>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((tt) => (
          <div key={tt.id} className="p-6 rounded-2xl bg-card border border-border/60 shadow-card hover:shadow-elegant transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="size-14 rounded-2xl bg-hero grid place-items-center text-primary-foreground font-bold shadow-elegant">
                {tt.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{tt.name[lang]}</div>
                <div className="text-sm text-muted-foreground">{tt.subject[lang]}</div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1">
                  <MapPin className="size-3" /> {tt.city[lang]}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tt.tags.map((tag, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                  {tag[lang]}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="inline-flex items-center gap-1 text-warning font-semibold"><Star className="size-4 fill-current" />{tt.rating}</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground"><Users className="size-4" />{tt.students} {t("card.students")}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border/60">
              <div>
                <div className="text-xl font-extrabold">{tt.pricePerHour}</div>
                <div className="text-xs text-muted-foreground">{t("card.price_hour")}</div>
              </div>
              <Button asChild className="bg-hero text-primary-foreground hover:opacity-95">
                <Link to="/checkout" search={{ id: tt.id, type: "teacher" }}>{t("card.book")}</Link>
              </Button>
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 h-10 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
        active ? "bg-foreground text-background" : "bg-card border border-border/60 hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
