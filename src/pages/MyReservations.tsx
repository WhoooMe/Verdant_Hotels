import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { getMyReservations } from "@/services/bookingService";
import { ArrowBigLeft, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface Reservation {
  id: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
}

export default function MyReservations() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

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
    console.log("AUTH USER UID:", user?.uid);
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchReservations = async () => {
      const data = await getMyReservations(user.uid);
      console.log("RESERVATIONS RESULT:", data);
      setReservations(data as Reservation[]);
      setLoading(false);
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
            .map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-xl shadow p-6 border flex flex-col gap-2"
              >
                {/* HEADER */}
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold">{res.roomType}</h2>

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
                <p className="text-sm text-muted-foreground">
                  {res.checkIn} → {res.checkOut}
                </p>

                {/* Meta */}
                <p className="text-sm">
                  <strong>{calculateNights(res.checkIn, res.checkOut)}</strong>{" "}
                  {t("reservations.nights")} {t("dot")}{" "}
                  <strong>{res.guests}</strong> {t("reservations.confirm")}
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
