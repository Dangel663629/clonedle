import classes from "./StatsNumber.module.css";

const StatsNumber = (props) => {
  return (
    <div className={classes.stat}>
      <p className={classes.statNumber}>{props.number}</p>
      <p className={classes.statDescription}>{props.text}</p>
    </div>
  );
};

export default StatsNumber;
