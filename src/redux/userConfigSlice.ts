import {createSlice} from '@reduxjs/toolkit';
import { Iconfig } from '../screens/interfaces/interfaces';

const config: Iconfig = {
  isNotification: false,
  isStateCalculation: true,
  dateTextNotifee: '',
  dateNotifee: new Date(),
};

const configSlice = createSlice({
  name: 'config',
  initialState: {config},
  reducers: {
    toggleIsNotification(state, action) {
      state.config.isNotification = action.payload;
    },
    toggleIsStateCalculation(state, action) {
      state.config.isStateCalculation = action.payload;
    },
    changeDateTextNotifee(state, action) {
      state.config.dateTextNotifee = action.payload;
    },
    changeDateNotifee(state, action) {
      state.config.dateNotifee = action.payload;
    },
  },
});

export const {
  toggleIsNotification,
  toggleIsStateCalculation,
  changeDateTextNotifee,
  changeDateNotifee,
} = configSlice.actions;

export default configSlice.reducer;