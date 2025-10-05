import axios from 'axios';

const API_URL = 'http://localhost:5000/api/applications';

export const applyForService = async (payload, token) => {
  const response = await fetch(`${API_URL}`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to apply');
  }
  return response.json();
};

export const getUserApplications = (token) =>
  axios.get(`${API_URL}/my-applications`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateApplicationStatus = (id, statusData, token) =>
  axios.put(`${API_URL}/${id}/status`, statusData, {
    headers: { Authorization: `Bearer ${token}` },
  });
