import {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import api from '../axios';
import toast from "react-hot-toast";
import {AppContext} from "../components/AppLayout.jsx";

const CreatePost = () => {
    const { isAuthenticated } = useContext(AppContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!isAuthenticated) {
            navigate('/login');
            toast.error('Login to proceed');
            return;
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            await api.post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Add JWT token from sessionStorage
                },
            });

            navigate('/posts');  // Navigate to the feeds page after post creation
            toast.success('Post created successfully');
        } catch (err) {
            if (err.response && err.response.status === 422) {
                const validationErrors = err.response.data.errors;

                // Display all validation error messages in toast
                for (const field in validationErrors) {
                    validationErrors[field].forEach((message) => {
                        toast.error(message); // Display each error message in a toast
                    });
                }
            } else {
                // Handle other errors
                toast.error(err.message || 'Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter post title"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Write your post content"
                        rows="4"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image (Optional)</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full p-2 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
