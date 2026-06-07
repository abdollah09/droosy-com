import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo, useState } from "react";
import { CreditCard, Wallet, Smartphone, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import { TEACHERS, CENTERS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const search = z.object({
  id: z.string().optional(),
  type: z.enum(["teacher", "center", "bundle"]).optional(),
});

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Droosy" }] }),
  validateSearch: search,
  component: Checkout,
});

function Checkout() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { id, type } = Route.useSearch();
  const [method, setMethod] = useState<"card" | "wallet" | "insta">("card");
  const [sessions, setSessions] = useState(4);
  const [done, setDone] = useState(false);

  const item = useMemo(() => {
    if (type === "teacher") return TEACHERS.find((x) => x.id === id) ?? TEACHERS[0];
    if (type === "center") return CENTERS.find((x) => x.id === id) ?? CENTERS[0];
    return null;
  }, [id, type]);

  const unit = item
    ? "pricePerHour" in item
      ? item.pricePerHour
      : item.pricePerSession
    : 150;
  const subtotal = unit * sessions;
  const fees = Math.round(subtotal * 0.05);
  const total = subtotal + fees;

  const name = item ? item.name[lang] : lang === "ar" ? "باقة شهرية" : "Monthly bundle";
  const subject = item && "subject" in item ? item.subject[lang] : item && "subjects" in item ? item.subjects.map((s) => s[lang]).join(" · ") : "—";

  if (done) {
    return (
      <SiteLayout>
        <section className="container mx-auto px-4 py-24 max-w-lg text-center">
          <div className="size-20 rounded-full bg-success/15 text-success grid place-items-center mx-auto mb-6">
            <CheckCircle2 className="size-10" />
          </div>
          <h1 className="text-3xl font-extrabold mb-3">{t("checkout.success")}</h1>
          <p className="text-muted-foreground mb-8">
            {lang === "ar" ? "هتلاقي تفاصيل حجزك في لوحة الطالب." : "You'll find your booking in the student dashboard."}
          </p>
          <Button asChild className="bg-hero text-primary-foreground hover:opacity-95" size="lg">
            <Link to="/dashboard/student">
              {t("nav.student_dash")} <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </Button>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 lg:px-8 py-12 grid lg:grid-cols-[1fr_380px] gap-8">
        <div>
          <h1 className="text-3xl font-extrabold mb-1">{t("checkout.title")}</h1>
          <p className="text-muted-foreground text-sm mb-8 inline-flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-success" /> {t("checkout.secure")}
          </p>

          <div className="rounded-2xl bg-card border border-border/60 shadow-card p-6 mb-6">
            <h3 className="font-bold mb-4">{t("checkout.method")}</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <MethodCard active={method === "card"} onClick={() => setMethod("card")} icon={<CreditCard className="size-4" />} label={t("checkout.card")} />
              <MethodCard active={method === "wallet"} onClick={() => setMethod("wallet")} icon={<Wallet className="size-4" />} label={t("checkout.wallet")} />
              <MethodCard active={method === "insta"} onClick={() => setMethod("insta")} icon={<Smartphone className="size-4" />} label={t("checkout.instapay")} />
            </div>
          </div>

          {method === "card" && (
            <div className="rounded-2xl bg-card border border-border/60 shadow-card p-6 space-y-4">
              <div>
                <Label htmlFor="name">{t("checkout.cardname")}</Label>
                <Input id="name" placeholder={lang === "ar" ? "محمد علي" : "Mohamed Ali"} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="num">{t("checkout.cardnum")}</Label>
                <Input id="num" inputMode="numeric" placeholder="4242 4242 4242 4242" className="mt-1.5 font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="exp">{t("checkout.exp")}</Label>
                  <Input id="exp" placeholder="MM/YY" className="mt-1.5 font-mono" />
                </div>
                <div>
                  <Label htmlFor="cvc">{t("checkout.cvc")}</Label>
                  <Input id="cvc" placeholder="123" className="mt-1.5 font-mono" />
                </div>
              </div>
            </div>
          )}
          {method === "wallet" && (
            <div className="rounded-2xl bg-card border border-border/60 shadow-card p-6">
              <Label>{lang === "ar" ? "رقم المحفظة" : "Wallet number"}</Label>
              <Input placeholder="010xxxxxxxx" className="mt-1.5 font-mono" />
            </div>
          )}
          {method === "insta" && (
            <div className="rounded-2xl bg-card border border-border/60 shadow-card p-6">
              <Label>InstaPay ID</Label>
              <Input placeholder="user@instapay" className="mt-1.5 font-mono" />
            </div>
          )}
        </div>

        <aside className="rounded-2xl bg-card border border-border/60 shadow-elegant p-6 h-fit lg:sticky lg:top-24">
          <h3 className="font-bold mb-4">{t("checkout.summary")}</h3>
          <div className="space-y-3 text-sm">
            <Row k={t("checkout.teacher")} v={name} />
            <Row k={t("checkout.subject")} v={subject} />
            <Row k={t("checkout.date")} v={lang === "ar" ? "الأحد 7:00م" : "Sun 7:00 PM"} />
            <div>
              <Label className="text-xs">{t("checkout.sessions")}</Label>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => setSessions(Math.max(1, sessions - 1))} className="size-9 rounded-lg border border-border hover:bg-muted">−</button>
                <div className="flex-1 text-center font-bold text-lg">{sessions}</div>
                <button onClick={() => setSessions(sessions + 1)} className="size-9 rounded-lg border border-border hover:bg-muted">+</button>
              </div>
            </div>
          </div>
          <div className="border-t border-border/60 my-5" />
          <div className="space-y-2 text-sm">
            <Row k={t("checkout.subtotal")} v={`${subtotal} EGP`} />
            <Row k={t("checkout.fees")} v={`${fees} EGP`} />
          </div>
          <div className="border-t border-border/60 my-5" />
          <div className="flex justify-between items-baseline mb-5">
            <span className="font-semibold">{t("checkout.total")}</span>
            <span className="text-2xl font-extrabold">{total} EGP</span>
          </div>
          <Button onClick={() => setDone(true)} size="lg" className="w-full bg-hero text-primary-foreground hover:opacity-95 shadow-elegant">
            {t("checkout.pay")}
          </Button>
        </aside>
      </section>
    </SiteLayout>
  );
}

function MethodCard({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 text-start transition-all ${
        active ? "border-primary bg-secondary" : "border-border hover:bg-muted"
      }`}
    >
      <div className="size-9 rounded-lg bg-card grid place-items-center mb-2">{icon}</div>
      <div className="text-sm font-semibold">{label}</div>
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-semibold text-end">{v}</span>
    </div>
  );
}
