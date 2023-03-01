export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);

  return `${date.getMonth() + 1} ${date.getDate()}, ${date.getFullYear()}`;
};
