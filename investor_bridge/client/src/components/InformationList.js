import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InformationList = () => {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/advisor-info')
      .then(res => setInfos(res.data))
      .catch(() => setInfos([]));
  }, []);

  return (
    <div>
      {infos.length === 0 && <p className="text-muted">No advisor tips or information yet.</p>}
      {infos.map(info => (
        <div key={info._id} className="card shadow-sm mb-3">
          <div className="card-body">
            <p>{info.infoText}</p>
            <p className="text-muted small mb-0">By: {info.postedBy?.name} ({info.postedBy?.role})</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InformationList;
