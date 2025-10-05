import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProposalForm from "./components/ProposalForm";
import ProposalList from "./components/ProposalList";
import LoanDetailsForm from './components/LoanDetailsForm';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          role: decoded.role,
        });
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/post-proposal" element={<ProposalForm user={user} />} />
        <Route path="/proposals" element={<ProposalList />} />
        <Route path="/loan-details" element={<LoanDetailsForm user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
