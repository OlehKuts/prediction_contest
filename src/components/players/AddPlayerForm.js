import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Button from "react-bootstrap/Button";
import { Carousel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { addPlayer } from "store/playerSlice";
import { avatarNames } from "initialData/basicData";
import Avatar from "components/Avatar";

export const AddPlayerForm = ({
  show,
  handleClose,
  displayAlert,
  onChangePlayer,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Додайте нового учасника</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addGameForm">
            <Formik
              initialValues={{
                playerName: "",
                deposit: 0,
                avatarName: "",
              }}
              validationSchema={Yup.object({
                playerName: Yup.string()
                  .required("Вкажіть ім'я нового учасника")
                  .min(2, "Щонайменше два символи в імені учасника!")
                  .max(30, "Ім'я учасника має містити не більше 30 букв!"),
                deposit: Yup.number()
                  .integer("Тільки цілі числа")
                  .required("Вкажіть розмір стартового депозиту!")
                  .min(0, "Заборонені від'ємні значення!"),
                avatarName: Yup.string().required("Оберіть аватара!"),
              })}
              onSubmit={(values, { resetForm }) => {
                const playerId = nanoid();
                const newPlayer = {
                  ...values,
                  id: playerId,
                  exactPredictions: 0,
                  income: 0,
                  balance: values.deposit,
                  //points
                };
                dispatch(addPlayer(newPlayer));
                onChangePlayer(newPlayer);
                displayAlert(
                  `Додано учасника ${values.playerName}!`,
                  "success",
                );
                handleClose();
                resetForm();
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <Field
                    name="playerName"
                    id="playerName"
                    placeholder="ім'я учасника..."
                  />
                  <ErrorMessage
                    className="errorMsg"
                    name="playerName"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <div>
                    <label htmlFor="deposit">Стартовий депозит</label>
                  </div>
                  <Field
                    name="deposit"
                    type="number"
                    id="deposit"
                    min={0}
                    style={{ width: "60px" }}
                  />
                  <ErrorMessage
                    className="errorMsg"
                    name="deposit"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <div>
                    <label htmlFor="avatarName">Оберіть аватар (клік)</label>
                  </div>
                  <div>
                    {values.avatarName ? (
                      <Avatar seed={values.avatarName} />
                    ) : (
                      <Carousel>
                        {avatarNames.map((item) => (
                          <Carousel.Item
                            key={item}
                            onClick={() => {
                              setFieldValue("avatarName", item);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <Avatar seed={item} />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    )}
                  </div>
                  <Field
                    name="avatarName"
                    id="avatarName"
                    style={{ display: "none" }}
                  />
                  <ErrorMessage
                    className="errorMsg"
                    name="avatarName"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <button type="submit" className="btn btn-outline-primary">
                    Додати учасника
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
