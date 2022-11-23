import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getStatForHelpRequestByCategory } from 'store/slices/statSlice';
import { LineChart } from './LineChart';
import { JobApplication, ApplicationType } from '../../interfaces/index';
import dayjs, { Dayjs } from "dayjs";
import _ from 'lodash';

interface AppliedLineChartProps {
  applicationData: JobApplication[];
  applicationTypes: ApplicationType[];
}

export const AppliedLineChart = (props: AppliedLineChartProps) => {

  const prepareSeries = (arr: JobApplication[]) => {
    if (arr?.length === 0) {
      return ;
    }
    console.log(_.groupBy(arr, ({createdAt}) => new Date(createdAt).getMonth()));


    // const copyArr = [...arr].sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    // const typeDeclaration: number[][] = [];
    // for (const type of props.applicationTypes) {
    //   const typeData = {
    //     name: type.name,
    //     data: typeDeclaration
    //   };

    //   for (const application of copyArr) {
    //     if (application.applicationType.id === type.id) {
    //       const index = findMonthDifference(application.createdAt, copyArr[0].createdAt);
    //       if (typeData.data[index]) {
    //         typeData.data[index] = [new Date(application.createdAt).getTime(), 1];
    //       } else {
    //         typeData.data[index] = [typeData.data[index][0], typeData.data[index][1] + 1];
    //       }
    //     }
    //   }
    //}

    return null;
  }

  const findMonthDifference = (date1: Date, date2: Date) => {
    const day1: Dayjs = dayjs(date1);
    const day2: Dayjs = dayjs(date2);

    return Math.ceil(day1.diff(day2, 'month', true));
  }

  // const startOfMonth = (date: string) => {
  //   return dayjs.utc(date)
  //     .startOf("month")
  //     .toISOString();
  // }

  const updateLabels = (data: string[]) => {
    const arr: string[] = [];
    for (let x of data) {
      switch(x) {
        case "Approved":
          x = "Підтверджених";
          break;
        case "Pending":
          x = "Очікується підтвердження";
          break;
        case "Declined":
          x = "Відхилених";
          break;
      }
      arr.push(x);
    }

    return arr;
  }

  console.log("TOTAL: ");
  console.log(prepareSeries(props?.applicationData));

  //   const ser = requestStat.items.map(elem => elem.quantity);
  //   const lab = updateLabels(requestStat.items.map(elem => elem.group));

  return (
    <Box width="100%" mt={5}>
      <Box
        padding={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <LineChart labels={["A"]} series={undefined}/>
      </Box>
    </Box>
  );
};