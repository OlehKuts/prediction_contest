import { nanoid } from "@reduxjs/toolkit";
import { ListGroup } from "react-bootstrap";
import { tournamentStages } from "initialData/basicData";
import { definePlayoffWinner } from "utils/definePointsfromScore";

export const PlayoffSection = ({ section }) => {
  const { sectionName, games } = section;
  const neededSectionName = tournamentStages.find(
    (item) => item.value === sectionName,
  ).stageName;
  return (
    <div
      className={`${sectionName !== "final" && sectionName !== "thirdPlaceGame" ? "playoffSectionContainer" : "finalStage"}`}
    >
      <div className="sectionName">
        <h5>{neededSectionName}</h5>
        <hr />
      </div>
      <div className="playoffSectionGames">
        {games.map(
          ({ homeTeamName, awayTeamName, finalScore, additionalScore }) => (
            <ListGroup key={nanoid()} horizontal className="w-75 mr-3">
              <ListGroup.Item
                className={`flex-fill text-center w-50 ${homeTeamName.length > 10 ? "smallerFont" : ""}`}
                variant={
                  !finalScore
                    ? ""
                    : finalScore &&
                        definePlayoffWinner(finalScore, additionalScore) ===
                          "home"
                      ? "success"
                      : "danger"
                }
              >
                {homeTeamName}
              </ListGroup.Item>
              <ListGroup.Item
                className={`flex-fill text-center ${additionalScore ? "w-50 smallerFont pt-2" : "w-25"}`}
              >
                {finalScore}
                {additionalScore ? ` (${additionalScore})` : ""}
              </ListGroup.Item>
              <ListGroup.Item
                className={`flex-fill text-center w-50 ${awayTeamName.length > 10 ? "smallerFont" : ""}`}
                variant={
                  !finalScore
                    ? ""
                    : finalScore &&
                        definePlayoffWinner(finalScore, additionalScore) ===
                          "away"
                      ? "success"
                      : "danger"
                }
              >
                {awayTeamName}
              </ListGroup.Item>
            </ListGroup>
          ),
        )}
      </div>
    </div>
  );
};
