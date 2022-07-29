import classes from "./TutorialWord.module.css";

const TutorialWord = (props) => {
  const word = props.word.split("").map((letter, index) => {
    let letterClass = "";
    if (index === 0) letterClass = classes.letterCorrect;
    else if (index === 2) letterClass = classes.letterClose;
    else if (index === 4) letterClass = classes.letterWrong;
    else letterClass = classes.letter;
    return (
      <div className={letterClass} key={index}>
        {letter}
      </div>
    );
  });

  return <div className={classes.row}>{word}</div>;
};

export default TutorialWord;
