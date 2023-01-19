import { makeAutoObservable, runInAction } from "mobx";

export interface ITask {
  id: string
  user: string
  nameCategories: string
  categories: string
  count: string
  textAbout: string
  date: string
  dateTime: string
};

class StoreTask {

  Task: ITask = {
    id: "",
    user: "",
    nameCategories: "",
    categories: "",
    count: "",
    textAbout: "",
    date: "",
    dateTime: ""
  };

  constructor() {
    makeAutoObservable(this);
  };

  setTask(task: ITask) {
    runInAction(() => this.Task = task);
  };

  setCategories(cat: string) {
    runInAction(() => this.Task.categories = cat);
  };

  setNameCategory(cat: string) {
    runInAction(() => this.Task.nameCategories = cat);
  };

  setTextAmount(text: string) {
    runInAction(() => this.Task.count = text);
  };

  setTextAbout(text: string) {
    runInAction(() => this.Task.textAbout = text);
  };

  clearTask() {
    runInAction(() => this.Task = {
      id: "",
      user: "",
      nameCategories: "",
      categories: "",
      count: "",
      textAbout: "",
      date: "",
      dateTime: ""
    });
  };

};

export default new StoreTask();