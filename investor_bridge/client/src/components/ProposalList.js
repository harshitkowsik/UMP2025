import React, { useEffect, useState } from "react";
import axios from "axios";

const ProposalList = ({ proposalType, onSelectedProject }) => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/proposals?type=${proposalType}`)
      .then((res) => setProposals(res.data))
      .catch(() => setProposals([]));
  }, [proposalType]);

  const handleSelect = (proposal) => {
    if (onSelectedProject) onSelectedProject(proposal);
  };

  return (
    <div>
      {proposals.length === 0 && <p>No {proposalType} proposals currently available.</p>}
      <ul className="list-group">
        {proposals.map((p) => (
          <li
            key={p._id}
            onClick={() => handleSelect(p)}
            style={{ cursor: "pointer" }}
            className="list-group-item"
          >
            <strong>{p.title}</strong> - {p.description}
            <br />
            By: {p.createdBy?.name} (Role: {p.createdBy?.role})
            <br />
            Category: {p.category?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProposalList;
