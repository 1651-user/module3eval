import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Email and password validation
        if (!email.trim() || !password.trim()) {
            alert('Please enter both email and password');
            return;
        }

        const result = login(email, password);

        if (result.success) {
            // Redirect based on role
            if (result.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/customers/dashboard');
            }
        } else {
            // Show proper alert for wrong credentials
            alert(result.error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>🍽️ Restaurant Management</h1>
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <div className="demo-credentials">
                    <h3>Demo Credentials:</h3>
                    <div className="credentials-grid">
                        <div>
                            <strong>Admin:</strong>
                            <p>admin@gmail.com</p>
                            <p>admin1234</p>
                        </div>
                        <div>
                            <strong>Customer:</strong>
                            <p>customer@gmail.com</p>
                            <p>customer1234</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
