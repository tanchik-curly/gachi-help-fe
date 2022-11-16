import { configureStore } from '@reduxjs/toolkit';
import statReducer from './slices/statSlice';
import tableReducer from './slices/tableSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    table: tableReducer,
    stat: statReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
