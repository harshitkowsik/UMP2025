import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { token, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: '' });
    }
  }, [user]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) return score;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const onPasswordChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, password: val });
    setPasswordStrength(calculatePasswordStrength(val));
  };

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/user/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch {
      setMessage('Failed to update profile');
    }
  };

  return (
    <div className="container">
      <h2>My Profile</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input name="name" value={formData.name} onChange={onChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input name="email" value={formData.email} onChange={onChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>New Password (leave blank to keep current)</label>
          <div className="input-group mb-3">
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    className="form-control"
    value={formData.password}
    onChange={onPasswordChange}
    placeholder="New Password"
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
  <div className="progress mb-3">
    <div
      className={`progress-bar ${
        passwordStrength <= 1 ? 'bg-danger' : passwordStrength === 2 ? 'bg-warning' : 'bg-success'
      }`}
      style={{ width: `${(passwordStrength / 4) * 100}%` }}
      aria-valuenow={passwordStrength}
      aria-valuemin="0"
      aria-valuemax="4"
    ></div>
  </div>
)}

        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
