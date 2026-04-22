import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import { ListGroup } from "react-bootstrap";
import Avatar from "components/Avatar";
import { selectAllGames, selectFinishedGames } from "store/gameSlice";
import { store } from "store/store";

export const LeadersCard = ({ topPlayers, cardName }) => {
  const finishedGames = useSelector(selectFinishedGames);
  const gamesCount = finishedGames.length;
  return (
    <>
      <Card className="text-center leaderCard">
        <Card.Header>Лідери за {cardName}</Card.Header>
        <Card.Body>
          <ListGroup>
            {topPlayers.map(
              ({ playerName, avatarName, id, income, exactPredictions }) => (
                <ListGroup.Item key={id}>
                  <div className="leaderItemLine">
                    <Avatar seed={avatarName} size={32} />
                    <span>{playerName}</span>
                    <span>
                      <Badge
                        bg={cardName === "виграшем" ? "success" : "primary"}
                      >
                        {cardName === "виграшем" ? income : exactPredictions}
                      </Badge>
                    </span>
                  </div>{" "}
                </ListGroup.Item>
              ),
            )}
          </ListGroup>
        </Card.Body>
        <Card.Footer className="text-muted">
          Зіграно {gamesCount} з 104 матчів
        </Card.Footer>
      </Card>
    </>
  );
};
