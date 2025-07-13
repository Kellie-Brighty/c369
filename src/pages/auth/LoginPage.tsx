import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Check } from "lucide-react";

const DEMO_ACCOUNT = {
  email: "demo@c369.fit",
  password: "demo123",
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    if (success) {
      navigate("/profile");
    } else {
      setError("Invalid credentials. Try demo@c369.fit / demo123");
    }
  };

  const useDemoAccount = () => {
    setEmail(DEMO_ACCOUNT.email);
    setPassword(DEMO_ACCOUNT.password);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to continue your fitness journey
          </p>
        </div>

        {/* Demo Account Button */}
        <button
          type="button"
          onClick={useDemoAccount}
          className="w-full py-3 px-4 bg-red-50 dark:bg-red-500/10 text-brand-red hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl transition-colors text-sm font-medium"
        >
          Use Demo Account
        </button>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/30 p-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <div
                  className={`w-5 h-5 border-2 rounded-md transition-colors ${
                    rememberMe
                      ? "bg-brand-red border-brand-red"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {rememberMe && <Check size={16} className="text-white" />}
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </span>
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-sm text-brand-red hover:text-red-700"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-red text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-brand-red hover:text-red-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
