import {createSlice} from '@reduxjs/toolkit';
import { IDataTask } from '../screens/interfaces/interfaces';

const dataTask: IDataTask = {
  task: {
    id: '',
    user: '',
    nameCategories: '',
    categories: '',
    count: '',
    textAbout: '',
    date: '',
    dateTime: '',
  },
};

const configSlice = createSlice({
  name: 'dataTask',
  initialState: {dataTask},
  reducers: {
    setTask(state, action) {
      state.dataTask.task = action.payload;
    },
    setCategories(state, action) {
      state.dataTask.task.categories = action.payload;
    },
    setNameCategory(state, action) {
      state.dataTask.task.nameCategories = action.payload;
    },
    setTextCount(state, action) {
      state.dataTask.task.count = action.payload;
    },
    setTextAbout(state, action) {
      state.dataTask.task.textAbout = action.payload;
    },
    clearTask(state) {
      state.dataTask.task = {
        id: '',
        user: '',
        nameCategories: '',
        categories: '',
        count: '',
        textAbout: '',
        date: '',
        dateTime: '',
      };
    },
  },
});

export const {
  setTask,
  setCategories,
  setNameCategory,
  setTextAbout,
  setTextCount,
  clearTask,
} = configSlice.actions;

export default configSlice.reducer;