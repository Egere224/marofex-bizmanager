export const getTodayStart = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

export const getTodayEnd = () => {
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  return now;
};