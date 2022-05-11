import { ROW_COUNT, COLUMN_COUNT } from "../config.js";
import { parseBox } from "../helper.js";

const BOX_CLASSES = ["snake__head", "snake", "food"];

class BoardView {
  #parentElement = document.querySelector(".board");
  #data = {
    snake: {
      head: {},
      body: [],
    },
  };

  #styleBoard(prop, val) {
    this.#parentElement.style[prop] = val;
  }

  addHandlerMovement(handler) {
    document.addEventListener("keydown", handler);
  }

  #fillBoard(rowNum, colNum) {
    for (let i = 0; i < rowNum; i++) {
      for (let k = 0; k < colNum; k++) {
        const box = document.createElement("div");
        box.setAttribute("id", `box__${i + 1}-${k + 1}`);
        box.classList.add("box");
        box.style.zIndex = "-9990";
        box.style.gridArea = `${i + 1} / ${k + 1} / span 1 / span 1`;
        this.#parentElement.appendChild(box);
      }
    }
  }

  /**
   * Returns the ID for the div element specified by {@link arr}.
   * @param {[row: Number, column: Number]} arr An array. The first element of the array is the row and the second element is the column.
   * @returns {string} A string in the form "box__ROW-COLUMN".
   */
  #getBoxId(arr) {
    return `box__${arr[0]}-${arr[1]}`;
  }

  /**
   * @param {[row: number, column: number]} arr
   */
  #getBox(arr) {
    return document.getElementById(this.#getBoxId(arr));
  }

  /**
   * Renders a snake on the board.
   * @param {{head: [row: number, column: number], body: [row: number, column: number][], tail: [row: number, column: number]}} snake An object containing a snake.
   */
  #renderSnake(snake) {
    this.#data.snake = snake;

    this.#getBox(this.#data.snake.head).classList.add("snake__head");

    this.#setClass(this.#data.snake.body, "snake");

    this.#getBox(this.#data.snake.tail)?.classList.add("snake");
  }

  /**
   * Renders an array of foods on the board.
   * @param {Set<String>} foods The foods to render.
   */
  #renderFood(foods) {
    this.#setClass(Array.from(foods), "food");
  }

  initBoard(board) {
    this.#styleBoard("border", "2px solid var(--border-color-primary)");
    this.#styleBoard("boxShadow", "0 0 4.8rem 0.8rem var(--btn-border-color)");
    this.#styleBoard("width", "80vh");
    this.#styleBoard("height", "80vh");
    this.#clearBoard();
    this.#fillBoard(ROW_COUNT, COLUMN_COUNT);
    this.renderBoard(board);
  }

  /**
   * @param {{
   *  snake: {head: [row: Number, column: Number], body:[row: Number, column: Number][], tail: [row: number, column: number]}, foods: Set<String>
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
   * Sets the class of each element in an array of box-like strings.
   * @param {String[]} arr
   * @param {String} clazz
   */
  #setClass(arr, clazz) {
    arr
      .map(str => this.#getBox(parseBox(str)))
      .forEach(box => box.classList.add(clazz));
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
