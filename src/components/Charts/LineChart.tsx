import React from 'react';
import { Box } from '@mui/material';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineChartProps {
  labels: string[];
  series: ApexAxisChartSeries | undefined;
  title: string;
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
      curve: 'smooth'
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: ['#FFFFFF']
      }
    },
    title: {
      text: props?.title,
      align: 'center',
      style: {
        color: "#FFFFFF"
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MM yyyy',
        style: {
          colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]
        },
      }
    },
    yaxis: {
      labels: {
        formatter: function(val) {
          return val.toFixed(0);
        },
        style: {
          colors: ["#FFFFFF"]
        },
      },
      min: 0,
      axisTicks: {
        color: "#FFFFFF"
      }
    },
  };

  return (
    <Box width="100%" mt={5}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {checkDataAvailability(props.series) ? <ReactApexChart options={options} series={props?.series} type="line" width={1000} height={500}/> : "Немає даних"}
      </Box>
    </Box>
  );
};