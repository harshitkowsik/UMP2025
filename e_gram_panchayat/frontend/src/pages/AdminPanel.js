import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getServices, createService } from '../api/serviceApi';
import { getUserApplications, updateApplicationStatus } from '../api/applicationApi';
import { AuthContext } from '../contexts/AuthContext';
import StatusBadge from '../components/StatusBadge';

const AdminPanel = () => {
  const { token } = useContext(AuthContext);

  const [services, setServices] = useState([]);
  const [applications, setApplications] = useState([]);
  const [newService, setNewService] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');
  const [staffData, setStaffData] = useState({ name: '', email: '', password: '' });
  const [staffMessage, setStaffMessage] = useState('');
  const [editServiceId, setEditServiceId] = useState(null);
  const [editServiceData, setEditServiceData] = useState({ title: '', description: '', requiredFields: [] });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const minPasswordStrength = 4;

  const fetchApplications = async () => {
    try {
      const res = await axios.get('/api/applications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Admin applications:', res.data); 
      setApplications(res.data);
    } catch (err) {
      console.error('Failed to fetch admin applications:', err);
      setMessage('Failed to load applications. Check your permissions.');
      setApplications([]);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchApplications();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await getServices();
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addService = async () => {
    try {
      await createService(newService, token);
      setMessage('Service created successfully');
      setNewService({ title: '', description: '' });
      fetchServices();
    } catch (err) {
      setMessage('Failed to create service');
    }
  };

  const startEditService = (service) => {
    setEditServiceId(service._id);
    setEditServiceData({
      title: service.title,
      description: service.description,
      requiredFields: service.requiredFields || [],
    });
  };

  const cancelEditService = () => {
    setEditServiceId(null);
    setEditServiceData({ title: '', description: '', requiredFields: [] });
  };

  const updateService = async () => {
    try {
      await axios.put(
        `/api/services/${editServiceId}`,
        editServiceData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Service updated');
      cancelEditService();
      fetchServices();
    } catch (err) {
      setMessage('Failed to update service');
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Are you sure to delete this service?')) return;
    try {
      await axios.delete(
        `/api/services/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Service deleted');
      fetchServices();
    } catch (err) {
      setMessage('Failed to delete service');
    }
  };

  const addField = () => {
    const updatedFields = [...(editServiceId ? editServiceData.requiredFields : newService.requiredFields || [])];
    updatedFields.push({ field: '', label: '', type: 'text', options: [] });
    if (editServiceId) {
      setEditServiceData({ ...editServiceData, requiredFields: updatedFields });
    } else {
      setNewService({ ...newService, requiredFields: updatedFields });
    }
  };

  const updateField = (index, key, value) => {
    const updatedFields = [...(editServiceId ? editServiceData.requiredFields : newService.requiredFields || [])];
    updatedFields[index][key] = value;
    if (key === 'type' && value !== 'select') {
      updatedFields[index].options = [];
    }
    if (editServiceId) {
      setEditServiceData({ ...editServiceData, requiredFields: updatedFields });
    } else {
      setNewService({ ...newService, requiredFields: updatedFields });
    }
  };

  const updateOption = (fieldIndex, optionIndex, value) => {
    const updatedFields = [...(editServiceId ? editServiceData.requiredFields : newService.requiredFields || [])];
    updatedFields[fieldIndex].options[optionIndex] = value;
    if (editServiceId) {
      setEditServiceData({ ...editServiceData, requiredFields: updatedFields });
    } else {
      setNewService({ ...newService, requiredFields: updatedFields });
    }
  };

  const addOption = (fieldIndex) => {
    const updatedFields = [...(editServiceId ? editServiceData.requiredFields : newService.requiredFields || [])];
    updatedFields[fieldIndex].options.push('');
    if (editServiceId) {
      setEditServiceData({ ...editServiceData, requiredFields: updatedFields });
    } else {
      setNewService({ ...newService, requiredFields: updatedFields });
    }
  };

  const removeField = (index) => {
    const updatedFields = [...(editServiceId ? editServiceData.requiredFields : newService.requiredFields || [])];
    updatedFields.splice(index, 1);
    if (editServiceId) {
      setEditServiceData({ ...editServiceData, requiredFields: updatedFields });
    } else {
      setNewService({ ...newService, requiredFields: updatedFields });
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, { status }, token);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) return score;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const handleStaffChange = (e) => {
    const { name, value } = e.target;
    setStaffData({ ...staffData, [name]: value });
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const createStaffUser = async () => {
    if (passwordStrength < minPasswordStrength) {
      setStaffMessage('Please enter a stronger password');
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.post('/api/admin/staff', staffData, config);
      setStaffMessage(res.data.message);
      setStaffData({ name: '', email: '', password: '' });
    } catch (err) {
      setStaffMessage(err.response?.data?.message || 'Failed to create staff user');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Admin Panel</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h4>Manage Services</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control mb-2"
              placeholder="Service Title"
              value={editServiceId ? editServiceData.title : newService.title}
              onChange={(e) => {
                if (editServiceId) {
                  setEditServiceData({ ...editServiceData, title: e.target.value });
                } else {
                  setNewService({ ...newService, title: e.target.value });
                }
              }}
            />
            <textarea
              name="description"
              className="form-control mb-2"
              placeholder="Service Description"
              value={editServiceId ? editServiceData.description : newService.description}
              onChange={(e) => {
                if (editServiceId) {
                  setEditServiceData({ ...editServiceData, description: e.target.value });
                } else {
                  setNewService({ ...newService, description: e.target.value });
                }
              }}
            />
            <div>
              <h5>Required Fields</h5>
              {(editServiceId ? editServiceData.requiredFields : newService.requiredFields || []).map((field, index) => (
                <div key={index} className="border p-2 my-2">
                  <input
                    placeholder="Field Name (internal)"
                    value={field.field}
                    onChange={(e) => updateField(index, 'field', e.target.value)}
                  />
                  <input
                    placeholder="Label (shown to user)"
                    value={field.label}
                    onChange={(e) => updateField(index, 'label', e.target.value)}
                  />
                  <select
                    value={field.type}
                    onChange={(e) => updateField(index, 'type', e.target.value)}
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="select">Select</option>
                  </select>
                  {field.type === 'select' && (
                    <div>
                      {field.options.map((opt, optIndex) => (
                        <input
                          key={optIndex}
                          value={opt}
                          onChange={(e) => updateOption(index, optIndex, e.target.value)}
                          placeholder="Option"
                        />
                      ))}
                      <button onClick={() => addOption(index)}>Add Option</button>
                    </div>
                  )}
                  <button onClick={() => removeField(index)}>Remove Field</button>
                </div>
              ))}
              <button onClick={addField}>Add Required Field</button>
            </div>
            {editServiceId ? (
              <>
                <button className="btn btn-success me-2 mt-2" onClick={updateService}>
                  Update Service
                </button>
                <button className="btn btn-secondary" onClick={cancelEditService}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn btn-primary mt-2" onClick={addService}>
                Add Service
              </button>
            )}
          </div>

          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Required Fields</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td>{service.title}</td>
                  <td>{service.description}</td>
                  <td>
                    {(service.requiredFields || []).map((field) => field.label).join(', ')}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => startEditService(service)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteService(service._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h4>Manage Applications</h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
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
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app._id}>
                    <td>{app.user?.name || 'N/A'}</td>
                    <td>{app.service?.title || 'N/A'}</td>
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
                    <td><StatusBadge status={app.status} /></td>
                    <td>
                      <select
                        className="form-select"
                        value={app.status}
                        onChange={(e) => updateStatus(app._id, e.target.value)} key={app._id + app.status}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">
          <h4>Create Staff User</h4>
        </div>
        <div className="card-body">
          {staffMessage && <div className="alert alert-info">{staffMessage}</div>}
          <input
            type="text"
            name="name"
            className="form-control mb-2"
            placeholder="Staff Name"
            value={staffData.name}
            onChange={handleStaffChange}
          />
          <input
            type="email"
            name="email"
            className="form-control mb-2"
            placeholder="Staff Email"
            value={staffData.email}
            onChange={handleStaffChange}
          />
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="form-control"
              placeholder="Password"
              value={staffData.password}
              onChange={handleStaffChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {staffData.password && (
            <div className="progress mt-2">
              <div
                className={`progress-bar ${passwordStrength <= 1 ? 'bg-danger' : passwordStrength === 2 ? 'bg-warning' : 'bg-success'
                  }`}
                role="progressbar"
                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                aria-valuenow={passwordStrength}
                aria-valuemin="0"
                aria-valuemax="4"
              ></div>
            </div>
          )}
          <button className="btn btn-primary mt-2" onClick={createStaffUser}>
            Create Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
