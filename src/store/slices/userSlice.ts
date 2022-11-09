import { User } from 'interfaces';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  firstName: 'John',
  lastName: 'Doe',
  role: 'Worker',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ firstName: string; lastName: string }>,
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
