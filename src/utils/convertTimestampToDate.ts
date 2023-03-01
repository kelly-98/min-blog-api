export const convertTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toDateString();
};
