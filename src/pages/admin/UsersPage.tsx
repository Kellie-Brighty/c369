import { Search, MoreVertical } from "lucide-react";

const UsersPage = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "active",
      membership: "Premium",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "inactive",
      membership: "Basic",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "active",
      membership: "Premium",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Name
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Email
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Membership
                </th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="block md:table-row border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <td className="block md:table-cell p-4">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {user.name}
                    </div>
                    <div className="md:hidden text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {user.email}
                    </div>
                  </td>
                  <td className="hidden md:table-cell p-4 text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="block md:table-cell p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="block md:table-cell p-4 text-gray-600 dark:text-gray-300">
                    {user.membership}
                  </td>
                  <td className="block md:table-cell p-4 text-right">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                      <MoreVertical size={20} className="text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
