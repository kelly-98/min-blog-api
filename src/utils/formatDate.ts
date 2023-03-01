export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString("US", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;
};
