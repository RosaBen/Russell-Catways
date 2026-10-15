export function formatDateForForm (date) {
  if (!date) return;
  return date.split("T")[0];
}

export function sortOptions (options) {
  return options.slice().sort((a, b) => b - a);
}