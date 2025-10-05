import React, { useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!feedback) {
      setError('Please enter your feedback.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('/api/feedback', { email, feedback });
      setSuccess(res.data.message);
      setEmail('');
      setFeedback('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4 mb-2 text-success" style={{ letterSpacing: ".5px" }}>
          Welcome to GovDocShare
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: 700 }}>
          Securely upload, share, and manage your government documents with trusted family members and advisors.<br />
          Your privacy and control are our top priorities.
        </p>
      </div>

      <div className="row mb-5 justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow text-center h-100">
            <div className="card-body">
              <i className="bi bi-cloud-upload display-1 text-primary mb-3"></i>
              <h5 className="card-title fw-bold">Easy Upload</h5>
              <p className="card-text text-muted">Upload your government documents securely in seconds.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow text-center h-100">
            <div className="card-body">
              <i className="bi bi-share-fill display-1 text-success mb-3"></i>
              <h5 className="card-title fw-bold">Share with Family</h5>
              <p className="card-text text-muted">Choose exactly who can view your sensitive docs, anytime.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow text-center h-100">
            <div className="card-body">
              <i className="bi bi-shield-lock-fill display-1 text-danger mb-3"></i>
              <h5 className="card-title fw-bold">Top-grade Security</h5>
              <p className="card-text text-muted">State-of-the-art encryption guards your data at every step.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 px-3 my-5 rounded" style={{ background: "#f7fafd", border: "1px solid #e0e5ec" }}>
        <h2 className="mb-3 text-primary" >Why Choose GovDocShare?</h2>
        <ul className="list-group list-group-flush bg-transparent mb-0">
          <li className="list-group-item bg-transparent border-0">
            <i className="bi bi-check-circle-fill text-success me-2"></i> Anytime, Anywhere Access
          </li>
          <li className="list-group-item bg-transparent border-0">
            <i className="bi bi-check-circle-fill text-success me-2"></i> User-friendly, Intuitive UI
          </li>
          <li className="list-group-item bg-transparent border-0">
            <i className="bi bi-check-circle-fill text-success me-2"></i> Granular Control & Permissions
          </li>
          <li className="list-group-item bg-transparent border-0">
            <i className="bi bi-check-circle-fill text-success me-2"></i> Trusted by Thousands of Users
          </li>
        </ul>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0 p-4">
            <h3 className="mb-4 text-primary fw-bold">We value your feedback</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Your Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="feedback" className="form-label fw-semibold">Your Feedback</label>
                <textarea
                  id="feedback"
                  className="form-control"
                  rows="4"
                  placeholder="Share your thoughts or suggestions..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 fw-bold"
                disabled={loading}
                style={{ letterSpacing: ".5px" }}
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
