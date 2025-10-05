import React from 'react';
import FeedbackForm from './FeedbackForm';

const HomePage = () => {
  return (
    <>
      <header className="bg-primary text-white text-center py-5 mb-5">
        <h1>Welcome to InvestorBridge</h1>
        <p className="lead">Connecting Innovators with Opportunity</p>
      </header>

      <section className="container mb-5">
        <h2>Why InvestorBridge?</h2>
        <p>InvestorBridge is a platform that bridges the gap between business innovators and investors looking for the next big idea. Whether you have a strong company idea or are looking to invest wisely, InvestorBridge helps you take the next step.</p>
        <div className="row text-center mt-4">
          <div className="col-md-4">
            <i className="bi bi-people-fill fs-1 text-primary"></i>
            <h4 className="mt-3">Wide Network</h4>
            <p>Connect with verified investors and entrepreneurs across industries.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-graph-up-arrow fs-1 text-primary"></i>
            <h4 className="mt-3">Smart Investment</h4>
            <p>Make data-driven decisions and find opportunities with real potential.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-shield-lock-fill fs-1 text-primary"></i>
            <h4 className="mt-3">Secure & Transparent</h4>
            <p>All transactions and interactions are protected with cutting-edge security.</p>
          </div>
        </div>
      </section>

      <section className="bg-light py-5 mb-5">
        <div className="container">
          <h2 className="text-center mb-4">How It Works</h2>
          <ol className="lead lh-lg">
            <li>Register as an Investor or a Business Member</li>
            <li>Create or Browse Proposals matching your interests</li>
            <li>Engage in meaningful discussions and negotiate investments</li>
          </ol>
        </div>
      </section>

      <section className="container mb-5">
        <h2 className="mb-4">Send Us Your Feedback</h2>
        <FeedbackForm />
      </section>

      <Footer />
    </>
  );
};

const Footer = () => (
  <footer className="bg-primary text-white text-center py-3 mt-5">
    <small>© 2025 InvestorBridge. All rights reserved.</small>
  </footer>
);

export default HomePage;
