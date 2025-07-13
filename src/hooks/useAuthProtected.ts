import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const useAuthProtected = (_feature: string) => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const protectedAction = (callback: () => void) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    callback();
  };

  return { showAuthModal, setShowAuthModal, protectedAction };
};
