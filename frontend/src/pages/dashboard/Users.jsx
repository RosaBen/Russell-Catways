import UserForm from "../../components/Forms/UserForm";
import UserCard from "../../components/Cards/UserCard";
import { useAuth } from "../../contexts/AuthContext";
import EditCreateButtons from "../../components/EditCreateButton";

export default function Users({
  handleChange,
  setNewUserForm,
  newUserForm,
  handleNewUser,
  isOpen,
  openForm,
  closeForm,
  handleUserUpdated,
  setUsers,
  users,
  loadingUsers,
}) {
  const { isConnected } = useAuth();

  const handleUserDeleted = (deletedEmail) => {
    setUsers((prev) => prev.filter((usr) => usr.email !== deletedEmail));
  };

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
    isConnected && (
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
          <div className="modal-form-create-user">
            <div className="create-menu">
              <UserForm
                handleChange={handleChange(setNewUserForm)}
                btnText="Ajouter utilisateur"
                form={newUserForm}
                submit={handleNewUser}
              />
            </div>
            <button
              aria-label="annuler le nouvel utilisateur"
              className="close-btn blue"
              onClick={() => closeForm()}
            >
              Annuler
            </button>
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
    )
  );
}
