import * as React from 'react';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';

interface IProps {
  histoData: any;
  selectedCoin: string;
}

export default class Chart extends React.Component {
  props: IProps;

  constructor(props: any) {
    super(props);
  }

  drawChart(data: any) {
    Highcharts.chart('container', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Cryptocurrency price'
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
        name: this.props.selectedCoin,
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
  }

  createHighchartsData(data: any) {
    return data.map((dataPoint: any) => [dataPoint.time, dataPoint.close]);
  }

  componentDidUpdate(prevProps: any) {
    const isPrevDataEmpty = _.isEmpty(prevProps.histoData);
    const isCurrentDataEmpty =  _.isEmpty(this.props.histoData);

    if (isPrevDataEmpty && isCurrentDataEmpty) {
      this.drawChart([]);
    }

    if (isPrevDataEmpty && !isCurrentDataEmpty) {
      const data = this.createHighchartsData(this.props.histoData);
      this.drawChart(data);
    }
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}
