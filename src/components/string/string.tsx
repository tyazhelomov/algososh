import React, { FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from '../../constants/delays';
import { sleep } from "../../utils/utils";

export const StringComponent: React.FC = () => {
  const { values, handleChange, setValues } = useForm({
    text: '',
    isButtonLoading: false,
    isInputDisabled: false,
    circleElements: [],
  });

  const isButtonDisabled = !values.text;

  const startProcess = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { text } = values;
    const circleElements = text!.split('').map((el, index) => <Circle state={ElementStates.Default} letter={el} key={index} />);

    setValues({ text: '', isButtonLoading: true, isInputDisabled: true, circleElements })

    renderElements(circleElements);
  }

  const renderElements = async (circleElements: JSX.Element[]) => {
    const { text } = values;

    await sleep(DELAY_IN_MS);
    for (let start = 0, end = circleElements!.length - 1; start <= end; start++, end--) {

      const first = text![start];
      const second = text![end];
      circleElements![start] = <Circle state={ElementStates.Changing} letter={first} key={start} />;
      circleElements![end] = <Circle state={ElementStates.Changing} letter={second} key={end} />;

      setValues({ text: '', isButtonLoading: true, circleElements })

      await sleep(DELAY_IN_MS);

      const firstDone = <Circle state={ElementStates.Modified} letter={first} key={start} />;
      const secondDone = <Circle state={ElementStates.Modified} letter={second} key={end} />;
      circleElements![start] = secondDone;
      circleElements![end] = firstDone;

      setValues({ text: '', isButtonLoading: true, circleElements })
    }

    setValues({ text: '', circleElements, isButtonLoading: false, isInputDisabled: false })
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.block}>
        <form className={styles.form} onSubmit={startProcess}>
          <Input
            extraClass={styles.input}
            isLimitText = {true}
            maxLength = {11}
            onChange={handleChange}
            value={values.text}
            name={'text'}
            type={'text'}
            disabled={values.isInputDisabled}
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
