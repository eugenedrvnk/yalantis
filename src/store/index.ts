import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import employeesReducer from '../store/modules/employees';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;
