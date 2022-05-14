import boardView from "./views/boardView.js";
import menuView from "./views/menuView.js";
import titleView from "./views/titleView.js";
import * as model from "./model.js";
import { randomInt } from "./helper.js";
import { getter as getSetting, update as updateConfig } from "./config.js";
import GameState from "./GameState.js";
import * as helper from "./helper.js";

function handleSettingScroll(e, setting) {
  const btn = e.target;
  const isLeft = btn.classList.contains("setting--btn--left");
  const name = setting.getName();

  let optionIndex = model.state.settings[name].getIndex();
  optionIndex = isLeft
    ? optionIndex === 0
      ? setting.getNumOptions() - 1
      : optionIndex - 1
    : optionIndex === setting.getNumOptions() - 1
    ? 0
    : optionIndex + 1;
  setting.scroll(optionIndex);
  model.state.settings[name].setIndex(optionIndex);
}

function handleStartGame() {
  updateConfig();
  model.initGame();

  boardView.initBoard(model.state.board);
  titleView.fadeOut();
}

let currentDir;
let moveInterval;
function handleMovement(e) {
  if (
    ((((currentDir === "w" || currentDir === "ArrowUp") &&
      (e.key === "s" || e.key === "ArrowDown")) ||
      ((currentDir === "a" || currentDir === "ArrowLeft") &&
        (e.key === "d" || e.key === "ArrowRight")) ||
      ((currentDir === "s" || currentDir === "ArrowDown") &&
        (e.key === "w" || e.key === "ArrowUp")) ||
      ((currentDir === "d" || currentDir === "ArrowRight") &&
        (e.key === "a" || e.key === "ArrowLeft"))) &&
      model.SNAKE.tail.length !== 0) ||
    model.state.gameState() != GameState.Playing
  )
    return;

  currentDir = e.key;

  doMove(currentDir);
  clearInterval(moveInterval);
  moveInterval = setInterval(() => {
    doMove(currentDir);
  }, getSetting.tempo());
}

function doMove(dir) {
  if (!dir) return;

  switch (dir) {
    case "w":
    case "ArrowUp":
      move(model.SNAKE, "up");
      break;
    case "a":
    case "ArrowLeft":
      move(model.SNAKE, "left");
      break;
    case "s":
    case "ArrowDown":
      move(model.SNAKE, "down");
      break;
    case "d":
    case "ArrowRight":
      move(model.SNAKE, "right");
      break;
    case "l":
      break;
  }

  boardView.renderBoard(model.state.board);
}

function move(snake, dir) {
  const [row, col] = snake.head;
  const headCopy = [row, col];
  let indexToMov = 0;
  let addend = -1;

  switch (dir) {
    case "up":
      break;
    case "left":
      indexToMov = 1;
      break;
    case "down":
      addend = 1;
      break;
    case "right":
      indexToMov = 1;
      addend = 1;
      break;
  }

  headCopy[indexToMov] += addend;

  if (!model.isFood(headCopy)) {
    if (!model.isEmptySpace(headCopy)) return endGame();
    model.shiftSnakeBody(headCopy);
  } else {
    model.removeFood(headCopy);
    model.growSnake(headCopy);
    model.spawnFood();
  }
}

function endGame() {
  console.error("GAME ENDED");
  clearInterval(moveInterval);
}

function init() {
  menuView.addHandlerStartGame(handleStartGame);
  menuView.addHandlerScroll(handleSettingScroll);
  boardView.addHandlerMovement(handleMovement);
}
init();
