import { NavLink } from "react-router-dom";
import UserForm from "../components/Forms/useForm";
import { IoMdReturnLeft } from "react-icons/io";

export default function Register({
  handleChange,
  registerForm,
  setRegisterForm,
  handleRegister,
}) {
  return (
    <main className="register-page">
      <h1>Créer un compte</h1>
      <UserForm
        handleChange={handleChange(setRegisterForm)}
        btnText="Créer un compte"
        submit={handleRegister}
        form={registerForm}
      />
      <NavLink
        to="/"
        // target="_blank"
        // rel="noopener noreferrer"
      >
        <IoMdReturnLeft />
        Retour Accueil
      </NavLink>
    </main>
  );
}
