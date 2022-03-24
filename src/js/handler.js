import boardView from "./views/boardView.js";
import * as model from "./model.js";
import { randomInt } from "./helper.js";
import { ROW_COUNT, COLUMN_COUNT } from "./config.js";

function handleStartGame() {
  model.createSnake();

  boardView.renderSnake(model.SNAKE);
  boardView.togglePlayButton();
}

function handleMovement(e) {
  boardView.renderSnake(model.SNAKE, true);
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
  boardView.renderSnake(model.SNAKE);
}

function move(snake, dir) {
  const [row, col] = snake.head;

  switch (dir) {
    case "up":
      if (row - 1 < 1) return endGame();
      snake.head[0]--;
      break;
    case "left":
      if (col - 1 < 1) return endGame();
      snake.head[1]--;
      break;
    case "down":
      if (row + 1 > ROW_COUNT) return endGame();
      snake.head[0]++;
      break;
    case "right":
      if (col + 1 > COLUMN_COUNT) return endGame();
      snake.head[1]++;
      break;
  }
}

function endGame() {
  console.error("GAME ENDED");
}

function init() {
  boardView.addHandlerStartGame(handleStartGame);
  boardView.addHandlerMovement(handleMovement);
}
init();
