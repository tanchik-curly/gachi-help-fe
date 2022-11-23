import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { DonutChart } from './DonutChart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getSocialStatsByUserId } from 'store/slices/userSlice';
import { UserSocialStatisticsResponse } from 'api/requests/statistics';

interface SocialDonutChartProps {
  user: number;
}

export const SocialDonutChart = (props: SocialDonutChartProps) => {
  const dispatch = useAppDispatch();
  const { socialStats } = useAppSelector(state => ({
    socialStats: state.user.socialStats
  }));

  useEffect(() => {
      dispatch(getSocialStatsByUserId({
        userId: props.user
      }));
        
  }, [dispatch]);

  const retrieveLabels = (data: UserSocialStatisticsResponse) => {
    const arr: string[] = [];
    for (let key in data) {
      if (key !== "carma") {
        switch(key) {
          case "votesCount":
            key = "Кількість голосів";
            break;
          case "closedDiscussionsCount":
            key = "Закритих обговорень";
            break;
          case "answearsCount":
            key = "Кількість відповідей";
            break;
        }
				arr.push(key);
      }
    }

    return arr;
  }

  const retrieveSeries = (data: any) => {
		const arr: number[] = [];
    for (const key in data) {
      if (key !== "carma") {
				arr.push(data[key]);
      }
    }

		return arr;
  }

  const ser = retrieveSeries(socialStats);
  const lab = retrieveLabels(socialStats);

  return (
    <Box width="100%" mt={5}>
      <Box
        padding={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <DonutChart labels={lab} series={ser} total={socialStats["carma"] + " Очків"}/>
      </Box>
    </Box>
  );
};