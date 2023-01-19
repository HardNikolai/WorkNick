import { makeAutoObservable, runInAction } from "mobx";

class StoreDate {
  numYear: number = 0;
  indexMonth: number = 0;
  indexToDayMonth: number = 0;
  dateNotifee: string = "";
  dateSynchronization = "";

  constructor() {
    makeAutoObservable(this);
  };

  setNumYear(num: number) {
    runInAction(() => this.numYear = num);
  };

  setIndexMonth(num: number) {
    runInAction(() => this.indexMonth = num);
  };

  setDateNotifee(date: string) {
    runInAction(() => this.dateNotifee = date);
  };

  setToDayMonth(indexMonth: number) {
    runInAction(() => this.indexToDayMonth = indexMonth);
  };

  setDateSynchronization(date: Date) {
    const hour = date.getHours();
    const minutes = date.getMinutes();

    let newHour = `${hour}`;
    let newMinutes = `${minutes}`;

    if (hour < 10) {
      newHour = `0${hour}`;
    }

    if (minutes < 10) {
      newMinutes = `0${minutes}`;
    };

    const time = `${newHour}:${newMinutes}`;

    runInAction(() => this.dateSynchronization = time);
  };
};

export default new StoreDate();