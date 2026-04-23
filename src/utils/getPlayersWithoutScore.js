export const getPlayersWithoutScore = (allPlayers, predictions) => {
  let neededPlayers = [];
  allPlayers.forEach((player) => {
    if (!predictions.some((item) => item.playerId === player.id)) {
      neededPlayers = [...neededPlayers, player.playerName];
    }
  });
  return neededPlayers;
};
