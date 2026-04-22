export const findSimplifiedTeamId = (simpTeams, teamName) => {
  const foundedTeam = simpTeams.find((item) => item.title === teamName);
  return foundedTeam?.id;
};
