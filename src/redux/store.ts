import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import configReducer from "./userConfigSlice";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, configReducer)

export const store = configureStore({
  reducer: {
    config: persistedReducer
  },
  middleware: [thunk]
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch