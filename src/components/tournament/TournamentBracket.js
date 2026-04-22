import { GroupTable } from "./GroupTable";
import { createGroups, createPlayoffSections } from "utils/utils";
import { selectAllTeams } from "store/teamSlice";
import { store } from "store/store";
import { useSelector } from "react-redux";
import { selectPlayoffGames } from "store/gameSlice";
import { PlayoffSection } from "components/tournament/PlayoffSections";

export const TournamentBracket = () => {
  const selectedTeams = selectAllTeams(store.getState());
  const groups = createGroups(selectedTeams);
  const playoffGames = useSelector(selectPlayoffGames);
  const sections = createPlayoffSections(playoffGames);
  return (
    <>
      <div className="tournamentBracket">
        <div>
          <h5>Груповий етап</h5>
        </div>
        <div className="groupTables">
          {groups.map((item) => (
            <GroupTable key={item.groupName} groupData={item} />
          ))}
        </div>
        <div>
          <h5>Плей-офф</h5>
        </div>
        <div>
          {sections.map((item, idx) => (
            <PlayoffSection section={item} key={item?.sectionName || idx} />
          ))}
        </div>
      </div>
    </>
  );
};
