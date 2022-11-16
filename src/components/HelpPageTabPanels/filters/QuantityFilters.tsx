import React, { useState } from 'react';
import { HelpCategory } from 'interfaces';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearStatFilters, setActiveCategory } from 'store/slices/statSlice';
import { Box, SelectChangeEvent } from '@mui/material';
import { FilterClear } from 'components/filters/ClearFilter';
import OptionPicker from 'components/filters/OptionFilter';

function Filters() {
  const dispatch = useAppDispatch();

  const { items, selectedCategory } = useAppSelector(
    state => state.stat.categories,
  );

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setActiveCategory(items[+event.target.value]));
  };

  console.log(selectedCategory);
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={13}
      alignItems="center"
      justifyContent="space-between"
      margin="20px 0"
    >
      <OptionPicker
        onChange={handleChange}
        value={selectedCategory}
        options={items}
        label="Категорії"
      />
    </Box>
  );
}

export default Filters;
