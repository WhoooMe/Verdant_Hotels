import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import {
  Sparkles,
  Utensils,
  Mountain,
  Leaf,
  Waves,
  Sunrise,
  BedSingle,
  Sprout,
  Flower,
  Brain,
  ChefHat,
  Wine,
  GraduationCap,
  Trees,
  Droplets,
  Bird,
  Sun,
  Apple,
  Wheat,
  Wind,
} from "lucide-react";
import spaImage from "@/assets/spa.jpg";
import restaurantImage from "@/assets/restaurant.jpg";
import exploreNature from "@/assets/explore-nature.jpg";

const experiences = [
  {
    id: "spa",
    icon: Sparkles,
    name: "Sanctuary Spa",
    nameId: "Spa Suaka",
    description:
      "Immerse yourself in ancient Balinese healing traditions combined with modern wellness techniques. Our rainforest spa offers a sanctuary for complete renewal of body, mind, and spirit.",
    descriptionId:
      "Terinspirasi oleh tradisi penyembuhan Bali yang luhur, dipadukan dengan pendekatan wellness modern. Sebuah spa di tengah hutan hujan, menciptakan ruang pemulihan tubuh, pikiran, dan jiwa.",
    image: spaImage,
    features: [
      "Traditional Massage",
      "Herbal Treatments",
      "Yoga Sessions",
      "Meditation",
    ],
    featuresId: [
      "Pijat Tradisional",
      "Perawatan Herbal",
      "Sesi Yoga",
      "Meditasi",
    ],
  },

  {
    id: "dining",
    icon: Utensils,
    name: "Farm to Table Dining",
    nameId: "Kuliner dari Kebun ke Meja",
    description:
      "Experience culinary excellence with ingredients harvested from our organic gardens and local sustainable farms. Each dish tells a story of the land and the hands that cultivated it.",
    descriptionId:
      "Rasakan keunggulan kuliner dengan bahan-bahan yang dipanen dari kebun organik kami dan pertanian berkelanjutan lokal. Setiap hidangan menceritakan kisah tanah dan tangan yang mengolahnya.",
    image: restaurantImage,
    features: [
      "Organic Ingredients",
      "Chef's Table",
      "Wine Pairing",
      "Cooking Classes",
    ],
    featuresId: [
      "Bahan Organik",
      "Meja Koki",
      "Pasangan Anggur",
      "Kelas Memasak",
    ],
  },
  {
    id: "nature",
    icon: Mountain,
    name: "Nature Expeditions",
    nameId: "Ekspedisi Alam",
    description:
      "Explore the untouched beauty of our surrounding landscapes with guided treks through ancient forests, hidden waterfalls, and sacred temples.",
    descriptionId:
      "Jelajahi keindahan alam lanskap di sekitar kami dengan trekking terpandu melalui hutan kuno, air terjun tersembunyi, dan pura suci.",
    image: exploreNature,
    features: [
      "Jungle Tracking",
      "Waterfall Visits",
      "Bird Watching",
      "Sunrise Hikes",
    ],
    featuresId: [
      "Trekking Hutan",
      "Kunjungan Air Terjun",
      "Pengamatan Burung",
      "Pendakian Matahari Terbit",
    ],
  },
];

const additionalActivities = [
  { icon: Waves, name: "Infinity Pool", nameId: "Kolam Infinity" },
  { icon: Sun, name: "Sunrise Yoga", nameId: "Yoga Matahari Terbit" },
  { icon: Leaf, name: "Eco Tours", nameId: "Tur Ramah Lingkungan" },
];

const featureIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  // SPA
  "Traditional Massage": BedSingle,
  "Pijat Tradisional": BedSingle,

  "Herbal Treatments": Sprout,
  "Perawatan Herbal": Sprout,

  "Yoga Sessions": Flower,
  "Sesi Yoga": Flower,

  Meditation: Brain,
  Meditasi: Brain,

  // DINING
  "Organic Ingredients": Apple,
  "Bahan Organik": Apple,

  "Chef's Table": ChefHat,
  "Meja Koki": ChefHat,

  "Wine Pairing": Wine,
  "Pasangan Anggur": Wine,

  "Cooking Classes": GraduationCap,
  "Kelas Memasak": GraduationCap,

  // NATURE
  "Jungle Tracking": Trees,
  "Trekking Hutan": Trees,

  "Waterfall Visits": Droplets,
  "Kunjungan Air Terjun": Droplets,

  "Bird Watching": Bird,
  "Pengamatan Burung": Bird,

  "Sunrise Hikes": Sunrise,
  "Pendakian Matahari Terbit": Sunrise,
};

function ExperienceContent() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
              {t("experience.subtitle")}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
              {t("experience.title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("experience.description")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-32">
            {experiences.map((exp, index) => (
              <ScrollReveal key={exp.id} className="scroll-mt-24" id={exp.id}>
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                      <img
                        src={exp.image}
                        alt={language === "en" ? exp.name : exp.nameId}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 pointer-events-none vignette-cinematic" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <exp.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                        {language === "en" ? exp.name : exp.nameId}
                      </h2>
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {language === "en" ? exp.description : exp.descriptionId}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4">
                      {(language === "en" ? exp.features : exp.featuresId).map(
                        (feature) => {
                          const Icon = featureIcons[feature] || Sparkles;

                          return (
                            <div
                              key={feature}
                              className="flex items-center gap-3 p-4 bg-secondary rounded-lg"
                            >
                              <Icon className="w-5 h-5 text-primary" />
                              <span className="text-foreground text-sm">
                                {feature}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Activities */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-4">
              {t("experience.moreTitle")}
            </h2>
            <p className="text-muted-foreground">
              {t("experience.moreDescription")}
            </p>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-6">
            {additionalActivities.map((activity, index) => (
              <ScrollReveal key={activity.name} delay={index * 100}>
                <div className="flex items-center gap-4 px-8 py-4 bg-card rounded-full border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300">
                  <activity.icon className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">
                    {language === "en" ? activity.name : activity.nameId}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Experience() {
  return <ExperienceContent />;
}
