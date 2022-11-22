import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { DonutChart } from './DonutChart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getStatForHelpRequestByCategory } from 'store/slices/statSlice';

interface CategoryDonutChartProps {
  user: number;
  category: number;
}

export const CategoryDonutChart = (props: CategoryDonutChartProps) => {
  const dispatch = useAppDispatch();
  const { requestStat, userId } = useAppSelector(state => ({
    requestStat: state.stat.requestedHelpStat,
    userId: state.user.id,
  }));

  useEffect(() => {
    if (props.category === null) {
      dispatch(getStatForHelpRequestByCategory({
        userId: props.user,
        category: undefined
      }));
    } else {
      dispatch(getStatForHelpRequestByCategory({
        userId: props.user,
        category: props.category
      }));
    }
        
  }, [dispatch]);

  const ser = requestStat.items.map(elem => elem.quantity);
  const lab = requestStat.items.map(elem => elem.group);

  return (
    <Box width="100%" mt={5}>
      <Box
        padding={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <DonutChart labels={lab} series={ser}/>
      </Box>
    </Box>
  );
};