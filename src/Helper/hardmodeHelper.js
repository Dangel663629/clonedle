import ordinalSuffix from "./ordinalSuffix";

const containsAllElements = (arr, target) =>
  arr.every((v) => target.includes(v));

const hardmodeHelper = (stateObject, newObject) => {
  let failed = false;
  let stateCorrect = [];
  let newCorrect = [];
  let missingLetters = [];
  let errorMessage = "";

  //correct letters in previous guess
  Object.keys(stateObject).forEach((e) => {
    for (let i = 0; i < stateObject[e].length; i++) {
      if (stateObject[e][i].slice(1, 2) === "2")
        stateCorrect = [
          ...stateCorrect,
          `${stateObject[e][i]}${e.slice(0, 1).toUpperCase()}`,
        ];
    }
  });
  //correct letters in guess
  Object.keys(newObject).forEach((e) => {
    for (let i = 0; i < newObject[e].length; i++) {
      if (newObject[e][i].slice(1, 2) === "2")
        newCorrect = [
          ...newCorrect,
          `${newObject[e][i]}${e.slice(0, 1).toUpperCase()}`,
        ];
    }
  });

  //checking that new guess has all previous guess correct letters
  if (!containsAllElements(stateCorrect, newCorrect)) {
    //new guess doesn't have all correct letters, print out the first letter that's missing
    let missing = stateCorrect.find((element) => !newCorrect.includes(element));
    errorMessage = `${ordinalSuffix(+missing[0] + 1)} letter must be ${
      missing[2]
    }.`;
    return [true, errorMessage];
  }

  //new guess has all correct letters, check that the "elsewhere" letter amounts are equal or greater
  if (!stateObject.length) {
    Object.keys(stateObject).forEach((letter) => {
      if (newObject.hasOwnProperty(letter)) {
        //"elsewhere" letter is present, but the amount is wrong
        if (stateObject[letter].length > newObject[letter].length) {
          missingLetters = [
            ...missingLetters,
            letter.slice(0, 1).toUpperCase(),
          ];
          failed = true;
        }
      } else {
        //"elsewhere" letter is missing
        missingLetters = [...missingLetters, letter.slice(0, 1).toUpperCase()];
        failed = true;
      }
    });
  }

  missingLetters.length === 1
    ? (errorMessage = "Missing letter: " + missingLetters.join(", ") + ".")
    : missingLetters.length > 1
    ? (errorMessage = "Missing letters: " + missingLetters.join(", ") + ".")
    : (errorMessage = "");

  return [failed, errorMessage];
};

export default hardmodeHelper;
