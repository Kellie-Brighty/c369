import {
  Users,
  CreditCard,
  MessageSquare,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const DashboardPage = () => {
  const stats = [
    { label: "Total Members", value: "1,234", icon: Users, trend: "+12%" },
    {
      label: "Active Memberships",
      value: "856",
      icon: CreditCard,
      trend: "+5%",
    },
    { label: "Posts Today", value: "45", icon: MessageSquare, trend: "+8%" },
    { label: "Revenue", value: "₦450,000", icon: TrendingUp, trend: "+15%" },
  ];

  const alerts = [
    { text: "5 memberships expiring today", type: "warning" },
    { text: "3 posts flagged for review", type: "alert" },
    { text: "New feature: Bulk user import", type: "info" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, trend }) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <Icon size={24} className="text-brand-red" />
              <span className="text-green-500 text-sm font-medium">
                {trend}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {value}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <AlertCircle size={20} className="text-brand-red" />
          Recent Alerts
        </h2>
        <div className="space-y-3">
          {alerts.map(({ text, type }, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl ${
                type === "warning"
                  ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-300"
                  : type === "alert"
                  ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300"
                  : "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300"
              }`}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-left">
          <h3 className="font-medium text-gray-800 dark:text-white mb-1">
            Export Members
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Download member list as CSV
          </p>
        </button>
        <button className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-left">
          <h3 className="font-medium text-gray-800 dark:text-white mb-1">
            Send Notifications
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Broadcast message to members
          </p>
        </button>
        <button className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-left">
          <h3 className="font-medium text-gray-800 dark:text-white mb-1">
            Update Content
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Edit home page content
          </p>
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
