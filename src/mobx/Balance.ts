import { makeAutoObservable, runInAction } from "mobx";

class Balance {
  total = 0;
  forecast = 0;

  constructor() {
    makeAutoObservable(this);
  };

  setTotal(num: number) {
    runInAction(() => this.total = num);
  };

  setForecast(num: number) {
    runInAction(() => this.forecast = num);
  };
};

export default new Balance();