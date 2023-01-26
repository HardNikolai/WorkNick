import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import configReducer from './userConfigSlice';
import stateReducer from './stateConfig';
import stateData from './storeData';
import storeBalance from './sliceBalance';
import storeDataTable from './sliceData';
import storeDataCategories from './sliceCategory';
import storeDataUser from './sliceUser';
import storeDataTask from './sliceTask';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, configReducer);
const stateReduc = persistReducer(persistConfig, stateReducer);
const dataUser = persistReducer(persistConfig, stateData);
const dataBalance = persistReducer(persistConfig, storeBalance);
const dataTable = persistReducer(persistConfig, storeDataTable);
const dataCategories = persistReducer(persistConfig, storeDataCategories);
const dataUsers = persistReducer(persistConfig, storeDataUser);
const dataTask = persistReducer(persistConfig, storeDataTask);

export const store = configureStore({
  reducer: {
    config: persistedReducer,
    state: stateReduc,
    data: dataUser,
    balance: dataBalance,
    table: dataTable,
    category: dataCategories,
    user: dataUsers,
    dataTask: dataTask
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;