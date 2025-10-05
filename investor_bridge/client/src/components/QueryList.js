import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SolutionList from './SolutionList';

const QueryList = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/queries')
      .then(res => setQueries(res.data))
      .catch(() => setQueries([]));
  }, []);

  return (
    <div className="container my-4" style={{ maxWidth: '900px' }}>
      {queries.length === 0 && (
        <div className="alert alert-info text-center">
          No queries to display.
        </div>
      )}
      {queries.map(q => (
        <div key={q._id} className="card shadow-sm mb-4 border-0 rounded-3">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top">
            <span className="fs-5 fw-bold">Question</span>
            <span className="badge bg-secondary text-dark">
              Asked by: {q.askedBy?.name || "Unknown"} ({q.askedBy?.role || "N/A"})
            </span>
          </div>
          <div className="card-body bg-light rounded-bottom">
            <p className="card-text fs-6 mb-3">{q.question}</p>
            <hr />
            <div>
              <SolutionList queryId={q._id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QueryList;
