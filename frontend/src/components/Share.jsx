import { useState } from "react";
import { FaShareAlt } from "react-icons/fa"; // Import a share icon
import api from "../axios.js"; // Axios instance

const Share = ({ postId, initialShares, initialShared }) => {
    const [shares, setShares] = useState(initialShares); // Track the number of shares
    const [shared, setShared] = useState(initialShared); // Track if the post is shared

    const handleShare = async () => {
        try {
            // Trigger the share API
            const { data } = await api.post(`/posts/share?post_id=${postId}`);
            setShares((prev) => prev + 1); // Update the shares count
            setShared(!shared); // Mark the post as shared
        } catch (err) {
            console.error("Error sharing post:", err);
        }
    };

    return (
        <button
            onClick={handleShare}
            disabled={shared} // Disable the button after sharing
            className={`flex items-center space-x-2 ${
                shared ? "text-green-500" : "text-gray-600"
            } hover:text-green-400`}
        >
            <FaShareAlt className="text-xl" />
            <span className="text-sm font-medium">{shares}</span>
        </button>
    );
};

export default Share;
