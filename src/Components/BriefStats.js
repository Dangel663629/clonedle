import { Fragment } from "react";
import StatsNumber from "./StatsNumber";
import StatsGuess from "./StatsGuess";
import { CloseOutlined } from "@ant-design/icons";
import classes from "./BriefStats.module.css";

const BriefStats = (props) => {
  return (
    <Fragment>
      <div className={classes.header}>
        <p className={classes.headerTitle}>Statistics</p>
        <button className={classes.close} onClick={props.showStatsHandler}>
          <CloseOutlined />
        </button>
      </div>

      <div className={classes.statistics}>
        <StatsNumber number={props.statsArray[0]} text="Played" />
        <StatsNumber number={props.statsArray[1]} text="Win %" />
        <StatsNumber number={props.statsArray[2]} text="Current Streak" />
        <StatsNumber number={props.statsArray[3]} text="Max Streak" />
      </div>

      <div>Guess distribution</div>
      <StatsGuess
        number="1"
        barText={props.statsArray[4][0]}
        fillPercent={`${props.statsArray[5][0]}%`}
      />
      <StatsGuess
        number="2"
        barText={props.statsArray[4][1]}
        fillPercent={`${props.statsArray[5][1]}%`}
      />
      <StatsGuess
        number="3"
        barText={props.statsArray[4][2]}
        fillPercent={`${props.statsArray[5][2]}%`}
      />
      <StatsGuess
        number="4"
        barText={props.statsArray[4][3]}
        fillPercent={`${props.statsArray[5][3]}%`}
      />
      <StatsGuess
        number="5"
        barText={props.statsArray[4][4]}
        fillPercent={`${props.statsArray[5][4]}%`}
      />
      <StatsGuess
        number="6"
        barText={props.statsArray[4][5]}
        fillPercent={`${props.statsArray[5][5]}%`}
      />
    </Fragment>
  );
};

export default BriefStats;
