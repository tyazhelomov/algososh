import { FC } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { sleep } from "../../utils/utils";
import { nanoid } from "nanoid";

export const ListPage: FC = () => {
  const { values, handleChange, setValues } = useForm({
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
    head: undefined,
    tail: undefined,
  });

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

  const addHead = async () => {
    const config = {
      ...values,
      circleElements: values.circleElements,
      isInputDisabled: true,
      isInputIndexDisabled: true,
      isButtonAddHeadDisabled: true,
      isButtonAddTailDisabled: true,
      isButtonRemoveHeadDisabled: true,
      isButtonRemoveTailDisabled: true,
      isButtonAddIndexDisabled: true,
      isButtonRemoveIndexDisabled: true,
      isButtonAddHeadLoading: true,
      text: '',
    };
    setValues({ ...config })
    const id = nanoid();
    const index = 0;
    const elementConfig = {
      head: 'head',
      tail: '',
      index,
      letter: values.text,
      key: id,
      isLinkedCircle: true,
    }
    if (config.circleElements!.length) {
      if (config.circleElements!.length === 1) {
        elementConfig.isLinkedCircle = false;
      }
      config.circleElements![index] = <Circle state={ElementStates.Default} isLinkedCircle={elementConfig.isLinkedCircle} index={index} head={<Circle state={ElementStates.Changing} isSmall={true} letter={elementConfig.letter} />} letter={config.circleElements![index].props.letter} tail={config.circleElements![index].props.tail} key={config.circleElements![index].key} />
      setValues({ ...config })

      await sleep(SHORT_DELAY_IN_MS);
      
      const arr: Array<JSX.Element> = [];
      const len = config.circleElements!.length
      for (let i = 0; i < len; i++) {
        if (i === len - 1) {
          elementConfig.isLinkedCircle = false;
        }

        arr![i + 1] = <Circle state={ElementStates.Default} isLinkedCircle={elementConfig.isLinkedCircle} index={i + 1} letter={config.circleElements![i].props.letter} tail={config.circleElements![i].props.tail} key={config.circleElements![i].key} />
      }
      elementConfig.tail = '';
      elementConfig.isLinkedCircle = true;
      arr![index] = <Circle state={ElementStates.Changing} isLinkedCircle={elementConfig.isLinkedCircle} index={elementConfig.index} head={elementConfig.head} letter={elementConfig.letter} key={elementConfig.key} />
    
      config.circleElements = arr;
    } else {
      elementConfig.isLinkedCircle = false;
      elementConfig.tail = 'tail';
      config.circleElements![index] = <Circle state={ElementStates.Changing} isLinkedCircle={elementConfig.isLinkedCircle} index={elementConfig.index} head={elementConfig.head} tail={elementConfig.tail} letter={elementConfig.letter} key={elementConfig.key} />
    }

    setValues({ ...config })

    await sleep(SHORT_DELAY_IN_MS);
    config.circleElements![index] = <Circle state={ElementStates.Modified} isLinkedCircle={elementConfig.isLinkedCircle} index={elementConfig.index} head={elementConfig.head} tail={elementConfig.tail} letter={elementConfig.letter} key={elementConfig.key} />
    setValues({ ...config })

    await sleep(SHORT_DELAY_IN_MS);
    config.circleElements![index] = <Circle state={ElementStates.Default} isLinkedCircle={elementConfig.isLinkedCircle} index={elementConfig.index} head={elementConfig.head} tail={elementConfig.tail} letter={elementConfig.letter} key={elementConfig.key} />
    config.isInputDisabled = false;
    config.isInputIndexDisabled = false;
    config.isButtonAddHeadDisabled = false;
    config.isButtonAddTailDisabled = false;
    config.isButtonRemoveHeadDisabled = false;
    config.isButtonRemoveTailDisabled = false;
    config.isButtonAddIndexDisabled = false;
    config.isButtonRemoveIndexDisabled = false;
    config.isButtonAddHeadLoading = false;
    
    setValues({ ...config })
  }

  const addTail = async () => {
    const config = {
      ...values,
      circleElements: values.circleElements,
      isInputDisabled: true,
      isInputIndexDisabled: true,
      isButtonAddHeadDisabled: true,
      isButtonAddTailDisabled: true,
      isButtonRemoveHeadDisabled: true,
      isButtonRemoveTailDisabled: true,
      isButtonAddIndexDisabled: true,
      isButtonRemoveIndexDisabled: true,
      isButtonAddTailLoading: true,
      text: '',
    };
    setValues({ ...config })
    const id = nanoid();
    const index = values.circleElements!.length;
    const elementConfig = {
      head: 'head',
      tail: 'tail',
      index,
      letter: values.text,
      key: id,
    }
    if (!index) {
      elementConfig.head = 'head';
    } else {
      elementConfig.head = '';
      config.circleElements![index - 1] = <Circle state={ElementStates.Default} index={index - 1} head={<Circle state={ElementStates.Changing} isSmall={true} letter={elementConfig.letter} />} letter={config.circleElements![index - 1].props.letter} tail={config.circleElements![index - 1].props.tail} key={config.circleElements![index - 1].key} />
      setValues({ ...config })

      await sleep(SHORT_DELAY_IN_MS);

      if (config.circleElements![index - 1].props.head === 'head' || index - 1 === 0) {
        elementConfig.head = 'head';
      } else {
        elementConfig.head = '';
      }
      config.circleElements![index - 1] = <Circle state={ElementStates.Default} isLinkedCircle={true} index={config.circleElements![index - 1].props.index} head={elementConfig.head} letter={config.circleElements![index - 1].props.letter} key={config.circleElements![index - 1].key} />
      elementConfig.head = '';
    }

    config.circleElements!.push(<Circle state={ElementStates.Changing} index={elementConfig.index} tail={elementConfig.tail} letter={elementConfig.letter} key={elementConfig.key} />)
    setValues({ ...config })

    await sleep(SHORT_DELAY_IN_MS);
    config.circleElements![index] = <Circle state={ElementStates.Modified} index={elementConfig.index} head={elementConfig.head} tail={elementConfig.tail} letter={elementConfig.letter} key={elementConfig.key} />
    
    setValues({ ...config })

    await sleep(SHORT_DELAY_IN_MS);
    config.circleElements![index] = <Circle state={ElementStates.Default} index={elementConfig.index} head={elementConfig.head} tail={elementConfig.tail} letter={elementConfig.letter} key={elementConfig.key} />

    config.isInputDisabled = false;
    config.isInputIndexDisabled = false;
    config.isButtonAddHeadDisabled = false;
    config.isButtonAddTailDisabled = false;
    config.isButtonRemoveHeadDisabled = false;
    config.isButtonRemoveTailDisabled = false;
    config.isButtonAddIndexDisabled = false;
    config.isButtonRemoveIndexDisabled = false;
    config.isButtonAddTailLoading = false;
    setValues({ ...config })
  }

  const removeHead = async () => {
    const config = {
      ...values,
      circleElements: values.circleElements,
      isInputDisabled: true,
      isInputIndexDisabled: true,
      isButtonAddHeadDisabled: true,
      isButtonAddTailDisabled: true,
      isButtonRemoveHeadDisabled: true,
      isButtonRemoveTailDisabled: true,
      isButtonAddIndexDisabled: true,
      isButtonRemoveIndexDisabled: true,
      isButtonRemoveHeadLoading: true,
    };
    setValues({ ...config })
    const id = nanoid();
    const index = 0;
    const elementConfig = {
      head: 'head',
      tail: '',
      index,
      letter: values.text,
      key: id,
      isLinkedCircle: values.circleElements!.length > 1 ? true : false,
    }
    config.circleElements![index] = <Circle state={ElementStates.Default} isLinkedCircle={elementConfig.isLinkedCircle} index={elementConfig.index} head={config.circleElements![index].props.head} tail={<Circle state={ElementStates.Changing} isSmall={true} letter={config.circleElements![index].props.letter} />} key={config.circleElements![index].key} />
  
    await sleep(SHORT_DELAY_IN_MS);
    setValues({ ...config })

    if (config.circleElements!.length > 1) {
      const arr: Array<JSX.Element> = [];

      const len = config.circleElements!.length
      for (let i = 1; i < len; i++) {
        let head = ''
        if (i === 1 && i !== len - 1) {
          head = 'head';
        } else if (i === len - 1) {
          if (len === 2) {
            head = 'head';
          }
          elementConfig.isLinkedCircle = false
          elementConfig.tail = 'tail';
        }

        arr![i - 1] = <Circle state={ElementStates.Default} head={head} isLinkedCircle={elementConfig.isLinkedCircle} index={i - 1} letter={config.circleElements![i].props.letter} tail={elementConfig.tail} key={config.circleElements![i].key} />
      }
      elementConfig.tail = '';
      elementConfig.isLinkedCircle = true;
      
      config.circleElements = arr;
    } else {
      config.circleElements!.pop();
    }
    config.isInputDisabled = false;
    config.isInputIndexDisabled = false;
    config.isButtonAddHeadDisabled = false;
    config.isButtonAddTailDisabled = false;
    config.isButtonRemoveHeadDisabled = false;
    config.isButtonRemoveTailDisabled = false;
    config.isButtonAddIndexDisabled = false;
    config.isButtonRemoveIndexDisabled = false;
    config.isButtonRemoveHeadLoading = false;

    setValues({ ...config })
  }

  const removeTail = async () => {
    const config = {
      ...values,
      circleElements: values.circleElements,
      isInputDisabled: true,
      isInputIndexDisabled: true,
      isButtonAddHeadDisabled: true,
      isButtonAddTailDisabled: true,
      isButtonRemoveHeadDisabled: true,
      isButtonRemoveTailDisabled: true,
      isButtonAddIndexDisabled: true,
      isButtonRemoveIndexDisabled: true,
      isButtonRemoveTailLoading: true,
    };
    setValues({ ...config })
    const id = nanoid();
    const index = values.circleElements!.length;
    const elementConfig = {
      head: 'head',
      tail: 'tail',
      index,
      letter: values.text,
      key: id,
    }
    config.circleElements![index - 1] = <Circle state={ElementStates.Default} index={config.circleElements![index - 1].props.index} head={config.circleElements![index - 1].props.head} tail={<Circle state={ElementStates.Changing} isSmall={true} letter={config.circleElements![index - 1].props.letter} />} key={config.circleElements![index - 1].key} />
  
    await sleep(SHORT_DELAY_IN_MS);
    setValues({ ...config })

    if (index > 1) {
      config.circleElements![index - 2] = <Circle state={ElementStates.Default} index={config.circleElements![index - 2].props.index} tail={elementConfig.tail} head={config.circleElements![index - 2].props.head} letter={config.circleElements![index - 2].props.letter} key={config.circleElements![index - 2].key} />
    }
    config.circleElements!.pop();
    config.isInputDisabled = false;
    config.isInputIndexDisabled = false;
    config.isButtonAddHeadDisabled = false;
    config.isButtonAddTailDisabled = false;
    config.isButtonRemoveHeadDisabled = false;
    config.isButtonRemoveTailDisabled = false;
    config.isButtonAddIndexDisabled = false;
    config.isButtonRemoveIndexDisabled = false;
    config.isButtonRemoveTailLoading = false;
    setValues({ ...config })
  }

  //да, знаю что надо было через связанный список делать))
  const addIndex = async () => {
    const config = {
      ...values,
      index: undefined,
      circleElements: values.circleElements,
      isInputDisabled: true,
      isInputIndexDisabled: true,
      isButtonAddHeadDisabled: true,
      isButtonAddTailDisabled: true,
      isButtonRemoveHeadDisabled: true,
      isButtonRemoveTailDisabled: true,
      isButtonAddIndexDisabled: true,
      isButtonRemoveIndexDisabled: true,
      isButtonAddIndexLoading: true,
    };
    const id = nanoid();
    let index = +values.index!;
    const elementConfig = {
      head: '',
      tail: '',
      index,
      letter: values.text,
      key: id,
      isLinkedCircle: true,
    }

    if (index > config.circleElements!.length - 1) {
      index = config.circleElements!.length;
    }

    if (config.circleElements!.length) {
      if (index === 0) {
        await addHead();
        return;
      } else {
        for (let i = 0; i < config.circleElements!.length; i++) {
          let link = true;
          if (i === config.circleElements!.length - 1) {
            link = false;
          }
          config.circleElements![i] = <Circle
            state={ElementStates.Changing}
            isLinkedCircle={link}
            index={config.circleElements![i].props.index}
            tail={config.circleElements![i].props.tail}
            head={<Circle state={ElementStates.Changing} isSmall={true} letter={elementConfig.letter} />}
            letter={config.circleElements![i].props.letter}
            key={config.circleElements![i].key}
          />

          setValues({ ...config });
          await sleep(SHORT_DELAY_IN_MS);
          
          if (i === 0) {
            config.circleElements![i] = <Circle
              state={ElementStates.Changing}
              isLinkedCircle={true}
              index={config.circleElements![i].props.index}
              tail={config.circleElements![i].props.tail}
              head={'head'}
              letter={config.circleElements![i].props.letter}
              key={config.circleElements![i].key}
            />
          } else {
            let link = true;
            if (index === config.circleElements!.length) {
              link = false;
            }
            config.circleElements![i] = <Circle
              state={ElementStates.Changing}
              isLinkedCircle={link}
              index={config.circleElements![i].props.index}
              tail={config.circleElements![i].props.tail}
              letter={config.circleElements![i].props.letter}
              key={config.circleElements![i].key}
            />
          }
          setValues({ ...config });

          if (i < index) {
            continue;
          }

          setValues({ ...config });
          await sleep(SHORT_DELAY_IN_MS);

          const len = config.circleElements!.length
          if (i === index) {
            let link = true;
            if (index === len) {
              link = false;
            }
            let el = <Circle
              state={ElementStates.Modified}
              isLinkedCircle={link}
              index={index}
              tail={index > len - 1 ? 'tail' : ''}
              letter={elementConfig.letter}
              key={nanoid()}
            />;

            const arr: Array<JSX.Element> = [];
            for (i = 0; i < len; i++) {
              if (i < index) {
                arr[i] = <Circle
                  state={ElementStates.Default}
                  isLinkedCircle={true}
                  index={config.circleElements![i].props.index}
                  tail={config.circleElements![i].props.tail}
                  head={config.circleElements![i].props.head}
                  letter={config.circleElements![i].props.letter}
                  key={config.circleElements![i].key}
                />
              } else {
                if (i < len - 1) {
                  arr[i + 1] = <Circle
                    state={ElementStates.Default}
                    isLinkedCircle={true}
                    index={i + 1}
                    tail={config.circleElements![i].props.tail}
                    letter={config.circleElements![i].props.letter}
                    key={config.circleElements![i].key}
                  />
                } else {
                  arr[i + 1] = <Circle
                    state={ElementStates.Default}
                    index={i + 1}
                    tail={config.circleElements![i].props.tail}
                    letter={config.circleElements![i].props.letter}
                    key={config.circleElements![i].key}
                  />
                }
              }
            }

            arr[index] = el;

            setValues({ ...config, circleElements: arr });
            await sleep(SHORT_DELAY_IN_MS);

            if (index < len) {
              arr[index] = <Circle
                state={ElementStates.Default}
                isLinkedCircle={true}
                index={arr[index].props.index}
                tail={arr[index].props.tail}
                head={arr[index].props.head}
                letter={arr[index].props.letter}
                key={arr[index].key}
              />;
            } else {
              arr[index] = <Circle
                state={ElementStates.Default}
                index={arr[index].props.index}
                tail={arr[index].props.tail}
                head={arr[index].props.head}
                letter={arr[index].props.letter}
                key={arr[index].key}
              />;
            }

            config.isInputDisabled = false;
            config.isInputIndexDisabled = false;
            config.isButtonAddHeadDisabled = false;
            config.isButtonAddTailDisabled = false;
            config.isButtonRemoveHeadDisabled = false;
            config.isButtonRemoveTailDisabled = false;
            config.isButtonAddIndexDisabled = false;
            config.isButtonRemoveIndexDisabled = false;
            config.isButtonAddIndexLoading = false;
            setValues({ ...config, circleElements: arr });

            return;
          }
        }
      }
    } else {
      await addHead();
    }
  }

  const deleteIndex = async () => {
    const config = {
      ...values,
      index: undefined,
      circleElements: values.circleElements,
      isInputDisabled: true,
      isInputIndexDisabled: true,
      isButtonAddHeadDisabled: true,
      isButtonAddTailDisabled: true,
      isButtonRemoveHeadDisabled: true,
      isButtonRemoveTailDisabled: true,
      isButtonAddIndexDisabled: true,
      isButtonRemoveIndexDisabled: true,
      isButtonRemoveIndexLoading: true,
    };
    let index = +values.index!;

    if (index > config.circleElements!.length - 1) {
      index = config.circleElements!.length - 1;
    }

    if (config.circleElements!.length) {
      if (index === 0) {
        await removeHead();
        return;
      } else {
        for (let i = 0; i < config.circleElements!.length; i++) {
          let link = true;
          if (i === config.circleElements!.length - 1) {
            link = false;
          }
          config.circleElements![i] = <Circle
            state={ElementStates.Changing}
            isLinkedCircle={link}
            index={config.circleElements![i].props.index}
            tail={config.circleElements![i].props.tail}
            head={config.circleElements![i].props.head}
            letter={config.circleElements![i].props.letter}
            key={config.circleElements![i].key}
          />

          setValues({ ...config });
          await sleep(SHORT_DELAY_IN_MS);
          
          if (i === 0) {
            config.circleElements![i] = <Circle
              state={ElementStates.Changing}
              isLinkedCircle={true}
              index={config.circleElements![i].props.index}
              tail={config.circleElements![i].props.tail}
              head={'head'}
              letter={config.circleElements![i].props.letter}
              key={config.circleElements![i].key}
            />
          } else {
            let link = true;
            if (index === config.circleElements!.length - 1) {
              link = false;
            }
            config.circleElements![i] = <Circle
              state={ElementStates.Changing}
              isLinkedCircle={link}
              index={config.circleElements![i].props.index}
              tail={config.circleElements![i].props.tail}
              letter={config.circleElements![i].props.letter}
              key={config.circleElements![i].key}
            />
          }
          setValues({ ...config });

          if (i < index) {
            continue;
          }

          setValues({ ...config });
          await sleep(SHORT_DELAY_IN_MS);

          const len = config.circleElements!.length
          if (i === index) {
            let link = true;
            if (index === len - 1) {
              link = false;
            }
            config.circleElements![index] = <Circle
              state={ElementStates.Changing}
              isLinkedCircle={link}
              index={index}
              tail={<Circle state={ElementStates.Changing} isSmall={true} letter={config.circleElements![index].props.letter} />}
              key={config.circleElements![index].key}
            />;

            setValues({ ...config });
            await sleep(SHORT_DELAY_IN_MS);

            for (i = 0; i < len; i++) {
              if (i < index) {
                config.circleElements![i] = <Circle
                  state={ElementStates.Default}
                  isLinkedCircle={true}
                  index={config.circleElements![i].props.index}
                  tail={config.circleElements![i].props.tail}
                  head={config.circleElements![i].props.head}
                  letter={config.circleElements![i].props.letter}
                  key={config.circleElements![i].key}
                />
              } else {
                if (i < len - 1) {
                  config.circleElements![i] = <Circle
                    state={ElementStates.Default}
                    isLinkedCircle={true}
                    index={i}
                    tail={config.circleElements![i + 1].props.tail}
                    letter={config.circleElements![i + 1].props.letter}
                    key={config.circleElements![i + 1].key}
                  />
                } else if (index === 1 && len === 2) {
                  config.circleElements![i - 1] = <Circle
                    state={ElementStates.Default}
                    index={i - 1}
                    head={'head'}
                    tail={'tail'}
                    letter={config.circleElements![i - 1].props.letter}
                    key={config.circleElements![i - 1].key}
                  />
                } else {
                  config.circleElements![i - 1] = <Circle
                    state={ElementStates.Default}
                    index={i - 1}
                    tail={'tail'}
                    letter={config.circleElements![i - 1].props.letter}
                    key={config.circleElements![i - 1].key}
                  />
                }
              }
            }

            config.circleElements!.pop();
            config.isInputDisabled = false;
            config.isInputIndexDisabled = false;
            config.isButtonAddHeadDisabled = false;
            config.isButtonAddTailDisabled = false;
            config.isButtonRemoveHeadDisabled = false;
            config.isButtonRemoveTailDisabled = false;
            config.isButtonAddIndexDisabled = false;
            config.isButtonRemoveIndexDisabled = false;
            config.isButtonRemoveIndexLoading = false;

            setValues({ ...config });
            await sleep(SHORT_DELAY_IN_MS);

            return;
          }
        }
      }
    } else {
      await removeHead();
    }
  }

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
          { !!values.circleElements!.length && values.circleElements}
        </div>
      </div>
    </SolutionLayout>
  );
};
