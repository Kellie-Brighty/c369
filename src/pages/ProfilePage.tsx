import {
  User,
  ShieldCheck,
  CreditCard,
  Bell,
  LogOut,
  ChevronRight,
  Settings,
  Camera,
  Moon,
  Sun,
} from "lucide-react";
import type { ReactNode } from "react";
import { useTheme } from "../contexts/ThemeContext";

const ProfilePage = () => {
  const { isDark, toggleTheme } = useTheme();
  const ProfileItem = ({
    icon,
    text,
    hasArrow = true,
    highlight = false,
    onClick,
  }: {
    icon: ReactNode;
    text: string;
    hasArrow?: boolean;
    highlight?: boolean;
    onClick?: () => void;
  }) => (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer ${
        highlight
          ? "bg-brand-red text-white shadow-lg shadow-red-500/20"
          : "bg-white dark:bg-gray-800 shadow-md hover:shadow-lg hover:scale-[1.02]"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            highlight ? "bg-white/20" : "bg-red-50 dark:bg-gray-700"
          }`}
        >
          {icon}
        </div>
        <span
          className={
            highlight ? "text-white" : "text-gray-800 dark:text-gray-200"
          }
        >
          {text}
        </span>
      </div>
      {hasArrow && (
        <ChevronRight
          className={
            highlight ? "text-white/80" : "text-gray-400 dark:text-gray-500"
          }
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Profile Header */}
      <div className="pt-12 px-4 w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-gray-800 dark:text-white font-medium">
            My Profile
          </h1>
          <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Settings className="text-gray-600 dark:text-gray-400" size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden ring-4 ring-white dark:ring-gray-700">
              <Camera size={48} className="text-gray-400 dark:text-gray-500" />
            </div>
            <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
              <div className="flex flex-col items-center text-white gap-1">
                <Camera size={20} />
                <span className="text-xs font-medium">Upload</span>
              </div>
            </button>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              John Doe
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              john.doe@example.com
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-lg text-sm font-medium">
              <ShieldCheck size={16} />
              <span>Active Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="px-4 pb-24 mt-8 w-full max-w-md mx-auto">
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase px-2">
              Account
            </h3>
            <ProfileItem
              icon={<User className="text-brand-red" size={24} />}
              text="Edit Profile"
            />
            <ProfileItem
              icon={<CreditCard className="text-brand-red" size={24} />}
              text="Payment History"
              highlight
            />
            <ProfileItem
              icon={<Bell className="text-brand-red" size={24} />}
              text="Notifications"
            />
            <ProfileItem
              icon={
                isDark ? (
                  <Sun className="text-brand-red" size={24} />
                ) : (
                  <Moon className="text-brand-red" size={24} />
                )
              }
              text={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
              onClick={toggleTheme}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase px-2">
              Actions
            </h3>
            <ProfileItem
              icon={<LogOut className="text-brand-red" size={24} />}
              text="Logout"
              hasArrow={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
