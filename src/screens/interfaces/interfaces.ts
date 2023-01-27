export interface IDataUser {
  id: string;
  user: string;
  nameCategories: string;
  categories: any;
  count: string;
  textAbout: string;
  date: string;
  dateTime: string;
}

export interface IPropsTask {
  task: IDataUser;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IPropsCategory {
  item: ICategory;
}

export interface MonthProps {
  item: string;
  index: number;
}

export interface IdataBalance {
  total: number;
  forecast: number;
}

export interface ICategories {
  allCategories: Array<ICategory>;
  userCategories: Array<ICategory>;
  textSetCategory: string;
  textCategory: string;
}

export interface IData {
  DataNumberInMonth: Array<string>;
  DataExpenseNumbersInMonth: Array<number>;
  allData: Array<IDataUser>;
  allDataUsers: Array<IDataUser>;
  allDataMonth: Array<IDataUser>
  dateSynch: string;
}

export interface ITask {
  id: string;
  user: string;
  nameCategories: string;
  categories: string | boolean;
  count: string;
  textAbout: string;
  date: string;
  dateTime: string;
}

export interface IDataTask {
  task: ITask;
}

export interface IUserData {
  isNewUser: boolean;
  profile: {
    picture: string;
    name: string;
    email: string;
  };
}

export interface IUser {
  user: IUserData;
  token: string
}

export interface Idate {
  year: number,
  month: number
}

export interface Iconfig {
  isNotification: boolean;
  isStateCalculation: boolean;
  dateTextNotifee: string;
  dateNotifee: Date;
}

export interface Istate {
  stateTouchDate: boolean;
  stateAddNewTask: boolean;
  stateCategoryImageExpense: boolean;
  stateCategoryImageAddition: boolean;
  stateListCategory: boolean;
  stateErrorInput: boolean;
  stateChangeTask: boolean;
  stateAddNewCategory: boolean;
  stateSaveCategory: boolean;
  stateDeleteCategory: boolean;
  stateChangeCalendar: boolean;
  stateActiveViewTime: boolean;
  stateNotification: boolean;
  stateActiveChart: boolean;
  stateTextLength: boolean;
  stateActiveViewFilter: boolean;
  stateError: boolean;
  stateTask: boolean
}