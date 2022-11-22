import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface DonutChartProps {
  labels: string[];
  series: number[];
}

export const DonutChart = (props: DonutChartProps) => {

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
              formatter: () => "" + props.series.reduce((a, b) => a + b, 0)
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
        <ReactApexChart options={options} series={props.series} type="donut" width={380} />
      </Box>
    </Box>
  );
};