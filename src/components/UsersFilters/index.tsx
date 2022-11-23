import React from 'react';
import { useAppSelector } from 'store/hooks';
import { setUsersFilters } from 'store/slices/usersSlice';
import { Box } from '@mui/material';
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectorFunc={(selector: any) => ({ search: selector })}
      />
    </Box>
  );
}

export default Filters;
