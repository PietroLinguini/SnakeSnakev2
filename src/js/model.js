import { ROW_COUNT, COLUMN_COUNT } from "./config.js";
import { randomInt } from "./helper.js";

export const state = {};

const getRandomRow = () => randomInt(1, ROW_COUNT);
const getRandomColumn = () => randomInt(1, COLUMN_COUNT);
const getRandomGridSpace = () => [getRandomRow(), getRandomColumn()];

export function createSnake() {
  if (state.snake) delete state.snake;
  state.snake = {
    head: getRandomGridSpace(),
    body: {},
  };
}
