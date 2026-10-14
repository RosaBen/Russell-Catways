import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

export default function CatwayCard({ catway }) {
  return (
    <tr className="catway-card">
      <td data-label="Ponton">{catway.catwayNumber}</td>
      <td data-label="Longueur">{catway.catwayType}</td>
      <td data-label="Description">{catway.catwayState}</td>
      <td data-label="Actions" className="actions">
        <button>
          <MdModeEditOutline />
        </button>
        <button>
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  );
}
