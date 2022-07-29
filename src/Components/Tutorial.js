import Modal from "./Modal";
import classes from "./Tutorial.module.css";
import { CloseOutlined } from "@ant-design/icons";
import TutorialWord from "./TutorialWord";

const Tutorial = (props) => {
  return (
    <Modal
      show={props.show}
      timeout={300}
      showHandler={props.showTutorialHandler}
      isStats={true}
    >
      <div className={classes.header}>
        <div className={classes.headerTitle}>How to play</div>
        <button className={classes.close} onClick={props.showTutorialHandler}>
          <CloseOutlined />
        </button>
      </div>
      <div className={classes.textBlock}>
        <p>
          Guess the <span>WORDLE</span> in six tries.
        </p>
        <p>
          Each guess must be a valid five-letter word. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
      </div>
      <div className={classes.exampleBlock}>
        <p>
          <span>Example</span>
        </p>
        <TutorialWord word={"WEARY"} />
        <p>
          The letter <span>W</span> is in the word and in the{" "}
          <span>correct</span> position.
        </p>
        <p>
          The letter <span>A</span> is in the word but in the <span>wrong</span>{" "}
          position.
        </p>
        <p>
          The letter <span>Y</span> is <span>not</span> in the word in any
          position.
        </p>
      </div>
    </Modal>
  );
};

export default Tutorial;
