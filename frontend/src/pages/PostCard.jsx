import Like from "../components/Like.jsx";
import Share from "../components/Share.jsx";
import CommentSection from "../components/CommentSection.jsx";
import { FaComment } from "react-icons/fa";
import {useState} from "react";
import {Link} from "react-router";

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false); // Toggle for comments

    const handleToggleComments = () => {
        setShowComments(!showComments);
    };


    return (
        <div key={post.id} className="bg-white shadow-md rounded-lg p-4 mb-6">
            {/* Post Header */}
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                    {/* Replace with user profile picture if available */}
                    <img
                        src={`http://127.0.0.1:8000/storage/${post.user.picture || "default-profile.png"}`}
                        alt={post.user.name}
                    />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium">{post.user.name}</p>
                    <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
                </div>
            </div>

            {/* Post Content */}
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>

            {/* Post Image */}
            {post.image && (
                <img
                    src={`http://127.0.0.1:8000/storage/${post.image}`}
                    alt={post.title}
                    className="w-full rounded-md mb-4"
                    width={100}
                    height={100}
                />
            )}

            {/* Post Stats */}
            <p className="text-sm text-gray-500 mb-4">
                <Link to={`/post-details/${post.id}`}>
                    {post.comments_count} comments, {post.likes_count} likes, {post.shares_count} shares
                </Link>
            </p>

            {/* Post Interactions */}
            <div className="flex justify-between items-center text-sm border-t pt-4 text-white">
                <div className="flex items-center">
                    <Like postId={post.id} initialLikes={post.likes_count} initialLiked={post.liked > 0} />
                </div>

                <div>
                    <Share postId={post.id} initialShares={post.shares_count} initialShared={post.shared > 0} />
                </div>

                {/* Comment Button */}
                <button
                    onClick={handleToggleComments}
                    className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600"
                >
                    <FaComment />
                    <span>Comment</span>
                </button>
            </div>

            {/* Comment Section */}
                {showComments && (
                    <div>
                        <CommentSection postId={post.id} />
                    </div>
                    )
                }
        </div>

    )
}
export default PostCard
