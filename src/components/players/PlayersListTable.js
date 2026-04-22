import { PlayerItem } from "components/players/PlayerItem";
import Table from "react-bootstrap/Table";

export const PlayersListTable = ({ displayedPlayers }) => {
  return (
    <div>
      {displayedPlayers.length ? (
        <>
          <Table
            striped
            bordered
            hover
            className="text-center participantsTable"
          >
            <thead>
              <tr className="orderMuted">
                <th>#</th>
                <th>Учасник</th>
                <th>Депозит, ₴</th>
                <th>На балансі, ₴</th>
              </tr>
            </thead>
            <tbody>
              {displayedPlayers.map((item, idx) => (
                <PlayerItem player={item} rank={idx + 1} key={item.id} />
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <div>Поки немає учасників...</div>
      )}
    </div>
  );
};
