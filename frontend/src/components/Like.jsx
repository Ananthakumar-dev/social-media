import React, {useContext, useState} from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"; // Import icons for like and unlike
import api from "../axios.js";
import toast from "react-hot-toast";
import {AppContext} from "./AppLayout.jsx";
import {useNavigate} from "react-router"; // Ensure you're importing your Axios instance

const Like = ({ postId, initialLikes, initialLiked, onLikeToggle }) => {
    const { isAuthenticated } = useContext(AppContext);
    const navigate = useNavigate();
    const [likes, setLikes] = useState(initialLikes); // Track the number of likes
    const [liked, setLiked] = useState(initialLiked); // Track if the user has liked the post

    const handleLikeToggle = async () => {
        if(!isAuthenticated) {
            toast.error("Please login to like a post");
            navigate('/login');

            return;
        }

        try {
            // Make the API call to toggle the like status
            const { data } = await api.post(`/posts/like?post_id=${postId}`);
            setLikes((prev) => liked ? prev - 1 : prev + 1); // Update the likes count
            setLiked((prev) => !prev); // Update the liked state

            onLikeToggle(data.likes_count || 0); // Update count in the parent
            toast.success(`${liked ? 'Unliked' : 'Liked'} successfully`);
        } catch (err) {
            toast.error(err?.message);
        }
    };

    return (
        <button
            onClick={handleLikeToggle}
            className="flex items-center space-x-2 hover:text-blue-500 "
        >
            {/* Show different icons based on the liked state */}
            {liked ? (
                <FaThumbsUp className="text-xl" /> // Liked icon
            ) : (
                <FaRegThumbsUp className="text-xl" /> // Unliked icon
            )}
            <span className="text-sm font-medium">{likes}</span>
        </button>
    );
};

export default Like;
