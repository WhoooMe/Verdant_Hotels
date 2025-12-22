import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { getMyReservations } from "@/services/bookingService";
import { ArrowBigLeft, Trash2, BedDouble, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { getMyDiningReservations } from "@/services/dinnerBookingService";

interface Reservation {
  id: string;
  roomType: string;
  type: "room";
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
}

interface DiningReservation {
  id: string;
  type: "dining";
  experienceName: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
}

export default function MyReservations() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  type AnyReservation = Reservation | DiningReservation;
  const [reservations, setReservations] = useState<AnyReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "room" | "dining">("all");

  const calculateNights = (checkIn: string, checkOut: string) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate.getTime() - inDate.getTime();
    return Math.max(diff / (1000 * 60 * 60 * 24), 1);
  };

  const generateBookingCode = (id: string) => {
    return `VD-${id.slice(0, 6).toUpperCase()}`;
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchReservations = async () => {
      try {
        setLoading(true);

        // ROOM
        const roomData: Reservation[] = (await getMyReservations(user.uid)).map(
          (r: any) => ({
            ...r,
            type: "room",
          })
        );

        // DINING
        const diningRaw = await getMyDiningReservations(user.uid);

        const diningData: DiningReservation[] = (diningRaw ?? []).map(
          (d: any) => ({
            ...d,
            type: "dining",
          })
        );

        setReservations([...roomData, ...diningData]);
      } catch (error) {
        console.error("FAILED FETCH RESERVATIONS:", error);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const key = `hidden_reservations_${user.uid}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      setHiddenIds(JSON.parse(stored));
    }
  }, [user]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleHide = (id: string) => {
    if (!user) return;

    const key = `hidden_reservations_${user.uid}`;
    const updated = [...hiddenIds, id];

    setHiddenIds(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-24">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-muted transition"
            aria-label="Kembali"
          >
            <ArrowBigLeft className="w-10 h-10" />
          </button>

          <h1 className="text-3xl font-serif">{t("reservations.title")}</h1>
        </div>
        {/*BREAD CRUMB*/}
        <div className="flex gap-3 mb-10">
          {[
            { key: "all", label: "All Reservations" },
            { key: "room", label: "Rooms" },
            { key: "dining", label: "Dining" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as any)}
              className={`
        px-5 py-2 rounded-full text-sm font-medium transition
        ${
          filter === item.key
            ? "bg-primary text-white"
            : "bg-muted text-muted-foreground hover:bg-muted/70"
        }
      `}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* NANTI DATA FIRESTORE */}
        {/* LOADING */}
        {loading && (
          <div className="text-center text-muted-foreground">
            {t("reservations.loading")}...
          </div>
        )}

        {/* EMPTY */}
        {!loading && reservations.length === 0 && (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
            {t("reservations.empty")}
          </div>
        )}

        {/* DATA */}
        <div className="grid gap-6">
          {reservations
            .filter((res) => !hiddenIds.includes(res.id))
            .filter((res) => filter === "all" || res.type === filter)
            .map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-xl shadow p-6 border flex flex-col gap-2"
              >
                {/* HEADER */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {res.type === "room" ? (
                      <BedDouble className="w-5 h-5 text-primary" />
                    ) : (
                      <UtensilsCrossed className="w-5 h-5 text-primary" />
                    )}

                    <h2 className="text-xl font-semibold">
                      {res.type === "room" ? res.roomType : res.experienceName}
                    </h2>

                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium
      ${
        res.type === "room"
          ? "bg-blue-100 text-blue-700"
          : "bg-green-100 text-green-700"
      }`}
                    >
                      {res.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono">
                      {generateBookingCode(res.id)}
                    </span>

                    <button
                      onClick={() => handleHide(res.id)}
                      className="
    p-1.5 rounded-full
    text-red-500
    hover:bg-red-50
    hover:text-red-600
    transition
  "
                      aria-label={t("reservations.hide")}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* DATE */}
                <p className="text-sm text-muted-foreground italic">
                  {res.type === "room"
                    ? `${res.checkIn} → ${res.checkOut}`
                    : `${res.date} • ${res.time}`}
                </p>

                {/* Meta */}
                <p className="text-sm text-muted-foreground">
                  {res.type === "room" ? (
                    <>
                      {calculateNights(res.checkIn, res.checkOut)} nights •{" "}
                      {res.guests} guests
                    </>
                  ) : (
                    <>{res.guests} guests • Dining Experience</>
                  )}
                </p>

                {/* BOOKER */}
                <p className="text-sm text-muted-foreground">
                  {t("reservations.bookedBy")} {res.name} ({res.email})
                </p>
              </div>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
