import { toast } from 'react-toastify';
import { AuthResponse, Credentials, auth } from 'api/requests/auth';
import { User } from 'interfaces';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setAccessToken } from 'utils/authTokens';

const initialState: User = {
  id: 0,
  login: '',
  email: '',
  role: 0,
  passwordHash: '',
  name: '',
  surname: '',
  patronym: '',
};

export const signInUser = createAsyncThunk(
  'user/signInUser',
  async ({ email, password }: Credentials) => {
    try {
      const response: AuthResponse = await auth.login({ email, password });
      setAccessToken(response?.token);
      return response.user;
    } catch (error: unknown) {
      throw Error('Invalid credentials');
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<User>) => {
    builder
      .addCase(
        signInUser.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          const userData: User = payload;
          if (userData) {
            state = userData;
            toast.success('Successfully logged in!');
          }
        },
      )
      .addCase(signInUser.rejected, () => {
        toast.error('Invalid credentails');
      });
  },
});

export default userSlice.reducer;
