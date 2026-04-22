const divider = (arr) => {
  const maxCount = Math.ceil(arr.length / 2);
  const doubleArray = arr.reduce(
    (acc, current) => {
      return acc[0].length < maxCount
        ? [[...acc[0], current], acc[1]]
        : [acc[0], [...acc[1], current]];
    },
    [[], []],
  );
  return doubleArray;
};
const getSortedPredictions = (predictions) => {
  const splittedPredictions = predictions.map((item) => {
    const newItem = {
      ...item,
      predictionScore: item.predictionScore.split("-").map((item) => +item),
    };
    return newItem;
  });
  const sortedPredictions = [...splittedPredictions].sort(
    (a, b) =>
      a.predictionScore[0] - b.predictionScore[0] ||
      a.predictionScore[1] - b.predictionScore[1],
  );
  const joinedPredictions = sortedPredictions.map((item) => ({
    ...item,
    predictionScore: item.predictionScore.join("-"),
  }));
  return joinedPredictions;
};
export const defineTableScoreParams = (rawPredictions) => {
  const predictions = getSortedPredictions(rawPredictions);
  const maxCount = Math.ceil(predictions.length / 2);
  const tableFontSize = maxCount < 7 ? "14px" : maxCount < 9 ? "12px" : "10px";
  const dividedPredicitions = divider(predictions);
  return { tableFontSize, dividedPredicitions };
};
