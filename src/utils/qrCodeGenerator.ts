// import { AES } from "crypto-js";

// const ENCRYPTION_KEY = "gym_membership_secret"; // In production, use environment variable

const BASE_URL = import.meta.env.VITE_APP_URL || window.location.origin;

export const generateMembershipQR = (
  userId: string,
  membershipData: {
    type: string;
    expiryDate: string;
  }
) => {
  const payload = {
    userId,
    type: membershipData.type,
    expiryDate: membershipData.expiryDate,
  };

  const data = encodeURIComponent(JSON.stringify(payload));
  return `${BASE_URL}/verify?data=${data}`;
};
