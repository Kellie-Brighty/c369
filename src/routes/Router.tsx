import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import { AuthPage } from "../pages/auth/AuthPage";
import AIAssistantPage from "../pages/AIAssistantPage";
import WhizparPage from "../pages/WhizparPage";
import ProfilePage from "../pages/ProfilePage";
import ErrorPage from "../pages/ErrorPage";
import { AdminLayout } from "../pages/admin/AdminLayout";
import { AdminAuthPage } from "../pages/admin/AdminAuthPage";
import DashboardPage from "../pages/admin/DashboardPage";
import UsersPage from "../pages/admin/UsersPage";
import MembershipsPage from "../pages/admin/MembershipsPage";
import ContentPage from "../pages/admin/ContentPage";
import ModerationPage from "../pages/admin/ModerationPage";
import SettingsPage from "../pages/admin/SettingsPage";
import VerifyMembership from "../pages/VerifyMembership";
import App from "../App";
import { useAuth } from "../hooks/useAuth";
import { AuthProvider } from "../contexts/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/admin/auth" replace />;
};

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/admin" replace />;
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
      { path: "auth", element: <AuthPage /> },
      {
        path: "ai-assistant",
        element: (
          <ProtectedRoute>
            <AIAssistantPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "lounge",
        element: (
          <ProtectedRoute>
            <WhizparPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "verify",
    element: <VerifyMembership />,
  },
  {
    path: "admin/auth",
    element: (
      <AuthProvider>
        <AuthenticatedRoute>
          <AdminAuthPage />
        </AuthenticatedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "admin",
    element: (
      <AuthProvider>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </AuthProvider>
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
