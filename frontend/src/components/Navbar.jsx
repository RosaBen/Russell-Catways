import { NavLink } from "react-router-dom";

export default function Navbar({ classNav, onClick }) {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
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
    </nav>
  );
}
