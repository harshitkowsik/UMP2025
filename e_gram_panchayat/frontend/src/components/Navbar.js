import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">Digital E Gram Panchayat</Link>
        <div className="collapse navbar-collapse justify-content-center">
          {user && <span className="navbar-text mx-auto">Hi, {user.name}</span>}
        </div>
        <ul className="navbar-nav ms-auto">
          {user && user.role === 'user' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">My Profile</Link>
              </li>
            </>
          )}
          {(user && (user.role === 'admin')) && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Panel</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">My Profile</Link>
              </li>
            </>
          )}
          {(user && (user.role === 'staff')) && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/staff">Staff Panel</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">My Profile</Link>
              </li>
            </>
          )}
          {!user && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          )}
          {user && (
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
