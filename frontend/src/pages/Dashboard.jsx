import { useNavigate } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";

export default function Dashboard() {
  const today = new Date();
  const navigate = useNavigate();
  return (
    <main className="dashboard-page">
      <h1>Tableau de Bord</h1>
      <button
        className="previous-page-btn"
        onClick={() => {
          const prevPage = sessionStorage.getItem("prevPage");
          if (prevPage && prevPage !== "/login") {
            navigate(prevPage);
          } else {
            navigate("/");
          }
        }}
      >
        <IoMdReturnLeft /> Retour à la page précédente
      </button>
      <h2>
        Welcome <span>Toto</span>
      </h2>
      <div className="dashboard-infos">
        <p>user@text.com</p>
        <p>
          {today.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <a
        href="http://localhost:3000/api-docs"
        target="_blank"
        rel="noopener noreferrer"
      >
        Documentation Api
      </a>
      <section className="current-bookings">
        <h2>Réservations en cours</h2>
      </section>
    </main>
  );
}
