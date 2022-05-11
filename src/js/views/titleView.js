class TitleView {
  #parentElement = document.querySelector(".container--title");
  #titleTxt = document.querySelector(".title");

  #styleTitle(prop, val) {
    this.#parentElement.style[prop] = val;
  }

  fadeOut() {
    this.#styleTitle("transition", "all .6s cubic-bezier(0.22, 0.61, 0.36, 1)");
    this.#styleTitle("transform", "translateY(-200%)");
    this.#styleTitle("margin", "0 auto");
  }
}

export default new TitleView();
