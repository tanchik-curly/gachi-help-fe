import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { DonutChart } from './DonutChart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getStatForHelpRequestByCategory } from 'store/slices/statSlice';

interface SocialDonutChartProps {
  user: number;
}

export const SocialDonutChart = (props: SocialDonutChartProps) => {
  const dispatch = useAppDispatch();
  const { requestStat} = useAppSelector(state => ({
    requestStat: state.stat.requestedHelpStat
  }));

  useEffect(() => {
      dispatch(getStatForHelpRequestByCategory({
        userId: props.user,
        category: undefined
      }));
        
  }, [dispatch]);

  const retrieveLabels = (data: any) => {
    let arr: string[] = [];
    for (const key in data) {
      if (key !== "carma") {
				arr.push(key);
      }
    }

    return arr;
  }

  const retrieveSeries = (data: any) => {
		let arr: number[] = [];
    for (const key in data) {
      if (key !== "carma") {
				arr.push(data[key]);
      }
    }

		return arr;
  }

  const ser = retrieveSeries(requestStat);
  const lab = retrieveLabels(requestStat);

  return (
    <Box width="100%" mt={5}>
      <Box
        padding={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <DonutChart labels={lab} series={ser} total={3}/>
      </Box>
    </Box>
  );
};