import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/hooks';
import { setCurrentPage, setRowsPerPage } from 'store/slices/tableSlice';
import { Box, TablePagination } from '@mui/material';
import { PaginationController } from '../PaginationController/PaginationController';

export const TablePaginator = () => {
  const dispatch = useDispatch();
  const { itemsCount, rowsPerPage, rowsPerPageOptions, currentPage } =
    useAppSelector(({ table: { itemsCount, pagination } }) => ({
      itemsCount,
      rowsPerPage: pagination.rowsPerPage,
      rowsPerPageOptions: pagination.rowsPerPageOptions,
      currentPage: pagination.currentPage,
    }));

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const rowsPerPageValue = parseInt(event.target.value);
    dispatch(setCurrentPage(0));
    dispatch(setRowsPerPage(rowsPerPageValue));
  };

  return (
    <Box>
      <TablePagination
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#e1d9d9',
          flexWrap: 'wrap',
          '& .MuiPaginationItem-root': {
            color: '#e1d9d9',
          },
          '& .MuiTablePagination-toolbar': {
            flexWrap: 'wrap',
            padding: 0,
          },
          '& .MuiTablePagination-selectRoot': {
            'margin-right': 0,
            'margin-left': 0,
          },
        }}
        count={+itemsCount}
        page={+currentPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={handleChangePage}
        rowsPerPage={+rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={PaginationController}
      />
    </Box>
  );
};
