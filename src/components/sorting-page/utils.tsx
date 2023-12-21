import { Dispatch, SetStateAction } from "react";
import { TSortingForm } from "../../hooks/useForm.types";
import { getRandomNumber, sleep } from "../../utils/utils";
import { ColumnProps } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";

export const createNewArray = (values: TSortingForm, setValues: Dispatch<SetStateAction<TSortingForm>>) => {
  const minLength = 3;
  const maxLength = 17;
  const minNumber = 1;
  const maxNumber = 100;
  const volume = getRandomNumber(minLength, maxLength);
  const array = Array(volume);

  for (let i = 0; i < array.length; i++) {
    array[i] = { index: getRandomNumber(minNumber, maxNumber) };
  }

  setValues({ ...values, array })
}

const swap = (arr: Array<ColumnProps>, firstIndex: number, secondIndex: number): void => {
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
  arr[secondIndex].state = ElementStates.Modified;
};

export const choiceSorting = async (type: string, config: TSortingForm, setValues: Dispatch<SetStateAction<TSortingForm>>) => {
  for (let i = 0; i <= config.array.length - 1; i++) {
    await sleep(SHORT_DELAY_IN_MS);
    config.array[i] = { index: config.array[i].index, state: ElementStates.Changing };

    setValues({ ...config });

    let maxInd = i;
    for (let j = i + 1; j <= config.array.length - 1; j++) {
      config.array[j] = { index: config.array[j].index, state: ElementStates.Changing };

      setValues({ ...config });

      if (type === Direction.Ascending && config.array[j].index < config.array[maxInd].index) {
        maxInd = j;
      } else if (type === Direction.Descending && config.array[j].index > config.array[maxInd].index) {
        maxInd = j;
      }
      config.array[j] = { index: config.array[j].index, state: ElementStates.Default };
      await sleep(SHORT_DELAY_IN_MS);
    }

    config.array[i] = { index: config.array[i].index, state: ElementStates.Default };
    swap(config.array, maxInd, i)
    setValues({ ...config });
  }
}

export const bubbleSorting = async (type: string, config: TSortingForm, setValues: Dispatch<SetStateAction<TSortingForm>>) => {
  for (let i = 0; i < config.array.length; i++) {
    await sleep(SHORT_DELAY_IN_MS);
    setValues({ ...config })

    for (let j = 0; j < config.array.length - i - 1; j++) {
      config.array[j] = { index: config.array[j].index, state: ElementStates.Changing };
      config.array[j + 1] = { index: config.array[j + 1].index, state: ElementStates.Changing };

      setValues({ ...config });
      if (type === Direction.Ascending && config.array[j].index > config.array[j + 1].index) {
        swap(config.array, j + 1, j);
      } else if (type === Direction.Descending && config.array[j].index < config.array[j + 1].index) {
        swap(config.array, j + 1, j);
      }

      await sleep(SHORT_DELAY_IN_MS);
      config.array[j] = { index: config.array[j].index, state: ElementStates.Default };
      config.array[j + 1] = { index: config.array[j + 1].index, state: ElementStates.Default };
    }
    let lastIndex = config.array.length - i - 1;
    config.array[lastIndex] = { index: config.array[lastIndex].index, state: ElementStates.Modified };
    setValues({ ...config })
  }
}