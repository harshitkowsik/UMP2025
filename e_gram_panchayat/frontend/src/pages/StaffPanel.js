import React, { useState, useEffect, useContext } from 'react';
import { getServices } from '../api/serviceApi';
import { getUserApplications, updateApplicationStatus } from '../api/applicationApi';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import StatusBadge from '../components/StatusBadge';

const StaffPanel = () => {
  const { token, user } = useContext(AuthContext);

  const [services, setServices] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetchServices();
    fetchApplications();
    fetchProfile();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await getServices();
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get('/api/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (appId, status) => {
    try {
      await updateApplicationStatus(appId, { status }, token);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-2">Staff Panel</h2>

      <section>
        <h3>Services</h3>
        <ul>
          {services.map(s => <li key={s._id}>{s.title} - {s.description}</li>)}
        </ul>
      </section>

      <section>
        <h3>Applications</h3>
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Details</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>{app.user?.name || 'N/A'}</td>
                <td>{app.service?.title || 'N/A'}</td>
                <td>
                  {app.applicationData && Object.entries(app.applicationData).map(([key, val]) => (
                    <div key={key}><strong>{key}:</strong> {String(val)}</div>
                  ))}
                </td>
                <td><StatusBadge status={app.status} /></td>
                <td>
                  <select className='form-select' value={app.status} onChange={(e) => updateStatus(app._id, e.target.value)} key={app._id + app.status}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default StaffPanel;
