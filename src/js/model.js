import { ROW_COUNT, COLUMN_COUNT } from "./config.js";
import { randomInt, getRandomElement } from "./helper.js";

export const state = {
  board: {
    snake: {},
    food: new Set(),
  },
};

export const { snake: SNAKE, food: FOOD } = state.board;

/**
 * @type {[rows: number[]]}
 */
const emptySpaces = Array(ROW_COUNT).fill(
  [...Array(COLUMN_COUNT).keys()].map(i => i + 1)
);

/**
 * @param {Number} fromTop How far the top margin should be from the top. 0 by default.
 * @param {Number} fromBottom How far the bottom margin should be from the bottom. 0 by default.
 * @returns A random valid row from the board within the bottom and top margins.
 */
const getRandomRow = (fromTop = 0, fromBottom = 0) =>
  randomInt(1 + fromTop, ROW_COUNT - fromBottom);

/**
 * @param {Number} fromLeft How far the left margin should be from the left. 0 by default.
 * @param {Number} fromRight How far the right margin should be from the right. 0 by default.
 * @returns A random valid column from the board within the left and right margins.
 */
const getRandomColumn = (fromLeft = 0, fromRight = 0) =>
  randomInt(1 + fromLeft, COLUMN_COUNT - fromRight);

/**
 * @param {Number} fromLeft How far the left margin should be from the left. 0 by default.
 * @param {Number} fromRight How far the right margin should be from the right. 0 by default.
 * @param {Number} fromTop How far the top margin should be from the top. 0 by default.
 * @param {Number} fromBottom How far the bottom margin should be from the bottom. 0 by default.
 * @param {Boolean} empty Whether or not the grid space should be empty; specifically, whether or not {@link emptySpaces} should contain the grid space. True by default.
 * @returns A random valid grid space from the board within the left, right, top, and bottom margins.
 */
const getRandomGridSpace = (
  fromLeft = 0,
  fromRight = 0,
  fromTop = 0,
  fromBottom = 0,
  empty = true
) => {
  if (empty) {
    const row = getRandomElement(
      Array.from(emptySpaces.keys()).slice(fromTop, ROW_COUNT - fromLeft)
    );

    const column = getRandomElement(
      emptySpaces[row].slice(fromLeft, COLUMN_COUNT - fromRight)
    );

    return [row, column];
  } else
    return [
      getRandomRow(fromTop, fromBottom),
      getRandomColumn(fromLeft, fromRight),
    ];
};

/**
 * Marks a grid space as "filled", or "empty" if {@link markAsEmpty} is true. Specifically, it will remove the grid space from {@link emptySpaces}, or add to it if {@link markAsEmpty} is true.
 * @param {[row: Number, column: Number]} space An array whose first element is the row number and second element is the column number.
 * @param {Boolean} markAsEmpty False by default.
 */
function markGridSpace(space, markAsEmpty = false) {
  const { row, column } = space;

  if (markAsEmpty) {
    emptySpaces[row].push(column);
    emptySpaces.sort();
  } else {
    emptySpaces[row].splice(emptySpaces[row].indexOf(column), 1);
  }
}

/**
 * Initializes a snake ({@link state.board.snake})
 */
export function initSnake() {
  SNAKE.head = getRandomGridSpace();
  markGridSpace(SNAKE.head);
  SNAKE.body = [];
}
