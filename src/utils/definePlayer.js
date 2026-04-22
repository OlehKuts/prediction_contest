export const definePlayer = (players, id) => {
  const foundPlayer = players.find((item) => item.id === id);
  return foundPlayer;
};
