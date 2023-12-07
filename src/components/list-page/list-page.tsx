import { FC, ReactElement } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { TExtendedCircleProps, TLinkedListForm, TSmallCircle } from "../../hooks/useForm.types";
import { addHead, addIndex, addTail, deleteIndex, removeHead, removeTail } from "./utils";

export const ListPage: FC = () => {
  const initValues: TLinkedListForm = {
    text: '',
    index: '',
    isButtonAddHeadDisabled: false,
    isButtonAddTailDisabled: false,
    isButtonRemoveHeadDisabled: false,
    isButtonRemoveTailDisabled: false,
    isButtonAddIndexDisabled: true,
    isButtonRemoveIndexDisabled: true,
    isButtonAddHeadLoading: false,
    isButtonAddTailLoading: false,
    isButtonRemoveHeadLoading: false,
    isButtonRemoveTailLoading: false,
    isButtonAddIndexLoading: false,
    isButtonRemoveIndexLoading: false,
    isInputDisabled: false,
    isInputIndexDisabled: false,
    circleElements: [],
    head: '',
    tail: '',
  }
  const { values, handleChange, setValues } = useForm(initValues);

  const isButtonAddHeadDisabled = !values.text || values.isButtonAddHeadDisabled;
  const isButtonAddTailDisabled = !values.text || values.isButtonAddTailDisabled;
  const isButtonRemoveHeadDisabled = values.isButtonRemoveHeadDisabled;
  const isButtonRemoveTailDisabled = values.isButtonRemoveTailDisabled;
  const isButtonAddIndexDisabled = !(!!values.index && !!values.text);
  const isButtonRemoveIndexDisabled = !(!!values.index && !!values.circleElements!.length && !!(+values.index! < values.circleElements!.length) && !!(+values.index! >= 0));
  const isButtonAddHeadLoading = values.isButtonAddHeadLoading;
  const isButtonAddTailLoading = values.isButtonAddTailLoading;
  const isButtonRemoveHeadLoading = values.isButtonRemoveHeadLoading;
  const isButtonRemoveTailLoading = values.isButtonRemoveTailLoading;
  const isButtonAddIndexLoading = values.isButtonAddIndexLoading;
  const isButtonRemoveIndexLoading = values.isButtonRemoveIndexLoading;

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.block}>
        <div className={styles.form}>
          <div className={styles.firstRow}>
            <Input  
              placeholder={'Введите значение'}
              extraClass={styles.input}
              isLimitText = {true}
              maxLength = {4}
              onChange={handleChange}
              value={values.text}
              name={'text'}
              type={'text'}
              disabled={values.isInputDisabled}
            />
            <div className={styles.buttons}>
              <Button 
                text = 'Добавить в head'
                type = "button"
                disabled={isButtonAddHeadDisabled}
                isLoader={isButtonAddHeadLoading}
                onClick={() => addHead(values, setValues)}
              />
              <Button 
                text = 'Добавить в tail'
                type = "button"
                disabled={isButtonAddTailDisabled}
                isLoader={isButtonAddTailLoading}
                onClick={() => addTail(values, setValues)}
              />
              <Button 
                text = 'Удалить из head'
                type = "button"
                disabled={isButtonRemoveHeadDisabled}
                isLoader={isButtonRemoveHeadLoading}
                onClick={() => removeHead(values, setValues)}
              />
              <Button 
                text = 'Удалить из tail'
                type = "button"
                disabled={isButtonRemoveTailDisabled}
                isLoader={isButtonRemoveTailLoading}
                onClick={() => removeTail(values, setValues)}
              />
            </div>
          </div>
          <div className={styles.secondRow}>
            <Input  
              placeholder={'Введите индекс'}
              extraClass={styles.input}
              onChange={handleChange}
              value={values.index}
              name={'index'}
              type={'text'}
              disabled={values.isInputIndexDisabled}
            />
            <div className={styles.buttons}>
              <Button 
                extraClass={styles.button}
                text = 'Добавить по индексу'
                type = "submit"
                disabled={isButtonAddIndexDisabled}
                isLoader={isButtonAddIndexLoading}
                onClick={() => addIndex(values, setValues)}
              />
              <Button 
                extraClass={styles.button}
                text = 'Удалить по индексу'
                type = "button"
                disabled={isButtonRemoveIndexDisabled}
                isLoader={isButtonRemoveIndexLoading}
                onClick={() => deleteIndex(values, setValues)}
              />
            </div>
          </div>
        </div>

        <div className={styles.circles}>
          { values.circleElements.map((el: TExtendedCircleProps, index: number) => {
            let head = el.head as string | TSmallCircle | ReactElement | undefined;
            let tail = el.tail as string | TSmallCircle | ReactElement | undefined;

            if (head && typeof head !== 'string') {
              head = head as TSmallCircle;
              head = <Circle letter={head.letter} state={head.state} isSmall={true} key={crypto.randomUUID()}/>
            }

            if (tail && typeof tail !== 'string') {
              tail = tail as TSmallCircle;
              tail = <Circle letter={tail.letter} state={tail.state} isSmall={true} key={crypto.randomUUID()}/>
            }
            
            return (<Circle letter={el.letter} isLinkedCircle={el.isLinkedCircle} state={el.state} head={head} tail={tail} index={index} key={crypto.randomUUID()}/>)
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
