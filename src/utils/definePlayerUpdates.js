export const definePlayerUpdates = (
  finalScore,
  predictions,
  players,
  gamePot,
) => {
  const successfulPlayersIds = predictions
    .filter((item) => item.predictionScore === finalScore)
    .map((item) => item.playerId);
  const playerPot = successfulPlayersIds.length
    ? Math.floor(gamePot / successfulPlayersIds.length)
    : 0;
  let successfulPlayers = [];
  players.forEach((element) => {
    if (successfulPlayersIds.some((item) => item === element.id)) {
      successfulPlayers = [...successfulPlayers, element];
    }
  });
  const updates = successfulPlayers.length
    ? successfulPlayers.map((item) => ({
        id: item.id,
        changes: {
          income: item.income + playerPot,
          exactPredictions: item.exactPredictions + 1,
          balance: item.balance + playerPot,
        },
      }))
    : [];
  // structure item {id, income, exactPredictions, balance}
  return updates;
};
