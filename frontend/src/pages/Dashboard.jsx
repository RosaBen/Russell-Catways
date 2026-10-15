import { useNavigate } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";
import { editUser, getUser } from "../assets/api/users";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import UserForm from "../components/Forms/UserForm";
import useToggle from "../hooks/useToggle";
import EditCreateButtons from "../components/EditCreateButton";

export default function Dashboard({ handleChange }) {
  const { currentUser, currentUserEmail, setCurrentUser, setCurrentUserEmail } =
    useAuth();
  const [loadingUser, setLoadingUser] = useState(true);
  const [isOpen, , openForm, closeForm] = useToggle(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const today = new Date();
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    if (!currentUserEmail) {
      setCurrentUser(null);
      setLoadingUser(false);
      return;
    }

    setLoadingUser(true);
    try {
      const userData = await getUser(currentUserEmail);
      setCurrentUser(userData);
    } catch (error) {
      console.error(error.message);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, [currentUserEmail]);

  async function handleEdit(e) {
    e.preventDefault();
    try {
      const currenEmail = currentUserEmail;
      await editUser(currenEmail, editForm);
      const nextEmail = editForm.email?.trim() || currenEmail;
      if (nextEmail !== currenEmail) {
        sessionStorage.setItem("logged", nextEmail);
        setCurrentUserEmail(nextEmail);
      } else {
        const newData = await getUser(currenEmail);
        setCurrentUser(newData);
      }
      closeForm();
    } catch (error) {
      console.error(error.message);
    }
  }

  if (loadingUser) {
    return <p>Chargement ...</p>;
  }
  return (
    <main className="dashboard-page desktop">
      <h1>Tableau de Bord</h1>
      <button
        className="previous-page-btn"
        onClick={() => {
          const prevPage = sessionStorage.getItem("prevPage");
          if (prevPage && prevPage !== "/login") {
            navigate(prevPage);
          } else {
            navigate("/");
          }
        }}
      >
        <IoMdReturnLeft /> Retour à la page précédente
      </button>
      <h2>
        Welcome <span>{currentUser.username}</span>
      </h2>

      {!isOpen && (
        <EditCreateButtons
          className="edit-btn orange"
          ariaExpanded={isOpen}
          ariaLabel="Modifier mon profil"
          ariaControls="user-form"
          action="edit"
          textBtn="Modifier le profil"
          onClick={() => {
            setEditForm({
              username: currentUser.username,
              email: currentUser.email,
              password: "",
            });
            openForm();
          }}
        />
      )}

      {isOpen && (
        <div className="modal-profil-edit">
          <UserForm
            handleChange={handleChange(setEditForm)}
            btnText="Enregistrer"
            submit={handleEdit}
            form={editForm}
          />
          <button
            aria-label="annuler la modification du profil"
            className="close-btn blue"
            onClick={() => closeForm()}
          >
            Annuler
          </button>
        </div>
      )}

      <div className="dashboard-infos">
        <p>{currentUser.email}</p>
        <p>
          {today.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <a
        href="http://localhost:3000/api-docs"
        target="_blank"
        rel="noopener noreferrer"
      >
        Documentation Api
      </a>
      <section className="current-bookings">
        <h2>Réservations en cours</h2>
      </section>
    </main>
  );
}
