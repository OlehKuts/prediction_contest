import {
  createSlice,
  // createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const gameAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.gameNumber - b.gameNumber,
});
const initialState = gameAdapter.getInitialState({
  currentJackpot: 0,
});

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addGame: (state, { payload }) => {
      gameAdapter.addOne(state, payload);
    },
    removeGame: (state, { payload }) => {
      gameAdapter.removeOne(state, payload);
    },
    getGameFromStorage: (state, { payload }) => {
      gameAdapter.setAll(state, payload);
    },
    changeFinalScore: (state, { payload }) => {
      gameAdapter.updateOne(state, payload);
    },
    addPrediction: (state, { payload }) => {
      gameAdapter.updateOne(state, payload);
    },
    setCurrentJackpot: (state, { payload }) => {
      state.currentJackpot = payload;
    },
  },
});
// selectors
export const { selectAll: selectAllGames, selectById: selectGameById } =
  gameAdapter.getSelectors((state) => state.games);

export const selectPlayoffGames = createSelector(selectAllGames, (games) =>
  games.filter((item) => item.stage !== "group"),
);
export const selectCurrentJackpot = (state) => state.games.currentJackpot;

export const selectGameNumbers = createSelector(selectAllGames, (games) =>
  games.map((item) => item.gameNumber),
);

export const selectUncompletedGames = createSelector(selectAllGames, (games) =>
  games.length ? games.filter((item) => !item.finalScore) : [],
);
export const selectFinishedGames = createSelector(selectAllGames, (games) =>
  games.length ? games.filter((item) => item.finalScore) : [],
);
export const selectNearestGamePot = createSelector(
  [selectUncompletedGames, selectCurrentJackpot],
  (games, currentPot) => (games.length ? games[0].gamePot + currentPot : 0),
);
const selectActiveFilter = (state) => state.filters.activeGameFilter;
export const filterGameSelector = createSelector(
  [
    selectActiveFilter,
    selectAllGames,
    selectUncompletedGames,
    selectFinishedGames,
  ],
  (activeFilter, allGames, uncompletedGames, finishedGames) =>
    activeFilter === "all"
      ? allGames
      : activeFilter === "uncompleted"
        ? uncompletedGames
        : finishedGames.reverse(),
);

const { actions, reducer } = gameSlice;

export default reducer;
export const {
  addGame,
  removeGame,
  getGameFromStorage,
  changeFinalScore,
  addPrediction,
  setCurrentJackpot,
} = actions;
