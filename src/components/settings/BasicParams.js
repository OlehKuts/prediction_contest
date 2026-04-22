import { useState } from "react";
import { Valentine } from "react-bootstrap-icons";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { tournamentStages } from "initialData/basicData";
import { getAreaRowsCount } from "utils/getAreaRowsCount";

export const BasicParams = ({ settings, handleNewSettings }) => {
  const [newSettings, setNewSettings] = useState({
    contestName: settings.contestName,
    rules: settings.rules,
    depositSizes: settings.depositSizes,
  });
  const { rules, contestName, depositSizes } = newSettings;
  return (
    <>
      <Card className="settings">
        <Card.Header>
          <strong>Базові параметри</strong>
        </Card.Header>
        <ListGroup className="text-center">
          <ListGroup.Item className="justify-content-center text-center">
            <label htmlFor="contestName">Назва турніру</label>
            <input
              style={{ margin: "0 auto" }}
              name="contestName"
              value={contestName}
              onChange={(e) =>
                setNewSettings((prev) => ({
                  ...prev,
                  contestName: e.target.value,
                }))
              }
            />
          </ListGroup.Item>
          <ListGroup.Item>Внески за матч, грн</ListGroup.Item>
          <div id="depositLine">
            {tournamentStages.map(({ value, stageName }) => (
              <div key={value}>
                {" "}
                <label htmlFor={value}>{stageName}</label>
                <input
                  style={{ margin: "0 auto", width: "50px" }}
                  min={1}
                  step={1}
                  name={value}
                  value={depositSizes[value]}
                  onChange={(e) =>
                    setNewSettings((prev) => ({
                      ...prev,
                      depositSizes: {
                        ...prev.depositSizes,
                        [value]: +e.target.value,
                      },
                    }))
                  }
                />
              </div>
            ))}
          </div>

          <ListGroup.Item>
            <label htmlFor="rules">Правила конкурсу</label>
            <textarea
              rows={Math.ceil(getAreaRowsCount(rules.length, 15))}
              name="rules"
              value={rules}
              onChange={(e) =>
                setNewSettings((prev) => ({
                  ...prev,
                  rules: e.target.value,
                }))
              }
            />
          </ListGroup.Item>
        </ListGroup>
        <Card.Footer style={{ width: "100%" }}>
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              handleNewSettings(newSettings);
              // displayAlert("Налаштування успішно змінено!", "success");
            }}
          >
            Змінити налаштування
          </button>
        </Card.Footer>
      </Card>
    </>
  );
};
