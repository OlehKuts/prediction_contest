import { definePointsFromScore } from "utils/definePointsfromScore";

export const defineTeamUpdates = (score, homeTeam, awayTeam) => {
  const scoreAsArray = score.split("-").map((item) => +item);
  const pointsArray = definePointsFromScore(scoreAsArray);
  const homeTeamData = {
    id: homeTeam.id,
    changes: {
      goalsScored: homeTeam.goalsScored + scoreAsArray[0],
      goalsMissed: homeTeam.goalsMissed + scoreAsArray[1],
      groupPoints: homeTeam.groupPoints + pointsArray[0],
    },
  };
  const awayTeamData = {
    id: awayTeam.id,
    changes: {
      goalsScored: awayTeam.goalsScored + scoreAsArray[1],
      goalsMissed: awayTeam.goalsMissed + scoreAsArray[0],
      groupPoints: awayTeam.groupPoints + pointsArray[1],
    },
  };
  return [homeTeamData, awayTeamData];
};
