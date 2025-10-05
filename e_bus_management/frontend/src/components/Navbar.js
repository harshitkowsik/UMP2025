import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'driver') return '/driver';
    return '/user';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/" style={{ color: 'black' }}>
          Ebus Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex w-100 align-items-center">
            <div className="flex-grow-1"></div>

            <div className="mx-auto text-center">
              {user && <span className="navbar-text fw-bold text-dark">Hello, {user.name}</span>}
            </div>

            <ul className="navbar-nav d-flex flex-row justify-content-end align-items-center flex-grow-1">
              {user ? (
                <>
                  <li className="nav-item me-2">
                    <Link className="nav-link text-dark" to={getDashboardPath()}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-light" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item me-2">
                    <Link className="btn btn-primary" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
