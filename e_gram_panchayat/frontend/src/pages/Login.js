import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { login: loginContext } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user) {
            if (user.role === 'staff') {
                navigate('/staff');
              } else if (user.role === 'admin') {
                navigate('/admin');
              } else {
                navigate('/dashboard');
              }
        }
    }, [user, navigate]);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            loginContext(response.data.user, response.data.token);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <div className="input-group mb-3">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="mt-3">
                Not registered? <a href="/register">Go to Register</a>
            </p>
        </div>
    );
};

export default Login;
