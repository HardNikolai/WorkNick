import {createSlice} from '@reduxjs/toolkit';
import {IData} from '../screens/interfaces/interfaces';

const dataTable: IData = {
  DataNumberInMonth: ['1', '2', '3'],
  DataExpenseNumbersInMonth: [1, 2, 30],
  allData: [],
  allDataUsers: [],
  allDataMonth: [],
  dateSynch: '',
};

const configSlice = createSlice({
  name: 'dataTable',
  initialState: {dataTable},
  reducers: {
    changeDataNumberInMonth(state, action) {
      state.dataTable.DataNumberInMonth = action.payload;
    },
    changeDataExpenseNumbersInMonth(state, action) {
      state.dataTable.DataExpenseNumbersInMonth = action.payload;
    },
    changeAllData(state, action) {
      state.dataTable.allData = action.payload;
    },
    changeAllDataUsers(state, action) {
      state.dataTable.allDataUsers = action.payload;
    },
    changeAllDataMonth(state, action) {
      state.dataTable.allDataMonth = action.payload;
    },
    changeDateSynch(state, action) {
      const hour = action.payload.getHours();
      const minutes = action.payload.getMinutes();
      const newHour = hour < 10 ? `0${hour}` : hour;
      const newMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const time = `${newHour}:${newMinutes}`;
      state.dataTable.dateSynch = time;
    },
  },
});

export const {
  changeDataNumberInMonth,
  changeDataExpenseNumbersInMonth,
  changeAllData,
  changeAllDataUsers,
  changeAllDataMonth,
  changeDateSynch,
} = configSlice.actions;

export default configSlice.reducer;
