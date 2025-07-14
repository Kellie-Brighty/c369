import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  CreditCard,
  Settings,
  MessageSquare,
  LayoutDashboard,
  Home,
  Menu,
  X,
  Plus,
  Filter,
  Save,
  Upload,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import useViewport from "../../hooks/useViewport";
import { useAuth } from "../../hooks/useAuth";

type Action = {
  icon: React.ElementType;
  label: string;
  primary?: boolean;
};

type Route = {
  path: string;
  icon: React.ElementType;
  label: string;
  action?: Action;
  actions?: Action[];
};

const MAIN_ROUTES: Route[] = [
  {
    path: "/admin",
    icon: LayoutDashboard,
    label: "Dashboard",
    action: { icon: Plus, label: "Add Member" },
  },
  {
    path: "/admin/users",
    icon: Users,
    label: "Users",
    actions: [
      { icon: Upload, label: "Import" },
      { icon: Plus, label: "Add User", primary: true },
    ],
  },
  {
    path: "/admin/content",
    icon: Home,
    label: "Content",
    action: { icon: Save, label: "Save Changes", primary: true },
  },
];

const SECONDARY_ROUTES: Route[] = [
  {
    path: "/admin/memberships",
    icon: CreditCard,
    label: "Memberships",
    action: { icon: Plus, label: "New Plan", primary: true },
  },
  {
    path: "/admin/moderation",
    icon: MessageSquare,
    label: "Moderation",
    action: { icon: Filter, label: "Filter" },
  },
  {
    path: "/admin/settings",
    icon: Settings,
    label: "Settings",
    action: { icon: Save, label: "Save Changes", primary: true },
  },
];

export const AdminLayout = () => {
  const { width } = useViewport();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isMobile = width < 768;
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/auth");
  };

  const currentRoute = [...MAIN_ROUTES, ...SECONDARY_ROUTES].find(
    (route) => route.path === location.pathname
  );

  const NavLink = ({ path, icon: Icon, label }: Route) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
          isActive
            ? "bg-brand-red text-white"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        onClick={() => setShowMobileMenu(false)}
      >
        <Icon size={20} />
        <span className={isMobile ? "text-xs" : "text-sm"}>{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Fixed Sidebar for Desktop */}
      {!isMobile && (
        <aside className="fixed w-64 h-screen border-r border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-2 bg-gray-50 dark:bg-gray-900">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your gym
            </p>
          </div>
          <div className="flex-1">
            {[...MAIN_ROUTES, ...SECONDARY_ROUTES].map((route) => (
              <NavLink key={route.path} {...route} />
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all mt-auto"
          >
            <LogOut size={20} />
            <span className={isMobile ? "text-xs" : "text-sm"}>Logout</span>
          </button>
        </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${isMobile ? "pb-20" : "ml-64"}`}>
        {/* Sticky Header */}
        <header
          className={`sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 z-20 p-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobile && (
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl transition-colors"
                >
                  {showMobileMenu ? (
                    <X className="text-brand-red" size={20} />
                  ) : (
                    <Menu className="text-brand-red" size={20} />
                  )}
                </button>
              )}
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                {currentRoute?.label}
              </h1>
            </div>
            {currentRoute?.actions ? (
              <div className="flex gap-2">
                {currentRoute.actions.map((action, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-2 ${
                      action.primary
                        ? "bg-brand-red text-white hover:bg-red-700"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    } px-4 py-2 rounded-xl transition-colors`}
                  >
                    <action.icon size={20} />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              currentRoute?.action && (
                <button
                  className={`flex items-center gap-2 ${
                    currentRoute.action.primary
                      ? "bg-brand-red text-white hover:bg-red-700"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  } px-4 py-2 rounded-xl transition-colors`}
                >
                  <currentRoute.action.icon size={20} />
                  <span>{currentRoute.action.label}</span>
                </button>
              )
            )}
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobile && showMobileMenu && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setShowMobileMenu(false)}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 p-4 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Admin Panel
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your gym
                </p>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                {[...MAIN_ROUTES, ...SECONDARY_ROUTES].map((route) => (
                  <NavLink key={route.path} {...route} />
                ))}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all mt-auto"
              >
                <LogOut size={20} />
                <span className={isMobile ? "text-xs" : "text-sm"}>Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="p-4 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
 