import Avatar from "components/Avatar";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import { progressBarVariants } from "initialData/basicData";

export const ProgressItem = ({ player, rank, type, maxValue }) => {
  const { income, exactPredictions, playerName, avatarName } = player;
  const relevantValue = type === "income" ? income : exactPredictions;
  const percentage = (relevantValue / maxValue) * 100;
  const variant = progressBarVariants[(rank - 1) % 7];
  return (
    <>
      <div className="progressItem">
        <span>
          <Badge bg={variant}>{rank}</Badge>
        </span>
        <Avatar seed={avatarName} size={32} />
        <span>{playerName}</span>
        <ProgressBar
          variant={variant}
          striped={rank < 11 ? false : true}
          now={percentage}
          label={`${type === "income" ? `${income} ₴` : exactPredictions}`}
          style={{ marginTop: "6px" }}
        />
      </div>
    </>
  );
};
