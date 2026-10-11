import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import useToggle from "../../hooks/useToggle";

export default function Layout() {
  const [showMenu, , openMenu, closeMenu] = useToggle(false);
  return (
    <div className="container">
      <Header showMenu={showMenu} openMenu={openMenu} closeMenu={closeMenu} />
      {showMenu && <div className="modal-overlay"></div>}
      <Outlet />
      <Footer />
    </div>
  );
}
