import classes from "./Header.module.css";
import {
  SettingOutlined,
  BarChartOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const Header = (props) => {
  const antStyles = {
    fontSize: 25,
    color: "var(--textColor)",
  };

  return (
    <div className={classes.main}>
      <button onClick={props.showTutorialHandler}>
        <InfoCircleOutlined style={antStyles} />
      </button>
      <p className={classes.title}>Clonedle</p>
      <div>
        <button onClick={props.showStatsHandler}>
          <BarChartOutlined style={antStyles} />
        </button>
        <button onClick={props.showSettingsHandler}>
          <SettingOutlined style={antStyles} />
        </button>
      </div>
    </div>
  );
};

export default Header;
