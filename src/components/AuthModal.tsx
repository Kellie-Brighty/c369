import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { user } = useAuth();

  if (!isOpen || user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Join C369 Fitness
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Sign in or create an account to continue
        </p>
        <div className="space-y-3">
          <Link
            to="/auth"
            onClick={onClose}
            className="block w-full bg-brand-red text-white text-center py-2 rounded-xl hover:bg-red-700 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/auth"
            onClick={onClose}
            className="block w-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-center py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
