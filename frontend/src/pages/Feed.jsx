import { useEffect, useState } from 'react';
import api from '../axios';
import PostCard from "./PostCard.jsx";
import toast from "react-hot-toast";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // To track the current page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [loading, setLoading] = useState(false); // To show loading state

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true); // Start loading

            try {
                const {data} = await api.get(`/feeds?page=${currentPage}`);
                if(!data.status) {
                    toast.error(data?.message);
                    return;
                }

                const datas = data.data
                setPosts(datas.data); // Assuming the posts are in `data`
                setTotalPages(datas.last_page); // Get total number of pages
            } catch (err) {
                toast.error(err?.message);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchPosts();
    }, [currentPage]); // Refetch data when currentPage changes

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page); // Update the page number
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Posts Feed</h2>

            {loading && <p>Loading...</p>} {/* Show loading text */}

            {posts.length > 0 && (
                posts.map((post) => (
                    <PostCard key={post.id} post={post} setPosts={setPosts}/>
                ))
            )}

            {
                (!posts.length && !loading) && <p> No posts Found! </p>
            }

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-l-md hover:bg-blue-700"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1} // Disable "Previous" if on first page
                >
                    Previous
                </button>

                {/* Page Numbers */}
                <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>

                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages} // Disable "Next" if on last page
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Feed;
