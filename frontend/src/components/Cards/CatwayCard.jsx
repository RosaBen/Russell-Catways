import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import EditCreateButtons from "../EditCreateButton";
import { EditCatway, deleteCatway } from "../../assets/api/catways";
import useToggle from "../../hooks/useToggle";

export default function CatwayCard({
  catway,
  handleChange,
  handleCatwayUpdated,
  handleCatwayDeleted,
}) {
  const [isEditing, , openEditing, closeEditing] = useToggle(false);
  const [editCatwayForm, setEditCatwayForm] = useState({
    catwayNumber: "",
    catwayType: "",
    catwayState: "",
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const previousCatwayNumber = catway.catwayNumber;
      const payload = {
        catwayNumber: editCatwayForm.catwayNumber || catway.catwayNumber,
        catwayType: editCatwayForm.catwayType?.trim() || catway.catwayType,
        catwayState: editCatwayForm.catwayState || catway.catwayState,
      };

      await EditCatway(previousCatwayNumber, payload);
      handleCatwayUpdated?.(previousCatwayNumber, payload);
      closeEditing();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteCatway(catway.catwayNumber);
      handleCatwayDeleted?.(catway.catwayNumber);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <tr className="catway-card">
      <td data-label="Ponton">
        {isEditing ? (
          <input
            type="number"
            name="catwayNumber"
            value={editCatwayForm.catwayNumber}
            onChange={handleChange(setEditCatwayForm)}
          />
        ) : (
          catway.catwayNumber
        )}
      </td>
      <td data-label="Longueur">
        {isEditing ? (
          <fieldset>
            <legend>Longueur</legend>
            <label>
              <input
                type="radio"
                name="catwayType"
                value="short"
                checked={editCatwayForm.catwayType === "short"}
                onChange={handleChange(setEditCatwayForm)}
                required
              />
              Ponton Court
            </label>
            <label>
              <input
                type="radio"
                name="catwayType"
                value="long"
                checked={editCatwayForm.catwayType === "long"}
                onChange={handleChange(setEditCatwayForm)}
              />
              Ponton Long
            </label>
          </fieldset>
        ) : (
          catway.catwayType
        )}
      </td>
      <td data-label="Description Etat">
        {isEditing ? (
          <textarea
            name="catwayState"
            placeholder="ex: bon état"
            value={editCatwayForm.catwayState || "Bon état"}
            onChange={handleChange(setEditCatwayForm)}
          ></textarea>
        ) : (
          catway.catwayState
        )}
      </td>
      <td data-label="Actions" className="actions">
        {isEditing ? (
          <button onClick={handleEdit} className="save.btn blue">
            Enregistrer
          </button>
        ) : (
          <EditCreateButtons
            ariaExpanded={isEditing}
            ariaLabel="Modifier les infos"
            ariaControls="catway-form"
            action="edit"
            textBtn={<MdModeEditOutline />}
            onClick={() => {
              setEditCatwayForm({
                catwayNumber: catway.catwayNumber,
                catwayType: catway.catwayType,
                catwayState: catway.catwayState,
              });
              openEditing();
            }}
          />
        )}
        <button
          className="delete-btn red"
          aria-label={`Supprimer Ponton ${catway.catwayNumber}`}
          onClick={handleDelete}
        >
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  );
}
