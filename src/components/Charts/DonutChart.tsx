import React, { useState } from 'react';
import { Box } from '@mui/material';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface DonutChartProps {
  labels: string[];
  series: number[];
  total: string;
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
              label: "Загалом",
              formatter: () => "" + props.total,
              color: "#FFFFFF"
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
        {checkDataAvailability(props.series) ? <ReactApexChart options={options} series={props.series} type="donut" width={380} height={500}/> : "NO DATA"}
      </Box>
    </Box>
  );
};