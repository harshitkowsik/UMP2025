import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [shareEmail, setShareEmail] = useState('');
  const [shareError, setShareError] = useState('');
  const [shareSuccess, setShareSuccess] = useState('');

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({ name: '', aadhaar: '' });
  const [updateError, setUpdateError] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/documents', {
          headers: {
            'x-auth-token': token,
          },
        });
        setDocuments(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load documents.');
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleShare = (doc) => {
    setSelectedDoc(doc);
    setShowShareModal(true);
    setShareEmail('');
    setShareError('');
    setShareSuccess('');
  };

  const handleShareSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const userRes = await axios.get(`/api/user/by-email/${shareEmail}`, { headers: { 'x-auth-token': token } });
      const userId = userRes.data._id;

      await axios.post(`/api/documents/${selectedDoc._id}/share`, { userId }, { headers: { 'x-auth-token': token } });
      setShareSuccess('Document shared!');
    } catch (err) {
      setShareError('Failed to share document.');
    }
  };

  const backendUrl = 'http://your-backend-url.com';

  const handleView = (doc) => {
    if (!doc.filename) {
      alert('File not available');
      return;
    }
    const url = `http://localhost:5000/uploads/${doc.filename}`;
    window.open(url, '_blank');
  };


  const handleDelete = async (docId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/documents/${docId}`, {
        headers: { 'x-auth-token': token }
      });

      setDocuments((prevDocs) => prevDocs.filter(doc => doc._id !== docId));
      alert('Document deleted successfully.');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete document.');
    }
  };

  const handleUpdate = (doc) => {
    setSelectedDoc(doc);
    setUpdateForm({ name: doc.name || '', aadhaar: doc.aadhaar || '' });
    setUpdateError('');
    setUpdateSuccess('');
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async () => {
    const token = localStorage.getItem('token');
    setUpdateError('');
    setUpdateSuccess('');
    setUpdateLoading(true);
    try {
      const res = await axios.put(`/api/documents/${selectedDoc._id}`, updateForm, {
        headers: { 'x-auth-token': token }
      });

      setDocuments((prevDocs) =>
        prevDocs.map(doc => (doc._id === res.data._id ? res.data : doc))
      );
      setUpdateSuccess('Document updated successfully!');
      setShowUpdateModal(false);
      setUpdateLoading(false);
    } catch (error) {
      setUpdateError(error.response?.data?.message || 'Failed to update document.');
      setUpdateLoading(false);
    }
  };

  const ShareModal = () => (
    <div className="modal fade show d-block" tabIndex="-1" aria-modal="true" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Share Document</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowShareModal(false)}></button>
          </div>
          <div className="modal-body">
            <input
              type="email"
              className="form-control"
              value={shareEmail}
              placeholder="Enter recipient's email"
              onChange={(e) => setShareEmail(e.target.value)}
              autoFocus
            />
            {shareError && <div className="text-danger mt-2">{shareError}</div>}
            {shareSuccess && <div className="text-success mt-2">{shareSuccess}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowShareModal(false)}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleShareSubmit} disabled={!shareEmail.trim()}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const UpdateModal = () => (
    <div className="modal fade show d-block" tabIndex="-1" aria-modal="true" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Document</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowUpdateModal(false)}></button>
          </div>
          <div className="modal-body">
            <input
              name="name"
              type="text"
              className="form-control mb-3"
              placeholder="Document Name"
              value={updateForm.name}
              onChange={handleUpdateChange}
              autoFocus
            />
            <input
              name="aadhaar"
              type="text"
              className="form-control"
              placeholder="Aadhaar"
              maxLength={12}
              value={updateForm.aadhaar}
              onChange={handleUpdateChange}
            />
            {updateError && <div className="text-danger mt-2">{updateError}</div>}
            {updateSuccess && <div className="text-success mt-2">{updateSuccess}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleUpdateSubmit} disabled={updateLoading}>
              {updateLoading ? 'Updating...' : 'Update Document'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard - My Documents</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <span className="ms-2">Loading documents...</span>
        </div>
      ) : documents.length === 0 ? (
        <p>You have no uploaded documents yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Aadhaar</th>
              <th>Shared With</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.name}</td>
                <td>{doc.aadhaar}</td>
                <td>{doc.sharedWith.length > 0 ? doc.sharedWith.length : 'None'}</td>
                <td>
                  <button className="btn btn-secondary me-2" onClick={() => handleShare(doc)}>Share</button>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleView(doc)}>View</button>
                  <button className="btn btn-sm btn-info me-2" onClick={() => handleUpdate(doc)}>Update</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(doc._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showShareModal && <ShareModal />}
      {showUpdateModal && <UpdateModal />}
    </div>
  );
}

export default DashboardPage;
