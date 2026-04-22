import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h3>TaskFlow</h3>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
}