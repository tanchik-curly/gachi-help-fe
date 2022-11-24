import React from 'react';
import { useAppSelector } from 'store/hooks';
import {
  clearApplicationFilters,
  setApplicationFilters,
} from 'store/slices/userSlice';
import { Box } from '@mui/material';
import { FilterClear } from 'components/filters/ClearFilter';
import { FilterDateRangePicker } from 'utils/helpers/DatePickerFilter';

function Filters() {
  const filters = useAppSelector(state => state.user.jobApplications.filters);

  const { dateFrom, dateTo } = filters;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={13}
      alignItems="flex-end"
      justifyContent="space-between"
      margin="20px 0"
    >
      <FilterDateRangePicker
        setFilterValue={setApplicationFilters}
        filters={{ dateFrom: dateFrom || '', dateTo: dateTo || '' }}
      />
      <FilterClear actionClearFilters={clearApplicationFilters} />
    </Box>
  );
}

export default Filters;
