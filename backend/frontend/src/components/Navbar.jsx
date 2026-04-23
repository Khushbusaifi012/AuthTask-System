import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="topbar">
      <div className="brand" onClick={() => navigate("/dashboard")} role="button" tabIndex={0}>
        <div className="brand-badge" />
        <div>TaskFlow</div>
      </div>

      <button className="btn btn-ghost" onClick={logout}>
        Logout
      </button>
    </div>
  );
}