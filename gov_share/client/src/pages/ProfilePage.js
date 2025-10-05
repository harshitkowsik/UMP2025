import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [form, setForm] = useState({});
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/user/me', { headers: { 'x-auth-token': token } });
        setForm(res.data);
        if (res.data.profilePic) setPreviewUrl(`http://localhost:5000/uploads/${res.data.profilePic}`);
      } catch {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  setProfilePicFile(file);
  if (file) {
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('profilePic', file);

      const res = await axios.put('/api/user/me', data, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile pic upload success:', res);
      setSuccess('Profile picture updated successfully!');
      if (res.data.profilePic) {
        setPreviewUrl(`http://localhost:5000/uploads/${res.data.profilePic}`);
      }
    } catch (err) {
      console.error('Profile pic upload error:', err);
      setError('Failed to update profile picture.');
    }
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess('');
  setError('');
  try {
    const token = localStorage.getItem('token');
    const data = new FormData();

    data.append('name', form.name || '');
    data.append('email', form.email || '');
    data.append('aadhaar', form.aadhaar || '');
    data.append('address', form.address || '');

    const res = await axios.put('/api/user/me', data, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Profile update success:', res);
    setSuccess('Profile updated successfully!');
  } catch (err) {
    console.error('Profile update error:', err);
    setError(err.response?.data?.message || 'Failed to update profile.');
  }
};    

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">My Profile</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="d-flex flex-column align-items-center mb-3">
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: '2px solid #dee2e6',
              overflow: 'hidden',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              background: '#f8f9fa',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {previewUrl ? (
              <img
                src={previewUrl || `/uploads/${form.profilePic}`}
                alt="Profile preview"
                style={{ width: 120, height: 120, objectFit: 'cover' }}
                onError={() => setPreviewUrl('default-profile-icon.png')}
              />
            ) : (
              <span className="text-muted" style={{ fontSize: 44 }}>👤</span>
            )}
          </div>
          <label className="btn btn-outline-secondary btn-sm mb-0">
            Change photo
            <input
              type="file"
              accept="image/*"
              className="form-control visually-hidden"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name || ''} onChange={handleChange} className="form-control mb-2" placeholder="Name" />
          <input name="email" value={form.email || ''} onChange={handleChange} className="form-control mb-2" placeholder="Email" />
          <input name="aadhaar" value={form.aadhaar || ''} onChange={handleChange} className="form-control mb-2" placeholder="Aadhaar" maxLength="12" />
          <input name="address" value={form.address || ''} onChange={handleChange} className="form-control mb-2" placeholder="Address" />

          <button className="btn btn-primary w-100 mt-3" type="submit" disabled={loading}>
  {loading ? 'Updating...' : 'Update'}
</button>


        </form>
        <p className="mt-3 text-center">
        Reset password? <Link to={`/reset-password?token=${form.resetPasswordToken}`}>Reset here</Link>

      </p>
      </div>
    </div>
  );
}

export default ProfilePage;
