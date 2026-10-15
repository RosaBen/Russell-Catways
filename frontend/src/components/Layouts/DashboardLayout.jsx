import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout({ logout }) {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    textTransform: "uppercase",
  };
  return (
    <>
      <div className="dashboard-navlinks">
        <nav className="dashboard-links">
          <NavLink
            to="/dashboard"
            end
            // target="_blank"
            // rel="noopener noreferrer"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Tableau de bord
          </NavLink>
          <NavLink
            to="/dashboard/users"
            // target="_blank"
            // rel="noopener noreferrer"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Utilisateurs
          </NavLink>
          <NavLink
            to="/dashboard/catways"
            // target="_blank"
            // rel="noopener noreferrer"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Pontons
          </NavLink>
          <NavLink
            to="/dashboard/bookings"
            // target="_blank"
            // rel="noopener noreferrer"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Réservations
          </NavLink>
        </nav>
        <button className="dashboard-logout-btn" onClick={logout}>
          Déconnexion
        </button>
      </div>
      <Outlet />
    </>
  );
}
