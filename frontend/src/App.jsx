// React
import { Routes, Route, useNavigate } from "react-router-dom";

// API
import { logout } from "./assets/api/users";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Components
import Layout from "./components/Layouts/Layout";
import DashboardLayout from "./components/Layouts/DashboardLayout";

// Styles
import "./assets/styles/App.css";
import "./assets/styles/header-footer.css";
import "./assets/styles/forms.css";
import "./assets/styles/dashboard.css";

import { useAuth } from "./contexts/AuthContext";

function App() {
  const { logoutClean, isConnected } = useAuth();
  const navigate = useNavigate();

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
        <Route
          path="register"
          element={<Register handleChange={handleChange} />}
        />
        {isConnected && (
          <Route
            path="dashboard"
            element={<DashboardLayout logout={handleLogout} />}
          >
            <Route index element={<Dashboard />} />
          </Route>
        )}
      </Route>
    </Routes>
  );
}

export default App;
