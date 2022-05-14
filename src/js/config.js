let tempo = 0; // default value
let size = 0; // default value

const tempoMap = new Map([
  [0, 130],
  [1, 85],
  [2, 65],
  [3, 45],
]);
const sizeMap = new Map([
  [0, 12],
  [1, 18],
  [2, 30],
]);

export const getter = {
  rowCount() {
    return 12; // default value
  },
  colCount() {
    return 12; // default value
  },
  tempo() {
    return 25; // default value
  },
};

export const setter = {
  tempo(newTempo) {
    tempo = newTempo;
  },
  size(newSize) {
    size = newSize;
  },
};

export function update() {
  getter.rowCount = () => sizeMap.get(size);
  getter.colCount = () => sizeMap.get(size);
  getter.tempo = () => tempoMap.get(tempo);
}
