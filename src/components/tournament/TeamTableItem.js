import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { changeIsQualified } from "store/teamSlice";

export const TeamTableItem = ({ team, idx }) => {
  const {
    id,
    isQualified,
    title,
    engTitle,
    goalsScored,
    goalsMissed,
    groupPoints,
  } = team;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  return (
    <>
      <tr onClick={handleShow} className="teamLine">
        <td style={{ backgroundColor: isQualified ? "aquamarine" : "white" }}>
          {idx + 1}
        </td>
        <td>
          <span
            className={`fi fi-${engTitle}`}
            style={{ padding: "10px 6px 0px 6px" }}
          ></span>
        </td>
        <td>{title}</td>
        <td>{groupPoints}</td>
        <td>
          {goalsScored} - {goalsMissed}
        </td>
      </tr>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Команда кваліфікувалася в плей-офф?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                changeIsQualified({ id, changes: { isQualified: true } }),
              );
              handleClose();
            }}
          >
            Так
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Закрити
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
