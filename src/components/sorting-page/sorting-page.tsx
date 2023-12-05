import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { getRandomNumber, sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import styles from './sorting-page.module.css';
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { Radio } from "../../hooks/hooks.types";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({
    array: [],
    isButtonLoading: false,
    isButtonDisabled: false,
    isInputDisabled: false,
    radioInput: Radio.Choice,
  });

  const createNewArray = () => {
    const minLength = 3;
    const maxLength = 17;
    const minNumber = 1;
    const maxNumber = 100;
    const volume = getRandomNumber(minLength, maxLength);
    const array = Array(volume);

    for (let i = 0; i < array.length; i++) {
      array[i] = <Column index={getRandomNumber(minNumber, maxNumber)} key={i}/>;
    }

    setValues({ ...values, array })
  }

  const swap = (arr: JSX.Element[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = <Column index={temp.props.index} key={temp.key} state={ElementStates.Modified}/>;
  };

  const choiceSorting = async (type: string) => {
    const arr = values.array!;
    for (let i = 0; i <= arr.length - 1; i++) {
      await sleep(SHORT_DELAY_IN_MS);
      arr[i] = <Column index={arr[i].props.index} key={arr[i].key} state={ElementStates.Changing}/>;

      setValues({ ...values, array: arr, isButtonLoading: true, isButtonDisabled: true, isInputDisabled: true  })

      let maxInd = i;
      for (let j = i + 1; j <= arr.length - 1; j++) {
        arr[j] = <Column index={arr[j].props.index} key={arr[j].key} state={ElementStates.Changing}/>;

        setValues({ ...values, array: arr, isButtonLoading: true, isButtonDisabled: true, isInputDisabled: true  })

        if (type === Direction.Ascending && arr[j].props.index < arr[maxInd].props.index) {
          maxInd = j;
        } else if (type === Direction.Descending && arr[j].props.index > arr[maxInd].props.index) {
          maxInd = j;
        }
        arr[j] = <Column index={arr[j].props.index} key={arr[j].key} state={ElementStates.Default}/>;
        await sleep(SHORT_DELAY_IN_MS);
      }

      arr[i] = <Column index={arr[i].props.index} key={arr[i].key} state={ElementStates.Default}/>;
      swap(arr, maxInd, i)
      setValues({ ...values, array: arr, isButtonLoading: true, isButtonDisabled: true, isInputDisabled: true  })
    }
  }

  const bubbleSorting = async (type: string) => {
    const arr = values.array!;
    for (let i = 0; i < arr.length; i++) {
      await sleep(SHORT_DELAY_IN_MS);
      setValues({ ...values, array: arr, isButtonLoading: true, isButtonDisabled: true, isInputDisabled: true  })

      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j] = <Column index={arr[j].props.index} key={arr[j].key} state={ElementStates.Changing}/>;
        arr[j + 1] = <Column index={arr[j + 1].props.index} key={arr[j + 1].key} state={ElementStates.Changing}/>;

        setValues({ ...values, array: arr, isButtonLoading: true, isButtonDisabled: true, isInputDisabled: true  })
        if (type === Direction.Ascending && arr[j].props.index > arr[j + 1].props.index) {
          swap(arr, j + 1, j);
        } else if (type === Direction.Descending && arr[j].props.index < arr[j + 1].props.index) {
          swap(arr, j + 1, j);
        }

        await sleep(SHORT_DELAY_IN_MS);
        arr[j] = <Column index={arr[j].props.index} key={arr[j].key} state={ElementStates.Default}/>;
        arr[j + 1] = <Column index={arr[j + 1].props.index} key={arr[j + 1].key} state={ElementStates.Default}/>;
      }
      let lastIndex = arr.length - i - 1;
      arr[lastIndex] = <Column index={arr[lastIndex].props.index} key={arr[lastIndex].key} state={ElementStates.Modified}/>;
      setValues({ ...values, array: arr, isButtonLoading: true, isButtonDisabled: true, isInputDisabled: true  })
    }
  }

  const startProcess = async (type: string) => {
    setValues({ ...values, isButtonLoading: true, isButtonDisabled: true, isInputDisabled: true })

    if (values.radioInput === Radio.Choice) {
      await choiceSorting(type)
    } else {
      await bubbleSorting(type)
    }

    setValues({ ...values, isButtonLoading: false, isButtonDisabled: false, isInputDisabled: false })
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.block}>
        <form className={styles.form}>
          <div className={styles.radio}>
            <RadioInput label={'Выбор'} name={'radioInput'} value={'choice'} disabled={values.isInputDisabled} onClick={(e) => handleChange(e)} checked={values.radioInput === Radio.Choice}/>
            <RadioInput label={'Пузырёк'} name={'radioInput'} value={'bubble'}  disabled={values.isInputDisabled} onClick={(e) => handleChange(e)} checked={values.radioInput === Radio.Bubble}/>
          </div>
          <div className={styles.sorting}>
            <Button 
              text = 'По возрастанию'
              type = "button"
              sorting={Direction.Ascending}
              disabled={values.isButtonDisabled}
              onClick={() => startProcess(Direction.Ascending)}
            />
            <Button 
              text = 'По убыванию'
              type = "button"
              sorting={Direction.Descending}
              disabled={values.isButtonDisabled}
              onClick={() => startProcess(Direction.Descending)}
            />
          </div>
          <Button 
            text = 'Новый массив'
            type = "button"
            isLoader={values.isButtonLoading}
            onClick={createNewArray}
          />
        </form>

        <div className={styles.columns}>
          { !!values.array!.length && values.array}
        </div>
      </div>
    </SolutionLayout>
  );
};
