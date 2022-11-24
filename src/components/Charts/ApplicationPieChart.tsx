import React from 'react';
import { Box } from '@mui/material';
import { DonutChart } from './DonutChart';
import { JobApplication } from 'interfaces';

interface ApplicationPieChartProps {
  appliedJobsData: JobApplication[];
  proposedJobData: JobApplication[];
}

export const ApplicationPieChart = (props: ApplicationPieChartProps) => {

  const ser = [props.proposedJobData.length, props.appliedJobsData.length];
  const lab = ["Запропоновані вакансії", "Подані вакансії"];

  return (
    <Box width="100%" mt={5}>
      <Box
        padding={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <DonutChart labels={lab} series={ser} total={undefined} holeInside={false}/>
      </Box>
    </Box>
  );
};