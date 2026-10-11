// React
import { Routes, Route } from "react-router-dom";

// API

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

// Components
import Layout from "./components/Layouts/Layout";

// Styles
import "./assets/styles/App.css";
import "./assets/styles/header-footer.css";
import "./assets/styles/forms.css";

import useToggle from "./hooks/useToggle";

function App() {
  const handleChange = (setForm) => (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login handleChange={handleChange} />} />
      </Route>
    </Routes>
  );
}

export default App;
