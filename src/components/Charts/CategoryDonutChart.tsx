import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { DonutChart } from './DonutChart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getStatForHelpRequestByCategory } from 'store/slices/statSlice';

interface CategoryDonutChartProps {
  user: number;
  category: number | undefined;
}

export const CategoryDonutChart = (props: CategoryDonutChartProps) => {
  const dispatch = useAppDispatch();
  const { requestStat } = useAppSelector(state => ({
    requestStat: state.stat.requestedHelpStat
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
        
  }, [props.category]);

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
        <DonutChart labels={lab} series={ser} total={ser.reduce((a: number, b: number) => a + b, 0)}/>
      </Box>
    </Box>
  );
};