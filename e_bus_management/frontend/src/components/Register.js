import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', contactNumber: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);
  const strong = passwordStrength >= 5;
  const navigate = useNavigate();

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!strong) {
      setError('Password is not strong enough.');
      return;
    }

    if (!/^\d{10}$/.test(formData.contactNumber)) {
      setError('Contact number must be exactly 10 digits.');
      return;
    }
    
    try {
      await API.post('/auth/register', { ...formData });
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container col-md-6">
      <h2 className="mb-3">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} required onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} required onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={formData.password}
              required
              onChange={handleChange}
            />
            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {formData.password && (
            <>
              <div className="progress mt-2" style={{ height: '8px' }}>
                <div
                  className={`progress-bar ${passwordStrength === 5 ? 'bg-success' : passwordStrength >= 3 ? 'bg-warning' : 'bg-danger'}`}
                  role="progressbar"
                  style={{ width: `${passwordStrength * 20}%` }}
                  aria-valuenow={passwordStrength}
                  aria-valuemin="0"
                  aria-valuemax="5"
                ></div>
              </div>
              <small>
                {passwordStrength === 5 ? 'Strong Password' :
                  passwordStrength >= 3 ? 'Medium Password' : 'Weak Password'}
              </small>
            </>
          )}
        </div>
        <div className="mb-3">
          <label>Contact Number</label>
          <input type="number" className="form-control" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required min="1000000000"
    max="9999999999"
    pattern="[0-9]{10}"
    title="Enter a 10-digit number"/>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
