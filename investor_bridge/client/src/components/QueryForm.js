import React, { useState } from 'react';
import axios from 'axios';

const QueryForm = ({ user }) => {
  const [question, setQuestion] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!question.trim()) {
      setMsg('Question cannot be empty');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/queries', 
        { question }, 
        { headers: { 'x-auth-token': token } }
      );
      setMsg('Query submitted!');
      setQuestion('');
    } catch (err) {
      setMsg('Error submitting query');
    }
  };

  if (!user) {
    return (
      <div className="alert alert-warning text-center my-3">
        Please login to post queries.
      </div>
    );
  }

  return (
    <div className="card shadow bg-light border-0" style={{ margin: '0 auto' }}>
      <div className="card-body">
        <form onSubmit={submit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              rows={4}
              placeholder="Type your question here..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary px-4">
            <i className="bi bi-send me-2"></i> Submit Query
          </button>
          {msg && (
            <div className={`mt-3 alert ${msg === 'Query submitted!' ? 'alert-success' : 'alert-danger'}`}>
              {msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default QueryForm;
