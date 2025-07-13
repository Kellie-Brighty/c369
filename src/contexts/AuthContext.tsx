import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Demo credentials
const DEMO_USER = {
  email: "demo@c369.fit",
  password: "demo123",
  name: "Demo User",
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    // Demo authentication
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      setUser({ name: DEMO_USER.name, email: DEMO_USER.email });
      localStorage.setItem("user", JSON.stringify(DEMO_USER));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
