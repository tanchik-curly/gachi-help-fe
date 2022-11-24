import { configureStore } from '@reduxjs/toolkit';
import statReducer from './slices/statSlice';
import tableReducer from './slices/tableSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    table: tableReducer,
    stat: statReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
