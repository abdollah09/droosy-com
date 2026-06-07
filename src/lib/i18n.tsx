import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

const dict: Dict = {
  "brand.name": { ar: "دروسي", en: "Droosy" },
  "brand.tagline": {
    ar: "نظّم دروسك. احجز بثقة. تعلّم بدون تشتت.",
    en: "Organize lessons. Book with confidence. Learn without chaos.",
  },
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.teachers": { ar: "المدرسون", en: "Teachers" },
  "nav.centers": { ar: "السناتر", en: "Centers" },
  "nav.dashboards": { ar: "لوحات التحكم", en: "Dashboards" },
  "nav.teacher_dash": { ar: "لوحة المدرس", en: "Teacher dashboard" },
  "nav.center_dash": { ar: "لوحة السنتر", en: "Center dashboard" },
  "nav.student_dash": { ar: "لوحة الطالب", en: "Student dashboard" },
  "nav.signin": { ar: "تسجيل الدخول", en: "Sign in" },
  "nav.getstarted": { ar: "ابدأ مجاناً", en: "Get started" },

  "hero.eyebrow": { ar: "منصة الحجز للدروس الخصوصية", en: "Booking platform for private lessons" },
  "hero.title.1": { ar: "حجز دروسك", en: "Book your lessons" },
  "hero.title.2": { ar: "أبسط من أي وقت", en: "easier than ever" },
  "hero.sub": {
    ar: "دروسي يجمع المدرسين والسناتر والطلاب في مكان واحد منظم: حجز فوري، متابعة الحضور، وتقارير ذكية.",
    en: "Droosy brings tutors, centers, and students together — instant booking, attendance tracking, and clear insights.",
  },
  "hero.cta.browse": { ar: "تصفح المدرسين", en: "Browse teachers" },
  "hero.cta.centers": { ar: "اكتشف السناتر", en: "Explore centers" },
  "hero.stat.teachers": { ar: "مدرس متاح", en: "Active tutors" },
  "hero.stat.centers": { ar: "سنتر شريك", en: "Partner centers" },
  "hero.stat.lessons": { ar: "حصة محجوزة", en: "Lessons booked" },
  "hero.stat.rating": { ar: "تقييم رضا", en: "Avg. rating" },

  "features.title": { ar: "كل أدواتك في مكان واحد", en: "Everything you need, in one place" },
  "features.sub": { ar: "صُمّم دروسي ليحل مشاكل الجدولة والحضور والدفع.", en: "Built to solve scheduling, attendance and payment friction." },
  "feat.booking.t": { ar: "حجز خالٍ من التعارض", en: "Conflict-free booking" },
  "feat.booking.d": { ar: "اختر الميعاد المناسب وأكّد الحجز فوراً.", en: "Pick your slot and confirm instantly." },
  "feat.attend.t": { ar: "متابعة الحضور", en: "Attendance tracking" },
  "feat.attend.d": { ar: "سجّل الحضور وتابع تقدّم كل طالب.", en: "Log attendance and follow each student's progress." },
  "feat.dash.t": { ar: "لوحات تحكم ذكية", en: "Smart dashboards" },
  "feat.dash.d": { ar: "تقارير الدخل، عدد الحصص، ومعدلات الالتزام.", en: "Income, sessions, and commitment metrics." },
  "feat.pay.t": { ar: "دفع آمن", en: "Secure payments" },
  "feat.pay.d": { ar: "صفحة دفع واضحة وموثوقة قبل تأكيد الحجز.", en: "A clear, trustworthy checkout before each booking." },

  "how.title": { ar: "كيف يعمل دروسي", en: "How Droosy works" },
  "how.1.t": { ar: "اختر المدرس أو السنتر", en: "Pick a teacher or center" },
  "how.1.d": { ar: "تصفّح بحسب المادة والمرحلة.", en: "Filter by subject and grade." },
  "how.2.t": { ar: "اختر الميعاد", en: "Choose a slot" },
  "how.2.d": { ar: "اعرض المواعيد المتاحة وأكّد.", en: "View available times and confirm." },
  "how.3.t": { ar: "ادفع وابدأ", en: "Pay and start" },
  "how.3.d": { ar: "دفع آمن، ومتابعة مباشرة.", en: "Secure payment, live tracking." },

  "cta.banner.t": { ar: "هل تدير سنتر أو تعطي دروس خصوصية؟", en: "Run a center or teach privately?" },
  "cta.banner.d": { ar: "انضم لدروسي ووفّر وقتك في إدارة الجداول.", en: "Join Droosy and stop wasting time on schedules." },
  "cta.banner.btn": { ar: "افتح حساب مدرس", en: "Open a teacher account" },

  "teachers.title": { ar: "المدرسون", en: "Teachers" },
  "teachers.sub": { ar: "اختر مدرسك المناسب بسهولة.", en: "Find the right tutor for you." },
  "centers.title": { ar: "السناتر", en: "Centers" },
  "centers.sub": { ar: "أقوى السناتر التعليمية في مدينتك.", en: "Top learning centers in your city." },

  "filter.search": { ar: "ابحث بالاسم أو المادة...", en: "Search by name or subject..." },
  "filter.all": { ar: "الكل", en: "All" },

  "card.subject": { ar: "المادة", en: "Subject" },
  "card.rating": { ar: "التقييم", en: "Rating" },
  "card.price_hour": { ar: "ج.م / ساعة", en: "EGP / hour" },
  "card.price_session": { ar: "ج.م / حصة", en: "EGP / session" },
  "card.book": { ar: "احجز الآن", en: "Book now" },
  "card.view": { ar: "عرض", en: "View" },
  "card.students": { ar: "طالب", en: "students" },
  "card.sessions": { ar: "حصة هذا الأسبوع", en: "sessions this week" },

  "dash.teacher.title": { ar: "لوحة المدرس", en: "Teacher dashboard" },
  "dash.center.title": { ar: "لوحة السنتر", en: "Center dashboard" },
  "dash.student.title": { ar: "لوحة الطالب", en: "Student dashboard" },
  "dash.welcome": { ar: "أهلاً،", en: "Welcome," },
  "dash.kpi.income": { ar: "دخل الشهر", en: "Monthly income" },
  "dash.kpi.sessions": { ar: "الحصص هذا الشهر", en: "Sessions this month" },
  "dash.kpi.students": { ar: "الطلاب النشطون", en: "Active students" },
  "dash.kpi.attendance": { ar: "نسبة الحضور", en: "Attendance rate" },
  "dash.kpi.upcoming": { ar: "الحصص القادمة", en: "Upcoming sessions" },
  "dash.kpi.completed": { ar: "الحصص المكتملة", en: "Completed sessions" },
  "dash.kpi.spend": { ar: "إجمالي الإنفاق", en: "Total spend" },
  "dash.kpi.teachers": { ar: "المدرسون", en: "Teachers" },
  "dash.kpi.rooms": { ar: "القاعات", en: "Rooms" },
  "dash.upcoming": { ar: "الحصص القادمة", en: "Upcoming sessions" },
  "dash.recent": { ar: "النشاط الأخير", en: "Recent activity" },
  "dash.weekly": { ar: "نظرة أسبوعية", en: "Weekly overview" },
  "dash.subjects": { ar: "المواد", en: "Subjects" },
  "dash.students": { ar: "الطلاب", en: "Students" },
  "dash.attendance": { ar: "الحضور", en: "Attendance" },
  "dash.income": { ar: "الدخل", en: "Income" },
  "dash.day.sat": { ar: "س", en: "Sat" },
  "dash.day.sun": { ar: "ح", en: "Sun" },
  "dash.day.mon": { ar: "ن", en: "Mon" },
  "dash.day.tue": { ar: "ث", en: "Tue" },
  "dash.day.wed": { ar: "ر", en: "Wed" },
  "dash.day.thu": { ar: "خ", en: "Thu" },
  "dash.day.fri": { ar: "ج", en: "Fri" },
  "dash.present": { ar: "حاضر", en: "Present" },
  "dash.absent": { ar: "غائب", en: "Absent" },
  "status.confirmed": { ar: "مؤكد", en: "Confirmed" },
  "status.pending": { ar: "قيد التأكيد", en: "Pending" },
  "status.completed": { ar: "مكتمل", en: "Completed" },

  "checkout.title": { ar: "إتمام الحجز", en: "Complete your booking" },
  "checkout.summary": { ar: "ملخص الحجز", en: "Booking summary" },
  "checkout.teacher": { ar: "المدرس / السنتر", en: "Tutor / Center" },
  "checkout.subject": { ar: "المادة", en: "Subject" },
  "checkout.date": { ar: "الميعاد", en: "Date & time" },
  "checkout.sessions": { ar: "عدد الحصص", en: "Sessions" },
  "checkout.subtotal": { ar: "المجموع الفرعي", en: "Subtotal" },
  "checkout.fees": { ar: "رسوم المنصة", en: "Platform fee" },
  "checkout.total": { ar: "الإجمالي", en: "Total" },
  "checkout.method": { ar: "وسيلة الدفع", en: "Payment method" },
  "checkout.card": { ar: "بطاقة بنكية", en: "Credit / debit card" },
  "checkout.wallet": { ar: "محفظة إلكترونية", en: "E-wallet" },
  "checkout.instapay": { ar: "إنستاباي", en: "InstaPay" },
  "checkout.cardname": { ar: "الاسم على البطاقة", en: "Name on card" },
  "checkout.cardnum": { ar: "رقم البطاقة", en: "Card number" },
  "checkout.exp": { ar: "تاريخ الانتهاء", en: "Expiry" },
  "checkout.cvc": { ar: "CVC", en: "CVC" },
  "checkout.pay": { ar: "ادفع الآن", en: "Pay now" },
  "checkout.secure": { ar: "دفع آمن ومشفر.", en: "Secure & encrypted payment." },
  "checkout.success": { ar: "تم تأكيد الحجز بنجاح!", en: "Booking confirmed successfully!" },

  "footer.tag": { ar: "نُنظّم وقتك. نَرفع تعليمك.", en: "Organizing your time. Elevating your learning." },
  "footer.rights": { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  "footer.product": { ar: "المنتج", en: "Product" },
  "footer.company": { ar: "الشركة", en: "Company" },
  "footer.support": { ar: "الدعم", en: "Support" },
  "footer.about": { ar: "عن دروسي", en: "About" },
  "footer.contact": { ar: "تواصل معنا", en: "Contact" },
  "footer.privacy": { ar: "الخصوصية", en: "Privacy" },
  "footer.terms": { ar: "الشروط", en: "Terms" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict | string) => string; dir: "rtl" | "ltr" };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("droosy-lang") as Lang)) || "ar";
    setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("droosy-lang", l);
  };

  const t = (k: string) => dict[k]?.[lang] ?? k;

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
