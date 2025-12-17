import { Link } from 'react-router-dom';
import { Leaf, Utensils, Sparkles, Mountain } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import spaImage from '@/assets/spa.jpg';
import restaurantImage from '@/assets/restaurant.jpg';

const experiences = [
  {
    id: 'spa',
    icon: Sparkles,
    name: 'Sanctuary Spa',
    nameId: 'Spa Suaka',
    description: 'Traditional healing rituals meet modern wellness in our rainforest spa.',
    descriptionId: 'Ritual penyembuhan tradisional bertemu kesehatan modern di spa hutan hujan kami.',
    image: spaImage,
  },
  {
    id: 'dining',
    icon: Utensils,
    name: 'Farm to Table',
    nameId: 'Dari Kebun ke Meja',
    description: 'Culinary journeys featuring locally-sourced organic ingredients.',
    descriptionId: 'Perjalanan kuliner yang menampilkan bahan-bahan organik lokal.',
    image: restaurantImage,
  },
  {
    id: 'nature',
    icon: Mountain,
    name: 'Nature Walks',
    nameId: 'Jalan-Jalan Alam',
    description: 'Guided explorations through ancient forests and hidden waterfalls.',
    descriptionId: 'Eksplorasi terpandu melalui hutan kuno dan air terjun tersembunyi.',
  },
  {
    id: 'sustainability',
    icon: Leaf,
    name: 'Eco Programs',
    nameId: 'Program Ramah Lingkungan',
    description: 'Participate in our conservation and community initiatives.',
    descriptionId: 'Berpartisipasi dalam inisiatif konservasi dan komunitas kami.',
  },
];

export function ExperienceSection() {
  const { language, t } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            {t('experience.subtitle')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            {t('experience.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('experience.description')}
          </p>
        </ScrollReveal>

        {/* Featured Experiences */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {experiences.slice(0, 2).map((exp, index) => (
            <ScrollReveal key={exp.id} delay={index * 100}>
              <Link
                to={`/experience#${exp.id}`}
                className="group relative block aspect-[16/10] rounded-lg overflow-hidden"
              >
                <img
                  src={exp.image}
                  alt={language === 'en' ? exp.name : exp.nameId}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <exp.icon className="w-5 h-5 text-accent" />
                    <h3 className="font-serif text-2xl text-background">
                      {language === 'en' ? exp.name : exp.nameId}
                    </h3>
                  </div>
                  <p className="text-background/80 text-sm max-w-md">
                    {language === 'en' ? exp.description : exp.descriptionId}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Other Experiences */}
        <div className="grid md:grid-cols-2 gap-6">
          {experiences.slice(2).map((exp, index) => (
            <ScrollReveal key={exp.id} delay={(index + 2) * 100}>
              <Link
                to={`/experience#${exp.id}`}
                className="group flex items-center gap-6 p-6 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <exp.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                    {language === 'en' ? exp.name : exp.nameId}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'en' ? exp.description : exp.descriptionId}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
