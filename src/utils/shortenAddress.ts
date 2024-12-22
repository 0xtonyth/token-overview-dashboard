export const shortenAddress = (str: string, len: number) => {
  if (!str) {
    return "";
  }

  return `${str.slice(0, len)}...${str.slice(-len)}`;
};
