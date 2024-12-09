import React, { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"; // Import icons for like and unlike
import api from "../axios.js"; // Ensure you're importing your Axios instance

const Like = ({ postId, initialLikes, initialLiked }) => {
    const [likes, setLikes] = useState(initialLikes); // Track the number of likes
    const [liked, setLiked] = useState(initialLiked); // Track if the user has liked the post

    const handleLikeToggle = async () => {
        try {
            // Make the API call to toggle the like status
            const { data } = await api.post(`/posts/like?post_id=${postId}`);
            setLikes((prev) => liked ? prev - 1 : prev + 1); // Update the likes count
            setLiked((prev) => !prev); // Update the liked state
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    return (
        <button
            onClick={handleLikeToggle}
            className="flex items-center space-x-2 hover:text-blue-500"
        >
            {/* Show different icons based on the liked state */}
            {liked ? (
                <FaThumbsUp className="text-blue-600 text-xl" /> // Liked icon
            ) : (
                <FaRegThumbsUp className="text-gray-600 text-xl" /> // Unliked icon
            )}
            <span className="text-sm font-medium">{likes}</span>
        </button>
    );
};

export default Like;
