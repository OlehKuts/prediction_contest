import { useState } from "react";

export const useAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("warning");
  const displayAlert = (message = " ", variant = "warning", delay = 3000) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, delay);
  };
  return [showAlert, alertMessage, alertVariant, displayAlert];
};
