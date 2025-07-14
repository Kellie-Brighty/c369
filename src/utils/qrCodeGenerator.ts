import { AES } from "crypto-js";

const ENCRYPTION_KEY = "gym_membership_secret"; // In production, use environment variable

export const generateMembershipQR = (
  userId: string,
  membershipData: {
    type: string;
    expiryDate: string;
  }
) => {
  const payload = {
    u: userId,
    t: membershipData.type,
    e: membershipData.expiryDate,
  };

  return AES.encrypt(JSON.stringify(payload), ENCRYPTION_KEY).toString();
};
