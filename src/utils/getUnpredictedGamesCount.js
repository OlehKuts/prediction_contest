export const getUnpredictedGamesCount = (playerId, comingGames) => {
  let freeGamesCount = 0;
  comingGames.forEach((element) => {
    if (!element.predictions.some((item) => item.playerId === playerId)) {
      freeGamesCount++;
    }
  });
  return freeGamesCount;
};
