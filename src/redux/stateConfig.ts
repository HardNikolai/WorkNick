import {createSlice} from '@reduxjs/toolkit';

interface state {
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
  stateErrorServer: boolean;
  stateTask: boolean
}

const state: state = {
  stateTouchDate: false,
  stateAddNewTask: false,
  stateCategoryImageExpense: true,
  stateCategoryImageAddition: false,
  stateListCategory: false,
  stateErrorInput: false,
  stateChangeTask: false,
  stateAddNewCategory: false,
  stateSaveCategory: false,
  stateDeleteCategory: false,
  stateChangeCalendar: false,
  stateActiveViewTime: false,
  stateNotification: false,
  stateActiveChart: false,
  stateTextLength: false,
  stateActiveViewFilter: false,
  stateErrorServer: false,
  stateTask: false,
};

const stateSlice = createSlice({
  name: 'state',
  initialState: state,
  reducers: {
    setStateTouchDate(state, action) {
      state.stateTouchDate = action.payload;
    },
    setStateAddNewTask(state, action) {
      state.stateAddNewTask = action.payload;
    },
    setStateCategoryImageExpense(state, action) {
      state.stateCategoryImageExpense = action.payload;
    },
    setStateCategoryImageAddition(state, action) {
      state.stateCategoryImageAddition = action.payload;
    },
    setStateListCategory(state, action) {
      state.stateListCategory = action.payload;
    },
    setStateErrorInput(state, action) {
      state.stateErrorInput = action.payload;
    },
    setStateChangeTask(state, action) {
      state.stateChangeTask = action.payload;
    },
    setStateAddCategory(state, action) {
      state.stateAddNewCategory = action.payload;
    },
    setStateSaveCategory(state, action) {
      state.stateSaveCategory = action.payload;
    },
    setStateDeleteCategory(state, action) {
      state.stateDeleteCategory = action.payload;
    },
    setStateChangeCalendar(state, action) {
      state.stateChangeCalendar = action.payload;
    },
    setStateActiveViewTime(state, action) {
      state.stateActiveViewTime = action.payload;
    },
    setStateNotification(state, action) {
      state.stateNotification = action.payload;
    },
    setStateActiveChart(state, action) {
      state.stateActiveChart = action.payload;
    },
    setStateTextLength(state, action) {
      state.stateTextLength = action.payload;
    },
    setStateActiveViewFilter(state, action) {
      state.stateActiveViewFilter = action.payload;
    },
    setStateErrorServer(state, action) {
      state.stateErrorServer = action.payload;
    },
    setStateTask(state, action) {
      state.stateTask = action.payload;
    },
  },
});

export const {
  setStateTouchDate,
  setStateActiveChart,
  setStateActiveViewFilter,
  setStateActiveViewTime,
  setStateAddCategory,
  setStateAddNewTask,
  setStateCategoryImageAddition,
  setStateCategoryImageExpense,
  setStateChangeCalendar,
  setStateChangeTask,
  setStateSaveCategory,
  setStateDeleteCategory,
  setStateErrorInput,
  setStateErrorServer,
  setStateListCategory,
  setStateNotification,
  setStateTextLength,
  setStateTask
} = stateSlice.actions;

export default stateSlice.reducer;