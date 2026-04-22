export const createGroups = (teamList = []) => {
  let groups = [];
  teamList.forEach((item) => {
    const groupName = `Group ${item.groupName}`;
    const currentTeam = item;
    const value = { groupName, teams: [item] };
    const newGroup = [value];
    if (!groups.some((item) => item.groupName === groupName)) {
      groups = [...groups, ...newGroup];
    } else {
      groups = [...groups].map((item) =>
        item.groupName === groupName
          ? { ...item, teams: [...item.teams, currentTeam] }
          : item,
      );
    }
  });
  const alphabetGroups = [...groups].sort((a, b) =>
    a.groupName.localeCompare(b.groupName),
  );
  return alphabetGroups;
};
export const createPlayoffSections = (games = []) => {
  let sections = [];
  games.forEach((item) => {
    const sectionName = item.stage;
    const { homeTeamName, awayTeamName, finalScore, additionalScore, id } =
      item;
    const gameData = {
      homeTeamName,
      awayTeamName,
      finalScore,
      additionalScore,
      id,
    };
    const newSection = { sectionName, games: [gameData] };
    if (!sections.some((item) => item.sectionName === sectionName)) {
      sections = [...sections, newSection];
    } else {
      sections = [...sections].map((item) =>
        item.sectionName === sectionName
          ? { ...item, games: [...item.games, gameData] }
          : item,
      );
    }
  });
  return sections;
};
export const getNumbersArray = (floor = 1, ceiling = 10) => {
  let newArr = [];
  for (let index = floor; index < ceiling + 1; index++) {
    newArr = [...newArr, index];
  }
  return newArr;
};
