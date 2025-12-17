import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-serif text-3xl font-medium tracking-wide">
              The Verdant
            </Link>
            <p className="mt-4 text-primary-foreground/70 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { href: '/rooms', label: t('nav.rooms') },
                { href: '/experience', label: t('nav.experience') },
                { href: '/about', label: t('nav.about') },
                { href: '/booking', label: t('nav.book') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-accent" />
                <span className="text-primary-foreground/70 text-sm">
                  Jl. Raya Ubud No. 88<br />
                  Bali, Indonesia 80571
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+62361123456" className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                  +62 361 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:hello@theverdant.com" className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                  hello@theverdant.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg mb-6">{t('footer.newsletter')}</h4>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Stay updated with our latest offers and experiences.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-md px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent transition-colors"
              />
              <Button variant="luxury-gold" size="lg">
                {t('footer.subscribe')}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} The Verdant. {t('footer.rights')}.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
