import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/rooms', label: t('nav.rooms') },
    { href: '/experience', label: t('nav.experience') },
    { href: '/about', label: t('nav.about') },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled || !isHome
            ? 'bg-background/95 backdrop-blur-md shadow-soft py-3'
            : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className={cn(
                'font-serif text-2xl md:text-3xl font-medium tracking-wide transition-colors',
                isScrolled || !isHome ? 'text-primary' : 'text-background'
              )}
            >
              The Verdant
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-sm font-medium tracking-wide link-underline transition-colors',
                    isScrolled || !isHome
                      ? 'text-foreground hover:text-primary'
                      : 'text-background/90 hover:text-background'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors',
                  isScrolled || !isHome
                    ? 'text-foreground hover:text-primary'
                    : 'text-background/90 hover:text-background'
                )}
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </button>

              {/* Book Now Button */}
              <Button
                asChild
                variant={isScrolled || !isHome ? 'luxury' : 'hero-solid'}
                size="lg"
              >
                <Link to="/booking">{t('nav.book')}</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={cn('w-6 h-6', isScrolled || !isHome ? 'text-primary' : 'text-background')} />
              ) : (
                <Menu className={cn('w-6 h-6', isScrolled || !isHome ? 'text-primary' : 'text-background')} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background transition-transform duration-500 lg:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-2xl text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          <button
            onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="w-5 h-5" />
            {language === 'en' ? 'Bahasa Indonesia' : 'English'}
          </button>

          <Button asChild variant="luxury" size="xl" className="mt-4">
            <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.book')}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
