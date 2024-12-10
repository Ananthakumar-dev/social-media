import { useParams } from "react-router";
import {useContext, useEffect, useState} from "react";
import api from "../axios.js";
import toast from "react-hot-toast";
import {AppContext} from "../components/AppLayout.jsx";

const PostDetails = () => {
    const { backendUrl } = useContext(AppContext);
    const { postId } = useParams();
    const [details, setDetails] = useState({ comments: [], likes: [], shares: [] });
    const [loading, setLoading] = useState(true);

    // Fetch post details (comments, likes, shares)
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const { data } = await api.get(`/posts/${postId}/details`);

                setDetails(data);
                setLoading(false);
            } catch (err) {
                toast.error(err?.message);
                setLoading(false);
            }
        };

        fetchDetails();
    }, [postId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const renderUsers = (users) => {
        return users.map((user) => (
            <div key={user.id} className="flex items-center space-x-4 border-b border-gray-300 pb-2 mb-2">
                <img
                    src={`${backendUrl}/storage/${user.user.picture || "default-profile.png"}`}
                    alt={user.user.name}
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <p className="font-semibold">{user.user.name}</p>
                    <p className="text-sm text-gray-500">{new Date(user.user.created_at).toLocaleString()}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Post Details</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Comments</h2>
                {details.comments.length ? (
                    renderUsers(details.comments)
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Likes</h2>
                {details.likes.length ? (
                    renderUsers(details.likes)
                ) : (
                    <p className="text-gray-500">No likes yet.</p>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Shares</h2>
                {details.shares.length ? (
                    renderUsers(details.shares)
                ) : (
                    <p className="text-gray-500">No shares yet.</p>
                )}
            </div>
        </div>
    );
};

export default PostDetails;
