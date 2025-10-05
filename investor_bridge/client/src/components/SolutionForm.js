import React, { useState } from 'react';
import axios from 'axios';

const SolutionForm = ({ queryId, user }) => {
  const [solutionText, setSolutionText] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!solutionText.trim()) {
      setMsg('Solution cannot be empty');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/solutions', 
        { solutionText, query: queryId }, 
        { headers: { 'x-auth-token': token } }
      );
      setMsg('Solution posted!');
      setSolutionText('');
    } catch (err) {
      setMsg('Error posting solution');
    }
  };

  if (!user) return <div className="alert alert-warning my-3 text-center">Please login to post solutions.</div>;

  return (
    <div className="card border-0 shadow-sm my-3">
      <div className="card-body bg-light rounded">
        <form onSubmit={submit}>
          <textarea
            className="form-control mb-3"
            value={solutionText}
            onChange={e => setSolutionText(e.target.value)}
            rows="3"
            placeholder="Write your solution here..."
            required
          />
          <button type="submit" className="btn btn-primary w-100">
            Submit Solution
          </button>
        </form>
        {msg && (
          <div className={`mt-3 alert ${msg === 'Solution posted!' ? 'alert-success' : 'alert-danger'}`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionForm;
