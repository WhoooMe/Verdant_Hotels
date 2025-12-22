import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const getMyDiningReservations = async (uid: string) => {
  const snapshot = await getDocs(
    query(collection(db, "dinnerBookings"), where("userId", "==", uid))
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export interface DinnerBookingPayload {
  userId: string;
  name: string;
  email: string;

  date: string;
  timeCategory: "breakfast" | "lunch" | "dinner";
  time: string;

  // GUESTS
  adults: number;
  children: number;
  guests: number;
  childrenAgeGroup?: "under15" | "over15";

  seating?: string;
  occasion?: string;
  specialRequest?: string;

  // EXPERIENCE
  experienceId: string;
  experienceName: string;
  experiencePrice: number;
  experienceTotal: number;

  // DINING PRICING
  adultPrice: number;
  childPrice: number;
  diningTotal: number;

  // FINAL
  totalPrice: number;

  createdAt?: any;
}

export async function createDinnerBooking(data: DinnerBookingPayload) {
  return await addDoc(collection(db, "dinnerBookings"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}
