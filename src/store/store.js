import { configureStore } from "@reduxjs/toolkit"; // аналог застарілог createStore()
import games from "./gameSlice";
import teams from "./teamSlice";
import players from "./playerSlice";
import filters from "./filterSlice";

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({ type: action });
  }
  return next(action);
};

export const store = configureStore({
  reducer: { games, teams, players, filters },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production", // працюватиме тільки в режимі розробки, а не в продакшн
});
