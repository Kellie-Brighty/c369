import { Heart, MessageSquare } from "lucide-react";
import type { WhizparPost } from "../services/whizparService";
import { format } from "date-fns";

interface PostCardProps {
  post: WhizparPost;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white">
              {post.author}
            </h3>
            <p className="text-sm text-gray-500">
              {format(post.createdAt.toDate(), "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>
        <p className="text-gray-800 dark:text-gray-200 mb-4">{post.text}</p>
        {post.mediaUrl && (
          <div className="rounded-xl overflow-hidden mb-4">
            {post.mediaType === "image" ? (
              <img src={post.mediaUrl} alt="" className="w-full" />
            ) : (
              <video src={post.mediaUrl} controls className="w-full" />
            )}
          </div>
        )}
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
          <button className="flex items-center gap-1 hover:text-red-500">
            <Heart size={20} />
            <span>{post.likes.length}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-brand-red">
            <MessageSquare size={20} />
            <span>{post.comments.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
