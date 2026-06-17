// const divider = (arr) => {
//   const maxCount = Math.ceil(arr.length / 2);
//   const doubleArray = arr.reduce(
//     (acc, current) => {
//       return acc[0].length < maxCount
//         ? [[...acc[0], current], acc[1]]
//         : [acc[0], [...acc[1], current]];
//     },
//     [[], []],
//   );
//   return doubleArray;
// };

const chunkIntoFour = (arr) => {
  const result = [];
  const totalLength = arr.length;
  const baseSize = Math.floor(totalLength / 4);
  let remainder = totalLength % 4;
  let currentIndex = 0;
  for (let i = 0; i < 4; i++) {
    const currentSize = baseSize + (remainder > 0 ? 1 : 0);
    remainder--;
    result.push(arr.slice(currentIndex, currentIndex + currentSize));
    currentIndex += currentSize;
  }
  return result;
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
  const dividedPredicitions = chunkIntoFour(predictions);
  return { tableFontSize, dividedPredicitions };
};
