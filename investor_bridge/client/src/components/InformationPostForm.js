import React, { useState } from 'react';
import axios from 'axios';

const InformationPostForm = ({ user }) => {
  const [info, setInfo] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/advisor-info', 
        { infoText: info }, 
        { headers: { 'x-auth-token': token } }
      );
      setMsg('Information posted successfully!');
      setInfo('');
    } catch (err) {
      setMsg('Error posting information');
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="form-control mb-2"
        rows="3"
        placeholder="Share a helpful tip, article, or general advice for businesses or investors..."
        value={info}
        onChange={e => setInfo(e.target.value)}
        required
      />
      <button className="btn btn-primary" type="submit">
        <i className="bi bi-upload me-1"></i>Post Information
      </button>
      {msg && (
        <div className={`mt-3 alert ${msg.includes('success') ? 'alert-success' : 'alert-danger'}`}>
          {msg}
        </div>
      )}
    </form>
  );
};

export default InformationPostForm;
