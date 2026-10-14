import { useState } from "react";
import { getAllCatways } from "../../assets/api/catways";
import CatwayCard from "../../components/Cards/CatwayCard";
import { useAuth } from "../../contexts/AuthContext";

export default function Catways({
  handleChange,
  isOpen,
  openForm,
  closeForm,
  catways,
  loadingCatways,
  setLoadingCatways,
  handleCatwayUpdated,
}) {
  const { isConnected } = useAuth();
  const [catwayForm, setCatwayForm] = useState({
    catwayNumber: "",
    catwayType: "",
    catwayState: "",
  });

  const catwaysList = catways.map((catway) => {
    return (
      <CatwayCard
        key={catway._id}
        catway={catway}
        handleChange={handleChange}
        handleCatwayUpdated={handleCatwayUpdated}
      />
    );
  });

  return (
    <main className="catways-page">
      <h1>Pontons</h1>
      <table className="catways-table">
        <thead>
          <tr>
            <th>Numéro du ponton</th>
            <th>Longueur</th>
            <th>Description état</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{catwaysList}</tbody>
      </table>
    </main>
  );
}
