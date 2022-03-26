import boardView from "./views/boardView.js";
import * as model from "./model.js";
import { randomInt } from "./helper.js";
import { ROW_COUNT, COLUMN_COUNT } from "./config.js";

function handleStartGame() {
  model.initSnake();
  model.spawnFood();

  boardView.renderBoard(model.state.board);
  boardView.togglePlayButton();
}

function handleMovement(e) {
  switch (e.key) {
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
      if (row - 1 < 1) return endGame();
      break;
    case "left":
      if (col - 1 < 1) return endGame();
      indexToMov = 1;
      break;
    case "down":
      if (row + 1 > ROW_COUNT) return endGame();
      addend = 1;
      break;
    case "right":
      if (col + 1 > COLUMN_COUNT) return endGame();
      indexToMov = 1;
      addend = 1;
      break;
  }

  snake.head[indexToMov] += addend;

  if (isFood(snake.head)) {
    model.SNAKE.body.push(headCopy);
  }
}

/**
 * Determines whether or not the box at {@link box} contains food.
 * @param {[row: number, box: number]} box
 * @returns A boolean.
 */
const isFood = box => model.FOODS.has(box);

function endGame() {
  console.error("GAME ENDED");
}

function init() {
  boardView.addHandlerStartGame(handleStartGame);
  boardView.addHandlerMovement(handleMovement);
}
init();
