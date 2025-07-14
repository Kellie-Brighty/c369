import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { generateMembershipQR } from "../utils/qrCodeGenerator";

export type PlanId = "free" | "monthly" | "quarterly" | "yearly";

const PLAN_DURATIONS: Record<Exclude<PlanId, "free">, number> = {
  monthly: 30,
  quarterly: 90,
  yearly: 365,
};

export const getMembershipDetails = async () => {
  if (!auth.currentUser) throw new Error("No authenticated user");
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userDoc = await getDoc(userRef);
  return userDoc.data();
};

export const cancelMembership = async () => {
  if (!auth.currentUser) throw new Error("No authenticated user");
  const userRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userRef, {
    membershipType: "free",
    membershipUpdatedAt: new Date().toISOString(),
    membershipExpiryDate: null,
    membershipQR: null,
  });
};

export const updateMembership = async (planId: PlanId) => {
  if (!auth.currentUser) throw new Error("No authenticated user");
  if (planId === "free") throw new Error("Cannot upgrade to free plan");

  // Simulate payment processing
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + PLAN_DURATIONS[planId]);

  const membershipData = {
    type: planId,
    expiryDate: expiryDate.toISOString(),
  };

  const qrCode = generateMembershipQR(auth.currentUser.uid, membershipData);

  const userRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userRef, {
    membershipType: planId,
    membershipUpdatedAt: new Date().toISOString(),
    membershipExpiryDate: expiryDate.toISOString(),
    membershipQR: qrCode,
  });

  return { qrCode, expiryDate: expiryDate.toISOString() };
};
