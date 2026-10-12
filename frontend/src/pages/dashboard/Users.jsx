import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserForm from "../../components/Forms/useForm";
import UserCard from "../../components/Cards/UserCard";
import { getAllUsers } from "../../assets/api/users";
import { IoMdReturnLeft } from "react-icons/io";

import EditCreateButtons from "../../components/EditCreateButton";

export default function Users({
  handleChange,
  setNewUserForm,
  newUserForm,
  handleNewUser,
  isOpen,
  openForm,
  closeForm,
}) {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);

  const handleUserUpdated = (previousEmail, updatedUser) => {
    setUsers((prev) =>
      prev.map((usr) =>
        usr.email === previousEmail
          ? {
              ...usr,
              ...updatedUser,
            }
          : usr,
      ),
    );
  };

  const handleUserDeleted = (deletedEmail) => {
    setUsers((prev) => prev.filter((usr) => usr.email !== deletedEmail));
  };

  async function fetchUsers() {
    setLoadingUsers(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(error.message);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loadingUsers) {
    return <p>Chargement ...</p>;
  }

  const userslist = users.map((user) => {
    return (
      <UserCard
        key={user._id}
        user={user}
        handleChange={handleChange}
        handleUserUpdated={handleUserUpdated}
        handleUserDeleted={handleUserDeleted}
      />
    );
  });

  return (
    <main className="users-page">
      <h1>Utilisateurs</h1>
      {!isOpen && (
        <EditCreateButtons
          ariaExpanded={isOpen}
          ariaLabel="creer un nouvel utilisateur"
          ariaControls="user-form"
          action="create"
          textBtn="Ajouter utilisateur"
          onClick={() => {
            setNewUserForm({
              username: "",
              email: "",
              password: "",
            });
            openForm();
          }}
        />
      )}
      {isOpen && (
        <div className="modal-form">
          <div className="create-menu">
            <UserForm
              handleChange={handleChange(setNewUserForm)}
              btnText="Ajouter utilisateur"
              form={newUserForm}
              submit={handleNewUser}
            />
          </div>
          <NavLink
            to="/dashboard/users"
            onClick={() => closeForm()}
            // target="_blank"
            // rel="noopener noreferrer"
          >
            <IoMdReturnLeft />
            Retour Utilisateurs
          </NavLink>
        </div>
      )}
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom utilisateur</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{userslist}</tbody>
      </table>
    </main>
  );
}
