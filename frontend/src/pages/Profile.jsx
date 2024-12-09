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
            await api.put('/user/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Make sure the Content-Type is set correctly for FormData
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Add JWT token from localStorage
                },
            });
            alert('Profile updated successfully');
        } catch (err) {
            setError('Error updating profile');
        }
    };

    return (
        <div>
            <h2>Update Profile</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="flex">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        defaultValue={name}
                    />
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        defaultValue={email}
                    />
                </div>

                <div>
                    <input
                        type="file"
                        name="picture"
                    />

                    {
                        profilePicture && (
                            <div>
                                <img src="" alt="profile picture"/>
                            </div>
                        )
                    }
                </div>

                <div>
                    <button type="submit">Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
