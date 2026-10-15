import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar({ classNav, onClick, logout }) {
  const { isConnected } = useAuth();
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    textTransform: "uppercase",
  };
  const location = useLocation();

  return (
    <nav className={classNav}>
      <NavLink
        to="/"
        // target="_blank"
        // rel="noopener noreferrer"
        style={({ isActive }) => (isActive ? activeStyle : null)}
        onClick={() => onClick(location.pathname)}
      >
        Accueil
      </NavLink>
      {!isConnected && (
        <>
          <NavLink
            to="/register"
            // target="_blank"
            // rel="noopener noreferrer"
            style={({ isActive }) => (isActive ? activeStyle : null)}
            onClick={() => onClick()}
          >
            Créer un compte
          </NavLink>
          <NavLink
            to="/login"
            // target="_blank"
            // rel="noopener noreferrer"
            style={({ isActive }) => (isActive ? activeStyle : null)}
            onClick={() => onClick()}
          >
            Connexion
          </NavLink>
        </>
      )}
      {isConnected && (
        <>
          <NavLink
            to="/dashboard"
            end
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={() => onClick()}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Tableau de bord
          </NavLink>
        </>
      )}
    </nav>
  );
}
