import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../assets/api/users";
import UserForm from "../components/Forms/useForm";
import { IoMdReturnLeft } from "react-icons/io";

export default function Register({ handleChange }) {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUser(registerForm);

      setRegisterForm({
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      setRegisterForm({
        username: "",
        email: "",
        password: "",
      });
      console.error(error.message);
    }
  };

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
