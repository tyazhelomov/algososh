import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { sleep } from "../../utils/utils";
import { TStackForm } from "../../hooks/useForm.types";
import { Stack } from "./Stack";

export const StackPage: React.FC = () => {
  const initValues: TStackForm<string> = {
    text: '',
    isButtonAddDisabled: false,
    isInputDisabled: false,
    circleElements: new Stack(),
    currentIndex: -1,
  }
  const { values, handleChange, setValues } = useForm(initValues);

  const isButtonAddDisabled = !values.text || values.isButtonAddDisabled;
  const isInputDisabled = values.isInputDisabled;
  const isButtonRemoveDisabled = !values.circleElements.size;
  const isButtonClearDisabled = !values.circleElements.size;

  const addHead = async () => {
    const config: TStackForm<string> = {
      ...values,
      isButtonAddDisabled: true,
      isInputDisabled: true,
    }

    config.circleElements.push(values.text)
    config.currentIndex = config.circleElements.size - 1;

    setValues({ ...config })
    await sleep(SHORT_DELAY_IN_MS);


    config.text = '';
    config.isButtonAddDisabled = false;
    config.isInputDisabled = false;
    config.currentIndex = -1;

    setValues({ ...config })
  }

  const removeHead = async () => {
    const config: TStackForm<string> = {
      ...values,
      isButtonAddDisabled: true,
      isInputDisabled: true,
    }

    config.currentIndex = config.circleElements.size - 1;

    setValues({ ...config });
    await sleep(SHORT_DELAY_IN_MS);

    config.circleElements.pop();

    config.text = '';
    config.isButtonAddDisabled = false;
    config.isInputDisabled = false;
    config.currentIndex = -1;
    setValues({ ...config })
  }

  const clear = async () => {
    values.circleElements.clear();
    setValues({ ...values })
  }

  const items = values.circleElements.items;

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
          { items.map((el: string, index: number) => {
            const head = index === values.circleElements.size - 1 ? 'head' : '';
            const state = values.currentIndex === index ? ElementStates.Changing : ElementStates.Default;

            return (
              <li key={index}>
                <Circle
                  letter={el}
                  state={state}
                  head={head}
                  index={index}
                />
              </li>
            )
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
