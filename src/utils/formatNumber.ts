export const formatNumberLikes = (n: number) => {
  if (n >= 1000) return `${n / 1000} тыс.`;
  return n;
};
