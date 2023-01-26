export const formingTime = (dateNotifee?: Date) => {
  let date;
  if (dateNotifee) {
    date = dateNotifee;
  } else {
    date = new Date();
  }
  const hour = date.getHours();
  const minutes = date.getMinutes();

  let newHour = hour < 10 ? `0${hour}` : hour;
  let newMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const time = `${newHour}:${newMinutes}`;
  return time;
};

export const formingDateNotifee = (dateStore: string) => {
  const dateToday = new Date(Date.now());
  const date = new Date(Date.now());
  const hourNotifee = Number(dateStore.slice(0, 2));
  const minutesNotifee = Number(dateStore.slice(3));

  date.setHours(hourNotifee);
  date.setMinutes(minutesNotifee);

  const newDayNotify =
    dateToday > date ? dateToday.getDate() + 1 : dateToday.getDate();
  date.setDate(newDayNotify);

  return date;
};
