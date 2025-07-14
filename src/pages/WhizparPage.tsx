import { useState, useEffect } from "react";
import {
  createPost,
  subscribeToPosts,
  type WhizparPost,
} from "../services/whizparService";
import { Plus, Image as ImageIcon, Send, X, Loader } from "lucide-react";
import { Modal } from "../components/Modal";
import { PostCard } from "../components/PostCard";
import whizparLogo from "../assets/whizpar.png";

const WhizparPage = () => {
  const [posts, setPosts] = useState<WhizparPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [text, setText] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((newPosts) => {
      setPosts(newPosts);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setIsPosting(true);
      await createPost(text, mediaFile || undefined);
      setText("");
      setMediaFile(null);
      setMediaPreview(null);
      setShowPostModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 z-10">
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <img
              src={whizparLogo}
              alt="Whizpar"
              className="w-10 h-10 rounded-xl"
            />
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">
              Whizpar
            </h1>
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 text-brand-red animate-spin" />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setShowPostModal(true)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-brand-red text-white rounded-full shadow-lg shadow-red-500/20 flex items-center justify-center hover:bg-red-700 transition-colors z-50"
      >
        <Plus size={24} />
      </button>

      {/* Post Modal */}
      <Modal
        isOpen={showPostModal}
        onClose={() => !isPosting && setShowPostModal(false)}
        title="Create Post"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-red bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            rows={4}
            disabled={isPosting}
          />

          {mediaPreview && (
            <div className="relative">
              <img src={mediaPreview} alt="Preview" className="rounded-xl" />
              <button
                type="button"
                onClick={() => {
                  setMediaFile(null);
                  setMediaPreview(null);
                }}
                className="absolute top-2 right-2 p-1 bg-gray-900/50 rounded-full text-white hover:bg-gray-900/75"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
              <ImageIcon size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isPosting}
              />
            </label>

            <button
              type="submit"
              disabled={!text.trim() || isPosting}
              className="px-4 py-2 bg-brand-red text-white rounded-xl flex items-center gap-2 disabled:opacity-50"
            >
              {isPosting ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Send size={16} />
              )}
              Post
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WhizparPage;
