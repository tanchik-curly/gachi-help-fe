import React from 'react';
import { Box } from '@mui/material';
import { LineChart } from './LineChart';
import { JobApplication, ApplicationType, ChartLine } from '../../interfaces/index';
import dayjs, { Dayjs } from "dayjs";
import _ from 'lodash';

interface JobsLineChartLineChartProps {
  applicationData: JobApplication[];
  applicationTypes: ApplicationType[];
  title: string;
}

export const JobsLineChart = (props: JobsLineChartLineChartProps) => {

  const jobApplicationId = (item: JobApplication) => {
    return `${new Date(item.createdAt).getFullYear()}+${new Date(item.createdAt).getMonth()}+${item.applicationType.id}`;
  }

  const retrieveDate = (date: string) => {
    const parts: string[] = date.split("+");
    return new Date(+parts[0], +parts[1], 1);
  }

  const findMonthDifference = (date1: Date, date2: Date) => {
    const day1: Dayjs = dayjs(date1);
    const day2: Dayjs = dayjs(date2);

    return Math.ceil(day1.diff(day2, 'month', true));
  }

  const prepareSeries = (arr: JobApplication[]) => {
    if (arr?.length === 0) {
      return ;
    }

    const minDate = new Date(Math.min.apply(null, arr.map(item => new Date(item.createdAt).getTime())));
    const maxDate = new Date(Math.max.apply(null, arr.map(item => new Date(item.createdAt).getTime())));
    const monthDifference = findMonthDifference(maxDate, minDate);
    const groupArr = _.groupBy(arr, item => jobApplicationId(item));
    
    const resSeries: ApexAxisChartSeries = [];
    for (const type of props.applicationTypes) {
      const res: ChartLine = {name: "", data: []};
      res.name = type.name;
      for (const [key, value] of Object.entries(groupArr)) {
        if (key.endsWith(type.id.toString())) {
          const firstMonthDay = retrieveDate(key);
          const index = findMonthDifference(firstMonthDay, minDate);
          res.data[index] = [firstMonthDay.getTime(), value.length];
        }
      }

      for (let i = 0; i <= monthDifference; ++i) {
        if (!res.data[i]) {
          const date = dayjs(minDate).add(i, 'month').startOf("month").valueOf();
          res.data[i] = [date, 0];
        } 
      }

      const temp: any = {};
      temp.name = res.name;
      temp.data = res.data;
      resSeries.push(temp);
    }

    return resSeries;
  }

  const ser = prepareSeries(props.applicationData);
  const lab = props.applicationTypes.map(elem => elem.name);

  return (
    <Box width="100%" mt={5}>
      <Box
        padding={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <LineChart labels={lab} series={ser} title={props.title}/>
      </Box>
    </Box>
  );
};