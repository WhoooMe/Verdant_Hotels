import { Navigation } from "@/components/Navigation";
import { createDinnerBooking } from "@/services/dinnerBookingService";
import { toast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { currencyFormat } from "@/contexts/LanguageContext";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  Clock,
  Users,
  Armchair,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DiningPricing } from "@/components/booking/DiningPricing";
import { useAuth } from "@/contexts/AuthContext";

export default function DiningBooking() {
  const { user } = useAuth();
  const location = useLocation();
  const { language, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [childAgeGroup, setChildAgeGroup] = useState<"under15" | "over15" | "">(
    ""
  );
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to make a reservation",
        variant: "destructive",
      });
      return;
    }

    if (formData.children > 0 && !childAgeGroup) {
      toast({
        title: "Children age required",
        description: "Please select children age group",
        variant: "destructive",
      });
      return;
    }

    try {
      await createDinnerBooking({
        userId: user.uid,
        name: user.displayName || "Guest",
        email: user.email || "",

        date: formData.date,
        time: formData.time,

        adults: formData.adults,
        children: formData.children,
        guests: formData.adults + formData.children,
        childrenAgeGroup: childAgeGroup || undefined,

        seating: formData.seating,
        occasion: formData.occasion,
        specialRequest: formData.notes,

        // EXPERIENCE
        experienceId: selectedExperience.id,
        experienceName: t(selectedExperience.nameKey),
        experiencePrice: selectedExperience.price,
        experienceTotal,

        // DINING
        adultPrice: ADULT_PRICE,
        childPrice: CHILD_PRICE,
        diningTotal,

        totalPrice,
      });

      toast({
        title: "Reservation Confirmed 🍽️",
        description: "Your dining reservation has been saved",
      });

      navigate("/my-reservations");
    } catch (err) {
      toast({
        title: "Failed",
        description: "Could not save reservation",
        variant: "destructive",
      });
    }
  };

  const [formData, setFormData] = useState({
    date: "",
    timeCategory: "", // breakfast | lunch | dinner
    time: "",
    adults: 1,
    children: 0,
    seating: "",
    occasion: "",
    notes: "",
  });

  const formatPrice = (price: number) =>
    currencyFormat[language](language === "en" ? price : price * 15500);

  const SEATING_OPTIONS = [
    "dining.seat.indoor",
    "dining.seat.outdoor",
    "dining.seat.window",
    "dining.seat.garden",
  ];

  const TIME_SLOTS = {
    breakfast: {
      labelKey: "dining.time.breakfast",
      range: "07:00 – 10:00",
      times: ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"],
    },
    lunch: {
      labelKey: "dining.time.lunch",
      range: "12:00 – 15:00",
      times: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"],
    },
    dinner: {
      labelKey: "dining.time.dinner",
      range: "18:00 – 22:00",
      times: [
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
      ],
    },
  };

  const isDirty =
    formData.date ||
    formData.time ||
    formData.adults > 1 ||
    formData.children > 0 ||
    formData.notes;

  const [selectedExperience, setSelectedExperience] = useState<any>(null);

  const diningExperiences = [
    {
      id: "verdant-dining",
      nameKey: "dining.verdant.name",
      subtitleKey: "dining.verdant.subtitle",
      descriptionKey: "dining.verdant.description",
      image: "/images/dining/verdant-dining.jpg",
      price: 650,
      badgeKey: "dining.verdantBadge.signature",
      recommended: true,
    },
    {
      id: "forest-terrace",
      nameKey: "dining.forest.name",
      subtitleKey: "dining.forest.subtitle",
      descriptionKey: "dining.forest.description",
      image: "/images/dining/forest-terrace.jpg",
      price: 850,
      badgeKey: "dining.forestBadge.signature",
    },
    {
      id: "chef-table",
      nameKey: "dining.chef.name",
      subtitleKey: "dining.chef.subtitle",
      descriptionKey: "dining.chef.description",
      image: "/images/dining/chef-table.jpg",
      price: 900,
      badgeKey: "dining.chefBadge.signature",
    },
  ];

  const navigate = useNavigate();

  function handleBack() {
    const forceHomeRoutes = ["/booking", "/dining-booking"];

    if (isDirty) {
      setShowLeaveWarning(true);
      return;
    }

    if (forceHomeRoutes.includes(location.pathname)) {
      navigate("/", { replace: true });
    } else {
      navigate(-1);
    }
  }

  function DetailRow({
    label,
    value,
    icon: Icon,
  }: {
    label: string;
    value: string;
    icon: React.ElementType;
  }) {
    return (
      <div className="flex items-start gap-3 border-b pb-3">
        <Icon className="w-4 h-4 text-muted-foreground mt-0.5" />
        <div className="flex justify-between w-full">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium text-right">{value}</span>
        </div>
      </div>
    );
  }

  const ADULT_PRICE = 45;
  const CHILD_PRICE = childAgeGroup === "over15" ? 10 : 0;

  const experienceTotal = selectedExperience
    ? selectedExperience.price * (formData.adults + formData.children)
    : 0;

  const diningTotal =
    formData.adults * ADULT_PRICE + formData.children * CHILD_PRICE;

  const totalPrice = experienceTotal + diningTotal;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {showLeaveWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[#FAF7F2] rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="font-serif text-xl mb-2">
              {t("warning.leaveMassage")}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t("warning.description")}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLeaveWarning(false)}
                className="px-4 py-2 rounded-lg border"
              >
                {t("warning.continue")}
              </button>

              <button
                onClick={() => navigate("/", { replace: true })}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                {t("warning.exit")}
              </button>
            </div>
          </div>
        </div>
      )}

      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-secondary relative">
          <button
            onClick={handleBack}
            className="
        absolute left-0
        flex items-center justify-center
        h-10 w-10 rounded-full
        border border-[#E7DED3]
        bg-[#8B6F4E]
        text-white
        hover:bg-emerald-700
        transition
        ml-24
      "
          >
            <ArrowLeft size={18} />
          </button>
          <div className="container mx-auto px-6">
            <ScrollReveal className="text-center max-w-3xl mx-auto">
              <div className="relative flex items-center justify-center mb-6">
                <p className="text-accent text-sm tracking-[0.3em] uppercase">
                  {t("dining_reservation.title")}
                </p>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
                {t("dining_reservation.description")}
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("dining.verdant.description")}
              </p>
            </ScrollReveal>
          </div>
        </section>
        {/*Progress Bar*/}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {[
                t("dining.steps.experience"),
                t("dining.steps.datetime"),
                t("dining.steps.confirmation"),
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
                    {step > index + 1 ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
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
        {/* CONTENT */}
        <div className="max-w-4xl mx-auto mt-16 bg-white rounded-2xl shadow p-8 mb-24">
          {step === 1 && (
            <div className="grid md:grid-cols-3 gap-8">
              {diningExperiences.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedExperience(item);
                    setStep(2);
                  }}
                  className="group text-left rounded-2xl overflow-hidden  bg-[#FAF7F2] border border-[#E7DED3] hover:shadow-xl transition flex flex-col h-full"
                >
                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden">
                    {/* BADGE */}
                    {item.badgeKey && (
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-emerald-700 backdrop-blur shadow">
                          {item.recommended && (
                            <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                          )}

                          {t(item.badgeKey)}
                        </span>
                      </div>
                    )}

                    <img
                      src={item.image}
                      alt={t(item.nameKey)}
                      className="h-full w-full object-cover
              transition-transform duration-500
              group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-widest text-emerald-700 mb-1">
                        {t(item.subtitleKey)}
                      </p>
                      <h3 className="text-xl font-serif mb-2">
                        {t(item.nameKey)}
                      </h3>
                      <p className="mt-4 text-lg font-serif text-foreground">
                        {formatPrice(item.price)}
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          / {t("common.perPerson")}
                        </span>
                      </p>
                    </div>

                    <div
                      className=" mt-6 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 relative
                                    after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0  after:bg-emerald-700
                                    after:transition-all after:duration-300 group-hover:after:w-full"
                    >
                      {t("common.selectExperience")}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <>
              {/* TANGGAL-nya */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  {t("dining.reservastion")}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>
              {/* KATEGORI JAM-nya */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3">
                  {t("dining.time")}
                </label>

                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(TIME_SLOTS).map(([key, slot]) => (
                    <button
                      key={key}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          timeCategory: key,
                          time: "",
                        })
                      }
                      className={`
          p-4 rounded-xl border text-left
          ${
            formData.timeCategory === key
              ? "border-primary bg-primary/5"
              : "border-[#E7DED3] bg-[#FAF7F2] hover:bg-slate-100"
          }
        `}
                    >
                      <p className="font-medium">{t(slot.labelKey)}</p>
                      <p className="text-xs text-muted-foreground">
                        {slot.range}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              {/* JAM-nya */}
              {formData.timeCategory && (
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-3">
                    {t("dining.preferredTime")}
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {TIME_SLOTS[formData.timeCategory].times.map((time) => (
                      <button
                        key={time}
                        onClick={() => setFormData({ ...formData, time })}
                        className={`
            px-4 py-2 rounded-lg border text-sm
            ${
              formData.time === time
                ? "bg-primary text-white"
                : "bg-white hover:bg-muted"
            }
          `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* PRICING INFO */}
              <div className="mb-10">
                <DiningPricing />
              </div>
              {/* TAMBAH TAMU 18+*/}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm mb-2">
                    {t("dining.adults")}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.adults}
                    onChange={(e) =>
                      setFormData({ ...formData, adults: +e.target.value })
                    }
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </div>
                {/* ANAK-ANAK */}
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">
                    {t("dining.children")}
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.children}
                    onChange={(e) => {
                      const value = +e.target.value;
                      setFormData({ ...formData, children: value });

                      if (value === 0) {
                        setChildAgeGroup("");
                      }
                    }}
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </div>
                {formData.children > 0 && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-3">
                      {t("dining.childrenAgeGroup")}
                    </label>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setChildAgeGroup("under15")}
                        className={`px-4 py-2 rounded-lg border text-sm transition ${
                          childAgeGroup === "under15"
                            ? "bg-primary text-white"
                            : "bg-white hover:bg-muted"
                        }`}
                      >
                        {t("dining.under15")}
                      </button>

                      <button
                        onClick={() => setChildAgeGroup("over15")}
                        className={`px-4 py-2 rounded-lg border text-sm transition ${
                          childAgeGroup === "over15"
                            ? "bg-primary text-white"
                            : "bg-white hover:bg-muted"
                        }`}
                      >
                        {t("dining.over15")}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* TEMPAT DUDUK */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3">
                  {t("dining.seatingPreference")}
                </label>

                <div className="flex flex-wrap gap-3">
                  {SEATING_OPTIONS.map((key) => (
                    <button
                      key={key}
                      onClick={() => setFormData({ ...formData, seating: key })}
                      className={`
      px-4 py-2 rounded-full border text-sm
      ${
        formData.seating === key
          ? "bg-primary text-white"
          : "bg-white hover:bg-muted"
      }
    `}
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>
              </div>
              {/* EVENT-nya */}
              <div className="mb-8">
                <label className="block text-sm mb-2">
                  {t("dining.occasion")}
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) =>
                    setFormData({ ...formData, occasion: e.target.value })
                  }
                  className="w-full rounded-xl border px-4 py-3"
                >
                  <option value="">{t("dining.none")}</option>
                  <option>{t("dining.birthday")}</option>
                  <option>{t("dining.anniversary")}</option>
                  <option>{t("dining.business")}</option>
                  <option>{t("dining.honeymoon")}</option>
                </select>
              </div>
              {/* SPECIAL REQUESTS */}
              <div className="mb-10">
                <label className="block text-sm mb-2">
                  {t("dining.specialRequests")}
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  onInput={(e) => {
                    e.currentTarget.style.height = "auto";
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                  }}
                  className="w-full rounded-xl border px-4 py-3 resize-none overflow-hidden"
                  placeholder={t("dining.specialRequests.placeholder")}
                />
              </div>
              {/* CTA BUTTONS */}
              <div className="flex items-center justify-between">
                {/* BACK */}
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition"
                >
                  {t("dining.back")}
                </button>

                {/* CONTINUE */}
                <button
                  onClick={() => {
                    if (formData.children > 0 && !childAgeGroup) {
                      toast({
                        title: "Children age required",
                        description: "Please select children age group",
                        variant: "destructive",
                      });
                      return;
                    }

                    setStep(3);
                  }}
                  className="px-8 py-3 rounded-xl bg-primary text-white flex items-center gap-2 hover:bg-primary/90 transition"
                >
                  {t("dining.continue")}
                  <ArrowRight size={18} />
                </button>
              </div>
            </>
          )}
          {step === 3 && selectedExperience && (
            <>
              {/* HEADER + SUMMARY */}
              <div className="mb-6 flex items-start justify-between">
                {/* LEFT */}
                <div>
                  <h2 className="font-serif text-3xl text-foreground">
                    {t("dining.summaryRev")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t("dining.summary.Description")}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="text-right space-y-1 min-w-[220px]">
                  <p className="text-sm text-muted-foreground">
                    {t(selectedExperience.nameKey)}
                  </p>
                  <p className="text-sm">{formatPrice(experienceTotal)}</p>

                  <p className="text-sm text-muted-foreground">
                    {t("dining.fee")}
                  </p>
                  <p className="text-sm">{formatPrice(diningTotal)}</p>
                </div>
              </div>
              {/* FULL WIDTH DIVIDER */}
              <div className="border-t border-border mb-4" />
              {/* TOTAL ROW */}
              <div className="flex justify-end mb-10">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {t("dining.totals")}
                  </p>
                  <p className="text-2xl font-serif">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-10 mb-12">
                {/* LEFT — EXPERIENCE CARD */}
                <div className="rounded-2xl overflow-hidden border bg-[#FAF7F2]">
                  <div className="relative h-56">
                    <img
                      src={selectedExperience.image}
                      alt={t(selectedExperience.nameKey)}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-xs tracking-widest uppercase opacity-80">
                        {t("dining.selectExp")}
                      </p>
                      <h3 className="font-serif text-xl">
                        {selectedExperience.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      {t("dining.price.person")}
                    </p>
                    <p className="font-serif text-lg">
                      {formatPrice(selectedExperience.price)}
                    </p>
                  </div>
                </div>

                {/* RIGHT — DETAILS */}
                <div className="space-y-5 text-sm">
                  <DetailRow
                    label={t("dining.Date")}
                    value={formData.date}
                    icon={Calendar}
                  />
                  <DetailRow
                    label={t("dining.Time")}
                    value={`${t(
                      TIME_SLOTS[formData.timeCategory]?.labelKey
                    )} · ${formData.time}`}
                    icon={Clock}
                  />
                  <DetailRow
                    label={t("dining.Guest")}
                    value={`${formData.adults} Adult${
                      formData.adults > 1 ? "s" : ""
                    }${
                      formData.children > 0
                        ? `, ${formData.children} Child`
                        : ""
                    }`}
                    icon={Users}
                  />

                  {formData.seating && (
                    <DetailRow
                      label={t("dining.Seating")}
                      value={t(formData.seating)}
                      icon={Armchair}
                    />
                  )}

                  {formData.occasion && (
                    <DetailRow
                      label={t("dining.OccasionSum")}
                      value={formData.occasion}
                      icon={Sparkles}
                    />
                  )}

                  {formData.notes && (
                    <div>
                      <p className="text-muted-foreground mb-1">
                        {t("dining.SpecialRequest.Sum")}
                      </p>
                      <p className="bg-muted rounded-xl p-4 leading-relaxed">
                        {formData.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* FOOTER CTA */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl border text-sm hover:bg-muted transition"
                >
                  {t("dining.Back.Sum")}
                </button>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-serif">
                    {formatPrice(totalPrice)}
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  className="px-10 py-3 rounded-xl bg-primary text-white flex items-center justify-center gap-2 hover:bg-primary/90 transition"
                >
                  {t("dining.Confirm.Rev")}
                  <Check size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
