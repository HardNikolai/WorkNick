import {createSlice} from '@reduxjs/toolkit';
import { Istate } from '../screens/interfaces/interfaces';

const state: Istate = {
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
  stateError: false,
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
    setStateTask(state, action) {
      state.stateTask = action.payload;
    },
    setStateError(state, action) {
      state.stateError = action.payload;
    }
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
  setStateListCategory,
  setStateNotification,
  setStateTextLength,
  setStateTask,
  setStateError
} = stateSlice.actions;

export default stateSlice.reducer;