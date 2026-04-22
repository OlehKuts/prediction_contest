import { createSlice } from "@reduxjs/toolkit";

const initialState = { activeGameFilter: "all" };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    applyFilter: (state, { payload }) => {
      state.activeGameFilter = payload;
    },
  },
});

const { actions, reducer } = filterSlice;

export default reducer;
export const { applyFilter } = actions;
