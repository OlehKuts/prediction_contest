import { ProgressItem } from "components/players/ProgressItem";

export const ProgressList = ({
  ratingName,
  maxValue,
  sortedPlayers,
  ratingType,
}) => {
  return (
    <div className="progressList">
      <div className="ratingName">
        <h6>Рейтинг за {ratingName}</h6>
      </div>

      {sortedPlayers.length ? (
        <>
          {sortedPlayers.map((item, idx) => (
            <ProgressItem
              key={item.id}
              rank={idx + 1}
              maxValue={maxValue}
              player={item}
              type={ratingType}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};
