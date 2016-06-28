import React, { PropTypes } from 'react';
import uuid from 'uuid';

function StatsForTest(props) {
  return (
    <div>
      <div>
        <p key={uuid.v4()}>Test result: {props.viewableStatsForTest.testResult}</p>
        <p key={uuid.v4()}>Version A conversion rate: {props.viewableStatsForTest.aConversionRate}</p>
        <p key={uuid.v4()}>Version B conversion rate: {props.viewableStatsForTest.bConversionRate}</p>
      </div>
    </div>
  );
}

StatsForTest.propTypes = {
  viewableStatsForTest: PropTypes.object.isRequired,
};

export default StatsForTest;
