import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const playerAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.income - a.income,
});
const initialState = playerAdapter.getInitialState({});

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, { payload }) => {
      playerAdapter.addOne(state, payload);
    },
    getPlayersFromStorage: (state, { payload }) => {
      playerAdapter.setAll(state, payload);
    },
    removePlayer: (state, { payload }) => {
      playerAdapter.removeOne(state, payload);
    },
    changePlayer: (state, { payload }) => {
      playerAdapter.updateOne(state, payload);
    },
    applyPredict: (state, { payload }) => {
      playerAdapter.updateOne(state, payload);
    },
    evaluatePrediction: playerAdapter.updateMany,
    removeAllPlayers: playerAdapter.removeAll,
  },
});

export const { selectAll: selectAllPlayers, selectById: selectPlayerById } =
  playerAdapter.getSelectors((state) => state.players);
// createSelector
export const selectTotalBalance = createSelector(selectAllPlayers, (players) =>
  players.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.deposit;
  }, 0),
);
export const selectSortedByExactPredictionsPlayers = createSelector(
  selectAllPlayers,
  (players) =>
    [...players].sort((a, b) => b.exactPredictions - a.exactPredictions),
);
export const selectBestIncome = createSelector(
  selectAllPlayers,
  (players) => players[0]?.income || 0,
);
export const selectBestPredictionsCount = createSelector(
  selectSortedByExactPredictionsPlayers,
  (sortedPlayers) => sortedPlayers[0]?.exactPredictions || 0,
);
export const selectTopPlayersByIncome = createSelector(
  selectAllPlayers,
  (players) => players.filter((item, idx) => idx < 3),
);
export const selectTopPlayersByPredictions = createSelector(
  selectSortedByExactPredictionsPlayers,
  (players) => players.filter((item, idx) => idx < 3),
);
const { actions, reducer } = playerSlice;

export default reducer;
export const {
  addPlayer,
  getPlayersFromStorage,
  removePlayer,
  removeAllPlayers,
  changePlayer,
  applyPredict,
  evaluatePrediction,
} = actions;
