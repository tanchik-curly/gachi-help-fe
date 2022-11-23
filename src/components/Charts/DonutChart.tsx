import React from 'react';
import { Box } from '@mui/material';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface DonutChartProps {
  labels: string[];
  series: number[];
  total: string | undefined;
  holeInside: boolean;
}

export const DonutChart = (props: DonutChartProps) => {

  const checkDataAvailability = (series: number[]) => {
    return series.filter(elem => elem !== 0).length !== 0;
  }

  const options: ApexOptions = {
    chart: {
      width: 1400,
    },
    dataLabels: {
      enabled: false
    },
    responsive: [{
      options: {
        legend: {
          show: false
        }
      }
    }],
    legend: {
      position: 'bottom',
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

  if (!props.total && options?.plotOptions?.pie?.donut?.labels && options?.tooltip) {
    options.plotOptions.pie.donut.labels.show = false;
    options.tooltip.enabled = true;
  }

  return (
    <Box width="100%">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        { checkDataAvailability(props.series) ? <ReactApexChart options={options} series={props.series} type={props.holeInside ? "donut" : "pie"} height={1400}/> : "Даних  немає"}
      </Box>
    </Box>
  );
};