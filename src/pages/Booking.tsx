import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import {
  Calendar,
  Users,
  ArrowRight,
  Check,
  MessageCircle,
  Phone,
  Baby,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import roomSuite from "@/assets/room-suite.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import villaGarden from "@/assets/villa-garden.jpg";

const roomOptions = [
  { id: "jungle-suite", name: "Executive Suite", price: 450, image: roomSuite },
  { id: "canopy-room", name: "Canopy Room", price: 320, image: roomDeluxe },
  { id: "garden-villa", name: "Garden Villa", price: 750, image: villaGarden },
];

function BookingContent() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [showCustomGuests, setShowCustomGuests] = useState(false);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    roomType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast({
        title: "Booking Request Received",
        description: "We will contact you shortly to confirm your reservation.",
      });
    }
  };

  const selectedRoom = roomOptions.find((r) => r.id === formData.roomType);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
              {t("booking.subtitle")}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
              {t("booking.title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("booking.description")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[
              t("booking.steps.dates"),
              t("booking.steps.details"),
              t("booking.steps.confirmation"),
            ].map((label, index) => (
              <div key={label} className="flex items-center gap-2 md:gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step > index + 1
                      ? "bg-accent text-accent-foreground"
                      : step === index + 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={`hidden md:block text-sm ${
                    step === index + 1
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {index < 2 && <div className="w-8 md:w-16 h-px bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Dates & Room */}
              {step === 1 && (
                <ScrollReveal>
                  <div className="space-y-8">
                    {/* Date Selection */}
                    <div className="grid md:grid-cols-4 gap-6 p-8 bg-card rounded-lg border border-border">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("booking.checkin")}
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="date"
                            value={formData.checkIn}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                checkIn: e.target.value,
                              })
                            }
                            className="w-full bg-background border border-input rounded-md pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        {" "}
                        {/* Disini Awal Guests */}
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("booking.checkout")}
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="date"
                            value={formData.checkOut}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                checkOut: e.target.value,
                              })
                            }
                            className="w-full bg-background border border-input rounded-md pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("booking.guests")}
                        </label>

                        {/* SELECT */}
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <select
                            value={showCustomGuests ? "5+" : formData.guests}
                            onChange={(e) => {
                              if (e.target.value === "5+") {
                                setShowCustomGuests(true);
                                setFormData({ ...formData, guests: "" });
                              } else {
                                setShowCustomGuests(false);
                                setFormData({
                                  ...formData,
                                  guests: e.target.value,
                                });
                              }
                            }}
                            className="w-full bg-background border border-input rounded-md pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
                          >
                            <option value="1">{t("booking.guests1")}</option>
                            <option value="2">{t("booking.guests2")}</option>
                            <option value="3">{t("booking.guests3")}</option>
                            <option value="4">{t("booking.guests4")}</option>
                            <option value="5+">
                              {t("booking.guests5plus")}
                            </option>
                          </select>
                        </div>

                        {/* CUSTOM INPUT */}
                        {showCustomGuests && (
                          <div className="mt-3 relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                              type="number"
                              min={5}
                              placeholder={t("booking.enterGuests")}
                              value={formData.guests}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  guests: e.target.value,
                                })
                              }
                              className="w-full bg-background border border-input rounded-md pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                              required
                            />
                          </div>
                        )}
                      </div>
                      {/* Children */}
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          {t("booking.children")}
                        </label>

                        <select
                          value={childrenCount}
                          onChange={(e) => {
                            const count = Number(e.target.value);
                            setChildrenCount(count);
                            setChildrenAges(Array(count).fill(0));
                          }}
                          className="w-full bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        >
                          <option value={0}>{t("booking.noChildren")}</option>
                          <option value={1}>{t("booking.oneChildren")}</option>
                          <option value={2}>{t("booking.twoChildren")}</option>
                          <option value={3}>
                            {t("booking.threeChildren")}
                          </option>
                          <option value={4}>{t("booking.fourChildren")}</option>
                        </select>

                        {childrenCount > 0 && (
                          <div className="mt-3 space-y-2">
                            {childrenAges.map((age, index) => (
                              <input
                                key={index}
                                type="number"
                                min={0}
                                max={17}
                                placeholder={`${t("booking.child")} ${
                                  index + 1
                                } — ${t("booking.ageC")}`}
                                value={age || ""}
                                onChange={(e) => {
                                  const ages = [...childrenAges];
                                  ages[index] = Number(e.target.value);
                                  setChildrenAges(ages);
                                }}
                                className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>{" "}
                    {/* Akhir Guests */}
                    {/* Room Selection */}
                    <div>
                      <h3 className="font-serif text-2xl text-foreground mb-6">
                        {" "}
                        {t("booking.selectRoom")}
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        {roomOptions.map((room) => (
                          <button
                            key={room.id}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, roomType: room.id })
                            }
                            className={`text-left rounded-lg overflow-hidden border-2 transition-all ${
                              formData.roomType === room.id
                                ? "border-primary shadow-card"
                                : "border-border hover:border-primary/30"
                            }`}
                          >
                            <div className="aspect-[4/3] overflow-hidden">
                              <img
                                src={room.image}
                                alt={room.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="font-serif text-lg text-foreground">
                                {room.name}
                              </h4>
                              <p className="text-primary font-medium">
                                ${room.price}{" "}
                                <span className="text-muted-foreground text-sm">
                                  {t("booking.perNight")}
                                </span>
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Step 2: Guest Details */}
              {step === 2 && (
                <ScrollReveal>
                  <div className="p-8 bg-card rounded-lg border border-border">
                    <h3 className="font-serif text-2xl text-foreground mb-6">
                      Guest Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("booking.firstName")}
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("booking.lastName")}
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("booking.email")}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("booking.phone")}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("booking.specialRequests")}
                        </label>
                        <textarea
                          value={formData.specialRequests}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              specialRequests: e.target.value,
                            })
                          }
                          rows={4}
                          className="w-full bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <ScrollReveal>
                  <div className="p-8 bg-card rounded-lg border border-border">
                    <h3 className="font-serif text-2xl text-foreground mb-6">
                      {t("booking.summary")}
                    </h3>

                    {selectedRoom && (
                      <div className="flex gap-6 mb-8 pb-8 border-b border-border">
                        <div className="w-32 h-24 rounded-lg overflow-hidden">
                          <img
                            src={selectedRoom.image}
                            alt={selectedRoom.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif text-xl text-foreground">
                            {selectedRoom.name}
                          </h4>
                          <p className="text-muted-foreground">
                            {formData.checkIn} — {formData.checkOut}
                          </p>
                          <p className="text-muted-foreground">
                            {formData.guests} Guests
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t("booking.guest")}
                        </span>
                        <span className="text-foreground">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span className="text-foreground">
                          {formData.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="text-foreground">
                          {formData.phone}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-secondary rounded-lg text-center">
                      <p className="text-muted-foreground text-sm mb-2">
                        {t("booking.estimatedTotal")}
                      </p>
                      <p className="font-serif text-3xl text-primary">
                        ${selectedRoom?.price || 0}
                        <span className="text-lg text-muted-foreground">
                          {" "}
                          /night
                        </span>
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                <Button
                  type="submit"
                  variant="luxury"
                  size="lg"
                  disabled={step === 1 && !formData.roomType}
                >
                  {step === 3 ? t("booking.confirm") : t("booking.continue")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>

            {/* Alternative Contact */}
            <div className="mt-16 p-8 bg-secondary rounded-lg text-center">
              <p className="text-muted-foreground mb-6">
                {t("booking.alternativeContact")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/62361123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-background rounded-md font-medium hover:bg-[#25D366]/90 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href="tel:+62361123456"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Booking() {
  return <BookingContent />;
}
