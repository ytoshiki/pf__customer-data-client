export const dateFormatter = (date: string) => {
  const rowDate = new Date(date);

  const formattedDate = `${rowDate.getFullYear()}/${rowDate.getMonth() + 1}/${rowDate.getDate()} ${rowDate.getHours()}:${rowDate.getMinutes()}`;

  return formattedDate;
};
