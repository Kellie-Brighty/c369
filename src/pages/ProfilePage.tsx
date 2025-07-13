import type { ReactNode } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuthProtected } from "../hooks/useAuthProtected";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../components/AuthModal";
import {
  Moon,
  Sun,
  Bell,
  CreditCard,
  User,
  Settings,
  ChevronRight,
  LogOut,
} from "lucide-react";

const ProfilePage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { showAuthModal, setShowAuthModal, protectedAction } =
    useAuthProtected("Profile");
  const { isAuthenticated, user, logout } = useAuth();

  const handleProfileAction = () => {
    protectedAction(() => {
      // Profile update logic here
      console.log("Profile action triggered");
    });
  };

  const ProfileItem = ({
    icon,
    title,
    subtitle,
    onClick = handleProfileAction,
  }: {
    icon: ReactNode;
    title: string;
    subtitle: string;
    onClick?: () => void;
  }) => (
    <button
      onClick={onClick}
      className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
      <ChevronRight className="text-gray-400" size={20} />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-3xl bg-brand-red shadow-xl shadow-red-500/20 flex items-center justify-center">
            <User className="text-white" size={40} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {isAuthenticated ? user?.name : "Guest User"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {isAuthenticated ? user?.email : "Sign in to access all features"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <ProfileItem
            icon={<CreditCard className="text-brand-red" size={24} />}
            title="Membership"
            subtitle={
              isAuthenticated
                ? "Active until July 2025"
                : "View your membership status"
            }
          />
          <ProfileItem
            icon={<Bell className="text-brand-red" size={24} />}
            title="Notifications"
            subtitle="Manage your notifications"
          />
          <ProfileItem
            icon={
              isDark ? (
                <Sun className="text-brand-red" size={24} />
              ) : (
                <Moon className="text-brand-red" size={24} />
              )
            }
            title="Theme"
            subtitle={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
          />
          <ProfileItem
            icon={<Settings className="text-brand-red" size={24} />}
            title="Settings"
            subtitle="App preferences"
          />
          {isAuthenticated && (
            <ProfileItem
              icon={<LogOut className="text-brand-red" size={24} />}
              title="Logout"
              subtitle="Sign out of your account"
              onClick={logout}
            />
          )}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        feature="Profile"
      />
    </div>
  );
};

export default ProfilePage;
