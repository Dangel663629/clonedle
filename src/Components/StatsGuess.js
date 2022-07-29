import classes from "./StatsGuess.module.css";

const StatsGuess = (props) => {
  return (
    <div className={classes.guessWrapper}>
      <div className={classes.guessNumber}>{props.number}</div>
      <div className={classes.guessBarOuter}>
        <div
          className={classes.guessBarFill}
          style={{ width: props.fillPercent }}
        >
          <p className={classes.barText}>{props.barText}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsGuess;
