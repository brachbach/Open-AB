import React, { PropTypes, Component } from 'react';
import uuid from 'uuid';

function StatsForTest(props) {
  return (
    <div>
      <div>
        <p>Test result: {props.viewableStatsForTest.testResult}</p>
        <p>Version A conversion rate: {props.viewableStatsForTest.aConversionRate}</p>
        <p>Version B conversion rate: {props.viewableStatsForTest.bConversionRate}</p>
      </div>
    </div>
  );
}

StatsForTest.propTypes = {
  viewableStatsForTest: PropTypes.array.isRequired,
};

export default StatsForTest;
