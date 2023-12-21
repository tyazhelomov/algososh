import { FormEvent, FC, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { TQueueForm } from "../../hooks/useForm.types";
import { Queue } from "./Queue";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import React from "react";

export const QueuePage: FC = () => {
  const initValues: TQueueForm<string> = {
    text: '',
    isButtonAddDisabled: false,
    isButtonRemoveDisabled: false,
    isButtonClearDisabled: false,
    isInputDisabled: false,
    circleElements: new Queue(),
    currentIndex: -1,
  }
  const { values, handleChange, setValues } = useForm(initValues);

  const isButtonAddDisabled = !values.text || values.isButtonAddDisabled;
  
  const addTail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const config: TQueueForm<string> = {
      ...values,
      isButtonAddDisabled: true,
      isButtonRemoveDisabled: true,
      isButtonClearDisabled: true,
      isInputDisabled: true,
    }

    config.circleElements.enqueue(config.text);
    config.currentIndex = config.circleElements.tail;
  
    setValues({ ...config })

    await sleep(SHORT_DELAY_IN_MS);
  
    config.isButtonRemoveDisabled = false;
    config.isButtonClearDisabled = false;
    config.text = '';
    config.currentIndex = -1;
    
    if (config.circleElements.tail === config.circleElements.elements.length - 1) {
      setValues({ ...config })
    } else {
      config.isButtonAddDisabled = false;
      config.isInputDisabled = false;
      setValues({ ...config })
    }
  }
  
  const removeHead = async () => {
    const config: TQueueForm<string> = {
      ...values,
      isButtonAddDisabled: true,
      isButtonRemoveDisabled: true,
      isButtonClearDisabled: true,
      isInputDisabled: true,
    }

    config.currentIndex = config.circleElements.head;
    
    setValues({ ...config })
  
    await sleep(SHORT_DELAY_IN_MS);

    config.circleElements.dequeue();
    
    config.isButtonAddDisabled = false;
    config.isButtonClearDisabled = false;
    config.isInputDisabled = false;
    config.text = '';
    config.currentIndex = -1;

    if (config.circleElements.head !== config.circleElements.tail || config.circleElements.elements[config.circleElements.tail]) {
      config.isButtonRemoveDisabled = false;
    }
    setValues({ ...config })
  }
  
  const clear = async () => {
    values.circleElements.clear();
    setValues({ ...values, isInputDisabled: false, isButtonAddDisabled: false });
  }

  const items = values.circleElements.elements;

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.block}>
        <form className={styles.form} onSubmit={addTail}>
          <Input  
            extraClass={styles.input}
            isLimitText = {true}
            maxLength = {4}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            value={values.text}
            name={'text'}
            type={'text'}
            disabled={values.isInputDisabled}
          />
          <Button 
            text = 'Добавить'
            type = "submit"
            disabled={isButtonAddDisabled}
          />
          <Button 
            text = 'Удалить'
            type = "button"
            disabled={values.isButtonRemoveDisabled}
            onClick={removeHead}
          />
          <Button 
            text = 'Очистить'
            type = "button"
            disabled={values.isButtonClearDisabled}
            onClick={clear}
          />
        </form>

        <div className={styles.circles}>
          { items.map((el: string, index: number) => {
            const head = index === values.circleElements.head ? 'top' : '';
            const tail = index === values.circleElements.tail ? 'tail' : '';
            const state = values.currentIndex === index ? ElementStates.Changing : ElementStates.Default;

            return (
              <li key={index}>
                <Circle
                  letter={el}
                  state={state}
                  head={head}
                  tail={tail}
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
