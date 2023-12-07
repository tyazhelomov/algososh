import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle, CircleProps } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { sleep } from "../../utils/utils";
import { TStackForm } from "../../hooks/useForm.types";

export const StackPage: React.FC = () => {
  const initValues: TStackForm = {
    text: '',
    isButtonAddDisabled: false,
    isInputDisabled: false,
    circleElements: [],
  }
  const { values, handleChange, setValues } = useForm(initValues);

  const isButtonAddDisabled = !values.text || values.isButtonAddDisabled;
  const isInputDisabled = values.isInputDisabled;
  const isButtonRemoveDisabled = !values.circleElements!.length;
  const isButtonClearDisabled = !values.circleElements.length;

  const addHead = async () => {
    const config: TStackForm = {
      ...values,
      isButtonAddDisabled: true,
      isInputDisabled: true,
    }

    config.circleElements.push({ state: ElementStates.Changing, head: 'top', letter: values.text })
    const len = config.circleElements.length;

    if (len > 1) {
      const index = len - 2;
      config.circleElements[index].head = ''
    }

    setValues({ ...config })
    await sleep(SHORT_DELAY_IN_MS);

    config.circleElements[len - 1].state = ElementStates.Default;

    config.text = '';
    config.isButtonAddDisabled = false;
    config.isInputDisabled = false;

    setValues({ ...config })
  }

  const removeHead = async () => {
    const config: TStackForm = {
      ...values,
      isButtonAddDisabled: true,
      isInputDisabled: true,
    }

    setValues({ ...config });

    const len = config.circleElements.length - 1;
    config.circleElements[len].state = ElementStates.Changing;

    setValues({ ...config });
    await sleep(SHORT_DELAY_IN_MS);

    let index = len - 1;
    if (len < 2) {
      index = 0
    }

    config.circleElements[index].head = 'top';
    config.circleElements.pop();

    config.text = '';
    config.isButtonAddDisabled = false;
    config.isInputDisabled = false;
    setValues({ ...config })
  }

  const clear = async () => {
    setValues({ ...initValues })
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.block}>
        <form className={styles.form}>
          <Input
            extraClass={styles.input}
            isLimitText = {true}
            maxLength = {4}
            onChange={handleChange}
            value={values.text}
            name={'text'}
            type={'text'}
            disabled={isInputDisabled}
          />
          <Button 
            text = 'Добавить'
            type = "button"
            disabled={isButtonAddDisabled}
            onClick={addHead}
          />
          <Button 
            text = 'Удалить'
            type = "button"
            disabled={isButtonRemoveDisabled}
            onClick={removeHead}
          />
          <Button 
            text = 'Очистить'
            type = "button"
            disabled={isButtonClearDisabled}
            onClick={clear}
          />
        </form>

        <div className={styles.circles}>
          { values.circleElements.map((el: CircleProps, index: number) => {
              return (<Circle letter={el.letter} state={el.state} head={el.head} index={index} key={crypto.randomUUID()}/>)
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
