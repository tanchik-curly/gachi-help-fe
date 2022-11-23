import React from 'react';
import { useAppSelector } from 'store/hooks';
import { clearStatFilters, setStatFilters } from 'store/slices/statSlice';
import { setUsersFilters } from 'store/slices/usersSlice';
import { Box } from '@mui/material';
import { FilterClear } from 'components/filters/ClearFilter';
import { FilterDateRangePicker } from 'utils/helpers/DatePickerFilter';
import { SearchFilter } from './SerarchFilter';

function Filters() {
  const filters = useAppSelector(state => state.users.filters);

  return (
    <Box
      width="100%"
      display="flex"
      flexWrap="wrap"
      gap={13}
      alignItems="center"
      justifyContent="flex-end"
      margin="20px 0"
    >
      <SearchFilter
        setFilterValue={setUsersFilters}
        value={filters?.search || ''}
        selectorFunc={(selector: any) => ({ search: selector })}
      />
    </Box>
  );
}

export default Filters;
