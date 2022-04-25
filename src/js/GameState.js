export default class GameState {
  #gameState;
  static Menu = new GameState("menu");
  static Playing = new GameState("playing");
  static Lost = new GameState("lost");
  static Pause = new GameState("pause");

  constructor(gameState) {
    this.#gameState = gameState;
  }

  state() {
    return this.#gameState;
  }
}
