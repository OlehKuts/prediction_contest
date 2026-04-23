import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { AppNavbar } from "./components/AppNavbar";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { AppFooter } from "./components/AppFooter";
import { PlayersTables } from "./components/players/PlayersTables";
import { BackUp } from "./components/settings/BackUp";
import { TournamentBracket } from "./components/tournament/TournamentBracket";
import { GameList } from "./components/games/GameList";
import { Rules } from "./components/Rules";
import { BasicParams } from "./components/settings/BasicParams";
import { initialTeams, initSettings } from "initialData/basicData";
import { getTeamsFromStorage } from "store/teamSlice";
import { selectAllTeams } from "store/teamSlice";
import { store } from "store/store";
import {
  getGameFromStorage,
  selectAllGames,
  selectCurrentJackpot,
  setCurrentJackpot,
} from "store/gameSlice";
import { getPlayersFromStorage, selectAllPlayers } from "store/playerSlice";
import { useAlert } from "hooks/useAlert";
import Alert from "react-bootstrap/Alert";
import { initPlayer } from "initialData/basicData";

export const App = () => {
  const dispatch = useDispatch();
  const allPlayers = selectAllPlayers(store.getState());
  const [currentPlayer, setCurrentPlayer] = useLocalStorage(
    "contest_cur_player",
    initPlayer,
  );
  const onChangePlayer = (newPlayer) => {
    setCurrentPlayer(newPlayer);
  };
  const updateCurrentPlayer = (sum) => {
    setCurrentPlayer((prev) => ({ ...prev, balance: prev.balance - sum }));
  };
  const [settings, setSettings] = useLocalStorage(
    "contest_settings",
    initSettings,
  );

  const handleNewSettings = (newSettings) => {
    setSettings(() => ({
      ...newSettings,
    }));
  };
  const [showAlert, alertMessage, alertVariant, displayAlert] = useAlert();
  const [storageTeams, setStorageTeams] = useLocalStorage(
    "contest_teams",
    initialTeams,
  );
  const [storageGames, setStorageGames] = useLocalStorage("contest_games", []);
  const [storagePlayers, setStoragePlayers] = useLocalStorage(
    "contest_players",
    [],
  );
  const [storageJackpot, setStorageJackpot] = useLocalStorage(
    "storage_jackpot",
    0,
  );
  const observedTeams = useSelector((state) => state.teams);
  const observedGames = useSelector((state) => state.games);
  const observedPlayers = useSelector((state) => state.players);

  const selectedJackpot = useSelector(selectCurrentJackpot);
  useEffect(() => {
    dispatch(getTeamsFromStorage(storageTeams));
    dispatch(getGameFromStorage(storageGames));
    dispatch(getPlayersFromStorage(storagePlayers));
    dispatch(setCurrentJackpot(storageJackpot));
  }, []); // getting data after reload

  useEffect(() => {
    setStorageTeams(selectAllTeams(store.getState()));
  }, [observedTeams]); // updating in LS

  useEffect(() => {
    setStorageGames(selectAllGames(store.getState()));
    setStorageJackpot(selectedJackpot);
  }, [observedGames]);
  useEffect(() => {
    setStoragePlayers(selectAllPlayers(store.getState()));
  }, [observedPlayers]);
  useEffect(() => {
    setCurrentPlayer((previous) => {
      const updatedPlayer = allPlayers.find((item) => item.id === previous.id);
      if (!allPlayers.length) {
        return initPlayer;
      }
      return updatedPlayer ? updatedPlayer : allPlayers[0];
    });
  }, [observedPlayers]);
  return (
    <>
      <div className="App">
        {/* <button onClick={() => setCurrentPlayer(null)}>Set</button> */}
        <AppNavbar contestName={settings.contestName} />
        {showAlert ? (
          <Alert
            className={`invokedAlert ${showAlert ? "active" : ""}`}
            variant={alertVariant}
          >
            {alertMessage}
          </Alert>
        ) : null}
        <Routes>
          <Route path="/" element={<TournamentBracket />} />
          <Route
            path="/games"
            element={
              <GameList
                displayAlert={displayAlert}
                currentPlayer={currentPlayer}
                onChangePlayer={onChangePlayer}
                depositSizes={settings.depositSizes}
                updateCurrentPlayer={updateCurrentPlayer}
              />
            }
          />
          <Route
            path="/players"
            element={
              <PlayersTables
                displayAlert={displayAlert}
                onChangePlayer={onChangePlayer}
              />
            }
          />
          <Route path="/rules" element={<Rules rules={settings.rules} />} />
          <Route path="/settings">
            <Route
              path="basicParams"
              element={
                <BasicParams
                  settings={settings}
                  handleNewSettings={handleNewSettings}
                />
              }
            />
            <Route path="backUp" element={<BackUp />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <AppFooter />
    </>
  );
};

export default App;
