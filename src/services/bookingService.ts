import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface BookingPayload {
  userId: string;
  name: string;
  email: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  children: number;
  childrenAges: number[];
  specialRequests?: string;
}

/* CREATE BOOKING */
export async function createBooking(data: BookingPayload) {
  return await addDoc(collection(db, "reservations"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/* GET MY RESERVATIONS */
export async function getMyReservations(userId: string) {
  const q = query(
    collection(db, "reservations"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
