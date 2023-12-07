import { FormEvent, FC, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle, CircleProps } from "../ui/circle/circle";
import { TQueueForm } from "../../hooks/useForm.types";
import { addTail, clear, createNewCircles, removeHead } from "./utils";

export const QueuePage: FC = () => {
  const initValues: TQueueForm = {
    text: '',
    isButtonAddDisabled: false,
    isButtonRemoveDisabled: false,
    isButtonClearDisabled: false,
    isInputDisabled: false,
    circleElements: createNewCircles(),
    head: -1,
    tail: -1,
  }
  const { values, handleChange, setValues } = useForm(initValues);

  const isButtonAddDisabled = !values.text || values.isButtonAddDisabled;

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.block}>
        <form className={styles.form} onSubmit={(e: FormEvent<HTMLFormElement>) => addTail(e, values, setValues)}>
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
            onClick={() => removeHead(values, setValues)}
          />
          <Button 
            text = 'Очистить'
            type = "button"
            disabled={values.isButtonClearDisabled}
            onClick={() => clear(initValues, setValues)}
          />
        </form>

        <div className={styles.circles}>
          { values.circleElements.map((el: CircleProps, index: number) => {
              return (<Circle letter={el.letter} state={el.state} head={el.head} tail={el.tail} index={index} key={crypto.randomUUID()}/>)
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
