import { useState } from "react";
import CatwayCard from "../../components/Cards/CatwayCard";
import CatwayForm from "../../components/Forms/CatwayForm";
import { useAuth } from "../../contexts/AuthContext";
import { createCatway } from "../../assets/api/catways";
import EditCreateButtons from "../../components/EditCreateButton";

export default function Catways({
  handleChange,
  isOpen,
  openForm,
  closeForm,
  catways,
  loadingCatways,
  setLoadingCatways,
  handleCatwayUpdated,
  listCatwayNumber,
  setCatways,
  fetchCatways,
}) {
  const { isConnected } = useAuth();
  const [catwayForm, setCatwayForm] = useState({
    catwayNumber: "",
    catwayType: "",
    catwayState: "",
  });

  const handleCatwayDeleted = (catwayNumber) => {
    setCatways((prev) =>
      prev.filter((cat) => cat.catwayNumber !== catwayNumber),
    );
  };

  const catwaysList = catways.map((catway) => {
    return (
      <CatwayCard
        key={catway._id}
        catway={catway}
        handleChange={handleChange}
        handleCatwayUpdated={handleCatwayUpdated}
        handleCatwayDeleted={handleCatwayDeleted}
      />
    );
  });

  const handleNewCatway = async (e) => {
    e.preventDefault();
    try {
      const newCatway = await createCatway(catwayForm);
      setCatways((prev) => [newCatway, ...prev]);
      fetchCatways();
      setCatwayForm({ catwayNumber: "", catwayType: "", catwayState: "" });
      closeForm();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loadingCatways) {
    return <p>Chargement ...</p>;
  }

  return (
    isConnected && (
      <main className="catways-page">
        <h1>Pontons</h1>
        {!isOpen && (
          <EditCreateButtons
            ariaExpanded={isOpen}
            ariaLabel="creer un nouveau ponton"
            ariaControls="catway-form"
            action="create"
            textBtn="Ajouter ponton"
            onClick={() => {
              setCatwayForm({
                catwayNumber: "",
                catwayType: "",
                catwayState: "",
              });
              openForm();
            }}
          />
        )}
        {isOpen && (
          <div className="catway-form-modal">
            <CatwayForm
              options={listCatwayNumber}
              handleChange={handleChange(setCatwayForm)}
              btnText="Ajouter Ponton"
              form={catwayForm}
              submit={handleNewCatway}
            />
            <button
              onClick={() => closeForm()}
              aria-label="Fermer le formulaire"
              className="blue"
            >
              Annuler
            </button>
          </div>
        )}
        {!isOpen && (
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
        )}
      </main>
    )
  );
}
