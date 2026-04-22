import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { selectAllPlayers } from "store/playerSlice";
import { store } from "store/store";
import { definePlayer } from "utils/definePlayer";
import { useSelector } from "react-redux";
import { selectUncompletedGames } from "store/gameSlice";
import Badge from "react-bootstrap/Badge";
import { getUnpredictedGamesCount } from "utils/getUnpredictedGamesCount";
import Avatar from "components/Avatar";

export const CurrentPlayerCard = ({
  currentPlayer,
  onChangePlayer,
  displayAlert,
}) => {
  const { playerName, balance, id, avatarName } = currentPlayer;
  const [showChangingLine, setShowChangingLine] = useState(false);
  const [newPlayerId, setNewPlayerId] = useState("");
  const playersList = selectAllPlayers(store.getState());
  const uncompletedGames = useSelector(selectUncompletedGames);
  const toAddPredictCount = getUnpredictedGamesCount(id, uncompletedGames);
  const sendPlayer = () => {
    if (id === newPlayerId || !newPlayerId) return;
    const newPlayer = definePlayer(playersList, newPlayerId);
    onChangePlayer(newPlayer);
    displayAlert("Змінено", "success");
    setShowChangingLine(false);
  };
  return (
    <>
      <Card className="text-center currentPlayerCard">
        <Card.Header>Поточний гравець</Card.Header>
        <Card.Body>
          <Card.Text>
            <Avatar seed={avatarName} size={96} />
          </Card.Text>
          <Card.Title>
            {" "}
            <span style={{ marginLeft: "10px" }}>
              {id === 1 ? "Оберіть гравця" : playerName}{" "}
            </span>
          </Card.Title>
          <Card.Text>
            <span className="currentPlayerSpan">Матчі без прогнозу: </span>
            <Badge bg={toAddPredictCount ? "danger" : "success"}>
              {toAddPredictCount}
            </Badge>
          </Card.Text>
          <Card.Text>
            <span className="currentPlayerSpan">Матчі в доступі: </span>
            <Badge>{uncompletedGames.length}</Badge>
          </Card.Text>
          {!showChangingLine ? (
            <Button
              variant="outline-primary"
              onClick={() => setShowChangingLine(true)}
            >
              Змінити гравця
            </Button>
          ) : (
            <div>
              <select
                onChange={(e) => setNewPlayerId(e.target.value)}
                className="playersSelect"
              >
                <option value="">Оберіть гравця</option>
                {playersList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.playerName}
                  </option>
                ))}
              </select>
              <Button
                variant="outline-success"
                onClick={sendPlayer}
                className="changePlayerBtn"
              >
                Змінити
              </Button>
            </div>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">Баланс: {balance} грн</Card.Footer>
      </Card>
    </>
  );
};
