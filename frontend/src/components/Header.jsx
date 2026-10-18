import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
import { TiThMenu } from "react-icons/ti";
import { useLocation } from "react-router-dom";

export default function Header({ showMenu, openMenu, closeMenu, logout }) {
  const { isConnected } = useAuth();
  const location = useLocation;
  return (
    <header>
      <h1>Russell's Catways</h1>
      {!showMenu && (
        <button
          onClick={() => openMenu()}
          aria-label="Ouvrir le menu"
          aria-expanded={showMenu}
          aria-controls="modal-menu"
        >
          <TiThMenu className="icon" />
        </button>
      )}
      {showMenu && (
        <div className="modal-menu">
          <div className="nav-links">
            <Navbar
              classNav="mobile-nav"
              onclick={() => {
                closeMenu();
              }}
              logout={logout}
            />
            <button aria-label="Fermer le menu" onClick={() => closeMenu()}>
              X
            </button>
          </div>
          {isConnected && (
            <button className="logout-btn" onClick={logout}>
              Déconnexion
            </button>
          )}
        </div>
      )}

      <Navbar classNav="nav-desktop" />
    </header>
  );
}
