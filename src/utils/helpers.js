const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

export function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
