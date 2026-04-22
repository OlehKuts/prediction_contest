import { useState } from "react";
import Button from "react-bootstrap/Button";
import { PersonAdd } from "react-bootstrap-icons";
import { AddPlayerForm } from "components/players/AddPlayerForm";
import {
  removeAllPlayers,
  selectAllPlayers,
  selectBestIncome,
  selectBestPredictionsCount,
  selectSortedByExactPredictionsPlayers,
} from "store/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { PlayersListTable } from "components/players/PlayersListTable";
import { store } from "store/store";
import { ProgressList } from "components/players/ProgressList";

export const PlayersTables = ({ displayAlert, onChangePlayer }) => {
  const [showForm, setShowForm] = useState(false);
  const handleClose = () => setShowForm(false);
  const handleShow = () => setShowForm(true);
  const dispatch = useDispatch();
  const selectedPlayers = selectAllPlayers(store.getState());
  const sortedPlayers = useSelector(selectSortedByExactPredictionsPlayers);
  const bestIncome = useSelector(selectBestIncome);
  const bestPredictionsCount = useSelector(selectBestPredictionsCount);
  return (
    <>
      <div className="playersTables">
        <Button
          variant="outline-success"
          onClick={handleShow}
          className="addPlayer"
        >
          Додати прогнозиста{" "}
          <PersonAdd size={20} color="cornflowerblue" className="personAdd" />
        </Button>
        <div className="ratingsContainer">
          <ProgressList
            ratingName={"виграшем"}
            maxValue={bestIncome}
            sortedPlayers={selectedPlayers}
            ratingType={"income"}
          />
          <ProgressList
            ratingName={"точними прогнозами"}
            maxValue={bestPredictionsCount}
            sortedPlayers={sortedPlayers}
            ratingType={"exactPredictions"}
          />
        </div>

        <hr />
        <h6>Перелік учасників</h6>
        <PlayersListTable displayedPlayers={selectedPlayers} />
        <AddPlayerForm
          show={showForm}
          handleClose={handleClose}
          displayAlert={displayAlert}
          onChangePlayer={onChangePlayer}
        />
      </div>
    </>
  );
};
