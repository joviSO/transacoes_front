export function maskedCreditCard(cardNumber) {
  if (cardNumber.length >= 4) {
    const numbersOnly = cardNumber.replace(/\D/g, '');

    const lastFourDigits = numbersOnly.slice(-4);
    const maskedDigits = '*'.repeat(numbersOnly.length - 4);
    return maskedDigits + lastFourDigits;
  } else {
    return cardNumber;
  }
}