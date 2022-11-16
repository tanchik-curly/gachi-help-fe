import { toast } from 'react-toastify';
import { AuthResponse, Credentials, auth } from 'api/requests/auth';
import {
  RequestedHelpResponse,
  helpRequests,
} from 'api/requests/requested-help';
import {
  CategoryListResponse,
  HelpRequestStatResponse,
  statistics,
} from 'api/requests/statistics';
import { Group, RequestHelpStatState } from 'interfaces';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialFilters = {
  dateFrom: '',
  dateTo: '',
};

const initialState: RequestHelpStatState = {
  categories: {
    items: [],
    selectedCategory: null,
  },
  requestedHelpStat: {
    items: [],
    filters: initialFilters,
  },
};

export const getStatForHelpRequestByPeriod = createAsyncThunk(
  'stat/getStatForHelpRequestByPeriod',
  async ({
    userId,
    dateFrom,
    dateTo,
  }: {
    userId: number;
    dateFrom: Date;
    dateTo: Date;
  }) => {
    try {
      const response =
        await statistics.getStatisticsForHelpRequestsByUserForPeriod({
          userId,
          dateFrom,
          dateTo,
        });
      console.log(response);
      return response;
    } catch (error: unknown) {
      throw Error('Something went wrong');
    }
  },
);

export const getStatForHelpRequestByCategory = createAsyncThunk(
  'stat/getStatForHelpRequestByCategory',
  async ({ userId, category }: { userId: number; category?: number }) => {
    try {
      const response =
        await statistics.getStatisticsForHelpRequestsByUserForQuantity({
          userId,
          category,
        });
      console.log(response);
      return response;
    } catch (error: unknown) {
      throw Error('Something went wrong');
    }
  },
);

export const getCategoriesList = createAsyncThunk(
  'stat/getCategoriesList',
  async () => {
    try {
      const response = await statistics.getCategories();
      return response;
    } catch (error: unknown) {
      throw Error('Something went wrong');
    }
  },
);

export const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.categories.selectedCategory = action.payload;
    },
    setStatFilters: (state, action) => ({
      ...state,
      requestedHelpStat: {
        ...state.requestedHelpStat,
        filters: {
          ...state.requestedHelpStat.filters,
          ...action.payload,
        },
      },
    }),
    clearStatFilters: state => {
      state.requestedHelpStat.filters = initialFilters;
      state.categories.selectedCategory = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<RequestHelpStatState>) => {
    builder
      .addCase(
        getStatForHelpRequestByPeriod.fulfilled,
        (state, { payload }: PayloadAction<HelpRequestStatResponse>) => {
          state.requestedHelpStat.items = payload;
        },
      )
      .addCase(getStatForHelpRequestByPeriod.rejected, () => {
        toast.error('Something is wrong');
      });

    builder
      .addCase(
        getStatForHelpRequestByCategory.fulfilled,
        (state, { payload }: PayloadAction<HelpRequestStatResponse>) => {
          state.requestedHelpStat.items = payload;
        },
      )
      .addCase(getStatForHelpRequestByCategory.rejected, () => {
        toast.error('Something is wrong');
      });

    builder
      .addCase(
        getCategoriesList.fulfilled,
        (state, { payload }: PayloadAction<CategoryListResponse>) => {
          state.categories.items = payload;
          state.categories.selectedCategory = payload[0];
        },
      )
      .addCase(getCategoriesList.rejected, () => {
        toast.error('Something is wrong');
      });
  },
});

export const { clearStatFilters, setStatFilters, setActiveCategory } =
  statSlice.actions;

export default statSlice.reducer;
