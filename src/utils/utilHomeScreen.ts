import { ICategory, IDataUser } from "../screens/interfaces/interfaces";


export const recalc = (data: Array<IDataUser>) => {
  let res: number = 0;
  data.map(function (item) {
    if (item.categories === 'TRUE') {
      res -= Number(item.count);
    } else if (item.categories === 'FALSE') {
      res += Number(item.count);
    }
  });
  return res;
};

export const forecastingBalance = (data: Array<IDataUser>, total: number) => {
  let sumAllExpenses = 0;
  let firstDay: string | number = '';
  let lastDay: string | number = '';
  let expenseInDay = 0;
  let futureDays = 0;
  let futureExpense = 0;
  let res = 0;

  const countDayInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
  ).getDate();

  if (data.length === 0) {
    return 0;
  }

  let num = 0;

  data.map(function (item) {
    if (num === 0) {
      firstDay = Number(item.date.slice(0, item.date.indexOf('.')));
    }
    if (num + 1 === data.length) {
      lastDay = Number(item.date.slice(0, item.date.indexOf('.')));
    }
    if (item.categories === 'TRUE') {
      sumAllExpenses += Number(item.count);
    }
    num++;
  });

  if (typeof lastDay === 'number' && typeof firstDay === 'number') {
    expenseInDay = sumAllExpenses / lastDay;
    futureDays = countDayInMonth - lastDay;
    futureExpense = futureDays * expenseInDay;
    res = total - futureExpense;
    return res;
  } else {
    return 0;
  }
};

export const getAllData = async (dataAllUsers: string[]) => {
  const arrayDataResponse = dataAllUsers;
  let num = 0;

  const data: Array<IDataUser> = [];

  arrayDataResponse.map(item => {
    const task: IDataUser = {
      id: String(num),
      user: item[1],
      nameCategories: item[2],
      categories: item[3],
      count: item[4],
      textAbout: item[5],
      date: item[6],
      dateTime: item[7],
    };
    data.push(task);
    num++;
  });
  return data;
};

export const getDataUser = async (allDataUser: string[], userEmail: string) => {
  const data: Array<IDataUser> = [];
  allDataUser.map(item => {
    if (item[1] === userEmail && item[6] != 'Date') {
      const task: IDataUser = {
        id: item[0],
        user: item[1],
        nameCategories: item[2],
        categories: item[3],
        count: item[4],
        textAbout: item[5],
        date: item[6],
        dateTime: item[7],
      };
      data.push(task);
    }
  });
  return data;
};

export const getDataUserInMonth = (allDataUser: Array<IDataUser>) => {
  const monthToday = new Date().getMonth();
  const data = allDataUser.filter(
    item =>
      Number(item.date.slice(item.date.indexOf('.') + 1, 4)) === monthToday,
  );
  return data;
};

export const getDataNumberInMonth = () => {
  const countDayInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
  ).getDate();
  const arrayDays: Array<string> = [];
  for (let i = 0; i < countDayInMonth; i++) {
    if (i + 1 <= new Date().getDate()) {
      arrayDays.push(String(i + 1));
    }
  }
  return arrayDays;
};

export const getDataExpense = (dataUserInMonth: Array<IDataUser>) => {
  const countDayInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
  ).getDate();

  const arrayCount: Array<number> = [];
  for (let n = 0; n < countDayInMonth; n++) {
    if (n + 1 <= new Date().getDate()) {
      arrayCount.push(0);
    }
  }

  dataUserInMonth
    .filter(item => item.categories === 'TRUE')
    .map(
      item =>
        (arrayCount[Number(item.date.slice(0, item.date.indexOf('.'))) - 1] =
          arrayCount[Number(item.date.slice(0, item.date.indexOf('.'))) - 1] +
          Number(item.count)),
    );
  return arrayCount;
};

export const getDataAllCategory = async (
  allDataCategories: string[][]
) => {
  const arrayDataResponse = allDataCategories;
  let num = 0;
  const data: Array<ICategory> = [];
  arrayDataResponse.map(item => {
    const task: ICategory = {
      id: num,
      name: item[1]
    };
    data.push(task);
    num++;
  });
  return data;
}

export const getDataUserCategory = async (
  allDataCategories: string[][],
  userEmail: string,
) => {
  const arrayCategories = allDataCategories;
  const dataAllUsersCategories: Array<ICategory> = [];
  let num = 0;

  arrayCategories.map(item => {
    if (item[1] === userEmail) {
      const category: ICategory = {
        id: num,
        name: item[0],
      };
      num++;
      dataAllUsersCategories.push(category);
    } else {
      num++;
    }
  });
  return dataAllUsersCategories;
};