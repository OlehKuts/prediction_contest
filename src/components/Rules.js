import ListGroup from "react-bootstrap/ListGroup";
export const Rules = ({ rules }) => {
  const rulesList = rules.split(".");
  return (
    <>
      <div className="rules">
        <h5>Правила конкурсу</h5>
        <hr style={{ backgroundColor: "black", margin: "5px auto" }} />
        <ListGroup as="ol" numbered>
          {rulesList.map((item, idx) => (
            <ListGroup.Item
              key={item}
              as={"li"}
              variant={idx % 2 === 0 ? "secondary" : "light"}
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
};
