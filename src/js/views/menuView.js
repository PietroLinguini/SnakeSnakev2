import { ROW_COUNT, COLUMN_COUNT } from "../config.js";

class MenuView {
  #parentElement = document.querySelector(".container--menu");
  #playButton = document.querySelector(".play-button");
  #allSettings = {};

  constructor() {
    this.#playButton.addEventListener("mouseover", e => {
      this.#parentElement.style.boxShadow =
        "0 0 4.8rem 0.4rem var(--btn-border-color)";
    });

    this.#playButton.addEventListener("mouseout", e => {
      this.#parentElement.style.boxShadow = "";
    });

    this.#registerSetting("tempo", document.querySelector(".setting--tempo"));

    this.#registerSetting("size", document.querySelector(".setting--size"));
  }

  #registerSetting(name, parentElement) {
    this.#allSettings[name] = new SettingView(name, parentElement);
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

  addHandlerScroll(handler) {
    for (const setting of Object.values(this.#allSettings)) {
      setting.addHandlerScroll(handler);
    }
  }
}

class SettingView {
  #parentElement;
  #name;
  /**
   * @type {[left: Node, right: Node]}
   * An array of two items: the left button and right button, in that order.
   */
  #btns;
  #optionsElement;
  #numOptions;

  constructor(name, parentElement) {
    this.#parentElement = parentElement;
    this.#name = name;
    this.#btns = this.#parentElement.querySelectorAll(".setting--btn");
    this.#optionsElement =
      this.#parentElement.querySelector(".setting--options");
    this.#numOptions = Number(this.#optionsElement.dataset.numOptions);
  }

  addHandlerScroll(handler) {
    this.#btns.forEach(btn =>
      btn.addEventListener("click", e => {
        handler(e, this);
      })
    );
  }

  scroll(option) {
    this.#optionsElement.style.transform = `translateX(-${option * 100}%)`;
  }

  getName() {
    return this.#name;
  }

  getNumOptions() {
    return this.#numOptions;
  }
}

export default new MenuView();
