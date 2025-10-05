import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [responseMsg, setResponseMsg] = useState('');
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/feedback', formData);
      setResponseMsg(res.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setResponseMsg('Error submitting feedback');
    }
  };

  return (
    <div className="container py-5">

      <div className="jumbotron text-center bg-primary text-light mb-5 py-5">
        <h1>Digital E Gram Panchayat</h1>
        <p>Your gateway to transparent, efficient village government services</p>
        {!user && (
        <a className="btn btn-light btn-lg" href="/login">Get Started</a>
        )}
      </div>

      <div className="row mb-5">
        <div className="col-md-4 text-center">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4 className="card-title">Apply for Services</h4>
              <p>Submit applications for various local government schemes and services online.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4 className="card-title">Track Application Status</h4>
              <p>Easily track the approval status and history of your submitted applications.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4 className="card-title">24x7 Support & Feedback</h4>
              <p>Connect with Panchayat staff for help, or leave feedback to help us serve you better.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h3>Recent Updates</h3>
        <ul>
          <li>New Water Connection service launched!</li>
          <li>Annual village cleanliness drive registration open.</li>
          <li>Mobile app coming soon.</li>
        </ul>
      </div>

      <div className="mb-5">
        <h3>Feedback</h3>
      <p>Please provide your feedback below:</p>
      {responseMsg && <div className="alert alert-info">{responseMsg}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" value={formData.name} required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" value={formData.email} required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Message:</label>
          <textarea className="form-control" name="message" value={formData.message} required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit Feedback</button>
      </form>
      </div>

      <footer className="bg-light text-center py-3">
        <p>Contact us: digitalgram@village.gov.in | Follow on Twitter @GramPanchayat</p>
        <p>© {new Date().getFullYear()} Digital E Gram Panchayat</p>
      </footer>

    </div>
  );
};

export default Home;
