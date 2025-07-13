import { Link, useLocation } from "react-router-dom";
import { Home, Bot, ShieldQuestion, User } from "lucide-react";

const MobileView = () => {
  const location = useLocation();
  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/ai", icon: Bot, label: "AI" },
    { href: "/lounge", icon: ShieldQuestion, label: "Lounge" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 pb-safe-area">
      <div className="flex justify-around items-center max-w-md mx-auto px-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              className={`flex flex-col items-center py-2 relative ${
                isActive
                  ? "text-brand-red"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-red-50 dark:bg-red-500/10 shadow-lg shadow-red-500/10"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Icon size={24} className={isActive ? "scale-110" : ""} />
              </div>
              <span className="text-xs mt-1 font-medium">{label}</span>
              {isActive && (
                <span className="absolute -top-1 left-1/2 w-12 h-1 bg-gradient-to-r from-brand-red to-red-500 rounded-full transform -translate-x-1/2 shadow-lg shadow-red-500/20" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileView;
