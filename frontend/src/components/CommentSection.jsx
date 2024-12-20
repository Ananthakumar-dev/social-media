import {useState, useEffect, useContext} from "react";
import api from "../axios.js";
import Replies from "./Replies.jsx";
import toast from "react-hot-toast";
import {AppContext} from "./AppLayout.jsx";

const CommentSection = ({ postId, onCommentAdded }) => {
    const { isAuthenticated, backendUrl } = useContext(AppContext);
    const [comments, setComments] = useState([]); // Holds the comments for the post
    const [newComment, setNewComment] = useState(""); // For creating a new comment
    const [visibleReplies, setVisibleReplies] = useState({}); // Tracks which comments have replies visible

    // Fetch comments for the post
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data } = await api.get(`/posts/${postId}/comments`);
                setComments(data.data);
            } catch (err) {
                toast.error(err?.message);
            }
        };

        fetchComments();
    }, [postId]);

    // Handle adding a new comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const { data } = await api.post(`/posts/${postId}/comments`, {
                content: newComment,
            });

            onCommentAdded(); // Increment comment count in the parent
            setComments([...comments, data.data]); // Add the new comment to the list
            setNewComment(""); // Clear the input field
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    // Toggle the visibility of replies for a specific comment
    const toggleReplies = (commentId) => {
        setVisibleReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId], // Toggle visibility
        }));
    };

    // Render comments and replies
    const renderComments = () => {
        if (!comments.length) return null;

        return comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-start space-x-3">
                    <img
                        src={`${backendUrl}/storage/${comment.user.picture || "default-profile.png"}`}
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{comment.user.name}</p>
                        <p className="text-gray-700">{comment.content}</p>
                        {/* Toggle Replies Button */}
                        <button
                            onClick={() => toggleReplies(comment.id)}
                            className="text-sm hover:underline mt-2"
                        >
                            {visibleReplies[comment.id] ? "Hide Replies" : "Show Replies"}
                        </button>

                        {/* Replies Section (conditionally rendered) */}
                        {visibleReplies[comment.id] && (
                            <div className="mt-4 ml-6">
                                <Replies replies={comment.replies} parentId={comment.id} postId={comment.post_id} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Comments</h3>
            {
                isAuthenticated && (
                    <form onSubmit={handleAddComment} className="flex items-center space-x-3 mb-6">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Comment
                        </button>
                    </form>
                )
            }

            {renderComments()}
        </div>
    );
};

export default CommentSection;
