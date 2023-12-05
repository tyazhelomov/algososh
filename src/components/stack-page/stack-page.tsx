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
import { nanoid } from "nanoid";

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({
    text: '',
    isButtonAddDisabled: false,
    isButtonRemoveDisabled: false,
    isButtonClearDisabled: false,
    isInputDisabled: false,
    circleElements: [],
  });

  const isButtonAddDisabled = !values.text;
  const isButtonRemoveDisabled = !values.circleElements!.length;
  const isButtonClearDisabled = !values.circleElements!.length;

  const addHead = async () => {
    const id = nanoid();
    values.circleElements!.push(<Circle state={ElementStates.Changing} head={'top'} letter={values.text} key={id} />)
    setValues({ ...values, circleElements: values.circleElements, text: '', isInputDisabled: true,  })
    const len = values.circleElements!.length - 1;
    if (values.circleElements!.length > 1) {
      const index = len - 1;
      changeTop(values.circleElements!, index)
    }
    await sleep(SHORT_DELAY_IN_MS);
    values.circleElements![len] = <Circle state={ElementStates.Default} head={'top'} letter={values.text} key={id} />;
    setValues({ ...values, circleElements: values.circleElements, text: '', isInputDisabled: false,  })
  }

  const changeTop = (values: Array<JSX.Element>, index: number, isAddTop: boolean = false) => {
    values[index] = <Circle state={ElementStates.Default} head={isAddTop ? 'top' : ''} letter={values[index].props.letter} key={values[index].key} />;
  }

  const removeHead = async () => {
    if (!values.circleElements!.length) {
      return
    }
    setValues({ ...values, isButtonDisabled: true, isInputDisabled: true })
    const len = values.circleElements!.length - 1;
    let index = len - 1;
    if (len < 2) {
      index = 0
    }
    changeTop(values.circleElements!, index, true)
    values.circleElements!.pop();
    setValues({ ...values, circleElements: values.circleElements, isInputDisabled: false,  })
  }

  const clear = async () => {
    setValues({ ...values, isButtonDisabled: true, isInputDisabled: true })
    values.circleElements = [];
    setValues({ ...values, circleElements: values.circleElements, isInputDisabled: false,  })
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
            disabled={values.isInputDisabled}
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
          { !!values.circleElements!.length && values.circleElements}
        </div>
      </div>
    </SolutionLayout>
  );
};
