import React, { useEffect, useState, useContext } from 'react';
import API from '../api/api';
import AuthContext from '../context/AuthContext';

const busTypes = ['Regular', 'Express', 'AC', 'Non-AC', 'Mini Bus'];

const AdminDriverBusDetails = () => {
    const { token } = useContext(AuthContext);
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [placeNames, setPlaceNames] = useState({});
    const [formData, setFormData] = useState({
        busName: '',
        busNumber: '',
        busType: '',
        contactNumber: '',
        source: '',
        destination: '',
        location: { latitude: '', longitude: '' },
    });

    useEffect(() => {
        console.log("Drivers data:", drivers);
    }, [drivers]);

    useEffect(() => {
        const fetchDrivers = async () => {
            setLoading(true);
            try {
                const { data } = await API.get('/admin/drivers', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setDrivers(data);

                data.forEach(async (driver) => {
                    if (driver.busDetails?.location?.latitude && driver.busDetails?.location?.longitude) {
                        try {
                            const response = await fetch(
                                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${driver.busDetails.location.latitude}&lon=${driver.busDetails.location.longitude}`
                            );
                            const locationData = await response.json();
                            setPlaceNames((prev) => ({
                                ...prev,
                                [driver._id]: locationData.display_name || 'Unknown location',
                            }));
                        } catch {
                            setPlaceNames((prev) => ({
                                ...prev,
                                [driver._id]: 'Location fetch failed',
                            }));
                        }
                    }
                });
            } catch (error) {
                alert('Failed to fetch drivers');
            }
            setLoading(false);
        };

        fetchDrivers();
    }, [token]);

    const startEdit = (driver) => {
        setEditingId(driver._id);
        setFormData({
            busName: driver.busDetails?.busName || '',     
            busNumber: driver.busDetails?.busNumber || '',
            busType: driver.busDetails?.busType || '',
            contactNumber: driver.contactNumber || '',
            source: driver.busDetails?.source || '',        
            destination: driver.busDetails?.destination || '',
            location: driver.busDetails?.location || { latitude: '', longitude: '' },
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ busType: '', contactNumber: '', location: { latitude: '', longitude: '' } });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, location: { ...prev.location, [name]: value } }));
    };

    const deleteDriver = async (id) => {
        if (window.confirm('Are you sure you want to delete this driver and their bus details?')) {
            try {
                await API.delete(`/admin/driver/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDrivers((prev) => prev.filter((driver) => driver._id !== id));
                alert('Driver and bus details deleted');
            } catch (error) {
                alert('Failed to delete driver');
            }
        }
    };


    const saveChanges = async () => {
        try {
            await API.put(`/admin/driver/${editingId}/bus-details`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Bus details updated');
            setEditingId(null);
        } catch (error) {
            alert('Failed to update');
        }
    };

    return (
        <div>
            <h2>All Drivers and Bus Details</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="d-flex justify-content-center">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Driver Name</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Bus Name</th>
                                <th>Bus Number</th>
                                <th>Bus Type</th>
                                <th>Source</th>
                                <th>Destination</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.map((driver) => (
                                <tr key={driver._id}>
                                    <td>{driver.name}</td>
                                    <td>{driver.email}</td>
                                    <td>{driver.contactNumber}</td>
                                    <td>{driver.busDetails?.busName || '-'}</td>
                                    <td>{driver.busDetails?.busNumber || '-'}</td>
                                    <td>{driver.busDetails?.busType || '-'}</td>
                                    <td>{driver.busDetails?.source || '-'}</td>
                                    <td>{driver.busDetails?.destination || '-'}</td>
                                    <td>
                                        {placeNames[driver._id] || '-'}
                                    </td>
                                    <td>
                                        <button onClick={() => startEdit(driver)} className="btn btn-sm btn-primary me-2">
                                            Edit
                                        </button>
                                        <button onClick={() => deleteDriver(driver._id)} className="btn btn-sm btn-danger">
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editingId && (
                <div className="card p-3 my-3">
                    <h3>Edit Bus Details</h3>
                    <div className="mb-3">
                        <label>Driver Name</label>
                        <input type="text" className="form-control" value={drivers.find(d => d._id === editingId)?.name || ''} readOnly />
                    </div>
                    <div className="mb-3">
                        <label>Driver Email</label>
                        <input type="text" className="form-control" value={drivers.find(d => d._id === editingId)?.email || ''} readOnly />
                    </div>
                    <div className="mb-3">
                        <label>Bus Name</label>
                        <input type="text" className="form-control" name="busName" value={formData.busName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Bus Number</label>
                        <input type="text" className="form-control" name="busNumber" value={formData.busNumber} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Bus Type</label>
                        <select className="form-select" name="busType" value={formData.busType} onChange={handleChange}>
                            <option value="">Select Bus Type</option>
                            {busTypes.map((bType) => (
                                <option key={bType} value={bType}>
                                    {bType}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Source</label>
                        <input type="text" className="form-control" name="source" value={formData.source} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Destination</label>
                        <input type="text" className="form-control" name="destination" value={formData.destination} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Contact Number</label>
                        <input type="text" className="form-control" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                    </div>
                    <button onClick={saveChanges} className="btn btn-success mb-1">
                        Save
                    </button>
                    <button onClick={cancelEdit} className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminDriverBusDetails;
