import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar({ classNav, onClick, logout }) {
  const { isConnected } = useAuth();
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    textTransform: "uppercase",
  };
  return (
    <nav className={classNav}>
      <NavLink
        to="/"
        // target="_blank"
        // rel="noopener noreferrer"
        style={({ isActive }) => (isActive ? activeStyle : null)}
        onClick={() => onClick()}
      >
        Accueil
      </NavLink>
      {!isConnected && (
        <NavLink
          to="/register"
          // target="_blank"
          // rel="noopener noreferrer"
          style={({ isActive }) => (isActive ? activeStyle : null)}
          onClick={() => onClick()}
        >
          Créer un compte
        </NavLink>
      )}
      {isConnected && (
        <button className="logout-btn" onClick={logout}>
          Déconnexion
        </button>
      )}
      {!isConnected && (
        <NavLink
          to="/login"
          // target="_blank"
          // rel="noopener noreferrer"
          style={({ isActive }) => (isActive ? activeStyle : null)}
          onClick={() => onClick()}
        >
          Connexion
        </NavLink>
      )}
    </nav>
  );
}
