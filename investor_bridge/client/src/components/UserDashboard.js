import React from 'react';
import QueryForm from './QueryForm';
import QueryList from './QueryList';
import ProposalList from './ProposalList';
import InformationList from './InformationList';

const sectionStyle = "card shadow mb-4 border-0";
const sectionHeader = "card-header bg-primary text-light fw-bold";
const sectionBody = "card-body bg-light";

const UserDashboard = ({ user }) => {
  return (
    <div className="container mt-4" style={{ maxWidth: 900 }}>
      <div className="mb-5 text-center">
        <h1 className="display-5">
          Welcome, <span className="badge rounded-pill bg-primary align-middle">{user.name}</span>
        </h1>
      </div>

      <div className={sectionStyle}>
        <div className={sectionHeader}>
          <i className="bi bi-lightbulb-fill me-2"></i>
          All Business Proposals
        </div>
        <div className={sectionBody}>
          <ProposalList proposalType="business" />
        </div>
      </div>

      <div className={sectionStyle}>
        <div className={sectionHeader}>
          <i className="bi bi-card-list me-2"></i>
          All Investor Proposals
        </div>
        <div className={sectionBody}>
          <ProposalList proposalType="investor" />
        </div>
      </div>

      <div className={sectionStyle}>
        <div className={sectionHeader}><i className="bi bi-info-circle-fill me-2"></i>Information & Tips</div>
        <div className={sectionBody}><InformationList /></div>
      </div>

      <div className={sectionStyle}>
        <div className={sectionHeader}>
          <span className="fs-5"><i className="bi bi-question-circle-fill me-2"></i>Post Your Query</span>
        </div>
        <div className={sectionBody}>
          <QueryForm user={user} />
        </div>
      </div>

      <div className={sectionStyle}>
        <div className={sectionHeader}>
          <span className="fs-5"><i className="bi bi-list-check me-2"></i>All Queries</span>
        </div>
        <div className={sectionBody}>
          <QueryList />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
