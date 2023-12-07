import React, { FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle, CircleProps } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { sleep } from "../../utils/utils";
import styles from './fibonacci-page.module.css';
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TFibonacciForm } from "../../hooks/useForm.types";

export const FibonacciPage: React.FC = () => {
  let fibonacciFirstNumber = 1;
  const maxNumber = 19;
  const initValues: TFibonacciForm = {
    number: 1,
    isButtonLoading: false,
    isInputDisabled: false,
    circleElements: [],
  }
  const { values, handleChange, setValues } = useForm(initValues);

  const isButtonDisabled = +values.number! < 1 || +values.number! > maxNumber;

  const startProcess = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { number } = values;
    const config: TFibonacciForm = {
      ...values,
      isButtonLoading: true,
      isInputDisabled: true,
      circleElements: [],
    }

    setValues({ ...config })

    let fibonacciPrevNumber = fibonacciFirstNumber;
    let fibonacciCurrNumber = fibonacciFirstNumber;
    let start = 1;
    let arr = [1, 1];

    for (start = 2; start <= number; start++) {
      const number = fibonacciPrevNumber + fibonacciCurrNumber;
      fibonacciPrevNumber = fibonacciCurrNumber;
      fibonacciCurrNumber = number;
      arr.push(number)
    }

    for (let i = 0; i < arr.length; i++) {
      config.circleElements.push({ letter: String(arr[i]) });

      setValues({ ...config })
      await sleep(SHORT_DELAY_IN_MS);
    }

    config.number = 1;
    config.isButtonLoading = false;
    config.isInputDisabled = false;
    setValues({ ...config })
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.block}>
        <form className={styles.form} onSubmit={startProcess}>
          <Input
            extraClass={styles.input}
            max={maxNumber}
            onChange={handleChange}
            value={values.number}
            disabled={values.isInputDisabled}
            isLimitText={true}
            type={'number'}
            name={'number'}
          />
          <Button 
            text = 'Развернуть'
            type = "submit"
            isLoader={values.isButtonLoading}
            disabled={isButtonDisabled}
          />
        </form>

        <div className={styles.circles}>
          { values.circleElements.map((el: CircleProps, index: number) => {
              return (<Circle letter={el.letter} state={el.state} index={index} key={crypto.randomUUID()}/>)
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
