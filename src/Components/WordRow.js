import { useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "./WordRow.module.css";

const WordRow = (props) => {
  const [guessWord, setGuessWord] = useState(props.userGuess);
  const [bounce, setBounce] = useState(-1);
  const [current, setCurrent] = useState(-1);
  const [complete, setComplete] = useState(false);

  const prevGuessRef = useRef();

  const doneFor = () => {
    setTimeout(() => {
      setComplete(true);
    }, 800);
  };

  const rows = props.userGuessArray.map((e, index) => {
    let mainClass = "";
    if (props.row - 1 === index && props.shakeRow)
      mainClass = classes.mainShake;
    else mainClass = classes.main;

    return (
      <div className={mainClass} key={100 + index} onAnimationStart={doneFor}>
        {[...Array(5)].map((x, index2) => {
          let delay = `Delay${index2}`;
          let delaySlow = `Delay${index2}Slow`;
          let letterClass = "";
          if (props.row - 1 === index) {
            if (
              complete === true &&
              props.blockInputs === true &&
              !props.shakeRow
            )
              if (
                props.colorCodeArray[index] &&
                props.colorCodeArray[index][index2] === 2
              ) {
                //slow animation
                //correct letter
                if (index2 === 0) letterClass = classes.letterCorrectSlow;
                else
                  letterClass = `${classes.letterCorrectSlow} ${classes[delaySlow]}`;
              } else if (
                props.colorCodeArray[index] &&
                props.colorCodeArray[index][index2] === 1
              ) {
                //elsewhere letter
                if (index2 === 0) letterClass = classes.letterCloseSlow;
                else
                  letterClass = `${classes.letterCloseSlow} ${classes[delaySlow]}`;
              } else {
                //wrong letter
                if (index2 === 0) letterClass = classes.letterWrongSlow;
                else
                  letterClass = `${classes.letterWrongSlow} ${classes[delaySlow]}`;
              }
            //bounce
            else if (index2 === bounce) letterClass = classes.letterBounce;
            //static letter
            else if (index2 > current) letterClass = classes.letter;
            else letterClass = classes.letterFilled;
          } else {
            //fast animation
            if (
              props.colorCodeArray[index] &&
              props.colorCodeArray[index][index2] === 2
            ) {
              //correct letter
              if (index2 === 0) letterClass = classes.letterCorrect;
              else letterClass = `${classes.letterCorrect} ${classes[delay]}`;
            } else if (
              props.colorCodeArray[index] &&
              props.colorCodeArray[index][index2] === 1
            ) {
              //elsewhere letter
              if (index2 === 0) letterClass = classes.letterClose;
              else letterClass = `${classes.letterClose} ${classes[delay]}`;
            } else if (
              props.colorCodeArray[index] &&
              props.colorCodeArray[index][index2] === 0
            ) {
              //wrong letter
              if (index2 === 0) letterClass = classes.letterWrong;
              else letterClass = `${classes.letterWrong} ${classes[delay]}`;
            }
            //static letter
            else letterClass = classes.letter;
          }

          return (
            <div className={letterClass} key={index2}>
              {e !== ""
                ? e[index2]
                : index === props.row - 1
                ? props.userGuess[index2]
                : ""}
            </div>
          );
        })}
      </div>
    );
  });

  useEffect(() => {
    setBounce(-1);
  }, [props.row]);

  useEffect(() => {
    prevGuessRef.current = guessWord;
  }, [guessWord]);

  useLayoutEffect(() => {
    setBounce(-1);
    if (
      prevGuessRef.current !== undefined &&
      props.userGuess.length >= prevGuessRef.current.length
    )
      setBounce(+props.userGuess.length - 1);
    setGuessWord(props.userGuess);
  }, [props.userGuess]);

  useEffect(() => {
    setCurrent(props.userGuess.length - 1);
  }, [props.userGuess]);

  return (
    <div className={classes.mainWrapper}>
      {props.lost && <div className={classes.result}>{props.randomWord}</div>}
      {rows}
    </div>
  );
};

export default WordRow;
