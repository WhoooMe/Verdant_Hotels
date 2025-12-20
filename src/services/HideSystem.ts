import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function hideReservationForUser(reservationId: string) {
  const ref = doc(db, "reservations", reservationId);

  await updateDoc(ref, {
    hiddenByUser: true,
  });
}
