import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('http://localhost:5000/api/feedback', form);
      setStatus('Thank you for your feedback!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('Failed to send feedback. Please try again.');
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          className="form-control"
          rows="4"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <p className="mt-3">{status}</p>
    </form>
  );
};

export default FeedbackForm;
