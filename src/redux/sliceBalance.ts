import {createSlice} from '@reduxjs/toolkit';
import {IdataBalance} from '../screens/interfaces/interfaces';

const dataBalance: IdataBalance = {
  total: 0,
  forecast: 0,
};

const configSlice = createSlice({
  name: 'dataBalance',
  initialState: {dataBalance},
  reducers: {
    changeTotal(state, action) {
      state.dataBalance.total = action.payload;
    },
    changeForecast(state, action) {
      state.dataBalance.forecast = action.payload;
    },
  },
});

export const {changeTotal, changeForecast} = configSlice.actions;

export default configSlice.reducer;
