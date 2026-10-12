import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditCreateButtons from "../EditCreateButton";
import { editUser, deleteUser } from "../../assets/api/users";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import useToggle from "../../hooks/useToggle";

export default function UserCard({
  user,
  handleChange,
  handleUserUpdated,
  handleUserDeleted,
}) {
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
      sessionStorage.setItem("selectedUser", payload.email);
      closeEditing();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(user.email);
      handleUserDeleted?.(user.email);
      sessionStorage.removeItem("selectedUser");
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
      <td data-label="Actions" className="actions">
        {isEditing ? (
          <button onClick={handleEdit} className="save.btn blue">
            Enregistrer
          </button>
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
          className="delete-btn red"
          aria-label={`Supprimer ${user.username}`}
          onClick={handleDelete}
        >
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  );
}
