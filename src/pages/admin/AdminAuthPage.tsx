import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, AlertCircle, UserCheck } from "lucide-react";
import logo from "../../assets/logo.jpg";

const DEMO_ADMIN = {
  email: "admin@c369.fit",
  password: "admin123",
};

const AdminAuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      localStorage.setItem("adminAuth", "true");
      localStorage.setItem("adminEmail", email);
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  const useDemoAccount = () => {
    setEmail(DEMO_ADMIN.email);
    setPassword(DEMO_ADMIN.password);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 sm:space-y-6">
        <div className="text-center">
          <img
            src={logo}
            alt="C369 Fitness Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mx-auto mb-3 sm:mb-4"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
            Admin Login
          </h2>
          <p className="text-sm text-gray-400">Access the admin dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-950 p-3 rounded-xl text-sm">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={20} className="text-gray-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                required
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-transparent"
                placeholder="admin@c369.fit"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-transparent"
                placeholder="admin123"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-red text-white py-2.5 sm:py-3 rounded-xl font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={useDemoAccount}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 text-gray-300 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
          >
            <UserCheck size={20} />
            Use Demo Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthPage;
