import UserForm from "../../components/Forms/useForm";
import { IoMdReturnLeft } from "react-icons/io";

import EditCreateButtons from "../../components/EditCreateButton";
import { NavLink } from "react-router-dom";
export default function Users({
  handleChange,
  setNewUserForm,
  newUserForm,
  handleNewUser,
  isOpen,
  openForm,
  closeForm,
}) {
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
      {!isOpen && <div className="list-users"></div>}
    </main>
  );
}
