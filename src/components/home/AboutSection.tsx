import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <ScrollReveal>
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
              {t("about.subtitle")}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              {t("about.title")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t("about.description")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t("about.description2")}
            </p>

            <div className="flex flex-wrap gap-8 mb-10">
              {[
                { value: "100%", label: t("about.stats.carbonH") },
                { value: "15+", label: t("about.stats.yearsH") },
                { value: "50K+", label: t("about.stats.guestsH") },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl text-primary">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <Button asChild variant="luxury" size="lg">
              <Link to="/about" className="flex items-center gap-2">
                {t("common.learnMore")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </ScrollReveal>

          {/* Visual */}
          <ScrollReveal delay={200}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center p-12">
                    <p className="font-serif text-6xl text-primary mb-4">20</p>
                    <p className="text-muted-foreground tracking-widest uppercase text-sm">
                      {t("about.yearsOfExcellence")}
                    </p>
                    <p className="font-serif text-2xl text-foreground">
                      {t("about.inHospitality")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-lg -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 rounded-lg -z-10" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
