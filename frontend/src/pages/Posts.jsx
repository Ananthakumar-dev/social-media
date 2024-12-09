import {useState, useEffect, useContext} from 'react';
import api from '../axios.js';
import {Link, useNavigate} from "react-router";
import PostCard from "./PostCard.jsx";
import toast from "react-hot-toast";
import {AppContext} from "../components/AppLayout.jsx"; // Axios instance with base URL and JWT token handling

const Posts = () => {
    const { isAuthenticated } = useContext(AppContext);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async (page = 1) => {
        if(!isAuthenticated) {
            navigate('/login');
            toast.error('Login to proceed');
            return;
        }

        setLoading(true);

        try {
            const { data } = await api.get(`/user/posts?page=${page}`);
            setPosts(data.data);
            setCurrentPage(data.current_page);
            setLastPage(data.last_page);
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= lastPage) {
            fetchPosts(page);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">

            <div className="flex items-center gap-5 mb-5">
                <h2 className="text-2xl font-bold">Your Posts</h2>
                <h3><Link to="/create-post" className="text-blue-600 underline">Create post</Link></h3>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <div>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} setPosts={setPosts} />
                    ))}

                    {/* Pagination Controls */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === lastPage}
                            className="p-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posts;
