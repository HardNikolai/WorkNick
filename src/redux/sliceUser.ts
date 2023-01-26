import {createSlice} from '@reduxjs/toolkit';
import { IUser } from '../screens/interfaces/interfaces';

const dataUser: IUser = {
  user: {
    isNewUser: false,
    profile: {
        picture: '',
        name: '',
        email: ''
    },
  },
  token: ''
};

const configSlice = createSlice({
  name: 'dataUser',
  initialState: {dataUser},
  reducers: {
    setUser(state, action) {
      state.dataUser.user = action.payload;
    },
    setToken(state, action) {
      state.dataUser.token = action.payload;
    },
  },
});

export const {setUser, setToken} = configSlice.actions;

export default configSlice.reducer;
