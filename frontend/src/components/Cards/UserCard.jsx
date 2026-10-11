import { NavLink, useLocation } from "react-router-dom";
import EditDeleteButtons from "../EditDeleteButtons";

export default function UserCard({ user }) {
  if (!user) return null;
  const location = useLocation();
  const isUsersPage = location.pathname === "/dashboard/users";
  const sessionStorageUser = () => {
    sessionStorage.setItem("selectedUser", user.email);
  };
  return (
    <>
      <article className="user-card">
        <>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </>
        <div className="btns">
          <NavLink
            to="/dashboard/user"
            onClick={sessionStorageUser}
            className="blue"
          >
            Plus d'infos
          </NavLink>
          <div className="edit-del-btns"></div>
        </div>
      </article>
    </>
  );
}

// <button
//   className="edit-btn orange"
//   aria-expanded={showEditForm}
//   aria-label="Modifier l'utilisateur"
//   aria-controls="user-form"
//   onClick={() => {
//     setEditForm({
//       username: user.username,
//       email: user.email,
//       password: "",
//     });
//     setShowEditForm(true);
//   }}
// >
//   Modifier
// </button>
// <button className="delete-btn red" onClick={handleDelete}>
//   Supprimer
// </button>
