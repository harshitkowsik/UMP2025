import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordInput from "./PasswordInput";

export default function Register({setUser}) {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    contact: "",
    company: ""
  });
  const [msg, setMsg] = useState("");
  const [showStrength, setShowStrength] = useState(false);

  useEffect(() => {
    setShowStrength(form.password.length > 0);
  }, [form.password]);

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", form);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      alert("Registered successfully!");
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 400 && err.response.data?.msg.toLowerCase().includes("exists")) {
        setMsg(<span>Already registered? <Link to="/login">Go to Login</Link></span>);
      } else {
        setMsg(err.response?.data?.msg || "Error occurred");
      }
    }
  };

  return (
    <div className="container col-md-6 my-5">
      <h2 className="text-center">Register</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Name</label>
          <input 
            className="form-control" 
            name="name" 
            value={form.name} 
            onChange={onChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input 
            className="form-control" 
            name="email" 
            type="email" 
            value={form.email} 
            onChange={onChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Contact</label>
          <input 
            className="form-control" 
            name="contact" 
            type="text" 
            value={form.contact} 
            onChange={onChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <PasswordInput value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {showStrength}
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select 
            name="role" 
            className="form-select" 
            value={form.role} 
            onChange={onChange}
          >
            <option value="user">User</option>
            <option value="investor">Investor</option>
            <option value="business">Business Person</option>
            <option value="banker">Banker</option>
            <option value="advisor">Advisor</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
        <div className="mt-3 text-danger">{msg}</div>
        <div className="mt-2">
          Already registered? <Link to="/login">Go to Login</Link>
        </div>
      </form>
    </div>
  );
}
