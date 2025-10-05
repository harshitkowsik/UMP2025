import React, { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [aadhaar, setAadhaar] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const isAadhaarValid = (val) => /^\d{12}$/.test(val);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!aadhaar || !isAadhaarValid(aadhaar)) {
      setError('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('aadhaar', aadhaar);
    formData.append('file', file);
    console.log('Sending file:', file);

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        }
      }).then(response => console.log('Upload response:', response))
      .catch(error => console.error('Upload error:', error));

      setSuccess('Document uploaded successfully!');
      setAadhaar('');
      setFile(null);
      e.target.reset();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <h2 className="mb-4">Upload Government Document</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="aadhaar" className="form-label">Aadhaar Number</label>
          <input
            type="text"
            id="aadhaar"
            name="aadhaar"
            className="form-control"
            placeholder="12-digit Aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            maxLength="12"
            disabled={loading}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="file" className="form-label">Select Document File</label>
          <input
            type="file"
            id="file"
            name="file"
            className="form-control"
            onChange={handleFileChange}
            disabled={loading}
            accept=".pdf,.doc,.docx,.jpg,.png"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default UploadPage;
