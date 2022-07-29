import classes from "./Stats.module.css";
import Modal from "./Modal";
import { ShareAltOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Button } from "antd";
import BriefStats from "./BriefStats";
import { useEffect, useState } from "react";
import FullStats from "./FullStats";

const Stats = (props) => {
  const [showFullStats, setShowFullStats] = useState(false);
  const [wonGame, setWonGame] = useState(false);

  const fullStatsHandler = () => {
    setShowFullStats((prevState) => !prevState);
  };

  const setResultText = () => {
    let resultString = `Wordle #${
      +props.stats[props.stats.length - 1].index + 1
    } ${props.colorCodeArray.length}/6`;
    props.colorCodeArray.forEach((firstElement) => {
      resultString += `\n`;
      firstElement.forEach((element) => {
        if (element === 0) resultString += "⬛";
        else if (element === 1) resultString += "🟨";
        else resultString += "🟩";
      });
    });
    return resultString;
  };

  const shareStats = () => {
    navigator.clipboard.writeText(setResultText());
    props.setErrorMessage("Copied to clipboard!");
    props.setShowError(true);
  };

  useEffect(() => {
    if (props.colorCodeArray.length) {
      if (
        props.colorCodeArray[props.colorCodeArray.length - 1].join("") ===
        "22222"
      ) {
        setWonGame(true);
      }
    } else setWonGame(false);
  }, [props.colorCodeArray]);

  return (
    <Modal
      show={props.show}
      timeout={300}
      isStats={true}
      showHandler={props.showStatsHandler}
    >
      {!showFullStats && (
        <BriefStats
          statsArray={props.statsArray}
          showStatsHandler={props.showStatsHandler}
        />
      )}
      {showFullStats && (
        <FullStats
          stats={props.stats}
          showStatsHandler={props.showStatsHandler}
          randomWord={props.randomWord}
        />
      )}
      <div className={classes.footer}>
        <Button type="primary" onClick={fullStatsHandler}>
          <OrderedListOutlined />
          {showFullStats ? "Brief Stats" : "Full Stats"}
        </Button>
        {!showFullStats && wonGame && (
          <Button type="primary" onClick={shareStats}>
            <ShareAltOutlined />
            Share
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default Stats;
