import Navbar from "./Navbar";
import { TiThMenu } from "react-icons/ti";

export default function Header({ showMenu, openMenu, closeMenu }) {
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
          <Navbar classNav="mobile-nav" onclick={() => closeMenu()} />
          <button aria-label="Fermer le menu" onClick={() => closeMenu()}>
            X
          </button>
        </div>
      )}
    </header>
  );
}
