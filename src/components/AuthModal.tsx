import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

const AuthModal = ({
  isOpen,
  onClose,
  feature = "this feature",
}: AuthModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 font-luviic">
            Join C369 Fitness
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 font-opensans">
            To use {feature}, you'll need to be a member. Sign in or create an
            account to continue.
          </p>
          <div className="space-y-3">
            <Link
              to="/auth/login"
              className="block w-full bg-brand-red hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth/signup"
              className="block w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
