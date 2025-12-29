import { useLocation } from "react-router-dom";
import AvailabilityToolbar from "@/components/AvailabilityToolbar";
import AvailabilityHero from "@/components/AvailabilityHero";
import { Navigation } from "@/components/Navigation";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { useSearchParams } from "react-router-dom";

export default function AvailabilityPages() {
  const location = useLocation();

  const [params] = useSearchParams();

  const checkIn = params.get("checkIn") || undefined;
  const checkOut = params.get("checkOut") || undefined;
  const guests = params.get("guests")
    ? Number(params.get("guests"))
    : undefined;

  return (
    <>
      <Navigation />

      <section className="bg-secondary">
        <AvailabilityHero />

        <AvailabilityToolbar
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
        />
      </section>

      <div id="availability-calendar" className="max-w-7xl mx-auto px-6 py-16">
        <AvailabilityCalendar />
      </div>
    </>
  );
}
