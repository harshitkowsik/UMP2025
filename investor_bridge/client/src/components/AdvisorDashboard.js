import React from 'react';
import QueryList from './QueryList';       
import InformationPostForm from './InformationPostForm'; 
import InformationList from './InformationList';
import ProposalList from './ProposalList';
import LoanList from './LoanList';

const sectionStyle = "card shadow mb-4 border-0";
const sectionHeader = "card-header bg-primary text-light fw-bold";
const sectionBody = "card-body bg-light";

const AdvisorDashboard = ({ user }) => {

    return (
        <div className="container mt-4" style={{ maxWidth: 950 }}>
            <div className="mb-4 text-center">
                <h1 className="display-5">
                    Welcome, <span className="badge rounded-pill bg-primary">{user.name}</span>
                </h1>
            </div>

            <div className={sectionStyle}>
                <div className={sectionHeader}>
                    <i className="bi bi-info-circle-fill me-2"></i>
                    Post Information (Advice)
                </div>
                <div className={sectionBody}>
                    <InformationPostForm user={user} />
                </div>
            </div>

            <div className={sectionStyle}>
                <div className={sectionHeader}><i className="bi bi-info-circle-fill me-2"></i>Information & Tips</div>
                <div className={sectionBody}><InformationList /></div>
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
                <div className={sectionHeader}>
                    <span className="fs-5"><i className="bi bi-bank2 me-2"></i>Available Loans</span>
                </div>
                <div className={sectionBody}>
                    <LoanList />
                </div>
            </div>

            <div className={sectionStyle}>
                <div className={sectionHeader}>
                    <i className="bi bi-list-task me-2"></i>
                    All Queries & Solutions (Answer as Advisor)
                </div>
                <div className={sectionBody}>
                    <QueryList user={user} />
                </div>
            </div>
        </div>
    );
};

export default AdvisorDashboard;
