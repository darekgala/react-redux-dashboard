import React from 'react';
import Highcharts from 'highcharts';
import * as _ from 'lodash';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  drawChart(data) {
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

  createHighchartsData(data) {
    return data.map((dataPoint) => [dataPoint.time, dataPoint.close]);
  }

  componentDidUpdate(prevProps) {
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
