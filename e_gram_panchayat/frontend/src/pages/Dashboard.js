import React, { useState, useEffect, useContext } from 'react';
import { getServices } from '../api/serviceApi';
import { applyForService, getUserApplications, updateApplicationStatus } from '../api/applicationApi';
import { AuthContext } from '../contexts/AuthContext';
import StatusBadge from '../components/StatusBadge';

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getServices().then(res => setServices(res.data));
    if (token) {
      getUserApplications(token).then(res => {
        console.log('User applications:', res.data); 
        setApplications(res.data);
      });
    }
  }, [token]);

  const handleServiceChange = (serviceId) => {
    const service = services.find(s => s._id === serviceId);
    setSelectedService(service);
    setFormValues({});
    setMessage('');
  };

  const handleInputChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const apply = async () => {
    console.log('Apply clicked with values:', formValues, 'for service:', selectedService);
    if (!selectedService) {
      setMessage('Please select a service');
      return;
    }
    const missing = selectedService.requiredFields?.filter(f => !formValues[f.field]) || [];
    if (missing.length > 0) {
      setMessage(`Please fill: ${missing.map(f => f.label).join(', ')}`);
      return;
    }

    try {
      await applyForService({ serviceId: selectedService._id, applicationData: formValues }, token);
      setMessage('Application submitted successfully');
      setSelectedService(null);
      setFormValues({});
      const res = await getUserApplications(token);
      setApplications(res.data);
    } catch (error) {
      console.error('Apply error:', error);
      setMessage('Failed to submit application');
    }
  };

  return (
    <div className="container my-4">
      <h2>Available Services</h2>
      <select
        className="form-select mb-3"
        onChange={e => handleServiceChange(e.target.value)}
        value={selectedService?._id || ''}
      >
        <option value="">Select a service</option>
        {services.map(s => (
          <option key={s._id} value={s._id}>
            {s.title} - {s.description}
          </option>
        ))}
      </select>

      {selectedService && (
        <div className="mb-3">
          <h4>Fill Application Details</h4>
          {selectedService.requiredFields?.map(({ field, label, type, options }) => (
            <div className="mb-3" key={field}>
              <label>{label}</label>
              {type === 'select' ? (
                <select
                  className="form-select"
                  value={formValues[field] || ''}
                  onChange={e => handleInputChange(field, e.target.value)}
                >
                  <option value="">Select {label}</option>
                  {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  className="form-control"
                  type={type || 'text'}
                  value={formValues[field] || ''}
                  onChange={e => handleInputChange(field, e.target.value)}
                />
              )}
            </div>
          ))}
          <button className="btn btn-primary" onClick={apply}>Apply</button>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      )}

      <h3>Your Applications</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Service</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map(app => (
              <tr key={app._id}>
                <td>{app.service?.title || 'N/A'}</td>
                <td><StatusBadge status={app.status} /></td>
                <td>
                  {app.applicationData && Object.keys(app.applicationData).length > 0 ? (
                    Object.entries(app.applicationData).map(([key, val]) => (
                      <div key={key}>
                        <strong>{key}:</strong> {String(val)}
                      </div>
                    ))
                  ) : (
                    'No details'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No applications found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
