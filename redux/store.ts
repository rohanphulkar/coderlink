import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/AuthSlice";
import { AuthState } from "./slices/AuthSlice"; // Assuming you have an AuthState type defined in your AuthSlice

const persistConfig = {
  key: "data",
  version: 1,
  storage,
};

// Create a type for your root state
interface RootState {
  auth: AuthState; // Replace with the actual slice state
}

const reducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
