// React
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// API
import { logout, createUser, getAllUsers } from "./assets/api/users";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/dashboard/Users";

// Components
import Layout from "./components/Layouts/Layout";
import DashboardLayout from "./components/Layouts/DashboardLayout";

// Styles
import "./assets/styles/App.css";
import "./assets/styles/header-footer.css";
import "./assets/styles/forms.css";
import "./assets/styles/dashboard.css";
import "./assets/styles/users.css";

import { useAuth } from "./contexts/AuthContext";
import useToggle from "./hooks/useToggle";

function App() {
  const { logoutClean, isAuthReady, isConnected } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isCreate, , openCreateForm, closeCreateForm] = useToggle(false);
  const [createUserForm, setCreateUserForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (setForm) => (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      await createUser(createUserForm);
      fetchUsers();
      if (isConnected) {
        closeCreateForm();
        navigate("/dashboard/users");
      } else {
        closeCreateForm();
        navigate("/login");
      }
    } catch (error) {
      setCreateUserForm({
        username: "",
        email: "",
        password: "",
      });
      console.error(error.message);
    }
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

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!isAuthReady) {
    return null;
  }
  return (
    <Routes>
      <Route path="/" element={<Layout logout={handleLogout} />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login handleChange={handleChange} />} />
        <Route
          path="register"
          element={
            <Register
              handleChange={handleChange}
              registerForm={createUserForm}
              setRegisterForm={setCreateUserForm}
              handleRegister={handleCreateUser}
            />
          }
        />
        <Route
          path="dashboard"
          element={<DashboardLayout logout={handleLogout} />}
        >
          <Route index element={<Dashboard handleChange={handleChange} />} />
          <Route
            path="users"
            element={
              <Users
                handleChange={handleChange}
                setNewUserForm={setCreateUserForm}
                newUserForm={createUserForm}
                handleNewUser={handleCreateUser}
                isOpen={isCreate}
                openForm={openCreateForm}
                closeCreateForm={closeCreateForm}
                handleUserUpdated={handleUserUpdated}
                users={users}
                setUsers={setUsers}
                loadingUsers={loadingUsers}
              />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
