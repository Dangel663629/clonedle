import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { wordList } from "./Helper/wordList";
import WordRow from "./Components/WordRow";
import KeyboardOverlay from "./Components/KeyboardOverlay";
import keyboardObject from "./Helper/keyboardObject";
import hardmodeHelper from "./Helper/hardmodeHelper";
import ErrorOverlay from "./Components/ErrorOverlay";
import Settings from "./Components/Settings";
import Stats from "./Components/Stats";
import statsHelper from "./Helper/statsHelper";
import Header from "./Components/Header";
import { useScrollHook } from "./Helper/useScrollHook";
import classes from "./App.module.css";
import Tutorial from "./Components/Tutorial";

const lsRandomWord = localStorage.getItem("randomWord");
const lsUserGuessArray = JSON.parse(localStorage.getItem("userGuessArray"));
const lsRow = localStorage.getItem("row");
const lsRowNext = JSON.parse(localStorage.getItem("rowNext"));
const lsColorCodeArray = JSON.parse(localStorage.getItem("colorCodeArray"));
const lsKeyboardColors = JSON.parse(localStorage.getItem("keyboardColors"));
const lsHardmodeKeyboard = JSON.parse(localStorage.getItem("hardmodeKeyboard"));
const lsGameOver = JSON.parse(localStorage.getItem("gameOver"));
const lsHardmode = JSON.parse(localStorage.getItem("hardmode"));
const lsLost = JSON.parse(localStorage.getItem("lost"));
const lsStats = JSON.parse(localStorage.getItem("stats"));
const lsAttempt = localStorage.getItem("attempt");
const lsDarkmode = localStorage.getItem("darkmode");

const preferredMode = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
    return "dark";
  else return "light";
};

const App = () => {
  const [randomWord, setRandomWord] = useState(
    lsRandomWord ? lsRandomWord : ""
  );
  const [userGuess, setUserGuess] = useState("");
  const [userGuessArray, setUserGuessArray] = useState(
    lsUserGuessArray ? lsUserGuessArray : Array(6).fill("")
  );
  const [row, setRow] = useState(
    lsRow && lsRowNext ? +lsRow + 1 : lsRow ? lsRow : 1
  );
  const [rowNext, setRowNext] = useState(false);
  const [colorCode, setColorCode] = useState([]);
  const [colorCodeArray, setColorCodeArray] = useState(
    lsColorCodeArray ? lsColorCodeArray : []
  );
  const [keyboardColors, setKeyboardColors] = useState(
    lsKeyboardColors ? lsKeyboardColors : keyboardObject
  );
  const [gameOver, setGameOver] = useState(lsGameOver ? lsGameOver : false);
  const [lost, setLost] = useState(lsLost ? lsLost : false);
  const [blockInputs, setBlockInputs] = useState(false);
  const [hardmode, setHardmode] = useState(lsHardmode ? lsHardmode : false);
  const [hardmodeKeyboard, setHardmodeKeyboard] = useState(
    lsHardmodeKeyboard ? lsHardmodeKeyboard : {}
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [attempt, setAttempt] = useState(lsAttempt ? lsAttempt : 0);
  const [stats, setStats] = useState(lsStats ? lsStats : []);
  const [shakeRow, setShakeRow] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [darkmode, setDarkmode] = useState(
    lsDarkmode ? lsDarkmode : preferredMode
  );

  //disabling scroll when these overlays are open;
  useScrollHook(showSettings);
  useScrollHook(showStats);

  const callWord = () => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    setRandomWord(word);
  };

  const rerollWord = () => {
    if (blockInputs) {
      setErrorMessage("Please wait until the word submits.");
      setShowError(true);
      return;
    }

    if (!stats.length || stats[stats.length - 1].index === attempt - 1) {
      setErrorMessage("Please make an attempt before rerolling the word.");
      setShowError(true);
      return;
    }

    if (stats[attempt] && stats[attempt].result === "unfinished") {
      if (
        window.confirm(
          "Are you sure you want to continue? Your previous game will count as a loss."
        )
      ) {
        let tempStats = [...stats];
        tempStats[attempt].result = "lost";
        setStats(tempStats);
      } else {
        return;
      }
    }

    setShowSettings(false);
    callWord();
    setKeyboardColors(keyboardObject);
    setUserGuess("");
    setUserGuessArray(Array(6).fill(""));
    setColorCode([]);
    setColorCodeArray([]);
    setHardmodeKeyboard({});
    setGameOver(false);
    setLost(false);
    setRow(1);
    setAttempt((prevState) => +prevState + 1);
  };

  const submitEverything = useCallback(
    (colorCode, keyboardColorCode, keyObjectFiltered) => {
      setColorCode(colorCode);
      setColorCodeArray((prevState) => [...prevState, colorCode]);
      //if the slow letter animation is interrupted by a refresh, row will set itself to row+1
      setRowNext(true);
      setBlockInputs(true);
      setTimeout(() => {
        setRow((prevState) => +prevState + 1);
        setRowNext(false);
        setBlockInputs(false);
      }, 1750);
      setKeyboardColors((prevState) => ({
        ...prevState,
        ...keyboardColorCode,
      }));

      let arrayHelper = [...userGuessArray];
      arrayHelper[row - 1] = userGuess;
      setUserGuessArray(arrayHelper);
      setUserGuess("");
      setHardmodeKeyboard(keyObjectFiltered);
      let statsHelper = [...stats];
      let statsObject = {
        index: +attempt,
        word: randomWord,
        result: "unfinished",
        row: +row,
      };
      let indexHelper = stats.findIndex(
        (member) => +member.index === +attempt && member.word === randomWord
      );
      if (indexHelper > -1) {
        statsHelper[indexHelper] = statsObject;
      } else {
        statsHelper = [...statsHelper, statsObject];
      }
      setStats(statsHelper);
    },
    [userGuess, userGuessArray, row, randomWord, stats, attempt]
  );

  const submitWord = useCallback(() => {
    const wordSearchIndex = wordList.findIndex(
      (word) => word === userGuess.toLowerCase()
    );

    if (userGuess.length < 5) {
      setErrorMessage("Not enough letters.");
      setShowError(true);
      setShakeRow(true);
      setBlockInputs(true);
      setTimeout(() => {
        setBlockInputs(false);
        setShakeRow(false);
      }, 1000);
      return;
    } else if (wordSearchIndex < 0) {
      setErrorMessage("Not in word list.");
      setShowError(true);
      setShakeRow(true);
      setBlockInputs(true);
      setTimeout(() => {
        setBlockInputs(false);
        setShakeRow(false);
      }, 1000);
      return;
    }

    if (wordSearchIndex > -1 && userGuess.length === 5 && row < 7) {
      //deciding which colors to give to the wordrow component
      //2 is green box, 1 orange, 0 grey for individual letters
      const userWordGuess = userGuess.toLowerCase().split("");
      const solutionWord = randomWord.toLowerCase().split("");
      let colorCodeHelper = [];
      let eyeIndexes = [];
      let jayIndexes = [];
      //first loop determines where the green blocks are
      for (let i = 0; i < 5; i++) {
        if (userWordGuess[i] === solutionWord[i]) {
          colorCodeHelper = [...colorCodeHelper, 2];
          eyeIndexes = [...eyeIndexes, i];
          jayIndexes = [...jayIndexes, i];
        } else {
          colorCodeHelper = [...colorCodeHelper, 0];
        }
      }
      //second loop determines where the orange blocks are
      for (let i = 0; i < 5; i++) {
        let wrote = false;
        for (let j = 0; j < 5; j++)
          if (
            userWordGuess[i] === solutionWord[j] &&
            !eyeIndexes.includes(i) &&
            !jayIndexes.includes(j) &&
            !wrote
          ) {
            colorCodeHelper[i] = 1;
            eyeIndexes = [...eyeIndexes, i];
            jayIndexes = [...jayIndexes, j];
            wrote = true;
          }
      }
      eyeIndexes = [];
      jayIndexes = [];

      //deciding which colors to give to the keyboard component
      //2 is green box, 1 orange, 0 grey for individual letters
      let keyboardColorCode = {};
      userWordGuess.forEach((e, index) => {
        if (colorCodeHelper[index] > 0) {
          keyboardColorCode[`${e}_index`] = [];
        }
      });
      userWordGuess.forEach((e, index) => {
        keyboardColorCode[e] = colorCodeHelper[index];
        if (colorCodeHelper[index] > 0) {
          keyboardColorCode[`${e}_index`].push(
            `${index}${colorCodeHelper[index]}`
          );
        }
      });
      //making sure smaller color values don't get merged over bigger ones i.e. if a letter is green it won't turn to orange
      Object.keys(keyboardColorCode).forEach((e) => {
        if (e.length > 1) return;
        if (!(keyboardColors[e] < keyboardColorCode[e]))
          delete keyboardColorCode[e];
      });

      //hardmode
      const keyObject = Object.entries(keyboardColorCode).filter(
        ([key]) => key.slice(1, 2) === "_"
      );
      const keyObjectFiltered = Object.fromEntries(keyObject);
      let hardmodeArray = hardmodeHelper(hardmodeKeyboard, keyObjectFiltered);
      let failCondition = hardmodeArray[0];
      let error = hardmodeArray[1];

      if (hardmode && error.length) {
        setErrorMessage(error);
        setShowError(true);
      } else if (hardmode && !failCondition) {
        submitEverything(colorCodeHelper, keyboardColorCode, keyObjectFiltered);
      } else if (!hardmode) {
        submitEverything(colorCodeHelper, keyboardColorCode, keyObjectFiltered);
      }
    }

    return;
  }, [
    randomWord,
    userGuess,
    keyboardColors,
    hardmodeKeyboard,
    hardmode,
    row,
    submitEverything,
  ]);

  const showSettingsHandler = () => {
    setShowSettings((prevState) => !prevState);
  };

  const showStatsHandler = () => {
    setShowStats((prevState) => !prevState);
  };

  const showTutorialHandler = () => {
    setShowTutorial((prevState) => !prevState);
  };

  const hardmodeChangeHandler = () => {
    if (userGuessArray[0] !== "" && !hardmode && !gameOver) {
      setErrorMessage("Hardmode can only be enabled at the start of a round.");
      setShowError(true);
      return;
    }
    setHardmode((prevState) => !prevState);
  };

  const darkmodeChangeHandler = () => {
    setDarkmode(darkmode === "dark" ? "default" : "dark");
  };

  const keyPressFunction = useCallback(
    (event) => {
      if (blockInputs || gameOver) {
        return;
      }
      //a-z keypresses
      if (!/[^A-Z]/.test(event.key) || !/[^a-z]/.test(event.key)) {
        if (userGuess.length < 5)
          setUserGuess((prevState) => prevState + event.key);
      }
      //enter keypress
      else if (event.key.toLowerCase() === "enter") {
        submitWord();
      }
      //backspace keypress
      else if (event.key.toLowerCase() === "backspace")
        setUserGuess((prevState) => prevState.slice(0, -1));
    },
    [userGuess, submitWord, blockInputs, gameOver]
  );

  useEffect(() => {
    //listens for keypresses
    document.addEventListener("keydown", keyPressFunction, false);
    return () => {
      document.removeEventListener("keydown", keyPressFunction, false);
    };
  }, [keyPressFunction]);

  //if you win
  useLayoutEffect(() => {
    if (colorCode.join("") === "22222") {
      setGameOver(true);
      setTimeout(() => {
        switch (colorCodeArray.length) {
          default:
            break;
          case 1:
            setErrorMessage("Lucky!");
            break;
          case 2:
          case 4:
          case 5:
            setErrorMessage("Well done!");
            break;
          case 3:
            setErrorMessage("Third time's the charm!");
            break;
          case 6:
            setErrorMessage("Phew!");
            break;
        }
        setShowError(true);
      }, 1750);
      setTimeout(() => {
        setShowStats(true);
      }, 2750);
      let tempStats = [...stats];
      tempStats[tempStats.length - 1].result = "won";
      setStats(tempStats);
    }
  }, [colorCode, colorCodeArray]); //eslint-disable-line

  //if you lose
  useLayoutEffect(() => {
    if (row === 7 && colorCode.join("") !== "22222") {
      setGameOver(true);
      setLost(true);
      setTimeout(() => {
        setShowStats(true);
      }, 1550);
      let tempStats = [...stats];
      tempStats[tempStats.length - 1].result = "lost";
      setStats(tempStats);
    }
  }, [row, colorCode, randomWord]); //eslint-disable-line

  //localstorage setters
  useEffect(() => {
    localStorage.setItem("randomWord", randomWord);
  }, [randomWord]);

  useEffect(() => {
    localStorage.setItem("userGuessArray", JSON.stringify(userGuessArray));
  }, [userGuessArray]);

  useEffect(() => {
    localStorage.setItem("row", row);
  }, [row]);

  useEffect(() => {
    localStorage.setItem("rowNext", JSON.stringify(rowNext));
  }, [rowNext]);

  useEffect(() => {
    localStorage.setItem("colorCodeArray", JSON.stringify(colorCodeArray));
  }, [colorCodeArray]);

  useEffect(() => {
    localStorage.setItem("keyboardColors", JSON.stringify(keyboardColors));
  }, [keyboardColors]);

  useEffect(() => {
    localStorage.setItem("hardmode", JSON.stringify(hardmode));
  }, [hardmode]);

  useEffect(() => {
    localStorage.setItem("hardmodeKeyboard", JSON.stringify(hardmodeKeyboard));
  }, [hardmodeKeyboard]);

  useEffect(() => {
    localStorage.setItem("gameOver", JSON.stringify(gameOver));
  }, [gameOver]);

  useEffect(() => {
    localStorage.setItem("lost", JSON.stringify(lost));
  }, [lost]);

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("attempt", attempt);
  }, [attempt]);

  useEffect(() => {
    localStorage.setItem("darkmode", darkmode);
  }, [darkmode]);

  //show tutorial and animation buffer time
  useEffect(() => {
    if (!stats.length) {
      setBlockInputs(true);
      setTimeout(() => {
        setBlockInputs(false);
        setShowTutorial(true);
      }, 150);
    }
    if (userGuessArray[0] !== "") {
      setBlockInputs(true);
      setTimeout(() => {
        setBlockInputs(false);
      }, 800);
    }
    if (gameOver) {
      setTimeout(() => {
        setShowStats(true);
      }, 825);
    }
  }, []); //eslint-disable-line

  //start game
  useEffect(() => {
    if (randomWord === "") callWord();
  }, [randomWord]);

  return (
    <div className={classes.app} data-theme={darkmode}>
      <Header
        showSettingsHandler={showSettingsHandler}
        showStatsHandler={showStatsHandler}
        showTutorialHandler={showTutorialHandler}
      />
      <div className={classes.mainWrapper}>
        <div className={classes.wordBlocks}>
          <WordRow
            userGuess={userGuess}
            userGuessArray={userGuessArray}
            colorCodeArray={colorCodeArray}
            row={row}
            shakeRow={shakeRow}
            randomWord={randomWord}
            blockInputs={blockInputs}
            lost={lost}
          />
        </div>
        <div>
          <KeyboardOverlay
            userGuess={userGuess}
            userGuessArray={userGuessArray}
            setUserGuess={setUserGuess}
            submitWord={submitWord}
            keyboardColors={keyboardColors}
            gameOver={gameOver}
            blockInputs={blockInputs}
          />
        </div>
      </div>
      <ErrorOverlay
        show={showError}
        setShowError={setShowError}
        errorMessage={errorMessage}
        randomWord={randomWord}
      />
      <Stats
        show={showStats}
        showStatsHandler={showStatsHandler}
        statsArray={statsHelper(stats)}
        colorCodeArray={colorCodeArray}
        stats={stats}
        randomWord={randomWord}
        setErrorMessage={setErrorMessage}
        setShowError={setShowError}
      />
      <Tutorial show={showTutorial} showTutorialHandler={showTutorialHandler} />
      <Settings
        showSettings={showSettings}
        showSettingsHandler={showSettingsHandler}
        hardmode={hardmode}
        hardmodeChangeHandler={hardmodeChangeHandler}
        darkmode={darkmode}
        darkmodeChangeHandler={darkmodeChangeHandler}
        rerollWord={rerollWord}
      />
    </div>
  );
};

export default App;
