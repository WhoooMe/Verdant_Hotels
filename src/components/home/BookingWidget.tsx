import { useState } from 'react';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export function BookingWidget() {
  const { t } = useLanguage();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl text-primary-foreground text-center mb-10">
              {t('booking.title')}
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
              {/* Check-in */}
              <div className="relative">
                <label className="block text-primary-foreground/70 text-xs uppercase tracking-wide mb-2">
                  {t('booking.checkin')}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-transparent border border-primary-foreground/30 rounded-md pl-10 pr-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="relative">
                <label className="block text-primary-foreground/70 text-xs uppercase tracking-wide mb-2">
                  {t('booking.checkout')}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent border border-primary-foreground/30 rounded-md pl-10 pr-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-primary-foreground/70 text-xs uppercase tracking-wide mb-2">
                  {t('booking.guests')}
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent border border-primary-foreground/30 rounded-md pl-10 pr-4 py-3 text-primary-foreground focus:outline-none focus:border-accent transition-colors appearance-none"
                  >
                    <option value="1" className="text-foreground">1 Guest</option>
                    <option value="2" className="text-foreground">2 Guests</option>
                    <option value="3" className="text-foreground">3 Guests</option>
                    <option value="4" className="text-foreground">4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-end">
                <Button
                  type="submit"
                  variant="luxury-gold"
                  size="xl"
                  className="w-full"
                >
                  {t('booking.search')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
