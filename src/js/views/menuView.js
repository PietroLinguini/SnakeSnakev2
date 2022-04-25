import { ROW_COUNT, COLUMN_COUNT } from "../config.js";

class MenuView {
  #parentElement = document.querySelector(".container--menu");
  #playButton = document.querySelector(".play-button");

  constructor() {
    this.#playButton.addEventListener("mouseover", e => {
      this.#parentElement.style.boxShadow =
        "0 0 4.8rem 0.4rem var(--btn-border-color)";
    });

    this.#playButton.addEventListener("mouseout", e => {
      this.#parentElement.style.boxShadow = "";
    });
  }

  #styleMenu(prop, val) {
    this.#parentElement.style[prop] = val;
  }

  #fadeMenu() {
    this.#styleMenu("transition", "all .6s cubic-bezier(0.22, 0.61, 0.36, 1)");
    this.#styleMenu("opacity", "0");
    this.#styleMenu("pointerEvents", "none");
  }

  addHandlerStartGame(handler) {
    this.#playButton.addEventListener("click", e => {
      this.#fadeMenu();
      handler();
    });
  }
}

export default new MenuView();
