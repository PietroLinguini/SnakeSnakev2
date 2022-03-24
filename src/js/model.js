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
 * The set of "empty" grid spaces. A grid space is empty if it does not have part of a snake body in it, or if it does not contain food in it. One based for CSS Grid.
 * @type {Set<Number[]>}
 */
const emptySpaces = new Set();
for (let i = 1; i <= ROW_COUNT; i++) {
  for (let k = 1; k <= COLUMN_COUNT; k++) {
    emptySpaces.add([i, k]);
  }
}

/**
 * @param {Number} fromTop How far the top margin should be from the top. 0 by default.
 * @param {Number} fromBottom How far the bottom margin should be from the bottom. 0 by default.
 * @returns A random valid row from the board between the bottom and top margins.
 */
const getRandomRow = (fromTop = 0, fromBottom = 0) =>
  randomInt(1 + fromTop, ROW_COUNT - fromBottom);

/**
 * @param {Number} fromLeft How far the left margin should be from the left. 0 by default.
 * @param {Number} fromRight How far the right margin should be from the right. 0 by default.
 * @returns A random valid column from the board between the left and right margins.
 */
const getRandomColumn = (fromLeft = 0, fromRight = 0) =>
  randomInt(1 + fromLeft, COLUMN_COUNT - fromRight);

/**
 * @param {Number} fromLeft How far the left margin should be from the left. 0 by default.
 * @param {Number} fromRight How far the right margin should be from the right. 0 by default.
 * @param {Number} fromTop How far the top margin should be from the top. 0 by default.
 * @param {Number} fromBottom How far the bottom margin should be from the bottom. 0 by default.
 * @param {Boolean} empty Whether or not the grid space should be empty; specifically, whether or not {@link emptySpaces} should contain the grid space. True by default.
 * @returns A random valid grid space from the board between the left, right, top, and bottom margins.
 */
const getRandomGridSpace = (
  fromLeft = 0,
  fromRight = 0,
  fromTop = 0,
  fromBottom = 0,
  empty = true
) =>
  empty
    ? getRandomElement(Array.from(emptySpaces.values()))
    : [getRandomRow(fromTop, fromBottom), getRandomColumn(fromLeft, fromRight)];

/**
 * Marks a grid space as "filled", or "empty" if {@link empty} is true. Specifically, it will remove the grid space from {@link emptySpaces}, or add to it if {@link empty} is true.
 * @param {[row: Number, column: Number]} space An array whose first element is the row number and second element is the column number.
 * @param {Boolean} empty True by default.
 */
function markGridSpace(space, empty = false) {
  const { row, column } = space;
}

export function createSnake() {
  SNAKE.head = getRandomGridSpace();
  SNAKE.body = [];
}
