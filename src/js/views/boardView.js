import { ROW_COUNT, COLUMN_COUNT } from "../config.js";
import { randomInt } from "../helper.js";

class BoardView {
  #parentElement = document.querySelector(".board");
  #playButtonContainer = document.querySelector(".play-button__container");
  #playButton = document.querySelector(".play-button");

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

  #getBox(row, col) {
    return document.getElementById(`box__${row}-${col}`);
  }

  togglePlayButton() {
    this.#playButton.classList.toggle("hidden");
  }

  /**
   * Renders a snake on the board. If {@link clear} is set to true, it will clear a pre-existing snake instead.
   * @param {{head: [row: number, column: number], body: number[]}} snake An object containing a snake.
   * @param {boolean} clear A boolean determining whether to render a snake or clear a pre-existing snake. False by default.
   */
  renderSnake(snake, clear = false) {
    console.log(snake);
    const boxes = [snake.head];
    boxes
      .map(arr => this.#getBoxId(arr))
      .forEach(b => {
        const box = document.getElementById(b);
        if (clear) box.classList.remove("snake__head");
        else box.classList.add("snake__head");
      });
  }
}

export default new BoardView();
