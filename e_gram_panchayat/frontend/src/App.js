import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Home from './pages/Home';
import Profile from './pages/Profile';
import StaffPanel from './pages/StaffPanel';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute roles={['user']}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff"
            element={
              <ProtectedRoute roles={['staff']}>
                <StaffPanel />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/profile" 
          element={
            <ProtectedRoute roles={['user', 'admin', 'staff']}> 
              <Profile />
            </ProtectedRoute>
          }
        />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
