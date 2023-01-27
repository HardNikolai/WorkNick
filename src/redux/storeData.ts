import {createSlice} from '@reduxjs/toolkit';
import { Idate } from '../screens/interfaces/interfaces';

const fullYear = new Date().getFullYear()
const fullMonth = new Date().getMonth()

const data: Idate = {
    year: fullYear,
    month: fullMonth
};

const configSlice = createSlice({
  name: 'data',
  initialState: {data},
  reducers: {
    changeYear(state, action) {
      state.data.year = action.payload;
    },
    changeMonth(state, action) {
      state.data.month = action.payload;
    }
  },
});

export const {
  changeYear,
  changeMonth
} = configSlice.actions;

export default configSlice.reducer;