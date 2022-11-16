import { toast } from 'react-toastify';
import { AuthResponse, Credentials, auth } from 'api/requests/auth';
import {
  RequestedHelpResponse,
  helpRequests,
} from 'api/requests/requested-help';
import { UsersResponse, users } from 'api/requests/users';
import { IState, RequestedHelp, Roles, User } from 'interfaces';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setAccessToken } from 'utils/authTokens';
import { getUserDataFromToken } from 'utils/getUserDataFromToken';

const initialState: IState<Partial<User>> = {
  list: {
    itemCount: 0,
    items: [],
  },
  filters: {
    search: '',
  },
};

export const getListOfUsers = createAsyncThunk(
  'users/getListOfUsers',
  async ({
    search,
    limit,
    skip,
  }: {
    search?: string;
    limit: number;
    skip: number;
  }) => {
    try {
      const response = await users.getUsers({
        search,
        limit,
        skip,
      });
      console.log(response);
      return response;
    } catch (error: unknown) {
      throw Error('Invalid credentials');
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getListOfUsers.fulfilled,
        (state, { payload }: PayloadAction<UsersResponse>) => {
          state.list = payload;
        },
      )
      .addCase(getListOfUsers.rejected, () => {
        toast.error('Something is wrong');
      });
  },
});

export default usersSlice.reducer;
