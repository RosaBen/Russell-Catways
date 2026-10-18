export function formatDateForForm (date) {
  if (!date) return;
  return date.split("T")[0];
}

export function sortOptions (options) {
  return options.slice().sort((a, b) => b - a);
}

export const filterCurrentBookings = (data) => {
  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  return data.filter(booking => {
    if (!booking.startDate || !booking.endDate) return false;

    const startDate = booking.startDate.slice(0, 10);
    const endDate = booking.endDate.slice(0, 10);

    return startDate <= today && endDate >= today;
  });
};