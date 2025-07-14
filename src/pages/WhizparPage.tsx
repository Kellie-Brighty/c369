import { useState } from "react";
import { useAuthProtected } from "../hooks/useAuthProtected";
import AuthModal from "../components/AuthModal";
import {
  ShieldQuestion,
  MessageSquare,
  Heart,
  Image as ImageIcon,
  Send,
  Sparkles,
} from "lucide-react";

const WhizparPage = () => {
  const { showAuthModal, setShowAuthModal, protectedAction } =
    useAuthProtected("Lounge");
  const [posts] = useState([
    {
      id: 1,
      author: "Anonymous_9795",
      time: "7d",
      text: "Just hit a new PR on deadlifts! 💪 Any tips for maintaining form as weight increases?",
      likes: 4,
      comments: 2,
      isLiked: false,
    },
    {
      id: 2,
      author: "Anonymous_6768",
      time: "2h",
      text: "The new equipment in the cardio section is amazing! Loving the upgraded treadmills 🏃‍♂️",
      likes: 8,
      comments: 3,
      isLiked: false,
    },
  ]);

  const handlePost = () => {
    protectedAction(() => {
      // Actual post creation logic
      console.log("Creating post");
    });
  };

  const handleLike = (postId: number) => {
    protectedAction(() => {
      // Actual like logic
      console.log("Liking post", postId);
    });
  };

  const handleComment = (postId: number) => {
    protectedAction(() => {
      // Actual comment logic
      console.log("Commenting on post", postId);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 z-10">
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center shadow-lg shadow-red-500/20">
              <ShieldQuestion className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                The Anonymous Lounge
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Share your fitness journey freely
              </p>
            </div>
          </div>
          <button className="p-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl transition-colors">
            <Sparkles className="text-brand-red" size={20} />
          </button>
        </div>
      </header>

      <main className="pt-24 px-4 pb-24">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Post Creation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
            <textarea
              className="w-full p-4 border-none focus:outline-none focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 resize-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 min-h-[100px]"
              placeholder="Share your fitness journey anonymously..."
            />
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <button className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-colors">
                <ImageIcon size={20} className="text-brand-red" />
              </button>
              <button
                onClick={handlePost}
                className="px-6 py-2 bg-brand-red text-white rounded-xl font-medium flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 active:scale-95"
              >
                <Send size={16} /> Share
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-sm">
                    <ShieldQuestion
                      size={20}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      {post.author}
                    </p>
                    <p className="text-xs text-gray-400">{post.time}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
                  {post.text}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors group"
                    >
                      <Heart
                        size={20}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button
                      onClick={() => handleComment(post.id)}
                      className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors group"
                    >
                      <MessageSquare
                        size={20}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="text-sm font-medium">
                        {post.comments}
                      </span>
                    </button>
                  </div>
                  <button className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                    Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        // feature="Lounge"
      />
    </div>
  );
};

export default WhizparPage;
