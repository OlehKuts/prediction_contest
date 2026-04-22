import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { findSimplifiedTeamId } from "utils/findSimplifiedTeamId";
import { addGame, selectGameNumbers } from "store/gameSlice";
import { tournamentStages } from "initialData/basicData";
import { selectSimplifiedTeams } from "store/teamSlice";
import { getNumbersArray } from "utils/utils";
import { separateAvailableNumbers } from "utils/separateAvailableNumbers";

export const AddGameForm = ({ show, handleClose, displayAlert }) => {
  const takenGameNumbers = useSelector(selectGameNumbers);
  const simplifiedTeams = useSelector(selectSimplifiedTeams);
  const gameNumberList = getNumbersArray(1, 104);
  const availableNumbers = separateAvailableNumbers(
    gameNumberList,
    takenGameNumbers,
  );
  const dispatch = useDispatch();
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Додайте новий матч</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addGameForm">
            <Formik
              initialValues={{
                stage: "",
                homeTeamName: "",
                awayTeamName: "",
                gameNumber: 0,
              }}
              validationSchema={Yup.object({
                homeTeamName: Yup.string().required(
                  "Оберіть команду-господаря",
                ),
                awayTeamName: Yup.string().required("Оберіть команду-гостя"),
                stage: Yup.string().required("Оберіть стадію турніру!"),
                gameNumber: Yup.number()
                  .integer()
                  .required("Оберіть порядковий номер гри!")
                  .min(1, "Оберіть валідний номер матчу!"),
              })}
              onSubmit={(values, { resetForm }) => {
                const gameId = nanoid();
                const newGame = {
                  ...values,
                  gameNumber: Number(values.gameNumber),
                  id: gameId,
                  additionalScore: "",
                  finalScore: "",
                  gamePot: 0,
                  predictions: [],
                  homeTeamId: findSimplifiedTeamId(
                    simplifiedTeams,
                    values.homeTeamName,
                  ),
                  awayTeamId: findSimplifiedTeamId(
                    simplifiedTeams,
                    values.awayTeamName,
                  ),
                };
                dispatch(addGame(newGame));
                displayAlert("Матч додано успішно!", "success", 2000);
                handleClose();
                resetForm();
              }}
            >
              <Form>
                <Field as="select" name="gameNumber" id="gameNumber">
                  <option value="">Номер матчу</option>
                  {availableNumbers.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  className="errorMsg"
                  name="gameNumber"
                  component="div"
                  style={{ color: "red" }}
                />
                <Field as="select" name="stage" id="stage">
                  <option value="">Оберіть стадію</option>
                  {tournamentStages.map(({ stageName, value }) => (
                    <option key={value} value={value}>
                      {stageName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  className="errorMsg"
                  name="stage"
                  component="div"
                  style={{ color: "red" }}
                />
                <Field as="select" name="homeTeamName" id="homeTeamName">
                  <option value="">Команда-господар</option>
                  {simplifiedTeams.map(({ id, title }) => (
                    <option key={id} value={title}>
                      {title}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  className="errorMsg"
                  name="homeTeamName"
                  component="div"
                  style={{ color: "red" }}
                />
                <Field as="select" name="awayTeamName" id="awayTeamName">
                  <option value="">Команда-гість</option>
                  {simplifiedTeams.map(({ id, title }) => (
                    <option key={id} value={title}>
                      {title}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  className="errorMsg"
                  name="awayTeamName"
                  component="div"
                  style={{ color: "red" }}
                />
                <button type="submit" className="btn btn-outline-primary">
                  Додати матч
                </button>
              </Form>
            </Formik>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
