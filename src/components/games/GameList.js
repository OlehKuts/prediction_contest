import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { AddGameForm } from "components/games/AddGameForm";
import { GameItem } from "components/games/GameItem";
import {
  filterGameSelector,
  selectAllGames,
  selectUncompletedGames,
} from "store/gameSlice";
import { store } from "store/store";
import Accordion from "react-bootstrap/Accordion";
import { CurrentPlayerCard } from "components/games/CurrentPlayerCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { applyFilter } from "store/filterSlice";
import { LeadersCard } from "components/players/LeadersCard";
import {
  selectTopPlayersByIncome,
  selectTopPlayersByPredictions,
} from "store/playerSlice";
import { filters } from "initialData/basicData";

export const GameList = ({
  displayAlert,
  currentPlayer,
  onChangePlayer,
  depositSizes,
  updateCurrentPlayer,
}) => {
  const [show, setShow] = useState(false);
  const filteredGames = useSelector(filterGameSelector);
  const { activeGameFilter: activeFilter } = useSelector(
    (state) => state.filters,
  );
  const topIncomePlayers = useSelector(selectTopPlayersByIncome);
  const topPredictionPlayers = useSelector(selectTopPlayersByPredictions);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  return (
    <>
      {currentPlayer ? (
        <CurrentPlayerCard
          currentPlayer={currentPlayer}
          onChangePlayer={onChangePlayer}
          displayAlert={displayAlert}
        />
      ) : null}
      <div className="leadersInfo">
        <LeadersCard topPlayers={topIncomePlayers} cardName="виграшем" />
        <LeadersCard
          topPlayers={topPredictionPlayers}
          cardName="точними прогнозами"
        />
      </div>
      <div className="gameList">
        <Button
          variant="outline-primary"
          onClick={handleShow}
          className="addMatch"
        >
          Додати матч
        </Button>
        <div className="filtersLine">
          {filters.map((item) => (
            <Button
              key={item.id}
              onClick={() => dispatch(applyFilter(item.value))}
              variant={`${activeFilter === item.value ? "info" : "outline-info"}`}
            >
              {item.uaName}
            </Button>
          ))}
        </div>
        <hr />
        <AddGameForm
          show={show}
          handleClose={handleClose}
          displayAlert={displayAlert}
        />
        {filteredGames.length ? (
          <Accordion defaultkey={"0"} style={{ width: "90%" }}>
            {filteredGames.map((item) => (
              <GameItem
                game={item}
                key={item.id}
                eventKey={item.id}
                displayAlert={displayAlert}
                currentPlayerId={currentPlayer.id}
                depositSizes={depositSizes}
                updateCurrentPlayer={updateCurrentPlayer}
              />
            ))}
          </Accordion>
        ) : (
          <div>Поки немає ігор в календарі</div>
        )}
      </div>
    </>
  );
};
