import { FormEvent, FC } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { sleep } from "../../utils/utils";
import { nanoid } from "nanoid";

export const QueuePage: FC = () => {
  const createNewCircles = () => {
    const len = 7;
    const arr = [];
    for (let i = 0; i <= len; i++) {
      const id = nanoid();
      arr[i] = <Circle state={ElementStates.Default} index={i} key={id} />
    }

    return arr;
  }
  const { values, handleChange, setValues } = useForm({
    text: '',
    isButtonAddDisabled: false,
    isButtonRemoveDisabled: false,
    isButtonClearDisabled: false,
    isInputDisabled: false,
    circleElements: createNewCircles(),
    head: undefined,
    tail: undefined,
  });

  const isButtonAddDisabled = !values.text || values.isButtonAddDisabled;

  const addTail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValues({ ...values, circleElements: values.circleElements, isInputDisabled: true, isButtonAddDisabled: true })
    const id = nanoid();
    if (values.tail === undefined) {
      values.head = 0;
      values.tail = 0;
      values.circleElements![values.tail] = <Circle state={ElementStates.Changing} index={values.circleElements![values.tail].props.index} head={'head'} tail={'tail'} letter={values.text} key={id} />
      setValues({ ...values, circleElements: values.circleElements, text: '', isInputDisabled: true, isButtonAddDisabled: true })
    } else if (values.head === values.tail && values.tail !== 0) {
      if (values.circleElements![values.head!].props.letter !== undefined) {
        values.circleElements![values.head!] = <Circle state={ElementStates.Default} head={'head'} letter={values.circleElements![values.head!].props.letter} index={values.circleElements![values.head!].props.index} key={values.circleElements![values.head!].key} />
        values.tail! += 1;
        values.circleElements![values.tail!] = <Circle state={ElementStates.Changing} index={values.circleElements![values.tail!].props.index} tail={'tail'} letter={values.text} key={id} />
      } else {
        values.circleElements![values.head!] = <Circle state={ElementStates.Default} index={values.circleElements![values.head!].props.index} key={values.circleElements![values.head!].key} />
        values.head += 1;
        values.tail! += 1;
        values.circleElements![values.tail!] = <Circle state={ElementStates.Changing} index={values.circleElements![values.tail!].props.index} head={'head'} tail={'tail'} letter={values.text} key={id} />
      
      }
      setValues({ ...values, circleElements: values.circleElements, text: '', isInputDisabled: true, isButtonAddDisabled: true })
    } else {
      values.tail += 1;
      values.circleElements![values.tail] = <Circle state={ElementStates.Changing} index={values.circleElements![values.tail].props.index} tail={'tail'} letter={values.text} key={id} />
      if (values.tail - 1 !== 0 || values.tail - 1 !== values.head) {
        values.circleElements![values.tail - 1] = <Circle state={ElementStates.Default} index={values.circleElements![values.tail - 1].props.index} letter={values.circleElements![values.tail - 1].props.letter} key={values.circleElements![values.tail - 1].key} />
      } else {
        values.circleElements![values.tail - 1] = <Circle state={ElementStates.Default} index={values.circleElements![values.tail - 1].props.index} head={'head'} letter={values.circleElements![values.tail - 1].props.letter} key={values.circleElements![values.tail - 1].key} />
      }
      
      setValues({ ...values, circleElements: values.circleElements, text: '', isInputDisabled: true, isButtonAddDisabled: true })
    }

    setValues({ ...values, circleElements: values.circleElements, text: '', isInputDisabled: true, isButtonAddDisabled: true })

    await sleep(SHORT_DELAY_IN_MS);
    values.circleElements![values.tail!] = <Circle state={ElementStates.Default} index={values.circleElements![values.tail!].props.index} head={values.circleElements![values.tail!].props.head} tail={values.circleElements![values.tail!].props.tail} letter={values.text} key={id} />;
    if (values.tail === values.circleElements!.length - 1) {
      setValues({ ...values, circleElements: values.circleElements, text: '', isInputDisabled: true, isButtonAddDisabled: true, isButtonRemoveDisabled: false })
    } else {
      setValues({ ...values, circleElements: values.circleElements, text: '', isInputDisabled: false, isButtonAddDisabled: false, isButtonRemoveDisabled: false })
    }
  }

  const removeHead = async () => {
    values.circleElements![values.head!] = <Circle state={ElementStates.Changing} index={values.circleElements![values.head!].props.index} head={values.circleElements![values.head!].props.head} tail={values.circleElements![values.head!].props.tail} letter={values.circleElements![values.head!].props.letter} key={values.circleElements![values.head!].key} />;
    setValues({ ...values, circleElements: values.circleElements, isButtonRemoveDisabled: true })

    await sleep(SHORT_DELAY_IN_MS);

    values.circleElements![values.head!] = <Circle state={ElementStates.Default} index={values.circleElements![values.head!].props.index} key={values.circleElements![values.head!].key} />;
    if (values.head !== values.tail!) {
      values.head! += 1;
    }
    values.circleElements![values.head!] = <Circle state={ElementStates.Default} index={values.circleElements![values.head!].props.index} head={'head'} tail={values.circleElements![values.head!].props.tail} letter={values.circleElements![values.head!].props.letter} key={values.circleElements![values.head!].key} />;

    setValues({ ...values, circleElements: values.circleElements, isButtonRemoveDisabled: false })
  }

  const clear = async () => {
    values.circleElements = createNewCircles();
    setValues({ ...values, circleElements: values.circleElements, isButtonAddDisabled: false, isInputDisabled: false, isButtonRemoveDisabled: false, head: undefined, tail: undefined })
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.block}>
        <form className={styles.form} onSubmit={addTail}>
          <Input  
            extraClass={styles.input}
            isLimitText = {true}
            maxLength = {4}
            onChange={handleChange}
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
          { !!values.circleElements!.length && values.circleElements}
        </div>
      </div>
    </SolutionLayout>
  );
};
