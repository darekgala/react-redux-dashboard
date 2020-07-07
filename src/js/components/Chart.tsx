import React, { ReactElement, useEffect } from 'react';
import Highcharts from 'highcharts';
import { HistoryType } from '../features/currency/currencyTypes';

interface PropsType {
  history: HistoryType[];
  currencyId: string;
  chartId: string;
}

export const Chart = ({ currencyId, history, chartId }: PropsType): ReactElement => {
  useEffect(() => {
    const data = history.map((dataPoint) => [dataPoint.time, dataPoint.close]);

    Highcharts.chart(chartId, {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Wykres zmian ceny'
      },
      yAxis: {
        title: {
          text: 'Close'
        }
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%a %H:%m}'
        },
      },
      series: [{
        name: currencyId,
        data
      }],
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      }
    });
  }, []);

  return (<div id={chartId} />);
};

export default Chart;
