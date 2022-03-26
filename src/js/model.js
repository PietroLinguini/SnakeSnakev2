import { ROW_COUNT, COLUMN_COUNT } from "./config.js";
import { randomInt, getRandomElement, parseBox } from "./helper.js";

export const state = {
  board: {
    /**
     * @type {{head: [row: Number, column: Number], body:[row: Number, column: Number][], tail:[row: Number, column: Number]}}
     */
    snake: {},
    foods: new Set(),
  },
};

export const { snake: SNAKE, foods: FOODS } = state.board;

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
 * @param {Boolean} mark If true, this function will call {@link markGridSpace}, passing in the returned value and {@link empty} as paramters. True by default.
 * @returns {[row: Number, column: Number]} A random valid grid space from the board within the left, right, top, and bottom margins.
 */
function getRandomGridSpace({
  fromLeft = 0,
  fromRight = 0,
  fromTop = 0,
  fromBottom = 0,
  empty = true,
  mark = true,
} = {}) {
  let space;

  if (empty) {
    const row = getRandomElement(
      Array.from(emptySpaces.keys()).slice(fromTop, ROW_COUNT - fromBottom)
    );

    const column = getRandomElement(
      emptySpaces[row].slice(fromLeft, COLUMN_COUNT - fromRight)
    );

    space = [row + 1, column];
  } else
    space = [
      getRandomRow(fromTop, fromBottom),
      getRandomColumn(fromLeft, fromRight),
    ];

  if (mark) markGridSpace(space, empty);
  return space;
}

/**
 * Marks a grid space as "filled", or "empty" if {@link markAsEmpty} is true. Specifically, it will remove the grid space from {@link emptySpaces}, or add to it if {@link markAsEmpty} is true.
 * @param {[row: Number, column: Number]} space An array whose first element is the row number and second element is the column number.
 * @param {Boolean} markAsEmpty False by default.
 */
function markGridSpace(space, markAsEmpty = false) {
  const [row, column] = space;

  if (markAsEmpty) {
    emptySpaces[row - 1].push(column);
    emptySpaces.sort();
  } else {
    emptySpaces[row - 1].splice(emptySpaces[row - 1].indexOf(column), 1);
  }
}

/**
 * Initializes a snake into {@link state.board.snake}
 */
function initSnake() {
  SNAKE.head = getRandomGridSpace({
    fromLeft: 2,
    fromRight: 2,
    fromTop: 2,
    fromBottom: 2,
  });
  SNAKE.body = [];
  SNAKE.tail = [];
}

export function spawnFood() {
  const box = getRandomGridSpace();
  FOODS.add("" + box);
  return box;
}

export function initGame() {
  initSnake();
  spawnFood();
}

/**
 * @param {[row: number, column: number]} box
 */
export const removeFood = box => FOODS.delete("" + box);

/**
 * Extends the snake by one unit, shifting the current head to the position specified by {@link newHead}
 * @param {[row: number, column: number]} newHead
 */
export function growSnake(newHead) {
  const oldHead = SNAKE.head;

  SNAKE.head = newHead;
  if (SNAKE.tail.length === 0) SNAKE.tail = oldHead;
  else pushIntoSnakeBody(oldHead);

  console.log(SNAKE);
}

/**
 * @param {[row: number, column: number]} newHead
 */
export function shiftSnakeBody(newHead) {
  const oldHead = SNAKE.head;
  SNAKE.head = newHead;

  if (SNAKE.tail.length === 0 && SNAKE.body.length === 0) return;

  if (SNAKE.body.length === 0) {
    SNAKE.tail = oldHead;
    return;
  }

  pushIntoSnakeBody(oldHead);
  SNAKE.tail = parseBox(SNAKE.body.splice(0, 1)[0]);
}
/**
 * Use this instead of {@link SNAKE.body.push}
 * @param {[row: number, column: number]} box
 */
function pushIntoSnakeBody(box) {
  SNAKE.body.push("" + box);
}
