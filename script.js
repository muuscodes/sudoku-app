/* || VARIABLES */

let difficulty = null;
let currentBoard = [null];
let invalidInput = 0;
let timeoutMessage;
let timeoutAutoCheck;
let notification = "";

const easyArray = [
  [null, null, 3, null, null, 4, 5, null, 2],
  [null, 5, null, null, null, 3, null, null, null],
  [null, null, 8, null, null, 5, 3, 6, null],
  [null, null, null, 2, null, null, 7, 4, 3],
  [2, 7, null, 3, null, null, null, 8, null],
  [3, 4, null, 7, 5, null, null, null, null],
  [null, null, 5, 4, null, null, null, null, 6],
  [9, null, 2, null, null, null, null, 5, null],
  [4, null, null, null, null, 2, 9, null, null],
];
const mediumArray = [
  [null, null, null, 5, null, null, null, null, 6],
  [null, null, null, 8, 7, null, 3, null, 2],
  [2, 7, null, 3, null, null, null, 8, 1],
  [null, null, null, null, 3, 4, 9, null, null],
  [7, 9, 3, null, 5, null, 6, 1, 4],
  [null, null, 8, 7, 9, null, null, null, null],
  [9, 2, null, null, null, 3, null, 5, 7],
  [5, null, 6, null, 8, 7, null, null, null],
  [3, null, null, null, null, 5, null, null, null],
];
const hardArray = [
  [null, null, null, null, null, 2, null, null, null],
  [1, null, 3, 4, null, null, null, null, 5],
  [2, null, null, null, 5, null, 4, null, 1],
  [3, 4, null, null, null, 5, null, 9, null],
  [8, null, 7, null, null, null, 3, null, 4],
  [null, 9, null, 3, null, null, null, 1, 7],
  [6, null, 5, null, 3, null, null, null, 9],
  [4, null, null, null, null, 8, 7, null, 2],
  [null, null, null, 1, null, null, null, null, null],
];
const easySolution = [
  [7, 9, 3, 8, 6, 4, 5, 1, 2],
  [6, 5, 4, 1, 2, 3, 8, 9, 7],
  [1, 2, 8, 9, 7, 5, 3, 6, 4],
  [5, 8, 6, 2, 1, 9, 7, 4, 3],
  [2, 7, 9, 3, 4, 6, 1, 8, 5],
  [3, 4, 1, 7, 5, 8, 6, 2, 9],
  [8, 3, 5, 4, 9, 1, 2, 7, 6],
  [9, 1, 2, 6, 3, 7, 4, 5, 8],
  [4, 6, 7, 5, 8, 2, 9, 3, 1],
];
const mediumSolution = [
  [8, 3, 4, 5, 1, 2, 7, 9, 6],
  [6, 1, 5, 8, 7, 9, 3, 4, 2],
  [2, 7, 9, 3, 4, 6, 5, 8, 1],
  [1, 5, 2, 6, 3, 4, 9, 7, 8],
  [7, 9, 3, 2, 5, 8, 6, 1, 4],
  [4, 6, 8, 7, 9, 1, 2, 3, 5],
  [9, 2, 1, 4, 6, 3, 8, 5, 7],
  [5, 4, 6, 9, 8, 7, 1, 2, 3],
  [3, 8, 7, 1, 2, 5, 4, 6, 9],
];
const hardSolution = [
  [9, 5, 4, 7, 1, 2, 6, 8, 3],
  [1, 7, 3, 4, 8, 6, 9, 2, 5],
  [2, 6, 8, 9, 5, 3, 4, 7, 1],
  [3, 4, 1, 8, 7, 5, 2, 9, 6],
  [8, 2, 7, 6, 9, 1, 3, 5, 4],
  [5, 9, 6, 3, 2, 4, 8, 1, 7],
  [6, 8, 5, 2, 3, 7, 1, 4, 9],
  [4, 1, 9, 5, 6, 8, 7, 3, 2],
  [7, 3, 2, 1, 4, 9, 5, 6, 8],
];

const easyBtn = document.getElementById("easy-btn");
const mediumBtn = document.getElementById("medium-btn");
const hardBtn = document.getElementById("hard-btn");
const boxes = document.querySelectorAll("[data-row][data-col]");
const notificationEl = document.getElementById("notification");
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("reset-btn");
const inputContainer = document.querySelector(".container");
const difficultyBtnColor = "rgba(186, 130, 27)";

/* || EVENT LISTENERS */

easyBtn.addEventListener("click", function () {
  resetBoard("easy", easyArray);
  difficulty = "easy";
  easyBtn.style.background = difficultyBtnColor;
  mediumBtn.style.background = "";
  hardBtn.style.background = "";
  initializeGameBoard(easyArray);
});

mediumBtn.addEventListener("click", function () {
  resetBoard("medium", mediumArray);
  difficulty = "medium";
  easyBtn.style.background = "";
  mediumBtn.style.background = difficultyBtnColor;
  hardBtn.style.background = "";
  initializeGameBoard(mediumArray);
});

hardBtn.addEventListener("click", function () {
  resetBoard("hard", hardArray);
  difficulty = "hard";
  easyBtn.style.background = "";
  mediumBtn.style.background = "";
  hardBtn.style.background = difficultyBtnColor;
  initializeGameBoard(hardArray);
});

checkBtn.addEventListener("click", function () {
  if (
    difficulty == "easy" &&
    JSON.stringify(currentBoard) == JSON.stringify(easySolution)
  ) {
    notification = `Nice! Now actually challenge 
    yourself with Medium or Hard`;
    showMessage(notification, true);
  } else if (
    difficulty == "medium" &&
    JSON.stringify(currentBoard) == JSON.stringify(mediumSolution)
  ) {
    notification = `Great job! Wanna try the hard puzzle?`;
    showMessage(notification, true);
  } else if (
    difficulty == "hard" &&
    JSON.stringify(currentBoard) == JSON.stringify(hardSolution)
  ) {
    notification = `Wow! Look at you go!`;
    showMessage(notification, true);
  } else if (arrayHasNull(currentBoard)) {
    notification = `Please fill the board with numbers 1-9`;
    showMessage(notification, false);
  } else {
    notification = `Sorry, there is at least one error!`;
    showMessage(notification, false);
  }
});

resetBtn.addEventListener("click", function () {
  switch (difficulty) {
    case "easy":
      resetBoard("easy", easyArray);
      break;
    case "medium":
      resetBoard("medium", mediumArray);
      break;
    case "hard":
      resetBoard("hard", hardArray);
      break;
  }
});

inputContainer.addEventListener("input", handleInput);

/* || FUNCTIONS */

function startGame() {
  difficulty = "easy";
  easyBtn.style.background = difficultyBtnColor;
  initializeGameBoard(easyArray);
}

function initializeGameBoard(array) {
  currentBoard = array.map((row) => row.slice());
  boxes.forEach((box) => {
    let inputEl = box.querySelector("input");
    const r = parseInt(box.dataset.row) - 1;
    const c = parseInt(box.dataset.col) - 1;

    if (array[r][c] !== null) {
      inputEl.value = array[r][c];
      inputEl.disabled = true;
    } else {
      inputEl.value = "";
      inputEl.disabled = false;
    }
  });
}

function handleInput(event) {
  if (event.target.tagName === "INPUT") {
    const parentDiv = event.target.parentElement;
    const row = parseInt(parentDiv.getAttribute("data-row")) - 1;
    const col = parseInt(parentDiv.getAttribute("data-col")) - 1;
    const numValue = parseInt(event.target.value);

    // If the user erases an input
    if (event.target.value === "") {
      currentBoard[row][col] = null;
      invalidInput -= 1;
    } // Invalid input
    else if (!numValue || numValue === 0) {
      notification = `Please enter a number between 1-9`;
      showMessage(notification, false);
      currentBoard[row][col] = null;
      invalidInput += 1;
    } else {
      autoCheck(row, col, numValue);
      currentBoard[row][col] = numValue;
    }
  }
}

function resetBoard(difficulty, array) {
  boxes.forEach((box) => {
    let inputEl = box.querySelector("input");
    if (inputEl) {
      inputEl.value = "";
    }
    box.style.background = "";
  });

  switch (difficulty) {
    case "easy":
      mediumBtn.style.background = "";
      hardBtn.style.background = "";
      break;
    case "medium":
      easyBtn.style.background = "";
      hardBtn.style.background = "";
      break;
    case "hard":
      easyBtn.style.background = "";
      mediumBtn.style.background = "";
      break;
  }
  initializeGameBoard(array);
  invalidInput = 0;
  notification = "";
}

function showMessage(text, win) {
  notificationEl.textContent = text;
  notificationEl.style.opacity = "1";
  clearTimeout(timeoutMessage);

  if (win) {
    document.documentElement.style.backgroundColor = "lightgreen";
    timeoutMessage = setTimeout(() => {
      notificationEl.style.opacity = "0";
      document.documentElement.style.backgroundColor = "";
      setTimeout(() => {
        notificationEl.textContent = "";
      }, 500);
    }, 5000);
  } else {
    timeoutMessage = setTimeout(() => {
      notificationEl.style.opacity = "0";
      setTimeout(() => {
        notificationEl.textContent = "";
      }, 500);
    }, 3000);
  }
}

function arrayHasNull(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === null) {
        return true;
      }
    }
  }
  return false;
}

function autoCheck(row, col, value) {
  let rowArr = currentBoard[row];
  rowArr[col] = null;
  let colArr = [];
  const colIndexOfRowArr = rowArr.indexOf(value);

  for (let i = 0; i < 9; i++) {
    colArr.push(currentBoard[i][col]);
  }

  const rowIndexOfColArr = colArr.indexOf(value);
  const boxArr = createBoxArr(row, col, value);
  const isInBox = boxArr[0];
  const boxNumRow = boxArr[1];
  const boxNumCol = boxArr[2];

  if (colIndexOfRowArr >= 0 && rowIndexOfColArr >= 0 && isInBox > 0) {
    rowValueHighlight(row, colIndexOfRowArr);
    colValueHighlight(rowIndexOfColArr, col);
    boxValueHighlight(boxNumRow, boxNumCol);
  } else if (rowIndexOfColArr > -1 && colIndexOfRowArr < 0 && isInBox > 0) {
    colValueHighlight(rowIndexOfColArr, col);
    boxValueHighlight(boxNumRow, boxNumCol);
  } else if (rowIndexOfColArr < 0 && colIndexOfRowArr > -1 && isInBox > 0) {
    rowValueHighlight(row, colIndexOfRowArr);
    boxValueHighlight(boxNumRow, boxNumCol);
  } else if (rowIndexOfColArr > -1 && colIndexOfRowArr > -1 && isInBox < 0) {
    rowValueHighlight(row, colIndexOfRowArr);
    colValueHighlight(rowIndexOfColArr, col);
  } else if (rowIndexOfColArr > -1 && colIndexOfRowArr < 0 && isInBox < 0) {
    colValueHighlight(rowIndexOfColArr, col);
  } else if (rowIndexOfColArr < 0 && colIndexOfRowArr > -1 && isInBox < 0) {
    rowValueHighlight(row, colIndexOfRowArr);
  } else if (rowIndexOfColArr < 0 && colIndexOfRowArr < 0 && isInBox > 0) {
    boxValueHighlight(boxNumRow, boxNumCol);
  }
}

function createBoxArr(row, col, value) {
  const boxArr = [];
  let isInBox = -1;
  let boxNumRow;
  let boxNumCol;

  if (row < 3 && col < 3) {
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        boxArr.push(currentBoard[i][j]);
      }
    }
    const index = boxArr.indexOf(value);
    const boxIndexArr = boxBoardIndex(index);
    isInBox = boxIndexArr[0];
    boxNumRow = boxIndexArr[1];
    boxNumCol = boxIndexArr[2];
    return [isInBox, boxNumRow, boxNumCol];
  } else if (row < 3 && col > 2 && col < 6) {
    for (i = 0; i < 3; i++) {
      for (j = 3; j < 6; j++) {
        boxArr.push(currentBoard[i][j]);
      }
    }
    const index = boxArr.indexOf(value);
    const boxIndexArr = boxBoardIndex(index);
    isInBox = boxIndexArr[0];
    boxNumRow = boxIndexArr[1];
    boxNumCol = boxIndexArr[2] + 3;
    return [isInBox, boxNumRow, boxNumCol];
  } else if (row < 3 && col > 5 && col < 9) {
    for (i = 0; i < 3; i++) {
      for (j = 6; j < 9; j++) {
        boxArr.push(currentBoard[i][j]);
      }
    }
    const index = boxArr.indexOf(value);
    const boxIndexArr = boxBoardIndex(index);
    isInBox = boxIndexArr[0];
    boxNumRow = boxIndexArr[1];
    boxNumCol = boxIndexArr[2] + 6;
    return [isInBox, boxNumRow, boxNumCol];
  } else if (row > 2 && row < 6 && col < 3) {
    for (i = 3; i < 6; i++) {
      for (j = 0; j < 3; j++) {
        boxArr.push(currentBoard[i][j]);
      }
    }
    const index = boxArr.indexOf(value);
    const boxIndexArr = boxBoardIndex(index);
    isInBox = boxIndexArr[0];
    boxNumRow = boxIndexArr[1] + 3;
    boxNumCol = boxIndexArr[2];
    return [isInBox, boxNumRow, boxNumCol];
  } else if (row > 2 && row < 6 && col > 2 && col < 6) {
    for (i = 3; i < 6; i++) {
      for (j = 3; j < 6; j++) {
        boxArr.push(currentBoard[i][j]);
      }
    }
    const index = boxArr.indexOf(value);
    const boxIndexArr = boxBoardIndex(index);
    isInBox = boxIndexArr[0];
    boxNumRow = boxIndexArr[1] + 3;
    boxNumCol = boxIndexArr[2] + 3;
    return [isInBox, boxNumRow, boxNumCol];
  } else if (row > 2 && row < 6 && col > 5 && col < 9) {
    for (i = 3; i < 6; i++) {
      for (j = 6; j < 9; j++) {
        boxArr.push(currentBoard[i][j]);
      }
    }
    const index = boxArr.indexOf(value);
    const boxIndexArr = boxBoardIndex(index);
    isInBox = boxIndexArr[0];
    boxNumRow = boxIndexArr[1] + 3;
    boxNumCol = boxIndexArr[2] + 6;
    return [isInBox, boxNumRow, boxNumCol];
  } else if (row > 5 && row < 9 && col < 3) {
    for (i = 6; i < 9; i++) {
      for (j = 0; j < 3; j++) {
        boxArr.push(currentBoard[i][j]);
      }
    }
    const index = boxArr.indexOf(value);
    const boxIndexArr = boxBoardIndex(index);
    isInBox = boxIndexArr[0];
    boxNumRow = boxIndexArr[1] + 6;
    boxNumCol = boxIndexArr[2];
    return [isInBox, boxNumRow, boxNumCol];
  } else if (row > 5 && row < 9 && col > 2 && col < 6) {
    for (i = 6; i < 9; i++) {
      for (j = 3; j < 6; j++) {
        boxArr.push(currentBoard[i][j]);
      }
    }
    const index = boxArr.indexOf(value);
    const boxIndexArr = boxBoardIndex(index);
    isInBox = boxIndexArr[0];
    boxNumRow = boxIndexArr[1] + 6;
    boxNumCol = boxIndexArr[2] + 3;
    return [isInBox, boxNumRow, boxNumCol];
  } else {
    for (i = 6; i < 9; i++) {
      for (j = 6; j < 9; j++) {
        boxArr.push(currentBoard[i][j]);
      }
    }
    const index = boxArr.indexOf(value);
    const boxIndexArr = boxBoardIndex(index);
    isInBox = boxIndexArr[0];
    boxNumRow = boxIndexArr[1] + 6;
    boxNumCol = boxIndexArr[2] + 6;
    return [isInBox, boxNumRow, boxNumCol];
  }
}

function boxBoardIndex(index) {
  let row = 0;
  let col = 0;
  let valueExists = -1;

  if (index > -1) {
    valueExists = 1;
    if (index < 3) {
      row = 0;
      col = index;
    }
    if (index > 2 && index < 6) {
      row = 1;
      col = index - 3;
    }
    if (index > 5) {
      row = 2;
      col = index - 6;
    }
  }
  return [valueExists, row, col];
}

function rowValueHighlight(row, col) {
  const indexOfValue = row * 9 + col;
  const inputEl = boxes[indexOfValue].querySelector("input");

  inputEl.style.color = "red";
  boxes[indexOfValue].style.border = "3px solid red";
  setTimeout(() => {
    inputEl.style.color = "";
    boxes[indexOfValue].style.border = "";
  }, 1000);
}

function colValueHighlight(row, col) {
  const indexOfValue = row * 9 + col;
  const inputEl = boxes[indexOfValue].querySelector("input");

  inputEl.style.color = "red";
  boxes[indexOfValue].style.border = "3px solid red";
  setTimeout(() => {
    inputEl.style.color = "";
    boxes[indexOfValue].style.border = "";
  }, 1000);
}

function boxValueHighlight(row, col) {
  const indexOfValue = row * 9 + col;
  const inputEl = boxes[indexOfValue].querySelector("input");

  inputEl.style.color = "red";
  boxes[indexOfValue].style.border = "3px solid red";
  setTimeout(() => {
    inputEl.style.color = "";
    boxes[indexOfValue].style.border = "";
  }, 1000);
}

/* INITIALIZE GAME */

startGame();
