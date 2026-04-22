export const definePointsFromScore = (scoreArray) => {
  if (scoreArray.length !== 2) return;
  return scoreArray[0] === scoreArray[1]
    ? [1, 1]
    : scoreArray[0] > scoreArray[1]
      ? [3, 0]
      : [0, 3];
};

const getClearScoreWinner = (score) => {
  const scoreArray = score.split("-");
  return scoreArray[0] === scoreArray[1]
    ? "draw"
    : scoreArray[0] > scoreArray[1]
      ? "home"
      : "away";
};
export const definePlayoffWinner = (finalScore, additionalScore) => {
  const clearedAdditional = additionalScore.replace(/[a-zA-Z.]/g, "");
  const winner = additionalScore
    ? getClearScoreWinner(clearedAdditional)
    : getClearScoreWinner(finalScore);
  return winner;
};
