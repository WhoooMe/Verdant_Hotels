import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <ScrollReveal>
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
              {t('about.subtitle')}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              {t('about.title')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t('about.description')}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Every element of The Verdant has been thoughtfully designed to minimize environmental impact 
              while maximizing the guest experience. From our solar-powered facilities to our 
              organic gardens, we demonstrate that true luxury lies in harmony with nature.
            </p>

            <div className="flex flex-wrap gap-8 mb-10">
              {[
                { value: '100%', label: 'Solar Powered' },
                { value: '15+', label: 'Years of Excellence' },
                { value: '50K+', label: 'Happy Guests' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl text-primary">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <Button asChild variant="luxury" size="lg">
              <Link to="/about" className="flex items-center gap-2">
                {t('common.learnMore')}
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
                    <p className="font-serif text-6xl text-primary mb-4">15</p>
                    <p className="text-muted-foreground tracking-widest uppercase text-sm">Years of</p>
                    <p className="font-serif text-2xl text-foreground">Sustainable Luxury</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-accent rounded-lg -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 rounded-lg -z-10" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
