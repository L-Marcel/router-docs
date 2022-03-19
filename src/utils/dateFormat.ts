export function dateFormat(date?: number | Date) {
  return new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
};