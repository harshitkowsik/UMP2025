import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function getPasswordStrength(password) {
  let score = 0;
  if (!password) return { label: '', color: '', percent: 0 };
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return { label: 'Weak', color: 'danger', percent: 20 };
  if (score === 3) return { label: 'Medium', color: 'warning', percent: 60 };
  if (score >= 4) return { label: 'Strong', color: 'success', percent: 100 };
}


function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    aadhaar: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handlePasswordChange = (e) => {
    setForm({ ...form, password: e.target.value });
    setPasswordTouched(true);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const passwordStrength = getPasswordStrength(form.password);

    if (!form.name || !form.email || !form.password || !form.aadhaar) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^\d{12}$/.test(form.aadhaar)) {
      setError('Aadhaar must be a 12-digit number.');
      return;
    }

    if (passwordStrength.label === 'Weak') {
      setError('Password is too weak. Please make it stronger.');
      return;
    }

    try {
      setLoading(true);
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post('/api/auth/register', form);
      setSuccess('Registration successful! You can now login.');
      setForm({ name: '', email: '', password: '', aadhaar: '' });
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mt-4 mb-4" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="form-control"
              value={form.password}
              onChange={handlePasswordChange}
              onBlur={() => setPasswordTouched(true)}
              disabled={loading}
              required
              style={{ paddingRight: '2.5rem', width: '100%' }}
            />
            <span
              onClick={() => setShowPassword(prev => !prev)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '0.5rem',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#555',
                fontSize: '1.2rem',
                userSelect: 'none'
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          {form.password && passwordTouched && (
            <div className="mt-2">
              <div className="d-flex align-items-center">
                <div style={{
                  height: '8px',
                  flex: 1,
                  background: '#eee',
                  borderRadius: '4px',
                  marginRight: '1rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${getPasswordStrength(form.password).percent}%`,
                    background: `var(--bs-${getPasswordStrength(form.password).color})`
                  }} />
                </div>
                <strong className={`text-${getPasswordStrength(form.password).color}`}>
                  {getPasswordStrength(form.password).label}
                </strong>
              </div>
              <small className="text-muted">Use 8+ chars, upper/lowercase, numbers & a special symbol.</small>
            </div>
          )}
        </div>


        <div className="mb-3">
          <label htmlFor="aadhaar" className="form-label">Aadhaar Number</label>
          <input
            id="aadhaar"
            type="text"
            name="aadhaar"
            className="form-control"
            value={form.aadhaar}
            onChange={handleChange}
            disabled={loading}
            maxLength="12"
            placeholder="12-digit Aadhaar"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="mt-3">
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
