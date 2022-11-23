import React from 'react';
import { Box } from '@mui/material';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineChartProps {
  labels: string[];
  series: ApexAxisChartSeries | undefined;
}

export const LineChart = (props: LineChartProps) => {

  const checkDataAvailability = (series: ApexAxisChartSeries | undefined) => {
    // return series.filter(elem => elem !== 0).length !== 0;
    return true
  }

  const options: ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Product Trends by Month',
      align: 'center'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        // opacity: 0.5
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MM yyyy'
      }
    }
  };

  return (
    <Box width="100%" mt={5}>
      <Box
        padding={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {checkDataAvailability(props.series) ? <ReactApexChart options={options} series={props.series} type="line" width={1000} height={500}/> : "NO DATA"}
      </Box>
    </Box>
  );
};