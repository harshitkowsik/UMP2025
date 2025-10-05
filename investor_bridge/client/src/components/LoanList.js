import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoanList = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/loans');
        setLoans(res.data);
      } catch {
        setLoans([]);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div>
      {loans.length === 0 && <p>No loans currently available.</p>}
      <ul className="list-group">
        {loans.map((loan) => (
          <li key={loan._id} className="list-group-item">
            <strong>{loan.bankName}</strong> offers up to <b>{loan.loanAmount}</b> at <b>{loan.interestRate}%</b> interest for <b>{loan.loanTerm} months</b>.<br />
            Description: {loan.description || "N/A"}<br />
            Posted by: {loan.postedBy?.name || "Unknown"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanList;
