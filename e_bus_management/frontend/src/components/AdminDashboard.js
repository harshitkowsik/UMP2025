import React, { useState } from 'react';
import API from '../api/api';
import AdminDriverBusDetails from './AdminDriverBusDetails';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminDashboard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordStrength, setPasswordStrength] = React.useState(0);

  const handleCreateDriver = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await API.post('/admin/create-driver', {
        name,
        email,
        password,
        contactNumber
      });
      setMessage(data.message);
      setName('');
      setEmail('');
      setPassword('');
      setContactNumber('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating driver');
    }
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(getPasswordStrength(pwd));
  };

  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };


  return (
    <div className="container col-md-6 my-4">

      <div>
        <h1 className='text-center mb-4'>Admin Dashboard</h1>
        <AdminDriverBusDetails />
      </div>
      <div className="card p-4 shadow-sm">
      <h2 className='mb-4'>Create Driver Account</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleCreateDriver}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" value={name} required onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} required onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span
              className="input-group-text"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {password && (
            <>
              <div className="progress mt-2" style={{ height: '8px' }}>
                <div
                  className={`progress-bar ${passwordStrength === 5
                    ? 'bg-success'
                    : passwordStrength >= 3
                      ? 'bg-warning'
                      : 'bg-danger'
                    }`}
                  role="progressbar"
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  aria-valuenow={passwordStrength}
                  aria-valuemin="0"
                  aria-valuemax="5"
                ></div>
              </div>
              <small>
                {passwordStrength === 5
                  ? 'Strong Password'
                  : passwordStrength >= 3
                    ? 'Medium Password'
                    : 'Weak Password'}
              </small>
            </>
          )}
        </div>

        <div className="mb-3">
          <label>Contact Number</label>
          <input type="number" className="form-control" value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary mb-3">Create Driver</button>
      </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
