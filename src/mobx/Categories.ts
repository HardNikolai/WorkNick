import { makeAutoObservable, runInAction } from "mobx";

export interface ICategory {
  id: number
  name: string
};

class Categories {
  dataListCategory: Array<ICategory> = [];
  textCategory: string = "Выберете категорию";
  nameCategoryFilter: string = "";

  constructor() {
    makeAutoObservable(this);
  };

  setTextCategory(text: string) {
    runInAction(() => this.textCategory = text);
  };

  setCategory(arr: Array<ICategory>) {
    runInAction(() => this.dataListCategory = arr);
  };

  resetTextCategory() {
    runInAction(() => this.textCategory = "Выберете категорию");
  };

  setNameCategoryFilter(text: string) {
    runInAction(() => this.nameCategoryFilter = text);
  };

  clearNameCategoryFilter() {
    runInAction(() => this.nameCategoryFilter = "");
  };
};

export default new Categories();