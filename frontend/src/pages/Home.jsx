import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const { isConnected } = useAuth();
  return (
    <main className="home-page">
      <h1>Accueil</h1>
      <div className="home-description">
        <p>
          L'application sera utilisée par les employés de la capitainerie
          Russell's Catway.
        </p>
        <p>Ils auront accès à un tableau de bord après s'être connecté.</p>
      </div>
      <section className="home-list-pages">
        <h2>Pages:</h2>
        <ul>
          <li>Accès aux utilisateurs/employés</li>
          <li>Accès à la liste des Pontons</li>
          <li>Accès aux réservations</li>
        </ul>
      </section>
      <section className="home-list-actions">
        <h2>Actions:</h2>
        <ul>
          <li>Ajouter un élément</li>
          <li>Lire tous les éléments</li>
          <li>Lire chaque élément</li>
          <li>Modifier un élément</li>
          <li>Supprimer un élément</li>
        </ul>
      </section>
      <div className="home-links">
        <a
          href={`${API_URL}/api-docs`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir la documentation de l'api
        </a>
        {!isConnected && (
          <NavLink
            to="/login"
            // target="_blank"
            // rel="noopener noreferrer"
          >
            Connexion
          </NavLink>
        )}
      </div>
    </main>
  );
}
