import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePlayer, removePlayer } from "store/playerSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  initModalVisibilities,
  trueAdminPassword,
} from "initialData/basicData";
import Avatar from "components/Avatar";

export const PlayerItem = ({ player, rank }) => {
  const { id, playerName, deposit, avatarName, balance } = player;
  const dispatch = useDispatch();
  const [adminPassword, setAdminPassword] = useState("");
  const [showChanges, setShowChanges] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState(playerName);
  const [newDeposit, setNewDeposit] = useState(0);
  const [newBalance, setNewBalance] = useState(balance);

  const [modalVisibilities, setModalVisibilities] = useState(
    initModalVisibilities,
  );
  const {
    mainBlock,
    addBtns,
    addParams,
    footer,
    depositBlock,
    removalBlock,
    passwordBlock,
  } = modalVisibilities;
  const applyPlayerChanges = () => {
    if (
      newDeposit > 10000 ||
      newDeposit < 0 ||
      newPlayerName.length < 2 ||
      newPlayerName.length > 30
    ) {
      // displayAlert
      return;
    }
    dispatch(
      changePlayer({
        id,
        changes: {
          deposit: deposit + newDeposit,
          playerName: newPlayerName,
          balance: balance === newBalance ? balance + newDeposit : newBalance,
        },
      }),
    );
    setShowChanges(false);
  };
  return (
    <>
      <tr onClick={() => setShowChanges(true)} style={{ cursor: "pointer" }}>
        <td>{rank}</td>
        <td>{playerName}</td>
        <td>{deposit}</td>
        <td>{balance}</td>
      </tr>
      <Modal
        show={showChanges}
        onHide={() => {
          setShowChanges(false);
          setModalVisibilities(initModalVisibilities);
        }}
        className="playerModal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="playerModalTitle">
            {playerName}
            {""}(на балансі: {balance} ₴)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="playerModalBody" style={{ marginBottom: "5px" }}>
            <Avatar seed={avatarName} />
          </div>
          <div className="playerModalBody">
            {!mainBlock ? (
              <div className="playerModalChooseContent">
                <Button
                  variant="outline-success"
                  onClick={() => {
                    setModalVisibilities({
                      ...modalVisibilities,
                      mainBlock: true,
                      depositBlock: true,
                      footer: true,
                    });
                  }}
                >
                  Внести депозит
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={() => {
                    setModalVisibilities({
                      ...modalVisibilities,
                      mainBlock: true,
                      passwordBlock: true,
                    });
                  }}
                >
                  Редагувати
                </Button>
              </div>
            ) : null}
            {mainBlock ? (
              <>
                {depositBlock ? (
                  <>
                    <div>
                      <label htmlFor="newDeposit">Сума нового депозиту</label>
                    </div>
                    <div>
                      <input
                        min={0}
                        max={10000}
                        step={10}
                        type="number"
                        name="newDeposit"
                        value={newDeposit}
                        onChange={(e) => setNewDeposit(+e.target.value)}
                      />
                    </div>{" "}
                  </>
                ) : null}
                {passwordBlock ? (
                  <>
                    <div className="passwordLine">
                      <label>Пароль для допуску до редагування даних</label>
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                      <Button
                        variant="outline-success"
                        onClick={() => {
                          if (adminPassword !== trueAdminPassword) {
                            return;
                          } else {
                            setModalVisibilities({
                              ...modalVisibilities,
                              passwordBlock: false,
                              addBtns: true,
                            });
                          }
                        }}
                      >
                        Підтвердити
                      </Button>{" "}
                    </div>{" "}
                  </>
                ) : null}
                {addBtns ? (
                  <>
                    <Button
                      variant="outline-warning"
                      onClick={() => {
                        setModalVisibilities({
                          ...modalVisibilities,
                          addBtns: false,
                          addParams: true,
                          footer: true,
                        });
                      }}
                    >
                      Редагувати профіль
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        setModalVisibilities({
                          ...modalVisibilities,
                          addBtns: false,
                          removalBlock: true,
                        });
                      }}
                    >
                      Видалити учасника
                    </Button>
                  </>
                ) : null}
                {addParams ? (
                  <>
                    <div className="additionalParamsLine">
                      <label htmlFor="playerName">Ім'я учасника</label>
                      <input
                        name="playerName"
                        type="text"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                      />
                    </div>
                    <div className="additionalParamsLine">
                      <label htmlFor="newBalance">Поточний баланс</label>
                      <input
                        name="newBalance"
                        type="number"
                        step={10}
                        min={0}
                        max={10000}
                        value={newBalance}
                        onChange={(e) => setNewBalance(+e.target.value)}
                      />
                    </div>
                  </>
                ) : null}
              </>
            ) : null}
            {removalBlock ? (
              <>
                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch(removePlayer(id));
                  }}
                >
                  Видалити учасника {playerName} безповоротно
                </Button>
              </>
            ) : null}
          </div>
        </Modal.Body>

        {mainBlock && footer ? (
          <Modal.Footer>
            <Button
              variant="outline-info"
              onClick={() => {
                applyPlayerChanges();
                setModalVisibilities(initModalVisibilities);
              }}
            >
              Застосувати зміни
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setShowChanges(false);
                setModalVisibilities(initModalVisibilities);
              }}
            >
              Відміна
            </Button>
          </Modal.Footer>
        ) : null}
      </Modal>
    </>
  );
};
