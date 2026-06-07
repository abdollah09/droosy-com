export type Teacher = {
  id: string;
  name: { ar: string; en: string };
  subject: { ar: string; en: string };
  city: { ar: string; en: string };
  rating: number;
  pricePerHour: number;
  students: number;
  avatar: string;
  tags: { ar: string; en: string }[];
};

export type Center = {
  id: string;
  name: { ar: string; en: string };
  city: { ar: string; en: string };
  rating: number;
  pricePerSession: number;
  weeklySessions: number;
  cover: string;
  subjects: { ar: string; en: string }[];
};

export const SUBJECTS = [
  { ar: "رياضيات", en: "Math" },
  { ar: "فيزياء", en: "Physics" },
  { ar: "كيمياء", en: "Chemistry" },
  { ar: "أحياء", en: "Biology" },
  { ar: "إنجليزي", en: "English" },
  { ar: "عربي", en: "Arabic" },
];

export const TEACHERS: Teacher[] = [
  {
    id: "t1",
    name: { ar: "د. عبدالله محمد", en: "Dr. Abdallah Mohamed" },
    subject: { ar: "رياضيات", en: "Math" },
    city: { ar: "القاهرة", en: "Cairo" },
    rating: 4.9,
    pricePerHour: 250,
    students: 124,
    avatar: "AM",
    tags: [{ ar: "ثانوية عامة", en: "Senior high" }, { ar: "أونلاين", en: "Online" }],
  },
  {
    id: "t2",
    name: { ar: "أ. علي البارودي", en: "Mr. Ali El-Baroudy" },
    subject: { ar: "فيزياء", en: "Physics" },
    city: { ar: "الجيزة", en: "Giza" },
    rating: 4.8,
    pricePerHour: 220,
    students: 98,
    avatar: "AB",
    tags: [{ ar: "الصف الثالث الثانوي", en: "Grade 12" }],
  },
  {
    id: "t3",
    name: { ar: "أ. عمر قاسم", en: "Mr. Omar Qasem" },
    subject: { ar: "كيمياء", en: "Chemistry" },
    city: { ar: "الإسكندرية", en: "Alexandria" },
    rating: 4.7,
    pricePerHour: 200,
    students: 86,
    avatar: "OQ",
    tags: [{ ar: "إعدادي", en: "Prep" }, { ar: "ثانوي", en: "High" }],
  },
  {
    id: "t4",
    name: { ar: "أ. عبدالله خليل", en: "Mr. Abdollah Khalil" },
    subject: { ar: "إنجليزي", en: "English" },
    city: { ar: "القاهرة", en: "Cairo" },
    rating: 5.0,
    pricePerHour: 280,
    students: 152,
    avatar: "AK",
    tags: [{ ar: "IELTS", en: "IELTS" }, { ar: "محادثة", en: "Conversation" }],
  },
  {
    id: "t5",
    name: { ar: "أ. منى حسن", en: "Ms. Mona Hassan" },
    subject: { ar: "أحياء", en: "Biology" },
    city: { ar: "المنصورة", en: "Mansoura" },
    rating: 4.6,
    pricePerHour: 180,
    students: 64,
    avatar: "MH",
    tags: [{ ar: "ثانوي", en: "High school" }],
  },
  {
    id: "t6",
    name: { ar: "أ. سارة محمود", en: "Ms. Sara Mahmoud" },
    subject: { ar: "عربي", en: "Arabic" },
    city: { ar: "القاهرة", en: "Cairo" },
    rating: 4.9,
    pricePerHour: 190,
    students: 110,
    avatar: "SM",
    tags: [{ ar: "نحو", en: "Grammar" }, { ar: "بلاغة", en: "Rhetoric" }],
  },
];

export const CENTERS: Center[] = [
  {
    id: "c1",
    name: { ar: "سنتر النجوم", en: "Stars Academy" },
    city: { ar: "القاهرة - مدينة نصر", en: "Cairo - Nasr City" },
    rating: 4.8,
    pricePerSession: 150,
    weeklySessions: 84,
    cover: "stars",
    subjects: [{ ar: "رياضيات", en: "Math" }, { ar: "فيزياء", en: "Physics" }, { ar: "كيمياء", en: "Chemistry" }],
  },
  {
    id: "c2",
    name: { ar: "أكاديمية النيل", en: "Nile Academy" },
    city: { ar: "الجيزة - الدقي", en: "Giza - Dokki" },
    rating: 4.7,
    pricePerSession: 130,
    weeklySessions: 62,
    cover: "nile",
    subjects: [{ ar: "إنجليزي", en: "English" }, { ar: "عربي", en: "Arabic" }],
  },
  {
    id: "c3",
    name: { ar: "مركز التميز", en: "Excellence Center" },
    city: { ar: "الإسكندرية", en: "Alexandria" },
    rating: 4.9,
    pricePerSession: 170,
    weeklySessions: 96,
    cover: "exc",
    subjects: [{ ar: "رياضيات", en: "Math" }, { ar: "أحياء", en: "Biology" }],
  },
  {
    id: "c4",
    name: { ar: "سنتر المستقبل", en: "Future Hub" },
    city: { ar: "المنصورة", en: "Mansoura" },
    rating: 4.6,
    pricePerSession: 120,
    weeklySessions: 48,
    cover: "future",
    subjects: [{ ar: "فيزياء", en: "Physics" }, { ar: "كيمياء", en: "Chemistry" }],
  },
];

export const UPCOMING_SESSIONS = [
  { id: "s1", student: { ar: "محمد علي", en: "Mohamed Ali" }, subject: { ar: "رياضيات", en: "Math" }, time: "اليوم 5:00م", timeEn: "Today 5:00 PM", status: "confirmed" as const },
  { id: "s2", student: { ar: "ليلى أحمد", en: "Layla Ahmed" }, subject: { ar: "فيزياء", en: "Physics" }, time: "غداً 11:00ص", timeEn: "Tomorrow 11:00 AM", status: "pending" as const },
  { id: "s3", student: { ar: "يوسف حسن", en: "Yousef Hassan" }, subject: { ar: "رياضيات", en: "Math" }, time: "الأربعاء 6:30م", timeEn: "Wed 6:30 PM", status: "confirmed" as const },
  { id: "s4", student: { ar: "نور إبراهيم", en: "Nour Ibrahim" }, subject: { ar: "كيمياء", en: "Chemistry" }, time: "الخميس 4:00م", timeEn: "Thu 4:00 PM", status: "confirmed" as const },
];

export const WEEKLY_INCOME = [
  { d: "sat", v: 1200 },
  { d: "sun", v: 1800 },
  { d: "mon", v: 1500 },
  { d: "tue", v: 2200 },
  { d: "wed", v: 1900 },
  { d: "thu", v: 2600 },
  { d: "fri", v: 1100 },
];
