import { useState, useEffect } from "react";
import api from "../axios.js";
import Replies from "./Replies.jsx";

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]); // Holds the comments for the post
    const [newComment, setNewComment] = useState(""); // For creating a new comment

    // Fetch comments for the post
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data } = await api.get(`/posts/${postId}/comments`);
                setComments(data.data);
            } catch (err) {
                console.error("Error fetching comments:", err);
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

            console.log(comments, data)
            setComments([...comments, data.data]); // Add the new comment to the list
            setNewComment(""); // Clear the input field
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    // Render comments and replies
    const renderComments = () => {
        if(!comments.length) return null;

        return comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-start space-x-3">
                    <img
                        src={comment.user.profile_picture || "/default-avatar.png"}
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{comment.user.name}</p>
                        <p className="text-gray-700">{comment.content}</p>
                        <Replies replies={comment.replies} parentId={comment.id} />
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Comments</h3>
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
            {renderComments()}
        </div>
    );
};

export default CommentSection;
