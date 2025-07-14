import type { ReactNode } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import {
  CreditCard,
  User,
  ChevronRight,
  LogOut,
  Sun,
  Moon,
  Crown,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { LogoutModal } from "../components/LogoutModal";
import { MembershipModal } from "../components/MembershipModal";
import { CancelMembershipModal } from "../components/CancelMembershipModal";
import { useState } from "react";
import {
  updateMembership,
  getMembershipDetails,
  cancelMembership,
  type PlanId,
} from "../services/membershipService";
import { MembershipQR } from "../components/MembershipQR";

const ProfilePage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, profile, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [membershipQR, setMembershipQR] = useState({
    qrCode: "",
    expiryDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const refreshMembershipDetails = async () => {
    try {
      const details = await getMembershipDetails();
      if (details?.membershipQR && details?.membershipExpiryDate) {
        setMembershipQR({
          qrCode: details.membershipQR,
          expiryDate: details.membershipExpiryDate,
        });
      }
    } catch (error) {
      console.error("Failed to fetch membership details:", error);
    }
  };

  const handleMembershipClick = async () => {
    const membershipType = profile?.membershipType || "free";
    if (membershipType === "free") {
      setShowMembershipModal(true);
    } else {
      await refreshMembershipDetails();
      setShowQRModal(true);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const handleUpgrade = async (planId: PlanId) => {
    try {
      setIsLoading(true);
      const result = await updateMembership(planId);
      setMembershipQR({ qrCode: result.qrCode, expiryDate: result.expiryDate });
      setShowMembershipModal(false);
      setShowQRModal(true);
      await refreshMembershipDetails();
    } catch (error) {
      console.error("Failed to upgrade membership:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setIsLoading(true);
      await cancelMembership();
      await refreshMembershipDetails();
      setShowCancelModal(false);
    } catch (error) {
      console.error("Failed to cancel membership:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const MembershipTag = ({ type }: { type: string }) => {
    const isPremium = type !== "free";
    return (
      <div
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          isPremium
            ? "bg-brand-red text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
        }`}
      >
        {isPremium && <Crown size={14} className="inline-block mr-1" />}
        {type === "free" ? "Free Plan" : type}
      </div>
    );
  };

  const ProfileItem = ({
    icon,
    title,
    subtitle,
    onClick,
    tag,
    showUpgrade,
    showCancel,
  }: {
    icon: ReactNode;
    title: string;
    subtitle: string;
    onClick?: () => void;
    tag?: string;
    showUpgrade?: boolean;
    showCancel?: boolean;
  }) => (
    <button
      onClick={onClick}
      className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {title}
            </h3>
            {tag && <MembershipTag type={tag} />}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        {showUpgrade ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMembershipModal(true);
            }}
            className="px-4 py-1 bg-brand-red text-white text-sm rounded-full hover:bg-red-700 transition-colors"
          >
            Upgrade
          </button>
        ) : showCancel ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCancelModal(true);
            }}
            className="px-4 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
        ) : (
          <ChevronRight className="text-gray-400" size={20} />
        )}
      </div>
    </button>
  );

  const membershipType = profile?.membershipType || "free";
  const isFreePlan = membershipType === "free";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-3xl bg-brand-red shadow-xl shadow-red-500/20 flex items-center justify-center">
            <User className="text-white" size={40} />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {profile?.name || user?.email?.split("@")[0]}
              </h2>
              <MembershipTag type={membershipType} />
            </div>
            <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <ProfileItem
            icon={<CreditCard className="text-brand-red" size={24} />}
            title="Membership"
            subtitle={
              isFreePlan
                ? "Upgrade to access premium features"
                : "View or upgrade your membership"
            }
            onClick={handleMembershipClick}
            showUpgrade={isFreePlan}
            showCancel={!isFreePlan}
          />
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
              {isDark ? (
                <Sun className="text-brand-red" size={24} />
              ) : (
                <Moon className="text-brand-red" size={24} />
              )}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Theme
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isDark ? "Switch to light mode" : "Switch to dark mode"}
              </p>
            </div>
            <ThemeToggle isDark={isDark} onChange={toggleTheme} />
          </button>
          <ProfileItem
            icon={<LogOut className="text-brand-red" size={24} />}
            title="Logout"
            subtitle="Sign out of your account"
            onClick={() => setShowLogoutModal(true)}
          />
        </div>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      <MembershipModal
        isOpen={showMembershipModal}
        onClose={() => setShowMembershipModal(false)}
        onUpgrade={handleUpgrade}
        isLoading={isLoading}
        currentPlan={profile?.membershipType as PlanId}
      />

      <CancelMembershipModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancel}
        isLoading={isLoading}
      />

      <MembershipQR
        qrData={membershipQR.qrCode}
        expiryDate={membershipQR.expiryDate}
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
      />
    </div>
  );
};

export default ProfilePage;
 