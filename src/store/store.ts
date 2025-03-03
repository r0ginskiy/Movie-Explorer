import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const preloadedState = JSON.parse(localStorage.getItem('reduxState') ?? '{}');
const rootReducer = combineReducers({
  user: userSlice,
  
});

export const store = configureStore({
  preloadedState, 
  reducer: rootReducer,
});

store.subscribe(() => localStorage.setItem('reduxState', JSON.stringify(store.getState())));


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;