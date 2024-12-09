import { useState, useEffect } from 'react';
import api from '../axios';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const {data} = await api.get('/user/profile');
                const {name, email, picture} = data.data;
                setName(name || '');
                setEmail(email || '');
                setProfilePicture(picture || '');
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            await api.post('/user/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Make sure the Content-Type is set correctly for FormData
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Add JWT token from sessionStorage
                },
            });
        } catch (err) {
            setError('Error updating profile');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Profile</h2>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            defaultValue={name}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            defaultValue={email}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Profile Picture Upload */}
                    <div>
                        <label htmlFor="picture" className="block text-sm font-medium text-gray-700">Profile
                            Picture</label>
                        <input
                            type="file"
                            name="picture"
                            id="picture"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />

                        {/* Profile Picture Preview */}
                        {profilePicture && (
                            <div className="mt-4">
                                <img
                                    src={`http://127.0.0.1:8000/storage/${profilePicture || "default-profile.png"}`}
                                    alt="Profile Picture"
                                    className="w-24 h-24 rounded-full object-cover mx-auto"
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
