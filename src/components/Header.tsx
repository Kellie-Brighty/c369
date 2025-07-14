import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          C369 Fitness
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-red rounded-xl hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red transition-colors"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="px-4 py-2 text-sm font-medium text-white bg-brand-red rounded-xl hover:bg-red-700 transition-colors"
              >
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
