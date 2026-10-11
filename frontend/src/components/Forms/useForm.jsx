import { useLocation } from "react-router-dom";

export default function UserForm({ handleChange, btnText, form, submit }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <form className="user-form" id="user-form" onSubmit={submit} noValidate>
      {!isLoginPage && (
        <label>
          Nom d'utilisateur:
          <input
            type="text"
            name="username"
            id="username"
            minLength="3"
            maxLength="15"
            value={form.username}
            placeholder="darwin"
            onChange={handleChange}
            required
          />
        </label>
      )}
      {isLoginPage && (
        <label>
          Email:
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            placeholder="darwin@gmail.com"
            onChange={handleChange}
            required
          />
        </label>
      )}
      {isLoginPage && (
        <label>
          Mot de passe:{" "}
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
      )}
      <button type="submit">{btnText}</button>
    </form>
  );
}
