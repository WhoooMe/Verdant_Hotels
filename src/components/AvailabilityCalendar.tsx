import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

/* ---------- AVAILABILITY DATA ---------- */
type BookedRange = {
  start: string;
  end: string;
};

const bookedRanges: BookedRange[] = [
  { start: "2025-12-10", end: "2025-12-13" },
  { start: "2025-12-18", end: "2025-12-22" },
];

/* ---------- HELPERS ---------- */
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatISO(date: Date) {
  return date.toISOString().split("T")[0];
}

/* ---------- AVAILABILITY HELPERS ---------- */

function isDateInRange(date: string, start: string, end: string) {
  return date >= start && date < end;
}

function isDateBooked(date: string) {
  return bookedRanges.some((range) =>
    isDateInRange(date, range.start, range.end)
  );
}

function isRangeValid(start: string, end: string) {
  return !bookedRanges.some((range) => start < range.end && end > range.start);
}

/* ---------- MAIN COMPONENT ---------- */
export default function AvailabilityCalendar() {
  const [params, setParams] = useSearchParams();

  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");

  const [currentMonth, setCurrentMonth] = useState(
    checkIn ? new Date(checkIn) : new Date()
  );

  useEffect(() => {
    if (checkIn) {
      setCurrentMonth(new Date(checkIn));
    }
  }, [checkIn]);

  function nextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  }

  function prevMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  }

  function handleSelect(date: string) {
    if (isDateBooked(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setParams({ checkIn: date });
      return;
    }

    if (date < checkIn) {
      setParams({ checkIn: date });
      return;
    }

    if (!isRangeValid(checkIn, date)) {
      toast.warning("Selected date range is not available");
      return;
    }

    setParams({
      checkIn,
      checkOut: date,
    });
  }

  const firstMonth = currentMonth;

  const secondMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1
  );

  return (
    <div>
      {/* MONTH NAVIGATION */}
      <div className="flex items-center justify-center gap-32 mb-12">
        <button
          onClick={prevMonth}
          className="
      flex items-center gap-2
      text-sm tracking-wide
      text-maroon-deep
      hover:text-muted-foreground
      transition
    "
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={nextMonth}
          className="
      flex items-center gap-2
      text-sm tracking-wide
      text-maroon-deep
      hover:text-muted-foreground
      transition
    "
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <CalendarMonth
          year={firstMonth.getFullYear()}
          month={firstMonth.getMonth()}
          checkIn={checkIn}
          checkOut={checkOut}
          onSelect={handleSelect}
        />

        <CalendarMonth
          year={secondMonth.getFullYear()}
          month={secondMonth.getMonth()}
          checkIn={checkIn}
          checkOut={checkOut}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}

/* ---------- MONTH COMPONENT ---------- */
type MonthProps = {
  year: number;
  month: number;
  checkIn: string | null;
  checkOut: string | null;
  onSelect: (date: string) => void;
};

function isPastDate(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function CalendarMonth({
  year,
  month,
  checkIn,
  checkOut,
  onSelect,
}: MonthProps) {
  const days = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);

  return (
    <div>
      <h3 className="font-serif text-2xl mb-6 text-center">
        {new Date(year, month).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })}
      </h3>

      {/* WEEKDAYS */}
      <div className="grid grid-cols-7 text-center text-xs tracking-wide mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* DAYS */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: days }).map((_, i) => {
          const dateObj = new Date(year, month, i + 1);
          const date = formatISO(dateObj);
          const past = isPastDate(dateObj);
          const booked = isDateBooked(date);

          let disabled = past || booked;
          let muted = false;

          if (checkIn && !checkOut && date > checkIn) {
            const valid = isRangeValid(checkIn, date);
            if (!valid) muted = true;
          }

          const isSelected =
            date === checkIn ||
            date === checkOut ||
            (checkIn && checkOut && date > checkIn && date < checkOut);

          return (
            <button
              key={date}
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`
    aspect-square
    flex items-center justify-center
    font-serif text-xl
    transition
    ${
      disabled
        ? "text-stone-300 cursor-not-allowed"
        : muted
        ? "text-stone-400"
        : isSelected
        ? "bg-maroon-light text-white"
        : "hover:bg-stone-200"
    }
  `}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
