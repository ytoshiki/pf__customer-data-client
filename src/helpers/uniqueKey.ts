export const generateKey = (word: string): string => {
  return `${word}_${new Date().getTime()}`;
};
