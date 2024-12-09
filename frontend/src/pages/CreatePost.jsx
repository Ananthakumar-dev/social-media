import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await api.post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Add JWT token from localStorage
                },
            });

            navigate('/posts');  // Navigate to the feeds page after post creation
        } catch (err) {
            setError('Error creating post') ;
            console.error(err);
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
            {error && <div className="text-red-500">{error}</div>}
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
                        required
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
                        required
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
