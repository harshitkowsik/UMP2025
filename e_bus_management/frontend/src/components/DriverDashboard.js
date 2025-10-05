import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import API from '../api/api';

const DriverDashboard = () => {
  const { user, token } = useContext(AuthContext);

  const [savedBusDetails, setSavedBusDetails] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [formData, setFormData] = useState({
    busName: '',
    busNumber: '',
    busType: '',
    contactNumber: '',
    source: '',
    destination: '',
  });
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (user?.contactNumber) {
      setFormData((prev) => ({ ...prev, contactNumber: user.contactNumber }));
    }
  }, [user?.contactNumber]);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const res = await API.get('/driver/bus-details', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) {
          setSavedBusDetails(res.data);
          // Set formData only after fetching saved bus details
          setFormData({
            busName: res.data.busName || '',
            busNumber: res.data.busNumber || '',
            busType: res.data.busType || '',
            contactNumber: user?.contactNumber || '',
            source: res.data.source || '',
            destination: res.data.destination || '',
          });
          setLocation(res.data.location || { latitude: '', longitude: '' });
          setEditMode(false);
        } else {
          setEditMode(true);
        }
      } catch (error) {
        setEditMode(true);
        // Optionally log error
        console.error('Error fetching bus details', error);
      }
    };
  
    if (token) {
      fetchBusDetails();
    }
  }, [token, user?.contactNumber]);
  

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`
      )
        .then((res) => res.json())
        .then((data) => setLocationName(data.display_name || 'Unknown location'))
        .catch(() => setLocationName('Unable to fetch location name'));
    }
  }, [location]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        },
        () => {
          setLocationName('Location permission denied or unavailable');
        }
      );
    } else {
      setLocationName('Geolocation not supported by your browser');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage('');
    try {
      const body = { ...formData, latitude: location.latitude, longitude: location.longitude };
      await API.post('/driver/bus-details', body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedBusDetails({ ...formData, location });
      setEditMode(false);
      setSubmitMessage('Bus details saved successfully!');
    } catch (error) {
      setSubmitMessage('Error saving bus details, please try again.');
    }
    setLoading(false);
  };

  if (!editMode && savedBusDetails) {
    return (
      <div className="container my-4">
        <h1 className="mb-3">Your Saved Bus Details</h1>
        <p className="fs-5">
          <strong>Bus Name :</strong> {savedBusDetails.busName}
        </p>
        <p className="fs-5">
          <strong>Bus Number :</strong> {savedBusDetails.busNumber}
        </p>
        <p className="fs-5">
          <strong>Bus Type :</strong> {savedBusDetails.busType}
        </p>
        <p className="fs-5">
          <strong>Source :</strong> {savedBusDetails.source}
        </p>
        <p className="fs-5">
          <strong>Destination :</strong> {savedBusDetails.destination}
        </p>
        <p className="fs-5">
          <strong>Contact Number :</strong> {savedBusDetails.contactNumber}
        </p>
        <div className="location-card p-3 my-3 shadow rounded" style={{ maxWidth: '600px' }}>
          <h5>Current Location</h5>
          <p>
            <i className="bi bi-geo-alt-fill"></i> {locationName}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setEditMode(true)}>
          Edit Bus Details
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2>Enter Your Bus Details</h2>
      <form onSubmit={handleSave}>
        <div className="location-card p-3 my-3 shadow rounded" style={{ maxWidth: '600px' }}>
          <h5>Current Location</h5>
          <p>
            <i className="bi bi-geo-alt-fill"></i> {locationName}
          </p>
        </div>
        <div className="mb-3">
          <label>Bus Name</label>
          <input
            type="text"
            className="form-control"
            name="busName"
            value={formData.busName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Bus Number</label>
          <input
            type="text"
            className="form-control"
            name="busNumber"
            value={formData.busNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Bus Type</label>
          <select
            className="form-select"
            name="busType"
            value={formData.busType}
            onChange={handleChange}
            required
          >
            <option value="">Select Bus Type</option>
            <option value="Regular">Regular</option>
            <option value="Express">Express</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Mini Bus">Mini Bus</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Source</label>
          <input
            type="text"
            className="form-control"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Destination</label>
          <input
            type="text"
            className="form-control"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contact Number</label>
          <input
            type="text"
            className="form-control"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            readOnly={true}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Bus Details'}
        </button>
        {submitMessage && (
          <div className={`alert mt-3 ${submitMessage.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default DriverDashboard;
