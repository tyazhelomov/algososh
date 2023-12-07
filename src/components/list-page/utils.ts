import { Dispatch, SetStateAction } from "react";
import { TExtendedCircleProps, TLinkedListForm } from "../../hooks/useForm.types";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";


export const addHead = async (values: TLinkedListForm, setValues: Dispatch<SetStateAction<TLinkedListForm>>) => {
  const config: TLinkedListForm = {
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
  setValues({ ...config });

  const index = 0;
  const elementConfig = {
    head: 'head',
    tail: '',
    index,
    letter: values.text,
    key: crypto.randomUUID(),
    isLinkedCircle: true,
  }
  if (config.circleElements!.length) {
    if (config.circleElements!.length === 1) {
      elementConfig.isLinkedCircle = false;
    }
    config.circleElements[index] = { isLinkedCircle: elementConfig.isLinkedCircle, head: { state: ElementStates.Changing, letter: elementConfig.letter }, letter: config.circleElements[index].letter, tail: config.circleElements[index].tail };
    
    setValues({ ...config })

    await sleep(SHORT_DELAY_IN_MS);
    
    const arr: Array<TExtendedCircleProps> = [];
    const len = config.circleElements.length
    for (let i = 0; i < len; i++) {
      if (i === len - 1) {
        elementConfig.isLinkedCircle = false;
      }

      arr[i + 1] = { isLinkedCircle: elementConfig.isLinkedCircle, index: i + 1, letter: config.circleElements![i].letter, tail: config.circleElements![i].tail }
    }
    elementConfig.tail = '';
    elementConfig.isLinkedCircle = true;
    arr![index] = { state: ElementStates.Changing, isLinkedCircle: elementConfig.isLinkedCircle, index: elementConfig.index, head: elementConfig.head, letter: elementConfig.letter }
  
    config.circleElements = arr;
  } else {
    elementConfig.isLinkedCircle = false;
    elementConfig.tail = 'tail';
    config.circleElements[index] = { state: ElementStates.Changing, isLinkedCircle: elementConfig.isLinkedCircle, index: elementConfig.index, head: elementConfig.head, tail: elementConfig.tail, letter: elementConfig.letter }
  }

  setValues({ ...config })

  await sleep(SHORT_DELAY_IN_MS);
  config.circleElements[index] = { state: ElementStates.Modified, isLinkedCircle: elementConfig.isLinkedCircle, index: elementConfig.index, head: elementConfig.head, tail: elementConfig.tail, letter: elementConfig.letter }
  setValues({ ...config })

  await sleep(SHORT_DELAY_IN_MS);
  config.circleElements[index] = { isLinkedCircle: elementConfig.isLinkedCircle, index: elementConfig.index, head: elementConfig.head, tail: elementConfig.tail, letter: elementConfig.letter }
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

export const addTail = async (values: TLinkedListForm, setValues: Dispatch<SetStateAction<TLinkedListForm>>) => {
  const config: TLinkedListForm = {
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
  const index = values.circleElements!.length;
  const elementConfig: TExtendedCircleProps = {
    head: 'head',
    tail: 'tail',
    index,
    letter: values.text,
  }
  if (!index) {
    elementConfig.head = 'head';
  } else {
    elementConfig.head = '';
    config.circleElements[index - 1] = { index: index - 1, head: { state: ElementStates.Changing, letter: elementConfig.letter }, letter: config.circleElements![index - 1].letter, tail: config.circleElements![index - 1].tail }
    setValues({ ...config })

    await sleep(SHORT_DELAY_IN_MS);

    if (config.circleElements![index - 1].head === 'head' || index - 1 === 0) {
      elementConfig.head = 'head';
    } else {
      elementConfig.head = '';
    }
    config.circleElements[index - 1] = { isLinkedCircle: true, index: config.circleElements![index - 1].index, head: elementConfig.head, letter: config.circleElements![index - 1].letter }
    elementConfig.head = '';
  }

  config.circleElements.push({ state: ElementStates.Changing, index: elementConfig.index, tail: elementConfig.tail, letter: elementConfig.letter })
  setValues({ ...config })

  await sleep(SHORT_DELAY_IN_MS);
  config.circleElements![index] = { state: ElementStates.Modified, index: elementConfig.index, head: elementConfig.head, tail: elementConfig.tail, letter: elementConfig.letter }
  
  setValues({ ...config })

  await sleep(SHORT_DELAY_IN_MS);
  config.circleElements[index] = { index: elementConfig.index, head: elementConfig.head, tail: elementConfig.tail, letter: elementConfig.letter }

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

export const removeHead = async (values: TLinkedListForm, setValues: Dispatch<SetStateAction<TLinkedListForm>>) => {
  const config: TLinkedListForm = {
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
  const index = 0;
  const elementConfig: TExtendedCircleProps = {
    head: 'head',
    tail: '',
    index,
    letter: values.text,
    isLinkedCircle: values.circleElements!.length > 1 ? true : false,
  }
  config.circleElements[index] = { isLinkedCircle: elementConfig.isLinkedCircle, index: elementConfig.index, head: config.circleElements![index].head, tail: { state: ElementStates.Changing, letter: config.circleElements[index].letter } }

  await sleep(SHORT_DELAY_IN_MS);
  setValues({ ...config })

  if (config.circleElements!.length > 1) {
    const arr: Array<TExtendedCircleProps> = [];

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

      arr![i - 1] = { head: head, isLinkedCircle: elementConfig.isLinkedCircle, index: i - 1, letter: config.circleElements![i].letter, tail: elementConfig.tail }
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

export const removeTail = async (values: TLinkedListForm, setValues: Dispatch<SetStateAction<TLinkedListForm>>) => {
  const config: TLinkedListForm = {
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
  const index = values.circleElements!.length;
  const elementConfig: TExtendedCircleProps = {
    head: 'head',
    tail: 'tail',
    index,
    letter: values.text,
  }
  config.circleElements![index - 1] = { index: config.circleElements[index - 1].index, head: config.circleElements[index - 1].head, tail: { state: ElementStates.Changing, letter: config.circleElements[index - 1].letter } }

  await sleep(SHORT_DELAY_IN_MS);
  setValues({ ...config })

  if (index > 1) {
    config.circleElements![index - 2] = { index: config.circleElements[index - 2].index, tail: elementConfig.tail, head: config.circleElements![index - 2].head, letter: config.circleElements![index - 2].letter }
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

export const addIndex = async (values: TLinkedListForm, setValues: Dispatch<SetStateAction<TLinkedListForm>>) => {
  const config: TLinkedListForm = {
    ...values,
    index: '',
    text: '',
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
  let index = +values.index!;
  const elementConfig: TExtendedCircleProps = {
    head: '',
    tail: '',
    index,
    letter: values.text,
    isLinkedCircle: true,
  }

  if (index > config.circleElements!.length - 1) {
    index = config.circleElements!.length;
  }

  if (config.circleElements!.length) {
    if (index === 0) {
      await addHead(values, setValues);
      return;
    } else {
      for (let i = 0; i < config.circleElements!.length; i++) {
        let link = true;
        if (i === config.circleElements!.length - 1) {
          link = false;
        }
        config.circleElements![i] = {
          state: ElementStates.Changing,
          isLinkedCircle: link,
          index: config.circleElements![i].index,
          tail: config.circleElements![i].tail,
          head: { state: ElementStates.Changing, letter: elementConfig.letter },
          letter: config.circleElements![i].letter,
        }

        setValues({ ...config });
        await sleep(SHORT_DELAY_IN_MS);
        
        if (i === 0) {
          config.circleElements![i] = {
            state: ElementStates.Changing,
            isLinkedCircle: true,
            index: config.circleElements![i].index,
            tail: config.circleElements![i].tail,
            head: 'head',
            letter: config.circleElements![i].letter,
          }
        } else {
          let link = true;
          if (index === config.circleElements!.length) {
            link = false;
          }
          config.circleElements![i] = {
            state: ElementStates.Changing,
            isLinkedCircle: link,
            index: config.circleElements![i].index,
            tail: config.circleElements![i].tail,
            letter: config.circleElements![i].letter,
          }
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
          let el = {
            state: ElementStates.Modified,
            isLinkedCircle: link,
            index: index,
            tail: index > len - 1 ? 'tail' : '',
            letter: elementConfig.letter,
          };

          const arr: Array<TExtendedCircleProps> = [];
          for (i = 0; i < len; i++) {
            if (i < index) {
              arr[i] = {
                isLinkedCircle: true,
                index: config.circleElements![i].index,
                tail: config.circleElements![i].tail,
                head: config.circleElements![i].head,
                letter: config.circleElements![i].letter,
              }
            } else {
              if (i < len - 1) {
                arr[i + 1] = {
                  isLinkedCircle: true,
                  index: i + 1,
                  tail: config.circleElements![i].tail,
                  letter: config.circleElements![i].letter,
                }
              } else {
                arr[i + 1] = {
                  index: i + 1,
                  tail: config.circleElements![i].tail,
                  letter: config.circleElements![i].letter,
                }
              }
            }
          }

          arr[index] = el;

          setValues({ ...config, circleElements: arr });
          await sleep(SHORT_DELAY_IN_MS);

          if (index < len) {
            arr[index] = {
              isLinkedCircle: true,
              index: arr[index].index,
              tail: arr[index].tail,
              head: arr[index].head,
              letter: arr[index].letter
            }
          } else {
            arr[index] = {
              index: arr[index].index,
              tail: arr[index].tail,
              head: arr[index].head,
              letter: arr[index].letter,
            }
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
    await addHead(values, setValues);
  }
}

export const deleteIndex = async (values: TLinkedListForm, setValues: Dispatch<SetStateAction<TLinkedListForm>>) => {
  const config: TLinkedListForm = {
    ...values,
    text: '',
    index: '',
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
      await removeHead(values, setValues);
      return;
    } else {
      for (let i = 0; i < config.circleElements!.length; i++) {
        let link = true;
        if (i === config.circleElements!.length - 1) {
          link = false;
        }
        config.circleElements![i] = {
          state: ElementStates.Changing,
          isLinkedCircle: link,
          index: config.circleElements![i].index,
          tail: config.circleElements![i].tail,
          head: config.circleElements![i].head,
          letter: config.circleElements![i].letter,
        }

        setValues({ ...config });
        await sleep(SHORT_DELAY_IN_MS);
        
        if (i === 0) {
          config.circleElements![i] = {
            state: ElementStates.Changing,
            isLinkedCircle: true,
            index: config.circleElements![i].index,
            tail: config.circleElements![i].tail,
            head: 'head',
            letter: config.circleElements![i].letter,
          }
        } else {
          let link = true;
          if (index === config.circleElements!.length - 1) {
            link = false;
          }
          config.circleElements![i] = {
            state: ElementStates.Changing,
            isLinkedCircle: link,
            index: config.circleElements![i].index,
            tail: config.circleElements![i].tail,
            letter: config.circleElements![i].letter,
          }
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
          config.circleElements[index] = {
            state: ElementStates.Changing,
            isLinkedCircle: link,
            index: index,
            tail: { state: ElementStates.Changing, letter: config.circleElements[index].letter },
          }

          setValues({ ...config });
          await sleep(SHORT_DELAY_IN_MS);

          for (i = 0; i < len; i++) {
            if (i < index) {
              config.circleElements![i] = {
                isLinkedCircle: true,
                index: config.circleElements![i].index,
                tail: config.circleElements![i].tail,
                head: config.circleElements![i].head,
                letter: config.circleElements![i].letter,
              }
            } else {
              if (i < len - 1) {
                config.circleElements![i] = {
                  isLinkedCircle: true,
                  index: i,
                  tail: config.circleElements![i + 1].tail,
                  letter: config.circleElements![i + 1].letter,
                }
              } else if (index === 1 && len === 2) {
                config.circleElements![i - 1] = {
                  index: i - 1,
                  head: 'head',
                  tail: 'tail',
                  letter: config.circleElements![i - 1].letter,
                }
              } else {
                config.circleElements![i - 1] = {
                  index: i - 1,
                  tail: 'tail',
                  letter: config.circleElements![i - 1].letter,
                }
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
    await removeHead(values, setValues);
  }
}