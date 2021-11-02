export const getDate = (time: string) => {
  const itemDate = new Date(Math.floor(parseInt(time, 10) / 1000) * 1000);
  const date =
    itemDate.getFullYear() +
    '-' +
    (itemDate.getMonth() + 1 >= 10
      ? itemDate.getMonth() + 1
      : `0${itemDate.getMonth() + 1}`) +
    '-' +
    (itemDate.getDate() >= 10 ? itemDate.getDate() : `0${itemDate.getDate()}`);
  return date;
};

export const getDateWithoutYear = (time: string) => {
  const itemDate = new Date(Math.floor(parseInt(time, 10) / 1000) * 1000);
  const date =
    (itemDate.getMonth() + 1 >= 10
      ? itemDate.getMonth() + 1
      : `0${itemDate.getMonth() + 1}`) +
    '-' +
    (itemDate.getDate() >= 10 ? itemDate.getDate() : `0${itemDate.getDate()}`);
  return date;
};

export const getTime = (time: string) => {
  const itemTime = new Date(Math.floor(parseInt(time, 10) / 1000) * 1000);
  const date = itemTime.getHours() + ':' + itemTime.getMinutes();
  return date;
};
