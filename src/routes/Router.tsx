import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AIAssistantPage from "../pages/AIAssistantPage";
import WhizparPage from "../pages/WhizparPage";
import ProfilePage from "../pages/ProfilePage";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "ai", element: <AIAssistantPage /> },
      { path: "lounge", element: <WhizparPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
