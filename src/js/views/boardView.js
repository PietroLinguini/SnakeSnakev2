import { ROW_COUNT, COLUMN_COUNT } from "../config.js";
import { randomInt } from "../helper.js";

const BOX_CLASSES = ["snake__head", "snake", "food"];

class BoardView {
  #parentElement = document.querySelector(".board");
  #playButtonContainer = document.querySelector(".play-button__container");
  #playButton = document.querySelector(".play-button");
  #data = {
    snake: {
      head: {},
      body: [],
    },
  };

  constructor() {
    this.#fillBoard(ROW_COUNT, COLUMN_COUNT);
  }

  addHandlerStartGame(handler) {
    this.#playButton.addEventListener("click", handler);
  }

  addHandlerMovement(handler) {
    document.addEventListener("keydown", handler);
  }

  #fillBoard(rowNum, colNum) {
    console.log(`row: ${ROW_COUNT}, columns: ${COLUMN_COUNT}`);
    for (let i = 0; i < rowNum; i++) {
      for (let k = 0; k < colNum; k++) {
        const box = document.createElement("div");
        box.setAttribute("id", `box__${i + 1}-${k + 1}`);
        box.classList.add("box");
        box.style.gridArea = `${i + 1} / ${k + 1} / span 1 / span 1`;
        this.#parentElement.appendChild(box);
      }
    }
    console.log("BOARD FILLED");
  }

  /**
   * Returns the ID for the div element specified by {@link arr}.
   * @param {[row: Number, column: Number]} arr An array. The first element of the array is the row and the second element is the column.
   * @returns {string} A string in the form "box__ROW-COLUMN".
   */
  #getBoxId(arr) {
    return `box__${arr[0]}-${arr[1]}`;
  }

  #getBox(arr) {
    return document.getElementById(this.#getBoxId(arr));
  }

  togglePlayButton() {
    this.#playButton.classList.toggle("hidden");
  }

  /**
   * Renders a snake on the board.
   * @param {{head: [row: number, column: number], body: [row: number, column: number][]}} snake An object containing a snake.
   */
  #renderSnake(snake) {
    this.#data.snake = snake;

    this.#getBox(this.#data.snake.head).classList.add("snake__head");

    this.#data.snake.body
      .map(arr => this.#getBox(arr))
      .forEach(box => box.classList.add("snake"));
  }

  /**
   * Renders an array of foods on the board.
   * @param {Set<[row: number, column: number]>} foods The foods to render.
   */
  #renderFood(foods) {
    Array.from(foods)
      .map(arr => this.#getBox(arr))
      .forEach(box => box.classList.add("food"));
  }

  /**
   * @param {{
   *  snake: {head: [row: Number, column: Number], body:[row: Number, column: Number][]}, foods: [row: number, column: number][]
   * }} board
   */
  renderBoard(board) {
    this.#clearBoard();
    this.#renderSnake(board.snake);
    this.#renderFood(board.foods);
  }

  #clearBoard() {
    Array.from(this.#parentElement.querySelectorAll(".box")).forEach(b =>
      this.#emptyBox(b)
    );
  }

  /**
   * "Empties" a box; specifically, it clears the box of any classes listed in {@link BOX_CLASSES}.
   * @param {Element} box An HTML element.
   */
  #emptyBox(box) {
    BOX_CLASSES.forEach(clazz => box.classList.remove(clazz));
  }

  /**
   * Renders a food on the board. If {@link clear} is set to true, it will clear a pre-existing food instead.
   * @param {[row: number, column: number]} space The row and column to render as food.
   * @param {boolean} clear Determines whether to render a food or clear a pre-existing food. False by default.
   */
  renderFood(space, clear = false) {
    const box = this.#getBox(space);
    if (!clear) box.classList.add("food");
    else box.classList.remove("food");
  }
}

export default new BoardView();
