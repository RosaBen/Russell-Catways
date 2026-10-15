import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import EditCreateButtons from "../EditCreateButton";
import { editBooking, deleteBooking } from "../../assets/api/bookings";
import useToggle from "../../hooks/useToggle";
import { useState } from "react";
import { formatDateForForm, sortOptions } from "../../assets/utils/utils";

export default function BookingCard({
  booking,
  options,
  handleBookingUpdated,
  handleChange,
}) {
  const [isEditing, , openEditing, closeEditing] = useToggle(false);
  const [editBookingForm, setEditBookingForm] = useState({
    catwayNumber: "",
    clientName: "",
    boatName: "",
    startDate: "",
    endDate: "",
  });

  if (!booking) return null;

  const sortedOptions = sortOptions(options);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const previousCatwayNumber = booking.catwayNumber;
      const payload = {
        catwayNumber: editBookingForm.catwayNumber || booking.catwayNumber,
        clientName: editBookingForm.clientName || booking.clientName,
        boatName: editBookingForm.boatName || booking.boatName,
        startDate:
          editBookingForm.startDate || formatDateForForm(booking.startDate),
        endDate: editBookingForm.endDate || formatDateForForm(booking.endDate),
      };
      await editBooking(payload, previousCatwayNumber, booking._id);
      handleBookingUpdated?.(booking._id, payload);
      closeEditing();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteBooking(booking._id, booking.catwayNumber);
    } catch (error) {
      console.error(error.message);
    }
  };

  const bookingNumber = `Cat${booking.catwayNumber}-${String(new Date(booking.endDate).getDate()).padStart(2, "0")}-${String(new Date(booking.endDate).getMonth() + 1).padStart(2, "0")}-${new Date(booking.endDate).getFullYear()}`;

  return (
    <tr className="booking-card">
      <td data-label="Réservation">{bookingNumber}</td>
      <td data-label="Ponton">
        {isEditing ? (
          <select
            name="catwayNumber"
            id="catwayNumber"
            value={editBookingForm.catwayNumber}
            onChange={handleChange(setEditBookingForm)}
            required
          >
            <option value="" disabled>
              -- Sélectionner un ponton --
            </option>
            {sortedOptions.map((option) => {
              return (
                <option key={`catway-${option}`} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        ) : (
          booking.catwayNumber
        )}
      </td>
      <td data-label="Client">
        {isEditing ? (
          <input
            type="text"
            placeholder="Jean Moulin"
            name="clientName"
            value={editBookingForm.clientName}
            onChange={handleChange(setEditBookingForm)}
            required
          />
        ) : (
          booking.clientName
        )}
      </td>
      <td data-label="Bateau">
        {isEditing ? (
          <input
            type="text"
            placeholder="Casper"
            name="boatName"
            value={editBookingForm.boatName}
            onChange={handleChange(setEditBookingForm)}
            required
          />
        ) : (
          booking.boatName
        )}
      </td>
      <td data-label="Entrée le">
        {isEditing ? (
          <input
            type="date"
            name="startDate"
            value={editBookingForm.startDate}
            onChange={handleChange(setEditBookingForm)}
            required
          />
        ) : (
          <time dateTime={formatDateForForm(booking.startDate)}>
            {new Date(booking.startDate).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        )}
      </td>
      <td data-label="Départ le">
        {isEditing ? (
          <input
            type="date"
            name="endDate"
            value={editBookingForm.endDate}
            onChange={handleChange(setEditBookingForm)}
            required
          />
        ) : (
          <time dateTime={formatDateForForm(booking.endDate)}>
            {new Date(booking.endDate).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
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
            ariaLabel="Modifier la réservation"
            ariaControls="booking-form"
            action="edit"
            textBtn={<MdModeEditOutline />}
            onClick={() => {
              setEditBookingForm({
                catwayNumber: booking.catwayNumber,
                clientName: booking.clientName,
                boatName: booking.boatName,
                startDate: formatDateForForm(booking.startDate),
                endDate: formatDateForForm(booking.endDate),
              });
              openEditing();
            }}
          />
        )}

        <button
          className="delete-btn red"
          aria-label={`Supprimer Réservation ${bookingNumber}`}
          onClick={handleDelete}
        >
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  );
}
