export const separateAvailableNumbers = (
  allNumbers = [1],
  forbiddenNumbers = [1],
) => {
  let finalNumbers = [];
  allNumbers.forEach((element) => {
    if (!forbiddenNumbers.includes(element)) {
      finalNumbers = [...finalNumbers, element];
    }
  });
  return finalNumbers;
};
