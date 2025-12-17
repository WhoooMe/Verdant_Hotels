import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Heart, Globe, Award } from "lucide-react";
import heroImage from "@/assets/hero-hotel.jpg";

const values = [
  {
    icon: Leaf,
    title: "Sustainability First",
    titleId: "Keberlanjutan Utama",
    description:
      "Every decision we make considers its environmental impact. From solar power to organic gardens, we lead by example.",
    descriptionId:
      "Setiap keputusan yang kami buat mempertimbangkan dampak lingkungannya. Dari tenaga surya hingga kebun organik, kami memimpin dengan contoh.",
  },
  {
    icon: Heart,
    title: "Genuine Hospitality",
    titleId: "Keramahan Tulus",
    description:
      "Our team embodies the warmth of Indonesian culture, ensuring every guest feels welcomed and cherished.",
    descriptionId:
      "Tim kami mewujudkan kehangatan budaya Indonesia, memastikan setiap tamu merasa disambut dan dihargai.",
  },
  {
    icon: Globe,
    title: "Community Connection",
    titleId: "Koneksi Komunitas",
    description:
      "We partner with local artisans, farmers, and guides to create authentic experiences while supporting the local economy.",
    descriptionId:
      "Kami bermitra dengan pengrajin lokal, petani, dan pemandu untuk menciptakan pengalaman autentik sambil mendukung ekonomi lokal.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    titleId: "Kualitas Tanpa Kompromi",
    description:
      "Luxury is in the details. Every amenity, every service, every moment is crafted to exceed expectations.",
    descriptionId:
      "Kemewahan ada dalam detailnya. Setiap fasilitas, setiap layanan, setiap momen dibuat untuk melampaui harapan.",
  },
];

function AboutContent() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="The Verdant Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 to-foreground/70" />
        </div>
        <div className="relative z-10 text-center px-6">
          <ScrollReveal>
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
              {t("about.subtitle")}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-background mb-6">
              {t("about.title")}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                  {t("about.storyTitle")}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {t("about.storyParagraph1")}
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Today, we continue to pioneer new approaches to responsible
                  hospitality, proving that extraordinary experiences and
                  environmental stewardship can not only coexist but enhance one
                  another.
                </p>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-border">
                {[
                  { value: "2009", label: t("about.stats.established") },
                  { value: "100%", label: t("about.stats.carbon") },
                  { value: "15+", label: "Awards Won" },
                  { value: "50K+", label: "Happy Guests" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-serif text-3xl md:text-4xl text-primary mb-2">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Our Guiding Principles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These values shape every aspect of The Verdant experience.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 100}>
                <div className="p-8 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">
                    {language === "en" ? value.title : value.titleId}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === "en"
                      ? value.description
                      : value.descriptionId}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-6">
              {t("about.cta.title")}
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              {t("about.cta.description")}
            </p>
            <Button asChild variant="luxury-gold" size="xl">
              <Link to="/booking" className="flex items-center gap-2">
                {t("nav.book")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function About() {
  return <AboutContent />;
}
