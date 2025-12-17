import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-hotel.jpg';

export function HeroSection() {
  const { t } = useLanguage();

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="The Verdant luxury eco hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/50 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Subtitle */}
          <p className="animate-fade-up text-accent text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            {t('hero.subtitle')}
          </p>

          {/* Title */}
          <h1 className="animate-fade-up animation-delay-200 font-serif text-4xl md:text-6xl lg:text-7xl text-background font-medium leading-tight mb-6">
            {t('hero.title')}
          </h1>

          {/* Description */}
          <p className="animate-fade-up animation-delay-300 text-background/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div className="animate-fade-up animation-delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="hero-solid" size="xl">
              <Link to="/booking" className="flex items-center gap-2">
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="hero" size="xl">
              <Link to="/rooms">{t('hero.explore')}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background/60 hover:text-background transition-colors animate-float"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
