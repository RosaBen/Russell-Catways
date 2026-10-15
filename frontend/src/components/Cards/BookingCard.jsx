export default function BookingCard({ booking, catwaysNumberList }) {
  if (!booking) return null;

  const bookingNumber = `Cat${booking.catwayNumber}-${String(new Date(booking.endDate).getDate()).padStart(2, "0")}-${String(new Date(booking.endDate).getMonth() + 1).padStart(2, "0")}-${new Date(booking.endDate).getFullYear()}`;

  return (
    <tr className="booking-card">
      <td data-label="Réservation">{bookingNumber}</td>
      <td data-label="Ponton">{booking.catwayNumber}</td>
      <td data-label="Client">{booking.clientName}</td>
      <td data-label="Bateau">{booking.boatName}</td>
      <td data-label="Entrée le">
        <time dateTime={booking.startDate}>
          {new Date(booking.startDate).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </td>
      <td data-label="Départ le">
        <time dateTime={booking.endDate}>
          {new Date(booking.endDate).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </td>
      <td data-label="Actions" className="actions">
        <button>Edit</button>
        <button>Supprime</button>
      </td>
    </tr>
  );
}
