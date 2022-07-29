import { useEffect } from "react";
import Modal from "./Modal";

const ErrorOverlay = ({ errorMessage, setShowError, show }) => {
  let length = errorMessage.split(" ").length * 200;
  length = length > 1000 ? length : 1000;

  useEffect(() => {
    if (show)
      setTimeout(() => {
        setShowError(false);
      }, length);
  }, [show, setShowError, length]);

  return (
    <Modal show={show} timeout={250}>
      {errorMessage}
    </Modal>
  );
};

export default ErrorOverlay;
