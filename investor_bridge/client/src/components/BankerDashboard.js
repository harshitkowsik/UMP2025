import React from 'react';
import LoanDetailsForm from './LoanDetailsForm';
import QueryList from './QueryList';
import LoanList from './LoanList';

const sectionStyle = "card shadow mb-4";
const sectionHeader = "card-header bg-primary text-light fw-bold";
const sectionBody = "card-body bg-light";

const BankerDashboard = ({ user }) => {
  return (
    <div className="container mt-4">
      <div className="mb-5 text-center">
        <h1 className="display-4">
          Welcome, <span className="badge rounded-pill bg-primary align-middle">{user.name}</span>
        </h1>
      </div>

      <div className={sectionStyle}>
        <div className={sectionHeader}>
          <span className="fs-5"><i className="bi bi-bank2 me-2"></i>Post Loan Details</span>
        </div>
        <div className={sectionBody}>
          <LoanDetailsForm user={user} />
        </div>
      </div>

      <div className={sectionStyle}>
                <div className={sectionHeader}>
                    <span className="fs-5"><i className="bi bi-bank2 me-2"></i>Available Loans</span>
                </div>
                <div className={sectionBody}>
                    <LoanList />
                </div>
            </div>

      <div className={sectionStyle}>
        <div className={sectionHeader}>
          <span className="fs-5"><i className="bi bi-card-list me-2"></i>View Queries</span>
        </div>
        <div className={sectionBody}>
          <QueryList />
        </div>
      </div>

    </div>
  );
};

export default BankerDashboard;
