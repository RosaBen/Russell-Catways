import { useEffect, useState } from "react";
import { getAllBookings } from "../../assets/api/bookings";
import BookingCard from "../../components/Cards/BookingCard";
import BookingForm from "../../components/Forms/BookingForm";

export default function Bookings({
  handleChange,
  catways,
  fetchCatways,
  catwaysNumberList,
}) {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [showForm, setShowForm] = useState(false);
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

  useEffect(() => {
    fetchBookings();
    fetchCatways();
  }, []);

  const bookingList = bookings.map((booking) => {
    return (
      <BookingCard
        key={booking._id}
        booking={booking}
        catwaysNumberList={catwaysNumberList}
      />
    );
  });

  if (loadingBookings) {
    return <p>Chargement ...</p>;
  }

  return (
    <main>
      <h1>Réservations</h1>
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
    </main>
  );
}
