import Table from "react-bootstrap/Table";
import { TeamTableItem } from "./TeamTableItem";

export const GroupTable = ({ groupData }) => {
  const { groupName, teams } = groupData;

  return (
    <div className="group">
      <div>{groupName}</div>
      <Table striped bordered hover className="text-center groupTable">
        <thead>
          <tr>
            <th>#</th>
            <th>
              {" "}
              <span
                className="fi fi-xx"
                style={{ padding: "6px 6px 0px 6px" }}
              ></span>
            </th>
            <th>Збірна</th>
            <th>Очки</th>
            <th>Р-ця голів</th>
          </tr>
        </thead>
        <tbody>
          {teams.length ? (
            <>
              {teams.map((item, idx) => (
                <TeamTableItem key={item.id} team={item} idx={idx} />
              ))}
            </>
          ) : null}
        </tbody>
      </Table>
    </div>
  );
};
