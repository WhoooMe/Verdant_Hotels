import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { RoomsSection } from '@/components/home/RoomsSection';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { BookingWidget } from '@/components/home/BookingWidget';
import { AboutSection } from '@/components/home/AboutSection';
import { LanguageProvider } from '@/contexts/LanguageContext';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <BookingWidget />
          <RoomsSection />
          <ExperienceSection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
