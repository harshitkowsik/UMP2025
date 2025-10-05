import React from 'react';
import ProposalForm from './ProposalForm';
import ProposalList from './ProposalList';
import QueryList from './QueryList';
import QueryForm from './QueryForm';
import InformationList from './InformationList';
import LoanList from './LoanList';

const sectionStyle = "card shadow mb-4 border-0";
const sectionHeader = "card-header bg-primary text-light fw-bold";
const sectionBody = "card-body bg-light";

const InvestorDashboard = ({ user }) => {
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
          <i className="bi bi-pencil-square me-2"></i>
          Post Investor Proposal
        </div>
        <div className={sectionBody}>
        <ProposalForm user={user} proposalType="investor" />
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
                <div className={sectionHeader}>
                    <span className="fs-5"><i className="bi bi-bank2 me-2"></i>Available Loans</span>
                </div>
                <div className={sectionBody}>
                    <LoanList />
                </div>
            </div>

            <div className={sectionStyle}>
                <div className={sectionHeader}><i className="bi bi-info-circle-fill me-2"></i>Information & Tips</div>
                <div className={sectionBody}><InformationList /></div>
            </div>

      <div className={sectionStyle}>
                <div className={sectionHeader}>
                    <span className="fs-5"><i className="bi bi-question-circle-fill me-2"></i>Post Queries</span>
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

export default InvestorDashboard;
