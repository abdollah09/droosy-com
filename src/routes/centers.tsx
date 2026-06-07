import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Star, MapPin, GraduationCap, CalendarDays } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import { CENTERS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/centers")({
  head: () => ({ meta: [{ title: "Centers — Droosy" }, { name: "description", content: "Explore learning centers on Droosy." }] }),
  component: CentersPage,
});

function CentersPage() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const items = useMemo(
    () => CENTERS.filter((c) => !q || `${c.name.ar} ${c.name.en} ${c.city.ar} ${c.city.en}`.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 lg:px-8 pt-12 pb-6">
        <h1 className="text-4xl font-extrabold">{t("centers.title")}</h1>
        <p className="text-muted-foreground mt-2">{t("centers.sub")}</p>
        <div className="mt-6 relative max-w-xl">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("filter.search")} className="ps-10 h-12 bg-card" />
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 pb-16 grid md:grid-cols-2 gap-6">
        {items.map((c) => (
          <div key={c.id} className="rounded-3xl overflow-hidden bg-card border border-border/60 shadow-card hover:shadow-elegant transition-all flex flex-col md:flex-row">
            <div className="md:w-2/5 h-44 md:h-auto bg-hero relative shrink-0">
              <div className="absolute inset-0 bg-accent-gradient opacity-25" />
              <div className="absolute bottom-4 start-4 text-primary-foreground">
                <GraduationCap className="size-10" />
                <div className="text-xs font-semibold mt-2 opacity-90">{t("brand.name")}</div>
              </div>
            </div>
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold">{c.name[lang]}</h3>
                  <div className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1">
                    <MapPin className="size-3" /> {c.city[lang]}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-warning font-semibold"><Star className="size-4 fill-current" />{c.rating}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {c.subjects.map((s, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">{s[lang]}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" /> {c.weeklySessions} {t("card.sessions")}</span>
              </div>
              <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/60">
                <div>
                  <div className="text-xl font-extrabold">{c.pricePerSession}</div>
                  <div className="text-xs text-muted-foreground">{t("card.price_session")}</div>
                </div>
                <Button asChild className="bg-hero text-primary-foreground hover:opacity-95">
                  <Link to="/checkout" search={{ id: c.id, type: "center" }}>{t("card.book")}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
