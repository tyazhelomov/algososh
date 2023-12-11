import React, { FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle, CircleProps } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from '../../constants/delays';
import { sleep } from "../../utils/utils";
import { getReversingString, reverseString } from "./utils";
import { TCircleForm } from "../../hooks/useForm.types";

export const StringComponent: React.FC = () => {
  const initValues: TCircleForm = {
    text: '',
    isButtonLoading: false,
    isInputDisabled: false,
    circleElements: [],
  }
  const { values, handleChange, setValues } = useForm(initValues);

  const isButtonDisabled = !values.text;

  const process = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const letters = getReversingString(values.text);
    const config: TCircleForm = {
      ...values,
      isButtonLoading: true,
      isInputDisabled: true,
      circleElements: letters,
    }

    for (let start = 0, end = config.circleElements.length - 1; start <= end; start++, end--) {
      [config.circleElements[start].state, config.circleElements[end].state] = [ElementStates.Changing, ElementStates.Changing];

      setValues({ ...config })

      await sleep(DELAY_IN_MS);

      reverseString(config.circleElements, start, end);
      [config.circleElements[start].state, config.circleElements[end].state] = [ElementStates.Modified, ElementStates.Modified];

      setValues({ ...config })
    }

    setValues({ ...config });

    config.text = '';
    config.isButtonLoading = false;
    config.isInputDisabled = false;
    setValues({ ...config });
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.block}>
        <form className={styles.form} onSubmit={process}>
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
          { values.circleElements.map((el: CircleProps, index: number) => {
              return (
                <li key={index}>
                  <Circle letter={el.letter} state={el.state} />
                </li>
              )
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
