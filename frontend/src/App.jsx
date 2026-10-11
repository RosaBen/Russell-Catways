// React
import { Routes, Route } from "react-router-dom";

// API

// Pages

// Components
import Layout from "./components/Layouts/Layout";

// Styles
import "./assets/styles/App.css";
import "./assets/styles/header-footer.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}

export default App;
