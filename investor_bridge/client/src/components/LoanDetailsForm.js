import React, { useState } from 'react';
import axios from 'axios';

const LoanDetailsForm = ({ user }) => {
  const [form, setForm] = useState({
    bankName: '',
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
    description: ''
  });
  const [msg, setMsg] = useState('');

  if (!user) return <div className="alert alert-warning text-center">Please login to post loan details.</div>;

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/loans', {
        ...form,
        title: `Loan for ${user.name}`,
        description: form.description,
        category: null,
        type: 'loan'
      }, {
        headers: { 'x-auth-token': token }
      });
      setMsg('Loan details posted successfully');
      setForm({
        loanAmount: '',
        interestRate: '',
        loanTerm: '',
        description: ''
      });
    } catch (error) {
      setMsg('Error posting loan details');
    }
  };

  return (
    <div className="card shadow-sm border-0 bg-light" style={{ margin: '0 auto' }}>
      <div className="card-body">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Bank Name</label>
            <input
              type="text"
              name="bankName"
              className="form-control"
              value={form.bankName}
              onChange={onChange}
              required
              placeholder="Enter bank name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Loan Amount</label>
            <input
              type="number"
              name="loanAmount"
              className="form-control"
              value={form.loanAmount}
              onChange={onChange}
              required
              placeholder="Enter loan amount"
              min="0"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Interest Rate (%)</label>
            <input
              type="number"
              name="interestRate"
              className="form-control"
              value={form.interestRate}
              onChange={onChange}
              required
              placeholder="Enter interest rate (%)"
              step="0.01"
              min="0"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Loan Term (months)</label>
            <input
              type="number"
              name="loanTerm"
              className="form-control"
              value={form.loanTerm}
              onChange={onChange}
              required
              placeholder="Enter loan term in months"
              min="1"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={form.description}
              onChange={onChange}
              placeholder="Additional loan details"
              rows="3"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success px-4">
            <i className="bi bi-send me-2"></i> Submit Loan Details
          </button>
          {msg && (
            <div className={`mt-3 alert ${msg.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
              {msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoanDetailsForm;
