import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/hooks';
import { setCurrentPage } from 'store/slices/tableSlice';
import { Pagination } from '@mui/material';

export const PaginationController = () => {
  const dispatch = useDispatch();
  const { currentPage, itemsCount, rowsPerPage } = useAppSelector(state => ({
    itemsCount: state.table.itemsCount,
    currentPage: state.table.pagination.currentPage,
    rowsPerPage: state.table.pagination.rowsPerPage,
  }));

  return (
    <div>
      <Pagination
        count={Math.ceil(itemsCount / rowsPerPage)}
        page={currentPage + 1}
        onChange={(e, page) => {
          dispatch(setCurrentPage(page - 1));
        }}
      />
    </div>
  );
};
