import { Calendar, Users } from "lucide-react";

type AvailabilityToolbarProps = {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
};

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AvailabilityToolbar({
  checkIn,
  checkOut,
  guests,
}: AvailabilityToolbarProps) {
  return (
    <section className="bg-background border-y border-black/10">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* CENTER INFO */}
        <div className="flex items-center justify-center gap-10 text-sm">
          {/* DATE */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-stone-400" />
            <span className="font-medium">
              {checkIn && checkOut
                ? `${formatDate(checkIn)} – ${formatDate(checkOut)}`
                : "Select dates"}
            </span>
          </div>

          <div className="w-12 h-px bg-border" />

          {/* GUEST */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-stone-400" />
            <span className="font-medium">
              {guests ? `${guests} Guests` : "Guests"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
