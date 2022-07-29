import classes from "./Settings.module.css";
import SettingsRow from "./SettingsRow";
import "./Settings.module.css";
import { CSSTransition } from "react-transition-group";
import { CloseOutlined } from "@ant-design/icons";

const Settings = (props) => {
  const closeSettingsHandler = () => {
    props.showSettingsHandler();
  };

  return (
    <CSSTransition
      in={props.showSettings}
      timeout={300}
      unmountOnExit
      classNames={{
        enter: classes.mainEnter,
        enterActive: classes.mainEnterActive,
        exit: classes.mainExit,
        exitActive: classes.mainExitActive,
      }}
    >
      <div className={classes.main}>
        <div className={classes.header}>
          <p className={classes.settings}>Settings</p>
          <button className={classes.close} onClick={closeSettingsHandler}>
            <CloseOutlined />
          </button>
        </div>
        <SettingsRow
          text="Reroll Word"
          secondaryText="Give up and start a new game."
          type="button"
          buttonText="Reroll"
          onClick={props.rerollWord}
        />
        <SettingsRow
          text="Hard Mode"
          secondaryText="Any revealed hints must be used in subsuquent guesses."
          type="switch"
          checked={props.hardmode}
          onChange={props.hardmodeChangeHandler}
        />
        <SettingsRow
          text="Dark Theme"
          type="switch"
          checked={props.darkmode === "dark" ? true : false}
          onChange={props.darkmodeChangeHandler}
        />
        <SettingsRow
          text="Feedback"
          type="link"
          linkDestination="https://www.youtube.com/watch?v=6G7HYqjBxgg"
          linkText="Email"
        />
        <SettingsRow
          text="Questions?"
          type="link"
          linkDestination="https://help.nytimes.com/hc/en-us/articles/360029050872-Word-Games-and-Logic-Puzzles#h_01FVGCB2Z00ZQMDMCYWBPWJNXB"
          linkText="FAQ"
        />
        <div className={classes.copyright}>@ 2022 Dangel Times Company</div>
      </div>
    </CSSTransition>
  );
};

export default Settings;
