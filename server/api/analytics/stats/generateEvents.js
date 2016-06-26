// produces data of the form {
//     aVisits: [~, ~, ...],
//     aClicks: [~, ~, ...],
//     bVisits: [~, ~, ...],
//     bClicks: [~, ~, ...],
// }

// where ~ = {
//   IPAdress: 173.247.199.46
//   time: 1466896596001
// }

// some reasonable parameters: (1466896596001, 0.1, 4567, 0.125, 4603, 2592000000);
// days * hours * minutes * seconds * milliseconds = 30 * 24 * 60 * 60 * 1000

const numString = length => {
  const range = Math.pow(10, length);
  const num = Math.floor((range / 10) + Math.random() * (range - range / 10));
  return String(num);
};

const sortEvents = events => events.sort((eventA, eventB) => (eventA.time - eventB.time));

const generateVersionData = (startTime, clickRate, totalVisits, timeframe) => {
  let visits = [];
  let clicks = [];
  for (let i = 0; i < totalVisits; i++) {
    const time = startTime + Math.floor((Math.random() * timeframe));
    const IPAdress = `${numString(3)}.${numString(3)}.${numString(3)}.${numString(2)}`;
    visits.push({ time, IPAdress });
    if (Math.random() < clickRate) {
      clicks.push({ time, IPAdress });
    }
  }
  visits = sortEvents(visits);
  clicks = sortEvents(clicks);
  return { visits, clicks };
};

module.exports = (startTime, aClickRate, aTotalVisits, bClickRate, bTotalVisits, timeframe) => {
  const aData = generateVersionData(startTime, aClickRate, aTotalVisits, timeframe);
  const bData = generateVersionData(startTime, bClickRate, bTotalVisits, timeframe);
  return {
    aVisits: aData.visits,
    aClicks: aData.clicks,
    bVisits: bData.visits,
    bClicks: bData.clicks,
  };
};
