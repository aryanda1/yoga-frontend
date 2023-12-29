export function processPayments(transactions) {
  return transactions
    .map((transaction, index, array) =>
      transaction.paymentMonthYear.map((monthYear) => ({
        date: transaction.date,
        id: transaction._id,
        ...monthYear,
      }))
    )
    .flat()
    .reverse();
}
