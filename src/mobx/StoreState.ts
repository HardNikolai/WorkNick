import { configure, makeAutoObservable, runInAction } from "mobx";
configure({ enforceActions: 'observed' })
class StoreState {
  stateTouchDate = false;
  stateAddNewTask = false;
  stateCategoryImageExpense = true;
  stateCategoryImageAddition = false;
  stateListCategory = false;
  stateError = false;
  stateChangeTask = false;
  stateAddNewCategory = false;
  stateDeleteCategory = false;
  stateChangeCalendar = false;
  stateActiveViewTime = false;
  stateNotification = false;
  stateActiveChart = false;
  stateTextLength = false;
  stateActiveViewFilter = false;

  constructor() {
    makeAutoObservable(this);
  };

  setStateTouchDate() {
    runInAction(() => this.stateTouchDate = !this.stateTouchDate);
  };

  setStateAddNewTask() {
    runInAction(() => this.stateAddNewTask = !this.stateAddNewTask);
  };

  setStateCategoryImageExpense() {
    runInAction(() => this.stateCategoryImageExpense = !this.stateCategoryImageExpense);
  };

  setStateCategoryImageAddition() {
    runInAction(() => this.stateCategoryImageAddition = !this.stateCategoryImageAddition);
  };

  setStateListCategory() {
    runInAction(() => this.stateListCategory = !this.stateListCategory);
  };

  setStateError() {
    runInAction(() => this.stateError = !this.stateError);
  };

  setStateChangeTask() {
    runInAction(() => this.stateChangeTask = !this.stateChangeTask);
  };

  setStateAddCategory() {
    runInAction(() => this.stateAddNewCategory = !this.stateAddNewCategory);
  };

  setStateDeleteCategory() {
    runInAction(() => this.stateDeleteCategory = !this.stateDeleteCategory);
  };

  setStateChangeCalendar() {
    runInAction(() => this.stateChangeCalendar = !this.stateChangeCalendar);
  };

  setStateActiveViewTime() {
    runInAction(() => this.stateActiveViewTime = !this.stateActiveViewTime);
  };

  setStateNotification() {
    runInAction(() => this.stateNotification = !this.stateNotification);
  };

  setStateActiveChart() {
    runInAction(() => this.stateActiveChart = !this.stateActiveChart);
  };

  setStateTextLength() {
    runInAction(() => this.stateTextLength = !this.stateTextLength);
  };

  setStateActiveViewFilter() {
    runInAction(() => this.stateActiveViewFilter = !this.stateActiveViewFilter);
  };
};

export default new StoreState;