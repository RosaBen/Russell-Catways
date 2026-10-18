import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditCreateButtons from "../EditCreateButton";
import { editUser, deleteUser } from "../../assets/api/users";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import useToggle from "../../hooks/useToggle";
import { useAuth } from "../../contexts/AuthContext";

export default function UserCard({
  user,
  handleChange,
  handleUserUpdated,
  handleUserDeleted,
}) {
  const { currentUserEmail } = useAuth();

  const isCurrentUser = user.email === currentUserEmail;
  const [isEditing, , openEditing, closeEditing] = useToggle(false);
  const navigate = useNavigate();
  const [editUserForm, setEditUserForm] = useState({
    username: "",
    email: "",
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const previousEmail = user.email;
      const payload = {
        username: editUserForm.username?.trim() || user.username,
        email: editUserForm.email?.trim() || user.email,
      };
      await editUser(previousEmail, payload);
      handleUserUpdated?.(previousEmail, payload);
      closeEditing();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const connectedUser = sessionStorage.getItem("logged");
      if (connectedUser === user.email) {
        return;
      }
      await deleteUser(user.email);
      handleUserDeleted?.(user.email);
      navigate("/dashboard/users");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <tr className="user-card">
      <td data-label="Utilisateur">
        {isEditing ? (
          <input
            name="username"
            value={editUserForm.username}
            onChange={handleChange(setEditUserForm)}
          />
        ) : (
          user.username
        )}
      </td>
      <td data-label="Email">
        {isEditing ? (
          <input
            name="email"
            value={editUserForm.email}
            onChange={handleChange(setEditUserForm)}
          />
        ) : (
          user.email
        )}
      </td>
      {!isCurrentUser && (
        <td data-label="Actions" className="actions">
          {isEditing ? (
            <>
              <button onClick={handleEdit} className="save.btn green">
                Enregistrer
              </button>
              <button onClick={closeEditing} className="cancel.btn blue">
                Annuler
              </button>
            </>
          ) : (
            <EditCreateButtons
              ariaExpanded={isEditing}
              ariaLabel="Modifier les infos"
              ariaControls="user-form"
              action="edit"
              textBtn={<MdModeEditOutline />}
              onClick={() => {
                setEditUserForm({
                  username: user.username,
                  email: user.email,
                });
                openEditing();
              }}
            />
          )}
          <button
            className="delete-btn red action-btn"
            aria-label={`Supprimer ${user.username}`}
            onClick={handleDelete}
          >
            <FaRegTrashAlt />
          </button>
        </td>
      )}
    </tr>
  );
}
