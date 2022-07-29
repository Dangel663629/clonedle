import React from "react";
import "antd/lib/switch/style/index.css";
import "antd/lib/button/style/index.css";

import classes from "./SettingsRow.module.css";
import { Switch, Button } from "antd";

const SettingsRow = (props) => {
  const rightSide =
    props.type === "switch" ? (
      <Switch checked={props.checked} onChange={props.onChange} />
    ) : props.type === "button" ? (
      <Button
        type="primary"
        style={{ borderRadius: "1rem" }}
        onClick={props.onClick}
      >
        {props.buttonText}
      </Button>
    ) : props.type === "link" ? (
      <a href={props.linkDestination}>{props.linkText}</a>
    ) : (
      ""
    );

  return (
    <div className={classes.main}>
      <div>
        <p className={classes.text}>{props.text}</p>
        <p className={classes.secondaryText}>
          {props.secondaryText !== "" && props.secondaryText}
        </p>
      </div>
      <div className={classes.rightSide}> {rightSide}</div>
    </div>
  );
};

export default SettingsRow;
