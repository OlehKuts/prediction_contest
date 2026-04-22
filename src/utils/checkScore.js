export const checkScore = (score) => {
  const scoreRegExp = /\d-\d/;
  return scoreRegExp.test(score);
};
