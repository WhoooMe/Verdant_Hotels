import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "id";

interface Translations {
  [key: string]: {
    en: string;
    id: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", id: "Beranda" },
  "nav.rooms": { en: "Rooms & Suites", id: "Kamar & Suite" },
  "nav.experience": { en: "Experience", id: "Pengalaman" },
  "nav.dining": { en: "Dining", id: "Kuliner" },
  "nav.spa": { en: "Spa & Wellness", id: "Spa & Kesehatan" },
  "nav.about": { en: "Our Story", id: "Cerita Kami" },
  "nav.book": { en: "Book Now", id: "Pesan Sekarang" },

  // Hero
  "hero.subtitle": { en: "Eco Luxury Retreat", id: "Retret Ramah Lingkungan" },
  "hero.title": {
    en: "Where Nature Meets Elegance",
    id: "Di Mana Alam Bertemu Keanggunan",
  },
  "hero.description": {
    en: "Experience sustainable luxury in the heart of tropical paradise. A sanctuary where every moment is crafted with intention.",
    id: "Rasakan kemewahan berkelanjutan di jantung surga tropis. Sebuah tempat perlindungan di mana setiap momen dibuat dengan kesengajaan.",
  },
  "hero.cta": { en: "Begin Your Journey", id: "Mulai Perjalanan Anda" },
  "hero.explore": { en: "Explore", id: "Jelajahi" },

  // Rooms
  "rooms.subtitle": { en: "Accommodations", id: "Akomodasi" },
  "rooms.title": { en: "Rooms & Suites", id: "Kamar & Suite" },
  "rooms.description": {
    en: "Each space designed to harmonize with nature while providing uncompromising comfort",
    id: "Dirancang selaras dengan alam, menghadirkan kenyamanan mewah yang tak terlupakan",
  },
  "rooms.view": { en: "View Details", id: "Lihat Detail" },
  "rooms.from": { en: "From", id: "Mulai dari" },
  "rooms.perNight": { en: "per night", id: "per malam" },

  // Experience
  "experience.subtitle": { en: "Discover", id: "Temukan" },
  "experience.title": { en: "Curated Experiences", id: "Pengalaman Terkurasi" },
  "experience.description": {
    en: "Immerse yourself in authentic moments that connect you with nature and local culture.",
    id: "Perpaduan sempurna antara alam dan budaya lokal, hadir dalam momen tak terlupakan.",
  },
  "experience.moreTitle": {
    en: "Explore All Experiences",
    id: "Jelajahi Semua Pengalaman",
  },
  "experience.moreDescription": {
    en: "Infinity pool, sunrise yoga, and guided eco tours, each experience at The Verdant is designed to restore balance and reconnect you with nature.",
    id: "Kolam infinity, yoga matahari terbit, dan eco tour, dirangkai dalam pengalaman tenang yang menyatu dengan alam di The Verdant.",
  },

  // About
  "about.subtitle": { en: "Our Story", id: "Cerita Kami" },
  "about.title": { en: "A Vision of Harmony", id: "Visi Harmoni" },
  "about.cta.title": {
    en: "Experience The Verdant",
    id: "Rasakan Keindahan Verdant",
  },
  "about.cta.description": {
    en: "Begin your journey to sustainable luxury. We look forward to welcoming you.",
    id: "Mulailah perjalanan Anda menuju kemewahan berkelanjutan. Kami menantikan kedatangan Anda.",
  },
  "about.description": {
    en: "Founded on the belief that luxury and sustainability can coexist beautifully, The Verdant represents a new chapter in hospitality.",
    id: "Dilandasi visi bahwa kemewahan dan keberlanjutan dapat berpadu secara elegan, The Verdant menandai era baru dalam dunia hospitalitas.",
  },
  "about.description2": {
    en: "Every element of The Verdant has been thoughtfully designed to minimize environmental impact while maximizing the guest experience. From our solar-powered facilities to our organic gardens, we demonstrate that true luxury lies in harmony with nature.",
    id: "Setiap elemen dirancang dengan detail dan kesadaran, sehingga menghadirkan pengalaman istimewa sekaligus menjaga keseimbangan dengan alam. Melalui fasilitas bertenaga surya hingga kebun organik yang terawat, The Verdant merepresentasikan makna kemewahan sejati, yaitu hidup dalam harmoni bersama alam.",
  },
  "about.storyTitle": {
    en: "A vision where luxury lives in harmony with nature",
    id: "Visi dimana kemewahan berpadu selaras dengan alam",
  },
  "about.storyParagraph1": {
    en: "The Verdant was founded in 2009 by a family passionate about preserving Bali's natural beauty while sharing its magic with travelers from around the world. What began as a small eco-lodge has grown into an internationally recognized sanctuary of sustainable luxury.",
    id: "The Verdant didirikan pada tahun 2009 oleh sebuah keluarga yang bersemangat dalam melestarikan keindahan alam Bali sambil membagikan pesonanya kepada para pelancong dari seluruh dunia. Yang awalnya dimulai sebagai penginapan ekowisata kecil, kini telah berkembang menjadi surga mewah berkelanjutan yang diakui secara internasional.",
  },
  "about.storyParagraph2": {
    en: "Today, we continue to pioneer new approaches to responsible hospitality, proving that extraordinary experiences and environmental stewardship can not only coexist but enhance one another.",
    id: "Kami terus mengembangkan cara baru dalam menghadirkan hospitalitas yang berkelanjutan, membuktikan bahwa kemewahan dalam pengalaman dapat berjalan selaras dengan tanggung jawab terhadap alam.",
  },
  "about.yearsOfExcellence": {
    en: "Years of Excellence",
    id: "Tahun Keunggulan",
  },
  "about.inHospitality": {
    en: "in Hospitality",
    id: "dalam Dunia Perhotelan",
  },

  // Stats on Home page
  "about.stats.carbonH": { en: "Carbon Neutral", id: "Netral Karbon" },
  "about.stats.yearsH": { en: "Awards Won", id: "Penghargaan Diraih" },
  "about.stats.guestsH": { en: "Happy Guests", id: "Kepuasan Tamu" },

  // Booking Page Sesi 1, 2, 3
  "booking.subtitle": { en: "Reserve", id: "Pesan" },
  "booking.title": { en: "Reserve Your Stay", id: "Pesan Penginapan Anda" },
  "booking.description": {
    en: "Book your stay at The Verdant and experience luxury in harmony with nature.",
    id: "Pesan penginapan Anda di The Verdant dan rasakan kemewahan yang selaras dengan alam.",
  },

  // Booking Page Pemilihan Tanggal dan Tamu (Page 1)
  "booking.steps.dates": { en: "Select Dates", id: "Pilih Tanggal" },
  "booking.steps.details": { en: "User Details", id: "Detail Anda" },
  "booking.steps.confirmation": { en: "Confirmation", id: "Konfirmasi" },
  "booking.checkin": { en: "Check-in", id: "Check-in" },
  "booking.checkout": { en: "Check-out", id: "Check-out" },
  "booking.selectRoom": { en: "Select Room", id: "Pilih Kamar" },
  "booking.guests": { en: "Guests (Adults 18+)", id: "Tamu (Dewasa 18+)" },
  "booking.search": { en: "Check Availability", id: "Cek Ketersediaan" },
  "booking.continue": { en: "Continue", id: "Lanjutkan" },
  "booking.alternativeContact": {
    en: "Contact Us to Book",
    id: "Hubungi Kami untuk Pemesanan",
  },

  // Booking User Details (Page 2)
  "booking.firstName": { en: "First Name", id: "Nama Depan" },
  "booking.lastName": { en: "Last Name", id: "Nama Belakang" },
  "booking.email": { en: "Email Address", id: "Alamat Email" },
  "booking.phone": { en: "Phone Number", id: "Nomor Telepon" },
  "booking.specialRequests": {
    en: "Special Requests (Optional)",
    id: "Permintaan Khusus (Opsional)",
  },

  // Konfirmasi Booking (Page 3)
  "booking.summary": { en: "Order Confirmation", id: "Konfirmasi Pesanan" },
  "booking.estimatedTotal": { en: "Total Payment", id: "Total Pembayaran" },
  "booking.confirm": { en: "Confirm Booking", id: "Konfirmasi" },
  "booking.guest": { en: "Guest Name", id: "Nama Tamu" },

  // Booking Details (Page 2)
  "booking.children": {
    en: "Children (0–17 years)",
    id: "Anak-anak (0–17 tahun)",
  },
  "booking.noChildren": { en: "No children", id: "Tidak ada anak" },
  "booking.oneChildren": { en: "1 Children", id: "1 Anak" },
  "booking.twoChildren": { en: "2 Children", id: "2 Anak" },
  "booking.threeChildren": { en: "3 Children", id: "3 Anak" },
  "booking.fourChildren": { en: "4 Children", id: "4 Anak" },
  "booking.age": { en: "Age", id: "Usia" },
  "booking.perNight": { en: "/ night", id: "/ malam" },
  "booking.guests1": { en: "1 Persons", id: "1 Orang" },
  "booking.guests2": { en: "2 Persons", id: "2 Orang" },
  "booking.guests3": { en: "3 Persons", id: "3 Orang" },
  "booking.guests4": { en: "4 Persons", id: "4 Orang" },
  "booking.guests5plus": { en: "More...", id: "Lebih Banyak..." },
  "booking.enterGuests": {
    en: "Enter number",
    id: "Masukkan angka",
  },
  "booking.child": { en: "Child", id: "Anak" },
  "booking.ageC": { en: "age", id: "usia" },

  // Footer
  "footer.tagline": {
    en: "Luxury in harmony with nature",
    id: "Kemewahan selaras dengan alam",
  },
  "footer.contact": { en: "Contact", id: "Kontak" },
  "footer.quickLinks": { en: "Quick Links", id: "Tautan Cepat" },
  "footer.newsletter": { en: "Newsletter", id: "Buletin" },
  "footer.emailPlaceholder": {
    en: "Email address",
    id: "Alamat email",
  },
  "footer.subscribe": { en: "Subscribe", id: "Berlangganan" },
  "footer.rights": { en: "All rights reserved", id: "Hak cipta dilindungi" },
  "footer.newsletterText": {
    en: "Stay updated with our latest offers and experiences.",
    id: "Dapatkan informasi terkini seputar penawaran dan pengalaman eksklusif kami.",
  },
  "footer.privacy": { en: "Privacy Policy", id: "Kebijakan Privasi" },
  "footer.terms": { en: "Terms of Service", id: "Syarat dan Ketentuan" },

  // Stats
  "about.stats.established": { en: "Established", id: "Didirikan" },
  "about.stats.carbon": { en: "Carbon Neutral", id: "Netral Karbon" },
  "about.stats.years": { en: "Awards Won", id: "Penghargaan Diraih" },
  "about.stats.guests": { en: "Happy Guests", id: "Kepuasan Tamu" },

  //Values on Story Page
  "about.valuesTitle": {
    en: "Our Guiding Principles",
    id: "Prinsip Panduan Kami",
  },
  "about.valuesDescription": {
    en: "These values shape every aspect of The Verdant experience.",
    id: "Prinsip-prinsip ini membentuk setiap aspek dari pengalaman The Verdant.",
  },

  // Common
  "common.learnMore": { en: "Learn More", id: "Pelajari Lebih Lanjut" },
  "common.viewAll": { en: "View All", id: "Lihat Semua" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("lang") as Language) || "en";
  });

  const changeLanguage = (lang: Language) => {
    localStorage.setItem("lang", lang);
    setLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: changeLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
