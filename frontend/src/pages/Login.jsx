import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../assets/api/users";
import UserForm from "../components/Forms/useForm";
import { useAuth } from "../contexts/AuthContext";
import { IoMdReturnLeft } from "react-icons/io";

export default function Login({ handleChange }) {
  const { loginAction, cleanSessionStorage, setIsConnected, setCurrentUser } =
    useAuth();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    cleanSessionStorage();
    try {
      const data = await login(loginForm);
      loginAction(data.user.email);
      setCurrentUser(data.user);
      setLoginForm({
        email: "",
        password: "",
      });
      navigate("/dashboard");
    } catch (error) {
      sessionStorage.removeItem("logged");
      setIsConnected(false);
      setLoginForm({
        email: "",
        password: "",
      });
      console.error("login error", error);
    }
  };

  return (
    <main className="login-page">
      <h1>Connexion</h1>
      <UserForm
        handleChange={handleChange(setLoginForm)}
        btnText="Connecte"
        form={loginForm}
        submit={handleLogin}
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
