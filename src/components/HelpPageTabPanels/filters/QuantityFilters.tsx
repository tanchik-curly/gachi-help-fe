import React, { useState } from 'react';
import { HelpCategory } from 'interfaces';
import { useAppSelector } from 'store/hooks';
import { Box, SelectChangeEvent } from '@mui/material';
import OptionPicker from 'components/filters/OptionFilter';
import { CategoryDonutChart } from '../../Charts/CategoryDonutChart';

function Filters() {
  const userId = useAppSelector(state => state.user.id);
  const { items } = useAppSelector(state => state.stat.categories);
  const [selectedCategory, setSelectedCategory] = useState<HelpCategory>(
    items[0] || null,
  );

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setSelectedCategory(items[(event.target.value as unknown as number) - 1]);
  };

  return (
    <>
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
      <CategoryDonutChart category={selectedCategory ? selectedCategory.id : undefined} user={userId}/>
    </>
  );
}

export default Filters;
