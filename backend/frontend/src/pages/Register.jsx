import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await API.post("/auth/register", form);
    alert("Registered!");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />

        <button onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}