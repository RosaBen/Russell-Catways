export default function formatDateForForm (date) {
  if (!date) return;
  return date.split("T")[0];
}