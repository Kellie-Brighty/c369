import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export type UserProfile = {
  name: string;
  membershipType?: string;
  joinDate: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setProfile(docSnap.data() as UserProfile);
      } else {
        localStorage.removeItem("user");
      }
      setUser(user);
      setLoading(false);
    });
  }, []);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, name: string) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", user.uid), {
      name,
      joinDate: new Date().toISOString(),
      membershipType: "free",
      membershipExpiry: null,
    });
  };

  const updateMembership = async (planId: string) => {
    if (!user) return;

    const expiryDate = new Date();
    switch (planId) {
      case "monthly":
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        break;
      case "quarterly":
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        break;
      case "yearly":
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        break;
    }

    await setDoc(
      doc(db, "users", user.uid),
      {
        ...(profile || {}),
        membershipType: planId,
        membershipExpiry: expiryDate.toISOString(),
      },
      { merge: true }
    );
  };

  const logout = () => signOut(auth);

  return { user, profile, loading, login, register, logout, updateMembership };
};
