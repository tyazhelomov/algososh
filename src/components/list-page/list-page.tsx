import { FC, ReactElement } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle, CircleProps } from "../ui/circle/circle";
import { TLinkedListForm } from "../../hooks/useForm.types";
import { LinkedList } from "./LinkedList";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { blockFields, unblockFields } from "./utils";

export const ListPage: FC = () => {
  const initValues: TLinkedListForm<CircleProps> = {
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
    circleElements: new LinkedList(),
    circlesConfig: {},
  }
  const { values, handleChange, setValues } = useForm(initValues);

  const isButtonAddHeadDisabled = !values.text || values.isButtonAddHeadDisabled;
  const isButtonAddTailDisabled = !values.text || values.isButtonAddTailDisabled;
  const isButtonRemoveHeadDisabled = !values.circleElements.toArray().length || values.isButtonRemoveHeadDisabled;
  const isButtonRemoveTailDisabled = !values.circleElements.toArray().length || values.isButtonRemoveTailDisabled;
  const isButtonAddIndexDisabled = !values.index || !values.text || !(+values.index < values.circleElements.toArray().length) || !(+values.index >= 0);
  const isButtonRemoveIndexDisabled = !(!!values.index && !!values.circleElements.toArray().length && !!(+values.index! < values.circleElements.toArray().length) && !!(+values.index! >= 0));
  const isButtonAddHeadLoading = values.isButtonAddHeadLoading;
  const isButtonAddTailLoading = values.isButtonAddTailLoading;
  const isButtonRemoveHeadLoading = values.isButtonRemoveHeadLoading;
  const isButtonRemoveTailLoading = values.isButtonRemoveTailLoading;
  const isButtonAddIndexLoading = values.isButtonAddIndexLoading;
  const isButtonRemoveIndexLoading = values.isButtonRemoveIndexLoading;

  const addHead = async () => {
    const config: TLinkedListForm<CircleProps> = blockFields(values, 'isButtonAddHeadLoading');

    if (config.circleElements.toArray().length) {
      config.circlesConfig['0'] = {
        head: {
          state: ElementStates.Changing,
          letter: config.text,
        },
      };
    }

    setValues({ ...config });
    await sleep(SHORT_DELAY_IN_MS);

    config.circleElements.prepend({ letter: config.text });

    config.circlesConfig['0'] = {
      state: ElementStates.Modified,
    }
  
    setValues({ ...config });
    await sleep(SHORT_DELAY_IN_MS);
  
    unblockFields(config, 'isButtonAddHeadLoading');
    setValues({ ...config })
  }
  
  const addTail = async () => {
    const config: TLinkedListForm<CircleProps> = blockFields(values, 'isButtonAddTailLoading');
    const lastIndex = config.circleElements.toArray().length - 1;

    if (lastIndex) {
      config.circlesConfig[lastIndex] = {
        head: {
          state: ElementStates.Changing,
          letter: config.text,
        },
      };
    }

    setValues({ ...config })
    await sleep(SHORT_DELAY_IN_MS);

    config.circleElements.append({ letter: config.text });

    config.circlesConfig[lastIndex] = {};
    config.circlesConfig[lastIndex + 1] = {
      state: ElementStates.Modified,
    }

    setValues({ ...config });
  
    await sleep(SHORT_DELAY_IN_MS);

    unblockFields(config, 'isButtonAddTailLoading');
    setValues({ ...config })
  }
  
  const removeHead = async () => {
    const config: TLinkedListForm<CircleProps> = blockFields(values, 'isButtonRemoveHeadLoading');
    const len = config.circleElements.toArray().length;

    if (len) {
      config.circlesConfig['0'] = {
        tail: {
          state: ElementStates.Changing,
          letter: (config.circleElements.toArray())[0].letter,
        },
      };
    }

    setValues({ ...config })
    await sleep(SHORT_DELAY_IN_MS);
    
    config.circleElements.deleteHead();
  
    unblockFields(config, 'isButtonRemoveHeadLoading');
    setValues({ ...config })
  }
  
  const removeTail = async () => {
    const config: TLinkedListForm<CircleProps> = blockFields(values, 'isButtonRemoveTailLoading');
    const lastIndex = config.circleElements.toArray().length - 1;

    if (lastIndex) {
      config.circlesConfig[lastIndex] = {
        tail: {
          state: ElementStates.Changing,
          letter: (config.circleElements.toArray())[lastIndex].letter,
        },
      };
    }

    setValues({ ...config })
    await sleep(SHORT_DELAY_IN_MS);

    config.circleElements.deleteTail();
    
    unblockFields(config, 'isButtonRemoveTailLoading');
    setValues({ ...config })
  }
  
  const addIndex = async () => {
    const config: TLinkedListForm<CircleProps> = blockFields(values, 'isButtonAddIndexLoading');
    setValues({ ...config })

    for (let i = 0; i <= +config.index; i++) {
      config.circlesConfig[i] = {
        head: {
          state: ElementStates.Changing,
          letter: config.text,
        }
      }

      setValues({ ...config });
      await sleep(SHORT_DELAY_IN_MS);

      config.circlesConfig[i] = {
        state: ElementStates.Changing,
      }
    }

    config.circleElements.addByIndex({ letter: config.text }, Number(config.index));
    config.circlesConfig = {};

    config.circlesConfig[config.index] = {
      state: ElementStates.Modified,
    }
  
    setValues({ ...config });
    await sleep(SHORT_DELAY_IN_MS);

    unblockFields(config, 'isButtonAddIndexLoading');
    setValues({ ...config })
  }
  
  const deleteIndex = async () => {
    const config: TLinkedListForm<CircleProps> = blockFields(values, 'isButtonRemoveIndexLoading');
    setValues({ ...config })


    for (let i = 0; i <= +config.index; i++) {
      config.circlesConfig[i] = {
        state: ElementStates.Changing
      }

      setValues({ ...config });
      await sleep(SHORT_DELAY_IN_MS);
    }

    config.circlesConfig[config.index] = {
      state: ElementStates.Changing,
      tail: {
        state: ElementStates.Changing,
        letter: (config.circleElements.toArray())[+config.index].letter,
      }
    }
    setValues({ ...config });
    await sleep(SHORT_DELAY_IN_MS);

    config.circleElements.deleteByIndex(Number(config.index));

    unblockFields(config, 'isButtonRemoveIndexLoading');
    setValues({ ...config });
  }

  const items = values.circleElements.toArray();

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
                onClick={addHead}
              />
              <Button 
                text = 'Добавить в tail'
                type = "button"
                disabled={isButtonAddTailDisabled}
                isLoader={isButtonAddTailLoading}
                onClick={addTail}
              />
              <Button 
                text = 'Удалить из head'
                type = "button"
                disabled={isButtonRemoveHeadDisabled}
                isLoader={isButtonRemoveHeadLoading}
                onClick={removeHead}
              />
              <Button 
                text = 'Удалить из tail'
                type = "button"
                disabled={isButtonRemoveTailDisabled}
                isLoader={isButtonRemoveTailLoading}
                onClick={removeTail}
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
                onClick={addIndex}
              />
              <Button 
                extraClass={styles.button}
                text = 'Удалить по индексу'
                type = "button"
                disabled={isButtonRemoveIndexDisabled}
                isLoader={isButtonRemoveIndexLoading}
                onClick={deleteIndex}
              />
            </div>
          </div>
        </div>

        <div className={styles.circles}>
          { items.map((el: CircleProps, index: number) => {
            const config = values.circlesConfig[index];
            let head: string | ReactElement = index === 0 ? 'head' : '';
            
            if (config?.head) {
              head = <Circle state={config.head.state} letter={config.head.letter} isSmall={true} />
            }

            let tail: string | ReactElement = index === items.length - 1 ? 'tail' : '';
            
            if (config?.tail) {
              tail = <Circle state={config.tail.state} letter={config.tail.letter} isSmall={true} />
            }

            const state = config?.state || ElementStates.Default;

            return (
              <li key={index}>
                <Circle
                  letter={typeof tail === 'string' ? el.letter : ''}
                  state={state}
                  head={head}
                  tail={tail}
                  index={index}
                  isLinkedCircle={index < items.length - 1}
                />
              </li>
            )
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
