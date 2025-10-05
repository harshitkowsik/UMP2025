import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({setUser}) {

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", form);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user); 
      alert("Login successful!");
      navigate("/dashboard"); 
    } catch (err) {
      if (err.response?.status === 400 && err.response.data?.msg.toLowerCase().includes("not found")) {
        setMsg(<span>Not registered? <Link to="/register">Go to Register</Link></span>);
      } else {
        setMsg(err.response?.data?.msg || "Error occurred");
      }
    }
  };

  return (
    <div className="container col-md-6 mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Email</label>
          <input 
            className="form-control" 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={onChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <div className="input-group">
            <input 
              className="form-control" 
              type={showPassword ? "text" : "password"} 
              name="password" 
              value={form.password} 
              onChange={onChange} 
              required 
            />
            <button 
              type="button" 
              className="btn btn-outline-secondary" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <div className="mt-3 text-danger">{msg}</div>
        <div className="mt-2">
          Not registered? <Link to="/register">Go to Register</Link>
        </div>
      </form>
    </div>
  );
}
