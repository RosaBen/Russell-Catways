// React
import { Routes, Route } from "react-router-dom";

// API
import { logout } from "./assets/api/users";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

// Components
import Layout from "./components/Layouts/Layout";

// Styles
import "./assets/styles/App.css";
import "./assets/styles/header-footer.css";
import "./assets/styles/forms.css";

import { useAuth } from "./contexts/AuthContext";

function App() {
  const { logoutClean } = useAuth();

  const handleChange = (setForm) => (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleLogout() {
    try {
      await logout();
      logoutClean();
      navigate("/");
    } catch (error) {
      console.error("login error", error);
    }
  }
  return (
    <Routes>
      <Route path="/" element={<Layout logout={handleLogout} />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login handleChange={handleChange} />} />
      </Route>
    </Routes>
  );
}

export default App;
