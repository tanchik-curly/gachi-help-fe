import { toast } from 'react-toastify';
import { AuthResponse, Credentials, auth } from 'api/requests/auth';
import {
  CommentsResponse,
  RequestedHelpResponse,
  helpRequests,
} from 'api/requests/requested-help';
import { IState, RequestedHelp, Roles, User } from 'interfaces';
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
  name: '',
  surname: '',
  patronym: '',
  requestedHelp: {
    list: {
      itemCount: 0,
      items: [],
    },
  },
  comments: {
    list: {
      itemCount: 0,
      items: [],
    },
  },
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

export const getRequestedHelpByUserId = createAsyncThunk(
  'user/getRequestedHelpByUserId',
  async ({
    userId,
    limit,
    skip,
  }: {
    userId: number;
    limit: number;
    skip: number;
  }) => {
    try {
      const response = await helpRequests.requestHelpByUserId({
        userId,
        limit,
        skip,
      });
      console.log(response);
      return response;
    } catch (error: unknown) {
      throw Error('Error when loading help');
    }
  },
);

export const getCommentsByUserId = createAsyncThunk(
  'user/getCommentsByUserId',
  async ({
    userId,
    limit,
    skip,
  }: {
    userId: number;
    limit: number;
    skip: number;
  }) => {
    try {
      const response = await helpRequests.commentsByUserId({
        userId,
        limit,
        skip,
      });
      console.log(response);
      return response;
    } catch (error: unknown) {
      throw Error('Error when loading comments');
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      console.log(action.payload);
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
          console.log('userdata', userData);
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

    builder
      .addCase(
        getRequestedHelpByUserId.fulfilled,
        (state, { payload }: PayloadAction<RequestedHelpResponse>) => {
          state.requestedHelp.list = payload;
        },
      )
      .addCase(getRequestedHelpByUserId.rejected, () => {
        toast.error('Error when loading help');
      });

    builder
      .addCase(
        getCommentsByUserId.fulfilled,
        (state, { payload }: PayloadAction<CommentsResponse>) => {
          state.comments.list = payload;
        },
      )
      .addCase(getCommentsByUserId.rejected, () => {
        toast.error('Erorr while fetching the comments');
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
