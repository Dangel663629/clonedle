import { useLayoutEffect, useState } from "react";
import keyboardObject from "../Helper/keyboardObject";
import classes from "./KeyboardOverlay.module.css";
import { EnterOutlined, DeleteOutlined } from "@ant-design/icons";

const KeyboardOverlay = (props) => {
  const [keyCapColors, setKeyCapColors] = useState(keyboardObject);
  const [firstLoad, setFirstLoad] = useState(true);

  const keyClickHandler = (e) => {
    if (props.gameOver || props.blockInputs) {
      return;
    }
    if (e.currentTarget.outerHTML.includes(`aria-label="delete"`)) {
      props.setUserGuess((prevState) => prevState.slice(0, -1));
    } else if (e.currentTarget.outerHTML.includes(`aria-label="enter"`)) {
      props.submitWord();
    } else if (props.userGuess.length < 5)
      props.setUserGuess(
        (prevState) => prevState + e.target.outerText.toLowerCase()
      );
  };

  const keyboardRow = [...Array(3)].map((e, index) => {
    return (
      <div
        className={
          index === 0
            ? classes.keyboardRow1
            : index === 1
            ? classes.keyboardRow2
            : index === 2
            ? classes.keyboardRow2
            : ""
        }
        key={index}
      >
        {Object.keys(keyCapColors)
          .slice(index * 10, index * 10 + 8 + (index < 2 ? 2 : 0))
          .map((element) => {
            let keyboardClass = "";
            if (element !== "enter" && element !== "backspace") {
              if (keyCapColors[element] === -1) {
                //-1
                if (index === 0) keyboardClass = classes.keyboardLetterRow1;
                else if (index === 1)
                  keyboardClass = classes.keyboardLetterRow2;
                else keyboardClass = classes.keyboardLetterRow3;
              } else if (keyCapColors[element] === 0) {
                //0
                if (index === 0)
                  keyboardClass = classes.keyboardLetterRow1Wrong;
                else if (index === 1)
                  keyboardClass = classes.keyboardLetterRow2Wrong;
                else keyboardClass = classes.keyboardLetterRow3Wrong;
              } else if (keyCapColors[element] === 1) {
                //1
                if (index === 0)
                  keyboardClass = classes.keyboardLetterRow1Close;
                else if (index === 1)
                  keyboardClass = classes.keyboardLetterRow2Close;
                else keyboardClass = classes.keyboardLetterRow3Close;
              } else {
                //2
                if (index === 0)
                  keyboardClass = classes.keyboardLetterRow1Correct;
                else if (index === 1)
                  keyboardClass = classes.keyboardLetterRow2Correct;
                else keyboardClass = classes.keyboardLetterRow3Correct;
              }
            } else {
              keyboardClass = classes.keyboardEnterBackspace;
            }
            return (
              <div
                className={keyboardClass}
                onClick={keyClickHandler}
                key={element}
              >
                {element === "enter" ? (
                  <EnterOutlined />
                ) : element === "backspace" ? (
                  <DeleteOutlined />
                ) : (
                  element
                )}
              </div>
            );
          })}
      </div>
    );
  });

  useLayoutEffect(() => {
    if (props.blockInputs && firstLoad) {
      setFirstLoad(false);
      setKeyCapColors(keyboardObject);
    }
    if (props.blockInputs) {
      return;
    }
    setKeyCapColors(props.keyboardColors);
  }, [props.keyboardColors, props.blockInputs, firstLoad]);

  return <div className={classes.keyboardMain}>{keyboardRow}</div>;
};

export default KeyboardOverlay;
