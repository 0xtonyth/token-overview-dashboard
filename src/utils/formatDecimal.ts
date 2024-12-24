export const formatDecimal = (num: number): string => {
  const formatted = num.toFixed(4);

  return parseFloat(formatted).toString();
};
