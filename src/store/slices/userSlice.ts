import { toast } from 'react-toastify';
import { AuthResponse, Credentials, auth } from 'api/requests/auth';
import {
  CommentsResponse,
  RequestedHelpResponse,
  helpRequests,
} from 'api/requests/requested-help';
import {
  CertificationHistoryResponse,
  JobApplicationResponse,
  UserSocialStatisticsResponse,
  statistics,
} from 'api/requests/statistics';
import { Roles, User } from 'interfaces';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setAccessToken } from 'utils/authTokens';
import { getUserDataFromToken } from 'utils/getUserDataFromToken';

const initialFilters = {
  dateFrom: '',
  dateTo: '',
};

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
    filters: {
      dateFrom: '',
      dateTo: '',
    },
  },
  comments: {
    list: {
      itemCount: 0,
      items: [],
    },
    filters: {
      dateFrom: '',
      dateTo: '',
    },
  },
  certifications: {
    list: {
      itemCount: 0,
      items: [],
    },
    filters: {
      dateFrom: '',
      dateTo: '',
    },
  },
  jobApplications: {
    list: {
      itemCount: 0,
      items: [],
    },
    filters: {
      dateFrom: '',
      dateTo: '',
    },
  },
  proposedJobApplications: {
    list: {
      itemCount: 0,
      items: [],
    },
    filters: {
      dateFrom: '',
      dateTo: '',
    },
  },
  socialStats: {
    votesCount: 0,
    closedDiscussionsCount: 0,
    answearsCount: 0,
    carma: 0,
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
    dateFrom,
    dateTo,
  }: {
    userId: number;
    limit: number;
    skip: number;
    dateFrom: string;
    dateTo: string;
  }) => {
    try {
      const response = await helpRequests.requestHelpByUserId({
        userId,
        limit,
        skip,
        dateFrom,
        dateTo,
      });
      console.log(response);
      return response;
    } catch (error: unknown) {
      throw Error('Error when loading help');
    }
  },
);

export const getProposedJobApplicationsByUserId = createAsyncThunk(
  'user/getProposedJobApplicationsByUserId',
  async ({
    userId,
    dateFrom,
    dateTo,
  }: {
    userId: number;
    dateFrom: string;
    dateTo: string;
  }) => {
    try {
      const response = await statistics.getProposedJobApplications({
        userId,
        dateFrom,
        dateTo,
      });
      console.log(response);
      return response;
    } catch (error: unknown) {
      throw Error('Error when loading help');
    }
  },
);

export const getJobApplicationsbyUserId = createAsyncThunk(
  'user/getJobApplicationsbyUserId',
  async ({
    userId,
    dateFrom,
    dateTo,
  }: {
    userId: number;
    dateFrom: string;
    dateTo: string;
  }) => {
    try {
      const response = await statistics.getJobApplicationStatByUserId({
        userId,
        dateFrom,
        dateTo,
      });
      console.log(response);
      return response;
    } catch (error: unknown) {
      throw Error('Error when loading help');
    }
  },
);

export const getCertificationsByUserId = createAsyncThunk(
  'user/getCertificationsByUserId',
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
      const response = await statistics.getCertificationsHistoryByUserId({
        userId,
        limit,
        skip,
      });
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

export const getSocialStatsByUserId = createAsyncThunk(
  'user/getSocialStatsByUserId',
  async ({ userId }: { userId: number }) => {
    try {
      const response = await statistics.getSocialStatisticsByUserId({
        userId,
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
    clearApplicationFilters: state => {
      state.jobApplications.filters = initialFilters;
      state.proposedJobApplications.filters = initialFilters;
    },
    setApplicationFilters: (state, action) => ({
      ...state,
      jobApplications: {
        ...state.jobApplications,
        filters: {
          ...state.jobApplications.filters,
          ...action.payload,
        },
      },
    }),
    setProposedJobApplicationFilters: (state, action) => ({
      ...state,
      proposedJobApplications: {
        ...state.proposedJobApplications,
        filters: {
          ...state.proposedJobApplications.filters,
          ...action.payload,
        },
      },
    }),
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

    builder
      .addCase(
        getCertificationsByUserId.fulfilled,
        (state, { payload }: PayloadAction<CertificationHistoryResponse>) => {
          state.certifications.list = payload;
        },
      )
      .addCase(getCertificationsByUserId.rejected, () => {
        toast.error('Erorr while fetching the certifications');
      });

    builder
      .addCase(
        getSocialStatsByUserId.fulfilled,
        (state, { payload }: PayloadAction<UserSocialStatisticsResponse>) => {
          state.socialStats = payload;
        },
      )
      .addCase(getSocialStatsByUserId.rejected, () => {
        toast.error('Erorr while fetching the social stats');
      });

    builder
      .addCase(
        getProposedJobApplicationsByUserId.fulfilled,
        (state, { payload }: PayloadAction<JobApplicationResponse>) => {
          state.proposedJobApplications.list.items = payload;
          state.proposedJobApplications.list.itemCount = payload.length;
        },
      )
      .addCase(getProposedJobApplicationsByUserId.rejected, () => {
        toast.error('Erorr while fetching the comments');
      });

    builder
      .addCase(
        getJobApplicationsbyUserId.fulfilled,
        (state, { payload }: PayloadAction<JobApplicationResponse>) => {
          state.jobApplications.list.items = payload;
          state.jobApplications.list.itemCount = payload.length;
        },
      )
      .addCase(getJobApplicationsbyUserId.rejected, () => {
        toast.error('Erorr while fetching the comments');
      });
  },
});

export const {
  setUser,
  clearApplicationFilters,
  setApplicationFilters,
  setProposedJobApplicationFilters,
} = userSlice.actions;

export default userSlice.reducer;
