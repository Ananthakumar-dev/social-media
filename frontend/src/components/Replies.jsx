import { useState } from "react";
import api from "../axios.js";

const Replies = ({ replies, parentId }) => {
    const [newReply, setNewReply] = useState("");
    const [replyList, setReplyList] = useState(replies);

    const handleAddReply = async (e) => {
        e.preventDefault();
        if (!newReply.trim()) return;

        try {
            const { data } = await api.post(`/comments/${parentId}/reply`, {
                content: newReply,
            });
            setReplyList([data, ...replyList]); // Add the reply to the list
            setNewReply(""); // Clear the reply input
        } catch (err) {
            console.error("Error adding reply:", err);
        }
    };

    return (
        <div className="mt-2 ml-10">
            <form onSubmit={handleAddReply} className="flex items-center space-x-3 mb-4">
                <input
                    type="text"
                    placeholder="Reply to this comment..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <button
                    type="submit"
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Reply
                </button>
            </form>
            {replyList.map((reply) => (
                <div key={reply.id} className="mb-2">
                    <p className="font-semibold">{reply.user.name}</p>
                    <p className="text-gray-700">{reply.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Replies;
