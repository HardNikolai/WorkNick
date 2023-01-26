export const formingTask = (
    id: number,
    user: string,
    nameCategory: string,
    category: boolean,
    count: string,
    textAbout: string,
  ) => {
    const dayToday = new Date().getDate();
    const monthToday = new Date().getMonth() + 1;
    const yearToday = new Date().getFullYear();
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();

    const newMonthTask = monthToday < 10 ? `0${monthToday}` : `${monthToday}`;
    const newMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    const dateTask = `${dayToday}.${newMonthTask}.${yearToday}`;
    const timeTask = `${hour}:${newMinutes}`;
    const task = [
      id,
      user,
      nameCategory,
      category,
      count,
      textAbout,
      dateTask,
      timeTask,
    ];

    return task;
  };