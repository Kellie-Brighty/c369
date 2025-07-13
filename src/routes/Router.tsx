import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import AIAssistantPage from "../pages/AIAssistantPage";
import WhizparPage from "../pages/WhizparPage";
import ProfilePage from "../pages/ProfilePage";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import { AuthProvider } from "../contexts/AuthContext";

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
]);

const Router = () => <RouterProvider router={router} />;
export default Router;
