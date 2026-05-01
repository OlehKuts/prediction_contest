import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { initialTeams } from "initialData/basicData";

const teamAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    b.groupPoints - a.groupPoints ||
    b.goalsScored - b.goalsMissed - (a.goalsScored - a.goalsMissed) ||
    b.goalsScored - a.goalsScored,
});
const filledState = teamAdapter.upsertMany(
  teamAdapter.getInitialState(),
  initialTeams,
);

const teamSlice = createSlice({
  name: "teams",
  initialState: filledState,
  reducers: {
    getTeamsFromStorage: (state, { payload }) => {
      teamAdapter.setAll(state, payload);
    },
    setInitialTeams: (state, { payload }) => {
      teamAdapter.setAll(state, payload); // only for the development mode
    },
    changeIsQualified: (state, { payload }) => {
      teamAdapter.updateOne(state, payload);
    },
    applyGameChanges: teamAdapter.updateMany,
  },
});

export const { selectAll: selectAllTeams, selectById: selectTeamById } =
  teamAdapter.getSelectors((state) => state.teams);

export const selectSimplifiedTeams = createSelector(
  selectAllTeams,
  (allTeams) =>
    allTeams
      .map((item) => ({
        title: item.title,
        id: item.id,
        groupName: item.groupName,
      }))
      .sort((a, b) => a.groupName.localeCompare(b.groupName)),
);
export const selectAllIds = createSelector(selectAllTeams, (allTeams) =>
  allTeams.map(({ id, title }) => ({ id, title })),
);
const { actions, reducer } = teamSlice;

export default reducer;
export const {
  getTeamsFromStorage,
  applyGameChanges,
  setInitialTeams,
  changeIsQualified,
} = actions;
