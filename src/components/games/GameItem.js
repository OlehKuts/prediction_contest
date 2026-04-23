import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {
  AwardFill,
  PatchQuestionFill,
  DatabaseFillCheck,
} from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { useEffect, useMemo, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFinalScore,
  removeGame,
  addPrediction,
  setCurrentJackpot,
  selectCurrentJackpot,
  selectUncompletedGames,
} from "store/gameSlice";
import { checkScore } from "utils/checkScore";
import { applyGameChanges, selectTeamById } from "store/teamSlice";
import { defineTeamUpdates } from "utils/defineTeamUpdates";
import { playerItemVisibilities } from "initialData/basicData";
import {
  applyPredict,
  evaluatePrediction,
  getPlayersFromStorage,
  selectAllPlayers,
  selectPlayerById,
} from "store/playerSlice";
import Table from "react-bootstrap/Table";
import { definePlayer } from "utils/definePlayer";
import { store } from "store/store";
import { definePlayerUpdates } from "utils/definePlayerUpdates";
import { defineTableScoreParams } from "utils/defineTableScoreParams";
import { getPlayersWithoutScore } from "utils/getPlayersWithoutScore";

export const GameItem = ({
  game,
  eventKey,
  displayAlert,
  currentPlayerId,
  depositSizes,
  updateCurrentPlayer,
}) => {
  const {
    id,
    homeTeamName,
    awayTeamName,
    finalScore,
    gameNumber,
    stage,
    homeTeamId,
    awayTeamId,
    predictions,
    gamePot,
  } = game;
  const currentJackpot = useSelector(selectCurrentJackpot);
  const uncompletedGames = useSelector(selectUncompletedGames);
  const isGameTheNearest = id === uncompletedGames[0]?.id ? true : false;
  const nearestPot = gamePot + currentJackpot;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [visibilities, setVisibilities] = useState(playerItemVisibilities);
  const { allPredictionsBlock, predictionBlock, finalScoreBlock } =
    visibilities;
  const [score, setScore] = useState("");
  const [newAdditionalScore, setNewAdditionalScore] = useState("");
  const [newPredictionScore, setNewPreditctionScore] = useState("");
  const selectedPlayer = useSelector((state) =>
    selectPlayerById(state, currentPlayerId),
  );
  const allPlayers = selectAllPlayers(store.getState());
  const scorelessPlayers = getPlayersWithoutScore(allPlayers, predictions);
  const dispatch = useDispatch();

  const homeSelected = useSelector((state) =>
    selectTeamById(state, homeTeamId),
  );
  const awaySelected = useSelector((state) =>
    selectTeamById(state, awayTeamId),
  );
  const onChangeFinalScore = () => {
    if (!checkScore(score)) {
      displayAlert(
        'Неправильний формат рахунку. Правильний, наприклад: "2-1"',
        "danger",
      );
      return;
    }
    const newJackpotValue = predictions.some(
      (item) => item.predictionScore === score,
    )
      ? 0
      : nearestPot;
    dispatch(
      changeFinalScore({
        id,
        changes: {
          finalScore: score,
          additionalScore: newAdditionalScore,
          gamePot: gamePot + currentJackpot,
        },
      }),
    );
    if (stage === "group") {
      const updates = defineTeamUpdates(score, homeSelected, awaySelected);
      dispatch(applyGameChanges(updates));
    }
    dispatch(
      evaluatePrediction(
        definePlayerUpdates(score, predictions, allPlayers, nearestPot),
      ),
    ); //
    dispatch(setCurrentJackpot(newJackpotValue));
    displayAlert("Рахунок матчу збережено!", "success");
    setScore("");
  };
  const onAddPrediction = () => {
    if (!checkScore(newPredictionScore)) {
      displayAlert(
        'Неправильний формат рахунку. Правильний, наприклад: "2-1"',
        "danger",
      );
      return;
    }
    if (selectedPlayer.balance < depositSizes[stage]) {
      displayAlert("Недостатньо коштів на балансі. Внесіть депозит!", "danger");
      return;
    }
    const newPrediction = {
      predictionScore: newPredictionScore,
      playerId: currentPlayerId,
    };
    dispatch(
      addPrediction({
        id,
        changes: {
          predictions: predictionDone
            ? predictions.map((item) =>
                item.playerId === currentPlayerId ? newPrediction : item,
              )
            : [...predictions, newPrediction],
          gamePot: predictionDone ? gamePot : gamePot + depositSizes[stage],
        },
      }),
    );
    dispatch(
      applyPredict({
        id: currentPlayerId,
        changes: {
          balance: predictionDone
            ? selectedPlayer.balance
            : selectedPlayer.balance - depositSizes[stage],
        },
      }),
    );
    updateCurrentPlayer(depositSizes[stage]);
    displayAlert("Прогноз зараховано!");
    setVisibilities(playerItemVisibilities);
    setNewPreditctionScore("");
  };
  const { tableFontSize, dividedPredicitions } =
    defineTableScoreParams(predictions);
  const predictionDone = useMemo(() => {
    return predictions.some((item) => item.playerId === currentPlayerId);
  }, [currentPlayerId, predictions]);
  return (
    <>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header className="accHeader" title={`Гра № ${gameNumber}`}>
          <div className="accordItemHome">{homeTeamName} </div>
          <div className="finalScoreDiv">
            {finalScore ? (
              <span>
                {finalScore}
                {newAdditionalScore}
              </span>
            ) : (
              <PatchQuestionFill
                color={predictionDone ? "dimgray" : "purple"}
                size={20}
              />
            )}
          </div>
          <div className="accordItemAway">{awayTeamName}</div>
        </Accordion.Header>
        <Accordion.Body className="accBody">
          <div className="visibilityBtnsLine">
            {!finalScore ? (
              <>
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    setVisibilities({
                      ...playerItemVisibilities,
                      finalScoreBlock: true,
                    })
                  }
                >
                  Фінальний результат
                </Button>
                <Button
                  disabled={currentPlayerId === 1}
                  variant={`outline-${predictionDone ? "warning" : "success"}`}
                  onClick={() =>
                    setVisibilities({
                      ...playerItemVisibilities,
                      predictionBlock: true,
                    })
                  }
                >
                  {predictionDone ? "Змінити прогноз" : "Додати прогноз"}
                </Button>
              </>
            ) : null}
            <Button
              variant="outline-info"
              onClick={() =>
                setVisibilities({
                  ...playerItemVisibilities,
                  allPredictionsBlock: true,
                })
              }
            >
              Дивитися прогнози
            </Button>
            <Button onClick={handleShow} variant="outline-danger">
              Видалити матч
            </Button>
          </div>
          {finalScoreBlock && !finalScore ? (
            <>
              <div className="setScoreLine">
                <label htmlFor="">Фінальний рахунок</label>
                <input
                  onChange={(e) => setScore(e.target.value)}
                  value={score}
                />
                {stage !== "group" ? (
                  <input
                    onChange={(e) => setNewAdditionalScore(e.target.value)}
                    value={newAdditionalScore}
                    placeholder="фін. результат"
                  />
                ) : null}

                <Button variant="outline-success" onClick={onChangeFinalScore}>
                  Зберегти
                </Button>
              </div>
            </>
          ) : null}
          {predictionBlock ? (
            <>
              <div className="setScoreLine">
                <label htmlFor="newPrediction">Прогноз</label>
                <input
                  type="text"
                  value={newPredictionScore}
                  onChange={(e) => setNewPreditctionScore(e.target.value)}
                />
                <Button variant="success" onClick={onAddPrediction}>
                  Підтвердити
                </Button>
              </div>
            </>
          ) : null}
          {allPredictionsBlock ? (
            <>
              <div>
                <div className="allGamePredictions">
                  <h6
                    title={`${
                      scorelessPlayers.length
                        ? `Не зробили прогноз: ${scorelessPlayers.join(",")}`
                        : ""
                    }`}
                  >
                    Прогнози ({predictions.length}/{allPlayers.length})
                  </h6>
                  <h6>
                    {homeTeamName} - {awayTeamName}
                  </h6>
                  <Table
                    striped
                    bordered
                    hover
                    style={{ fontSize: tableFontSize }}
                  >
                    <tbody>
                      <tr>
                        {dividedPredicitions[0].length ? (
                          <>
                            {dividedPredicitions[0].map((item) => (
                              <td key={item.playerId}>
                                {
                                  definePlayer(allPlayers, item.playerId)
                                    .playerName
                                }
                              </td>
                            ))}{" "}
                          </>
                        ) : null}
                      </tr>
                      <tr>
                        {dividedPredicitions[0].length ? (
                          <>
                            {dividedPredicitions[0].map((item) => (
                              <td key={item.playerId}>
                                {item.predictionScore}{" "}
                                {item.predictionScore === finalScore ? (
                                  <AwardFill
                                    color="goldenRod"
                                    style={{ margin: "0px 5px 2px 0px" }}
                                  />
                                ) : null}
                              </td>
                            ))}{" "}
                          </>
                        ) : null}
                      </tr>
                      <tr>
                        {dividedPredicitions[1].length ? (
                          <>
                            {dividedPredicitions[1].map((item) => (
                              <td key={item.playerId}>
                                {
                                  definePlayer(allPlayers, item.playerId)
                                    .playerName
                                }
                              </td>
                            ))}{" "}
                          </>
                        ) : null}
                      </tr>
                      <tr>
                        {dividedPredicitions[1].length ? (
                          <>
                            {dividedPredicitions[1].map((item) => (
                              <td key={item.playerId}>
                                {item.predictionScore}
                                {item.predictionScore === finalScore ? (
                                  <AwardFill
                                    color="goldenRod"
                                    style={{ margin: "0px 5px 2px 0px" }}
                                  />
                                ) : null}
                              </td>
                            ))}{" "}
                          </>
                        ) : null}
                      </tr>
                    </tbody>
                  </Table>
                  <div>
                    {" "}
                    <DatabaseFillCheck
                      color="goldenRod"
                      style={{ margin: "0px 10px 5px 0px", cursor: "pointer" }}
                      title="Джекпот матчу"
                    />
                    Джек-пот матчу:{" "}
                    {isGameTheNearest ? gamePot + currentJackpot : gamePot} грн
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </Accordion.Body>
      </Accordion.Item>{" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Видалення матчу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Alert variant="danger">
              Ви дійсно бажаєте видалити матч №{gameNumber} за участю команд{" "}
              <br />
              {homeTeamName} і {awayTeamName}?
            </Alert>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={() => {
              dispatch(removeGame(id));
              handleClose();
              displayAlert("Матч було видалено!", "info");
            }}
          >
            Видалити
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Відміна
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
