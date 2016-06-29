import React, { PropTypes } from 'react';
import Chart from 'chart.js';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: this.props.dataset.testName,
        },
        legend: {
          display: true,
          labels: {
            fontColor: 'rgb(0, 0, 0)',
          },
        },
        tooltips: {
          enabled: true,
          mode: 'label',
          callbacks: {
            // parse ms time into date for tooltip
            title: arr => new Date(parseInt(arr[0].xLabel, 10)).toDateString(),
          },
        },
        hover: {
          mode: 'label',
        },
        elements: {
          // Line graph options
          line: {
            fill: false,
            borderJoinStyle: 'round',
            tension: 0,
          },
          // Data point options
          point: {
            radius: 3,
            hitRadius: 4,
          },
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'HAMMERTIME',
            },
            type: 'time',
            ticks: {
              displayFormats: {
                quarter: 'MMM YYYY',
              },
            },
          }],
        },
      },
    };
  }

  componentDidMount() {
    const A = this.props.dataset.data.aClicks;
    const B = this.props.dataset.data.bClicks;
    const buckets = this.props.dataset.data.buckets;

    const visitsA = this.props.dataset.data.aVisits;
    const visitsB = this.props.dataset.data.bVisits;

    const data = {
      labels: buckets,

      datasets: [{
        label: 'A Visits',
        backgroundColor: 'rgba(20, 178, 99, 0.5)',
        borderColor: 'rgba(20, 178, 99, 0.5)',
        data: visitsA,
      }, {
        label: 'A Clicks',
        backgroundColor: 'rgba(20, 178, 20, 1)',
        borderColor: 'rgba(20, 178, 20, 1)',
        data: A,
      }, {
        label: 'B Visits',
        backgroundColor: 'rgba(10, 107, 203, 0.5)',
        borderColor: 'rgba(10, 107, 203, 0.5)',
        data: visitsB,
      }, {
        label: 'B Clicks',
        backgroundColor: 'rgba(10, 10, 203, 1)',
        borderColor: 'rgba(10, 10, 203, 1)',
        data: B,
      }],
    };

    this.setState({ data });
  }


  componentDidUpdate() {
    const chartCanvas = this.refs.chart;
    const myChart = new Chart(chartCanvas, {
      type: 'line',
      data: this.state.data,
      options: this.state.options,
    });
    myChart.update();
  }

  render() {
    return (
      <div width="500" height="500">
        <canvas ref={'chart'} width={'500'} height={'500'} ></canvas>
      </div>
    );
  }
}

LineChart.propTypes = {
  dataset: PropTypes.object.isRequired,
};

export default LineChart;
