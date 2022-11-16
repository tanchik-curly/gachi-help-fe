import React from 'react';
import { useAppDispatch } from 'store/hooks';
import { setCurrentPage } from 'store/slices/tableSlice';
import { Button, Paper } from '@mui/material';

export const FilterClear = ({ actionClearFilters }: any) => {
  const dispatch = useAppDispatch();

  const clearFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(actionClearFilters());
  };

  return (
    <Paper>
      <Button variant="contained" onClick={clearFilters}>
        Clear
      </Button>
    </Paper>
  );
};
