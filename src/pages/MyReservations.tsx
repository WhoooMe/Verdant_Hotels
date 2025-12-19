import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { getMyReservations } from "@/services/bookingService";

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
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-24">
        <h1 className="text-3xl font-serif mb-8">Reservasi Saya</h1>

        {/* NANTI DATA FIRESTORE */}
        {/* LOADING */}
        {loading && (
          <div className="text-center text-muted-foreground">
            Loading reservations...
          </div>
        )}

        {/* EMPTY */}
        {!loading && reservations.length === 0 && (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
            Belum ada reservasi
          </div>
        )}

        {/* DATA */}
        <div className="grid gap-6">
          {reservations.map((res) => (
            <div key={res.id} className="bg-white rounded-xl shadow p-6 border">
              <h2 className="text-xl font-semibold mb-2">{res.roomType}</h2>

              <p className="text-sm text-muted-foreground">
                {res.checkIn} → {res.checkOut}
              </p>

              <p className="mt-2">
                Guests: <strong>{res.guests}</strong>
              </p>

              <p className="text-sm text-muted-foreground mt-1">
                Booked by: {res.name} ({res.email})
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
