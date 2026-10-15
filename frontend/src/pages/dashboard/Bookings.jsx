import { useEffect, useState } from "react";
import { getAllBookings, createBooking } from "../../assets/api/bookings";
import BookingCard from "../../components/Cards/BookingCard";
import BookingForm from "../../components/Forms/BookingForm";
import EditCreateButtons from "../../components/EditCreateButton";

export default function Bookings({
  handleChange,
  fetchCatways,
  catwaysNumberList,
  isOpen,
  openForm,
  closeForm,
}) {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    catwayNumber: "",
    clientName: "",
    boatName: "",
    startDate: "",
    endDate: "",
  });

  async function fetchBookings() {
    setLoadingBookings(true);
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error(error.message);
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  }

  const handleNewBooking = async (e) => {
    e.preventDefault();
    try {
      const newBooking = await createBooking(
        bookingForm,
        bookingForm.catwayNumber,
      );
      setBookings((prev) => [newBooking, ...prev]);
      fetchBookings();
      setBookingForm({
        catwayNumber: "",
        clientName: "",
        boatName: "",
        startDate: "",
        endDate: "",
      });
      closeForm();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBookingUpdated = (bookingId, updatedBooking) => {
    setBookings((prev) =>
      prev.map((book) =>
        book._id === bookingId
          ? {
              ...book,
              ...updatedBooking,
            }
          : book,
      ),
    );
  };

  useEffect(() => {
    fetchBookings();
    fetchCatways();
  }, []);

  const bookingList = bookings.map((booking) => {
    return (
      <BookingCard
        key={booking._id}
        booking={booking}
        options={catwaysNumberList}
        handleBookingUpdated={handleBookingUpdated}
        handleChange={handleChange}
      />
    );
  });

  if (loadingBookings) {
    return <p>Chargement ...</p>;
  }

  return (
    <main className="bookings-page">
      <h1>Réservations</h1>
      {!isOpen && (
        <EditCreateButtons
          ariaExpanded={isOpen}
          ariaLabel="creer une nouvelle reservation"
          ariaControls="booking-form"
          action="create"
          textBtn="Nouvelle Réservation"
          onClick={() => {
            setBookingForm({
              catwayNumber: "",
              clientName: "",
              boatName: "",
              startDate: "",
              endDate: "",
            });
            openForm();
          }}
        />
      )}
      {isOpen && (
        <div className="booking-form-modal">
          <BookingForm
            options={catwaysNumberList}
            handleChange={handleChange(setBookingForm)}
            btnText="Réserver"
            form={bookingForm}
            submit={handleNewBooking}
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
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Réservation</th>
              <th>Ponton</th>
              <th>Client</th>
              <th>Bateau</th>
              <th>date Entrée</th>
              <th>Date sortie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{bookingList}</tbody>
        </table>
      )}
    </main>
  );
}
