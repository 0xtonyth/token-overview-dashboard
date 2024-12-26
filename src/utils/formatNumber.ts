export const formatNumber = (number: number): string => {
  const fixedNumber = number.toFixed(4);

  const formattedNumber = parseFloat(fixedNumber);

  if (formattedNumber >= 1000000000) {
    return (formattedNumber / 1000000000).toFixed(1) + "B";
  } else if (formattedNumber >= 1000000) {
    return (formattedNumber / 1000000).toFixed(1) + "M";
  } else if (formattedNumber >= 1000) {
    return (formattedNumber / 1000).toFixed(1) + "K";
  } else {
    return formattedNumber.toString();
  }
};
