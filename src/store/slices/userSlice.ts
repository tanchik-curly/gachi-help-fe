import { toast } from 'react-toastify';
import { AuthResponse, Credentials, auth } from 'api/requests/auth';
import { Roles, User } from 'interfaces';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setAccessToken } from 'utils/authTokens';
import { getUserDataFromToken } from 'utils/getUserDataFromToken';

const initialState: User = {
  id: 0,
  login: '',
  email: '',
  role: Roles.User,
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
      return response;
    } catch (error: unknown) {
      throw Error('Invalid credentials');
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload) return { ...state, ...action.payload };
      return { ...state, ...initialState };
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<User>) => {
    builder
      .addCase(
        signInUser.fulfilled,
        (state, { payload }: PayloadAction<AuthResponse>) => {
          const userData: User | null = getUserDataFromToken(payload.token);
          console.log(payload, userData);
          if (userData) {
            toast.success('Successfully logged in!');
            return {
              ...state,
              ...userData,
            };
          }
        },
      )
      .addCase(signInUser.rejected, () => {
        toast.error('Invalid credentails');
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
