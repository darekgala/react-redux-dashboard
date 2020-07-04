import * as React from 'react';
import * as Highcharts from 'highcharts';
import { HistoryType } from '../features/currency/currencyTypes';

interface Props {
  history: HistoryType[];
  currencyId: string;
  chartId: string;
}

export const Chart = ({ currencyId, history, chartId }: Props): React.ReactElement => {
  React.useEffect(() => {
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
