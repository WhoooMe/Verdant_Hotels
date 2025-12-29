import { useSearchParams, useNavigate } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowLeft } from "lucide-react";

export default function AvailabilityHero() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const guests = params.get("guests");

  return (
    <section className="relative pt-28 pb-20 bg-secondary">
      {/* LEFT & RIGHT CONTROLS */}
      <div className="absolute inset-x-0 top-32 flex items-center justify-between px-6">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="
            w-10 h-10
            rounded-full
            border border-[#E7DED3]
           bg-[#8B6F4E]
           text-white
           hover:bg-emerald-700
           flex items-center justify-center
            transition
            ml-24
          "
        >
          <ArrowLeft className="w-5 h-5 text-stone-100" />
        </button>
      </div>

      {/* CENTER CONTENT */}
      <div className="max-w-3xl mx-auto text-center px-6">
        <ScrollReveal>
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            Availability
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Find Your Perfect Stay
          </h1>

          <p className="text-sm text-stone-500">DESCRIPTION</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
