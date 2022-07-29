import classes from "./Modal.module.css";
import { CSSTransition } from "react-transition-group";
import { Fragment } from "react";

const Modal = (props) => {
  const backgroundStyle = {
    zIndex: props.isStats ? "5" : "12",
  };

  return (
    <Fragment>
      <CSSTransition
        in={props.show}
        timeout={props.timeout}
        unmountOnExit
        classNames={{
          enter: classes.modalEnter,
          enterActive: classes.modalEnterActive,
          exit: classes.modalExit,
          exitActive: classes.modalExitActive,
        }}
      >
        <div
          className={classes.background}
          onClick={props.showHandler}
          style={backgroundStyle}
        />
      </CSSTransition>
      <CSSTransition
        in={props.show}
        timeout={props.timeout}
        unmountOnExit
        classNames={{
          enter: classes.modalEnter,
          enterActive: classes.modalEnterActive,
          exit: classes.modalExit,
          exitActive: classes.modalExitActive,
        }}
      >
        <div className={props.isStats ? classes.modal : classes.modalError}>
          {props.children}
        </div>
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
