import React, { FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { sleep } from "../../utils/utils";
import styles from './fibonacci-page.module.css';
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const FibonacciPage: React.FC = () => {
  let fibonacciFirstNumber = 1;
  const maxNumber = 19;
  const { values, handleChange, setValues } = useForm({
    number: 1,
    isButtonLoading: false,
    isInputDisabled: false,
    circleElements: [],
  });

  const isButtonDisabled = +values.number! < 1 || +values.number! > maxNumber;

  const startProcess = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { number } = values;

    setValues({ number: 1, isButtonLoading: true, isInputDisabled: true })

    renderElements(number!);
  }

  const renderElements = async (number: number) => {
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
    let circleElements: Array<JSX.Element> = [];

    for (let i = 0; i < arr.length; i++) {
      circleElements.push(<Circle letter={String(arr[i])} key={i} index={i}/>);

      setValues({ number: 1, isButtonLoading: true, circleElements })
      await sleep(SHORT_DELAY_IN_MS);
    }

    setValues({ number: 1, circleElements, isButtonLoading: false, isInputDisabled: false })
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
          { !!values.circleElements!.length && values.circleElements}
        </div>
      </div>
    </SolutionLayout>
  );
};
