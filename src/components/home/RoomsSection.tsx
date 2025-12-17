import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import roomSuite from '@/assets/room-suite.jpg';
import roomDeluxe from '@/assets/room-deluxe.jpg';

const rooms = [
  {
    id: 'suite',
    name: 'Jungle Suite',
    nameId: 'Suite Hutan',
    description: 'Expansive living with panoramic jungle views and private terrace.',
    descriptionId: 'Ruang tamu luas dengan pemandangan hutan panorama dan teras pribadi.',
    image: roomSuite,
    size: '85 m²',
    price: 450,
  },
  {
    id: 'deluxe',
    name: 'Canopy Room',
    nameId: 'Kamar Kanopi',
    description: 'Intimate retreat surrounded by tropical canopy, featuring floor-to-ceiling windows.',
    descriptionId: 'Tempat peristirahatan intim yang dikelilingi kanopi tropis, dengan jendela dari lantai hingga langit-langit.',
    image: roomDeluxe,
    size: '55 m²',
    price: 320,
  },
];

export function RoomsSection() {
  const { language, t } = useLanguage();

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            {t('rooms.subtitle')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            {t('rooms.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('rooms.description')}
          </p>
        </ScrollReveal>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {rooms.map((room, index) => (
            <ScrollReveal key={room.id} delay={index * 100}>
              <Link
                to={`/rooms/${room.id}`}
                className="group block bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={language === 'en' ? room.name : room.nameId}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                        {language === 'en' ? room.name : room.nameId}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">{room.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{t('rooms.from')}</p>
                      <p className="font-serif text-xl text-primary">${room.price}</p>
                      <p className="text-xs text-muted-foreground">{t('rooms.perNight')}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-6">
                    {language === 'en' ? room.description : room.descriptionId}
                  </p>

                  <span className="inline-flex items-center text-primary text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                    {t('rooms.view')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal className="text-center mt-12">
          <Button asChild variant="luxury-outline" size="lg">
            <Link to="/rooms">{t('common.viewAll')}</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
