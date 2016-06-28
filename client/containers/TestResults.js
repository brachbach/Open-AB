import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchDataIfNeeded } from '../actions/api';
import uuid from 'uuid';

import formatStats from '../formatStats.js';
import StatsForTest from '../components/StatsForTest.js';


const statsEndpoint = '/api/stats';

class TestResults extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded(statsEndpoint));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statsEndpoint !== this.props.statsEndpoint) {
      const { dispatch } = nextProps;
      dispatch(fetchDataIfNeeded(statsEndpoint));
    }
  }

  render() {
    const { data, isFetching, lastUpdated } = this.props;

    const allViewableStats = formatStats(data);

    return (
      <div>
        {allViewableStats.map(viewableStatsForTest => <StatsForTest key={uuid.v4()} viewableStatsForTest={viewableStatsForTest} />)}
      </div>
    );
  }
}

TestResults.propTypes = {
  statsEndpoint: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { dataByapiEndpoint } = state;
  const {
    isFetching,
    lastUpdated,
    items: data,
  } = dataByapiEndpoint[statsEndpoint] || {
    isFetching: true,
    items: [],
  };

  return {
    statsEndpoint,
    data,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(TestResults);
