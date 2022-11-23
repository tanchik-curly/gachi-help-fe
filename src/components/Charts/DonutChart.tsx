import React, { useState } from 'react';
import { Box } from '@mui/material';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface DonutChartProps {
  labels: string[];
  series: number[];
  total: number;
}

export const DonutChart = (props: DonutChartProps) => {

  const checkDataAvailability = (series: number[]) => {
    return series.filter(elem => elem !== 0).length !== 0;
  }

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      enabled: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          show: false
        }
      }
    }],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
      labels: {
        colors: ['#FFFFFF']
      }
    },
    labels: props.labels,
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => "" + props.total
            }
          }
        }
      }
    },
    tooltip: {
      enabled: false
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
        {checkDataAvailability(props.series) ? <ReactApexChart options={options} series={props.series} type="donut" width={380} /> : "NO DATA"}
      </Box>
    </Box>
  );
};