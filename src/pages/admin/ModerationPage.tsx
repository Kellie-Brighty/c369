import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const ModerationPage = () => {
  const posts = [
    {
      id: 1,
      content:
        "Just hit a new PR on deadlifts! 💪 Any tips for maintaining form as weight increases?",
      author: "Anonymous_9795",
      time: "2h ago",
      status: "flagged",
      reason: "Potential unsafe advice",
    },
    {
      id: 2,
      content:
        "The new equipment in the cardio section is amazing! Loving the upgraded treadmills 🏃‍♂️",
      author: "Anonymous_6768",
      time: "5h ago",
      status: "pending",
      reason: "User report",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {post.author}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post.time}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      post.status === "flagged"
                        ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300"
                        : "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-300"
                    }`}
                  >
                    <AlertTriangle size={12} />
                    {post.status}
                  </span>
                </div>
                <p className="text-gray-800 dark:text-white mb-2">
                  {post.content}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Reason: {post.reason}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors">
                  <CheckCircle size={20} />
                </button>
                <button className="p-2 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                  <XCircle size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModerationPage;
