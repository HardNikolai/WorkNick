import {createSlice} from '@reduxjs/toolkit';
import {ICategories} from '../screens/interfaces/interfaces';

const dataCategories: ICategories = {
  allCategories: [],
  userCategories: [],
  textSetCategory: '',
  textCategory: 'Выберете категорию',
};

const configSlice = createSlice({
  name: 'dataCategories',
  initialState: {dataCategories},
  reducers: {
    changeAllCategories(state, action) {
      state.dataCategories.allCategories = action.payload;
    },
    changeUserCategories(state, action) {
      state.dataCategories.userCategories = action.payload;
    },
    setCategory(state, action) {
      state.dataCategories.textSetCategory = action.payload;
    },
    setTextListCategory(state, action) {
      state.dataCategories.textCategory = action.payload;
    },
  },
});

export const {
  changeAllCategories,
  changeUserCategories,
  setCategory,
  setTextListCategory,
} = configSlice.actions;

export default configSlice.reducer;