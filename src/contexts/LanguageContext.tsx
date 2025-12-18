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
    id: "Celupkan diri Anda dalam momen autentik yang menghubungkan Anda dengan alam dan budaya lokal.",
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
    id: "Didirikan atas keyakinan bahwa kemewahan dan keberlanjutan dapat hidup berdampingan dengan indah, The Verdant mewakili babak baru dalam hospitalitas.",
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

  // Booking
  "booking.title": { en: "Reserve Your Stay", id: "Pesan Penginapan Anda" },
  "booking.checkin": { en: "Check-in", id: "Check-in" },
  "booking.checkout": { en: "Check-out", id: "Check-out" },
  "booking.guests": { en: "Guests", id: "Tamu" },
  "booking.search": { en: "Check Availability", id: "Cek Ketersediaan" },

  // Footer
  "footer.tagline": {
    en: "Luxury in harmony with nature",
    id: "Kemewahan selaras dengan alam",
  },
  "footer.contact": { en: "Contact", id: "Kontak" },
  "footer.quickLinks": { en: "Quick Links", id: "Tautan Cepat" },
  "footer.newsletter": { en: "Newsletter", id: "Buletin" },
  "footer.subscribe": { en: "Subscribe", id: "Berlangganan" },
  "footer.rights": { en: "All rights reserved", id: "Hak cipta dilindungi" },

  // Stats
  "about.stats.established": { en: "Established", id: "Didirikan" },
  "about.stats.carbon": { en: "Carbon Neutral", id: "Netral Karbon" },
  "about.stats.years": { en: "Awards Won", id: "Penghargaan Diperoleh" },
  "about.stats.guests": { en: "Happy Guests", id: "Tamu Bahagia" },

  //Values
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
