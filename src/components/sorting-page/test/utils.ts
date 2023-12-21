import { Direction } from "../../../types/direction";

const swap = (arr: Array<number>, firstIndex: number, secondIndex: number) => {
  return ([arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]]);
};

export const choiceSorting = (arr: Array<number>, type: Direction) => {
  for (let i = 0; i <= arr.length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j <= arr.length - 1; j++) {
      if (type === Direction.Ascending && arr[j] < arr[maxInd]) {
        maxInd = j;
      } else if (type === Direction.Descending && arr[j] > arr[maxInd]) {
        maxInd = j;
      }
    }
    swap(arr, maxInd, i)
  }

  return arr;
}

export const bubbleSorting = (arr: Array<number>, type: Direction) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (type === Direction.Ascending && arr[j] > arr[j + 1]) {
        swap(arr, j + 1, j);
      } else if (type === Direction.Descending && arr[j] < arr[j + 1]) {
        swap(arr, j + 1, j);
      }
    }
  }

  return arr;
}