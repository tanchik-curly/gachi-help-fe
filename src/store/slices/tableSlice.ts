import { Table } from 'interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ConstructedPagination = {
  table: Table;
};

export const selectPagination = ({ table }: ConstructedPagination) => ({
  currentPage:
    table.pagination.currentPage < 0 ? 0 : table.pagination.currentPage,
  rowsPerPage: table.pagination.rowsPerPage,
  itemsCount: table.itemsCount,
});

const initialState: Table = {
  pagination: {
    currentPage: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30],
  },
  itemsCount: 0,
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.rowsPerPage = action.payload;
    },
    setItemsCount: (state, action: PayloadAction<number>) => {
      state.itemsCount = action.payload;
    },
    resetPagination: state => ({
      ...state,
      ...initialState,
    }),
    updatePagination: state => {
      const page =
        state.pagination.currentPage >
        Math.ceil((state.itemsCount - 1) / state.pagination.rowsPerPage) - 1
          ? state.pagination.currentPage - 1
          : state.pagination.currentPage;

      state.pagination.currentPage = page;
      state.itemsCount = state.itemsCount - 1;
    },
  },
});

export const {
  setCurrentPage,
  setRowsPerPage,
  setItemsCount,
  resetPagination,
  updatePagination,
} = tableSlice.actions;

export default tableSlice.reducer;
