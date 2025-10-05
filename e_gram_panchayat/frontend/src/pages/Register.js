import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const minStrengthRequired = 4;

    useEffect(() => {
        if (user) navigate('/dashboard');
    }, [user, navigate]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'password') {
            setPasswordStrength(calculatePasswordStrength(e.target.value));
        }
    };

    const calculatePasswordStrength = (password) => {
        let score = 0;
        if (!password) return score;
        if (password.length >= 6) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        return score;
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        if (passwordStrength < minStrengthRequired) {
            setError('Please create a stronger password.');
            return;
        }
        try {
            const response = await register(formData);
            login(response.data.user, response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <div className="input-group">
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
                    {formData.password && (
                        <div className="progress mt-2">
                            <div
                                className={`progress-bar ${passwordStrength <= 1 ? 'bg-danger' : passwordStrength === 2 ? 'bg-warning' : 'bg-success'}`}
                                role="progressbar"
                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                aria-valuenow={passwordStrength}
                                aria-valuemin="0"
                                aria-valuemax="4"
                            ></div>
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p className="mt-3">
                Already registered? <a href="/login">Go to Login</a>
            </p>
        </div>
    );
};

export default Register;
