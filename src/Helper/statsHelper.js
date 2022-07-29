const statsHelper = (statsArray) => {
  //total played
  const played = statsArray.reduce((acc, obj) => {
    if (obj.result !== "unfinished") {
      return acc + 1;
    }
    return acc;
  }, 0);

  //amount won
  const won = statsArray.reduce((acc, obj) => {
    if (obj.result === "won") {
      return acc + 1;
    }
    return acc;
  }, 0);

  //percent won
  const wonPercentage = (won / played) * 100 ? (won / played) * 100 : 0;

  //winstreaks
  const streaks = statsArray.reduce(
    (acc, obj) => (
      obj.result === "won" ? acc[acc.length - 1]++ : acc.push(0), acc //eslint-disable-line
    ),
    [0]
  );
  const currentStreak = streaks[streaks.length - 1];
  const highestStreak = Math.max(...streaks);

  //row amounts
  const rowHelper = (rowNumber) => {
    return statsArray.reduce((acc, obj) => {
      if (obj.result === "won" && obj.row === rowNumber) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  const rowArray = [
    rowHelper(1),
    rowHelper(2),
    rowHelper(3),
    rowHelper(4),
    rowHelper(5),
    rowHelper(6),
  ];

  // row percentages
  const maxRow = Math.max(...rowArray);

  const rowPercentHelper = (rowNumber) => {
    return Math.round((rowHelper(rowNumber) / maxRow) * 100) === 0 ||
      maxRow === 0
      ? 8
      : Math.round((rowHelper(rowNumber) / maxRow) * 100);
  };

  const rowPercentages = [
    rowPercentHelper(1),
    rowPercentHelper(2),
    rowPercentHelper(3),
    rowPercentHelper(4),
    rowPercentHelper(5),
    rowPercentHelper(6),
  ];

  return [
    played,
    Math.round(wonPercentage),
    currentStreak,
    highestStreak,
    rowArray,
    rowPercentages,
  ];
};

export default statsHelper;
