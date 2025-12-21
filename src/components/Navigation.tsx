import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  User,
  Clock,
  LogOut,
  BedDouble,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LogoIcon from "@/assets/logo-icon.png";
import { cn } from "@/lib/utils";
import LoginModal from "./auth/LoginModal.tsx";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import RegisterModal from "@/components/auth/RegisterModal";
import { motion, AnimatePresence } from "framer-motion";
import { fadeSlideDown } from "@/lib/animations";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }

      if (
        bookingRef.current &&
        !bookingRef.current.contains(event.target as Node)
      ) {
        setOpenBooking(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setOpenProfile(false);
      setOpenProfile(false);
      setOpenBooking(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/rooms", label: t("nav.rooms") },
    { href: "/experience", label: t("nav.experience") },
    { href: "/about", label: t("nav.about") },
  ];

  const isHome = location.pathname === "/";

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled || !isHome
            ? "bg-background/95 backdrop-blur-md shadow-soft py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={LogoIcon}
                alt="The Verdant"
                className={cn(
                  "h-10 md:h-10 w-auto transition-all duration-300",
                  isScrolled || !isHome ? "opacity-100" : "opacity-90"
                )}
              />
              <span
                className={cn(
                  "font-serif text-xl md:text-2xl font-medium tracking-wide transition-colors",
                  isScrolled || !isHome ? "text-primary" : "text-background"
                )}
              >
                The Verdant
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide link-underline transition-colors",
                    isScrolled || !isHome
                      ? "text-foreground hover:text-primary"
                      : "text-background/90 hover:text-background"
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
                onClick={() => setLanguage(language === "en" ? "id" : "en")}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  isScrolled || !isHome
                    ? "text-foreground hover:text-primary"
                    : "text-background/90 hover:text-background"
                )}
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </button>

              {/* LOGIN PROFILE */}
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => {
                    if (!user) {
                      setOpenLogin(true);
                    } else {
                      setOpenProfile(!openProfile);
                    }
                  }}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border overflow-hidden transition-colors",
                    user?.photoURL ? "" : "bg-primary/10"
                  )}
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-primary">
                      {user?.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  )}
                </button>

                {
                  <AnimatePresence>
                    {openProfile && user && (
                      <motion.div
                        variants={fadeSlideDown}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-3 w-64 z-50 origin-top-right"
                      >
                        {/* DROPDOWN CONTAINER */}
                        <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7DED3] shadow-xl">
                          {/* USER INFO */}
                          <div className="px-4 py-3 border-b border-[#E7DED3]">
                            <p className="text-sm font-semibold text-stone-900">
                              {user?.displayName || "Pengguna"}
                            </p>
                            <p className="text-xs text-stone-500 truncate">
                              {user?.email}
                            </p>
                          </div>

                          {/* MENU ITEMS */}
                          <button
                            onClick={() => {
                              navigate("/profile");
                              setOpenProfile(false);
                            }}
                            className="flex items-center gap-3 w-full px-4 py-3 text-left
          text-stone-700 hover:bg-[#F4EFE8] transition-colors"
                          >
                            <User size={18} className="text-emerald-700" />
                            <span className="text-sm font-medium">
                              Profil Saya
                            </span>
                          </button>

                          <button
                            onClick={() => {
                              navigate("/my-reservations");
                              setOpenProfile(false);
                            }}
                            className="flex items-center gap-3 w-full px-4 py-3 text-left
          text-stone-700 hover:bg-[#F4EFE8] transition-colors"
                          >
                            <Clock size={18} className="text-emerald-700" />
                            <span className="text-sm font-medium">
                              Reservasi Saya
                            </span>
                          </button>

                          <div className="h-px bg-[#E7DED3] my-1" />

                          <button
                            onClick={async () => {
                              const { logout } = await import(
                                "@/services/authService"
                              );
                              logout();
                              setOpenProfile(false);
                            }}
                            className="flex items-center gap-3 w-full px-4 py-3 text-left  text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={18} />
                            <span className="text-sm font-medium">Keluar</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                }
              </div>

              {/* Book Now Dropdown */}
              <div ref={bookingRef} className="relative">
                <Button
                  variant={isScrolled || !isHome ? "luxury" : "hero-solid"}
                  size="lg"
                  onClick={() => {
                    if (!user) {
                      setOpenLogin(true);
                    } else {
                      setOpenBooking((prev) => !prev);
                    }
                  }}
                >
                  {t("nav.book")}
                </Button>
                <AnimatePresence>
                  {openBooking && user && (
                    <motion.div
                      variants={fadeSlideDown}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-3 w-64 z-50 origin-top-right"
                    >
                      <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7DED3] shadow-xl overflow-hidden">
                        {/* Stay */}
                        <button
                          onClick={() => {
                            navigate("/booking");
                            setOpenBooking(false);
                          }}
                          className="flex gap-4 w-full px-5 py-4 text-left hover:bg-[#F4EFE8] transition"
                        >
                          <BedDouble
                            className="text-emerald-700 mt-1"
                            size={20}
                          />

                          <div>
                            <p className="text-sm font-semibold text-stone-900">
                              {t("nav.roomSuites")}
                            </p>
                            <p className="text-xs text-stone-500">
                              {t("nav.roomS.Description")}
                            </p>
                          </div>
                        </button>

                        <div className="h-px bg-[#E7DED3]" />

                        {/* Dining */}
                        <button
                          onClick={() => {
                            navigate("/booking/dining");
                            setOpenBooking(false);
                          }}
                          className="flex gap-4 w-full px-5 py-4 text-left hover:bg-[#F4EFE8] transition"
                        >
                          <Utensils
                            className="text-emerald-700 mt-1"
                            size={20}
                          />

                          <div>
                            <p className="text-sm font-semibold text-stone-900">
                              {t("nav.diningTitle")}
                            </p>
                            <p className="text-xs text-stone-500">
                              {t("nav.dining.description")}
                            </p>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X
                  className={cn(
                    "w-6 h-6",
                    isScrolled || !isHome ? "text-primary" : "text-background"
                  )}
                />
              ) : (
                <Menu
                  className={cn(
                    "w-6 h-6",
                    isScrolled || !isHome ? "text-primary" : "text-background"
                  )}
                />
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background transition-transform duration-500 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
            onClick={() => setLanguage(language === "en" ? "id" : "en")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="w-5 h-5" />
            {language === "en" ? "Bahasa Indonesia" : "English"}
          </button>

          <Button
            variant="luxury"
            size="xl"
            className="mt-4"
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (!user) {
                setOpenLogin(true);
              } else {
                navigate("/booking");
              }
            }}
          >
            {t("nav.book")}
          </Button>
        </div>
      </div>
      {/* LOGIN MODAL */}
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onOpenRegister={() => {
          setOpenLogin(false);
          setOpenRegister(true);
        }}
      />

      {/* REGISTER MODAL */}
      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        onOpenLogin={() => {
          setOpenRegister(false);
          setOpenLogin(true);
        }}
      />
    </>
  );
}
