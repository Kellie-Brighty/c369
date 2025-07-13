import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import AIAssistantPage from "../pages/AIAssistantPage";
import WhizparPage from "../pages/WhizparPage";
import ProfilePage from "../pages/ProfilePage";
import ErrorPage from "../pages/ErrorPage";
import { AdminLayout } from "../pages/admin/AdminLayout";
import AdminAuthPage from "../pages/admin/AdminAuthPage";
import DashboardPage from "../pages/admin/DashboardPage";
import UsersPage from "../pages/admin/UsersPage";
import MembershipsPage from "../pages/admin/MembershipsPage";
import ContentPage from "../pages/admin/ContentPage";
import ModerationPage from "../pages/admin/ModerationPage";
import SettingsPage from "../pages/admin/SettingsPage";
import App from "../App";
import { AuthProvider } from "../contexts/AuthContext";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("adminAuth") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/auth" replace />;
};

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("adminAuth") === "true";
  return !isAuthenticated ? <>{children}</> : <Navigate to="/admin" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth/login", element: <LoginPage /> },
      { path: "auth/signup", element: <SignupPage /> },
      { path: "ai-assistant", element: <AIAssistantPage /> },
      { path: "lounge", element: <WhizparPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    path: "admin/auth",
    element: (
      <AuthenticatedRoute>
        <AdminAuthPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "memberships", element: <MembershipsPage /> },
      { path: "content", element: <ContentPage /> },
      { path: "moderation", element: <ModerationPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;
export default Router;
