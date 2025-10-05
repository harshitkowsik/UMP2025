import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SolutionForm from './SolutionForm';

const SolutionList = ({ queryId }) => {
  const [solutions, setSolutions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSolutions = async () => {
      const res = await axios.get(`http://localhost:5000/api/solutions/${queryId}`);
      setSolutions(res.data);
    };

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser(decoded);
      } catch {}
    }

    fetchSolutions();
  }, [queryId]);

  const canPostSolutions = user && (user.role === 'advisor' || user.role === 'banker');

  return (
    <div className="mb-3">
      <h5 className="text-primary fw-bold mb-3">Solutions</h5>
      {solutions.length === 0 && <p className="text-muted">No solutions yet.</p>}
      {solutions.map(s => (
        <div key={s._id} className="card mb-2 shadow-sm border-0">
          <div className="card-body">
            <p className="mb-1">{s.solutionText}</p>
            <p className="text-muted small">
              Posted by: <span className="fw-semibold">{s.postedBy?.name}</span> ({s.postedBy?.role})
            </p>
          </div>
        </div>
      ))}
      {canPostSolutions && <SolutionForm queryId={queryId} user={user} />}
    </div>
  );
};

export default SolutionList;
