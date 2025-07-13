import { CreditCard, Users, TrendingUp } from "lucide-react";

const MembershipsPage = () => {
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "₦15,000",
      duration: "Monthly",
      activeUsers: 234,
      revenue: "₦3,510,000",
    },
    {
      id: 2,
      name: "Premium",
      price: "₦40,000",
      duration: "Quarterly",
      activeUsers: 156,
      revenue: "₦6,240,000",
    },
    {
      id: 3,
      name: "Pro",
      price: "₦150,000",
      duration: "Yearly",
      activeUsers: 89,
      revenue: "₦13,350,000",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {plan.duration}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
                <CreditCard className="text-brand-red" size={24} />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {plan.price}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                    <Users size={16} />
                    <span>Active Users</span>
                  </div>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {plan.activeUsers}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                    <TrendingUp size={16} />
                    <span>Revenue</span>
                  </div>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {plan.revenue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipsPage;
