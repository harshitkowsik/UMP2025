import React, { useState, useEffect } from 'react';
import API from '../api/api';

const BusSearch = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [placeNames, setPlaceNames] = useState({});

useEffect(() => {
  results.forEach(async (bus) => {
    if (bus.location?.latitude && bus.location?.longitude) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${bus.location.latitude}&lon=${bus.location.longitude}`);
        const data = await response.json();
        setPlaceNames(prev => ({
          ...prev,
          [bus._id]: data.display_name || 'Unknown location'
        }));
      } catch {
        setPlaceNames(prev => ({
          ...prev,
          [bus._id]: 'Location not found'
        }));
      }
    }
  });
}, [results]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);
    try {
      const { data } = await API.get('/bus/search', {
        params: { source, destination }
      });
      setResults(data);
      if (data.length === 0) setError('No buses found');
    } catch (err) {
      setError('Error retrieving buses');
    }
  };

  return (
    <div className="container col-md-8">
      <h2>Search Bus Location</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <label>Source</label>
          <input type="text" className="form-control" value={source} required onChange={e => setSource(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Destination</label>
          <input type="text" className="form-control" value={destination} required onChange={e => setDestination(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary mb-3">Search</button>
      </form>

      {error && <div className="alert alert-warning">{error}</div>}

      {results.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Bus Name</th>
              <th>Bus Number</th>
              <th>Bus Type</th>
              <th>Current Location</th>
              <th>Driver</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {results.map(bus => (
              <tr key={bus._id}>
                <td>{bus.busName}</td>
                <td>{bus.busNumber}</td>
                <td>{bus.busType}</td>
                <td>{placeNames[bus._id] || '-'}</td>
                <td>{bus.driver.name}</td>
                <td>{bus.driver.contactNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusSearch;
