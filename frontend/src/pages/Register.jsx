import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/register', { name, email, password });
            const { token } = response.data; // Assuming the token is in the response

            // Store the token in localStorage
            localStorage.setItem('token', token);
            navigate('/profile'); // Redirect to login after successful registration
        } catch (err) {
            setError('Error during registration');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="flex">
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
