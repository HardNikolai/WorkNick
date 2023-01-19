import { makeAutoObservable, runInAction } from "mobx";

export interface IDataUser {
  id: string
  user: string
  nameCategories: string
  categories: any
  count: string
  textAbout: string
  date: string
  dateTime: string
};

class AllDataTrans {
  AllDataUser: Array<IDataUser> = [];
  AllData: Array<IDataUser> = [];
  DataMonth: Array<IDataUser> = [];
  DataNumberInMonth: Array<string> = ["0"];
  DataExpenseNumbersInMonth: Array<number> = [1];

  constructor() {
    makeAutoObservable(this);
  };

  setDataUser(arr: Array<IDataUser>) {
    runInAction(() => this.AllDataUser = arr);
  };

  setData(arr: Array<IDataUser>) {
    runInAction(() => this.AllData = arr);
  };

  setDataMonth(arr: Array<IDataUser>) {
    runInAction(() => this.DataMonth = arr);
  };

  setDataNumberInMonth(arr: Array<string>) {
    runInAction(() => this.DataNumberInMonth = arr);
  };

  setDataExpenseNumbersInMonth(arr: Array<number>) {
    runInAction(() => this.DataExpenseNumbersInMonth = arr);
  };

};

export default new AllDataTrans();