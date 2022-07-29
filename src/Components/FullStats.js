import { Fragment, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import classes from "./FullStats.module.css";
import { useState } from "react";

const FullStats = (props) => {
  const [sortedStats, setSortedStats] = useState(props.stats);
  const [sort, setSort] = useState("Game asc");

  const listSort = (e) => {
    if (sort === e.target.innerHTML + " asc")
      setSort(e.target.innerHTML + " desc");
    else setSort(e.target.innerHTML + " asc");
  };

  const statItems = sortedStats.map((stat, index) => {
    let resultClasses = "";
    if (stat.result === "won") resultClasses = classes.statResultWon;
    else if (stat.result === "lost") resultClasses = classes.statResultLost;
    else resultClasses = classes.statResultOngoing;
    return (
      <div className={classes.statItem} key={index}>
        <div className={classes.statGame}>#{+stat.index + 1}</div>
        <div className={classes.statWord}>
          {stat.result === "unfinished" ? "*****" : stat.word}
        </div>
        <div className={resultClasses}>
          {stat.result === "unfinished" ? "Ongoing" : stat.result}
        </div>
        <div className={classes.statRow}>{stat.row}</div>
      </div>
    );
  });

  const emptyItem = (
    <div className={classes.statItem}>No games played yet.</div>
  );

  useEffect(() => {
    let helperStats = [...sortedStats];
    let sortedHelper = [];
    let index = -1;
    let element = {};
    switch (sort) {
      default:
        sortedHelper = helperStats.sort((a, b) => a.index - b.index);
        break;
      case "Game desc":
        sortedHelper = helperStats.sort((a, b) => b.index - a.index);
        break;
      case "Word asc":
        sortedHelper = helperStats.sort((a, b) => a.word.localeCompare(b.word));
        index = sortedHelper.findIndex(
          (object) => object.word === props.randomWord
        );
        if (index !== -1) {
          element = sortedHelper.splice(index, 1)[0];
          sortedHelper.splice(sortedHelper.length, 0, element);
        }
        break;
      case "Word desc":
        sortedHelper = helperStats.sort((a, b) => b.word.localeCompare(a.word));
        index = sortedHelper.findIndex(
          (object) => object.word === props.randomWord
        );
        if (index !== -1) {
          element = sortedHelper.splice(index, 1)[0];
          sortedHelper.splice(0, 0, element);
        }
        break;
      case "Result asc":
        sortedHelper = helperStats.sort((a, b) =>
          b.result.localeCompare(a.result)
        );
        break;
      case "Result desc":
        sortedHelper = helperStats.sort((a, b) =>
          a.result.localeCompare(b.result)
        );
        break;
      case "Row asc":
        sortedHelper = helperStats.sort((a, b) => a.row - b.row);
        break;
      case "Row desc":
        sortedHelper = helperStats.sort((a, b) => b.row - a.row);
        break;
    }
    setSortedStats(sortedHelper);
  }, [sort]); //eslint-disable-line

  return (
    <Fragment>
      <div className={classes.header}>
        <p className={classes.headerTitle}>Full Statistics</p>
        <button className={classes.close} onClick={props.showStatsHandler}>
          <CloseOutlined />
        </button>
      </div>
      <div className={classes.fullStatsHeader}>
        <button className={classes.fullStatsButton} onClick={listSort}>
          Game
        </button>
        <button className={classes.fullStatsButton} onClick={listSort}>
          Word
        </button>
        <button className={classes.fullStatsButton} onClick={listSort}>
          Result
        </button>
        <button className={classes.fullStatsLast} onClick={listSort}>
          Row
        </button>
      </div>
      <div className={classes.fullStatsWrapper}>
        {statItems.length ? statItems : emptyItem}
      </div>
    </Fragment>
  );
};

export default FullStats;
