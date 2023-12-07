import { Dispatch, FormEvent, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { TQueueForm } from "../../hooks/useForm.types";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const createNewCircles = () => {
  const len = 7;
  const arr = [];
  for (let i = 0; i <= len; i++) {
    arr[i] = { state: ElementStates.Default };
  }

  return arr;
}

export const addTail = async (e: FormEvent<HTMLFormElement>, values: TQueueForm, setValues: Dispatch<SetStateAction<TQueueForm>>) => {
  e.preventDefault();

  const config: TQueueForm = {
    ...values,
    isButtonAddDisabled: true,
    isButtonRemoveDisabled: true,
    isButtonClearDisabled: true,
    isInputDisabled: true,
  }
  setValues({ ...config })
  if (config.tail < 0) {
    config.head = 0;
    config.tail = 0;
    config.circleElements[config.tail] ={ state: ElementStates.Changing, head: 'head', tail: 'tail', letter: config.text };
    setValues({ ...config })
  } else if (config.head === config.tail && config.tail !== 0) {
    if (config.circleElements[config.head].letter !== undefined) {
      config.circleElements[config.head!] = { state: ElementStates.Default, head: 'head', letter: config.circleElements![config.head!].letter };
      config.tail! += 1;
      config.circleElements[config.tail!] = { state: ElementStates.Changing, tail: 'tail', letter: config.text }
    } else {
      config.circleElements[config.head!] = { state: ElementStates.Default };
      config.head += 1;
      config.tail! += 1;
      config.circleElements[config.tail!] = { state: ElementStates.Changing, head: 'head', tail: 'tail', letter: config.text };
    
    }
    setValues({ ...config })
  } else {
    config.tail += 1;
    config.circleElements[config.tail] = { state: ElementStates.Changing, tail: 'tail', letter: config.text };
    if (config.tail - 1 !== 0 || config.tail - 1 !== config.head) {
      config.circleElements[config.tail - 1] = { state: ElementStates.Default, letter: config.circleElements![config.tail - 1].letter }
    } else {
      config.circleElements[config.tail - 1] = { state: ElementStates.Default, head: 'head', letter: config.circleElements![config.tail - 1].letter }
    }
    
    setValues({ ...config })
  }

  setValues({ ...config })

  await sleep(SHORT_DELAY_IN_MS);
  config.circleElements[config.tail] = { state: ElementStates.Default, head: config.circleElements![config.tail].head, tail: config.circleElements![config.tail].tail, letter: config.text };
  config.isButtonRemoveDisabled = false;
  config.isButtonClearDisabled = false;
  config.text = '';
  
  if (config.tail === config.circleElements!.length - 1) {
    setValues({ ...config })
  } else {
    config.isButtonAddDisabled = false;
    config.isInputDisabled = false;
    setValues({ ...config })
  }
}

export const removeHead = async (values: TQueueForm, setValues: Dispatch<SetStateAction<TQueueForm>>) => {
  const config: TQueueForm = {
    ...values,
    isButtonAddDisabled: true,
    isButtonRemoveDisabled: true,
    isButtonClearDisabled: true,
    isInputDisabled: true,
  }

  config.circleElements[config.head] = { state: ElementStates.Changing, head: config.circleElements![config.head!].head, tail: config.circleElements[config.head].tail, letter: config.circleElements[config.head].letter }
  setValues({ ...config })

  await sleep(SHORT_DELAY_IN_MS);

  config.circleElements[config.head] = { state: ElementStates.Default };
  if (config.head !== config.tail!) {
    config.head! += 1;
  }

  config.circleElements[config.head] = { state: ElementStates.Default, head: 'head', tail: config.circleElements![config.head!].tail, letter: config.circleElements![config.head!].letter }
  config.isButtonRemoveDisabled = false;
  config.isButtonAddDisabled = false;
  config.isButtonClearDisabled = false;
  config.isInputDisabled = false;
  config.text = '';
  setValues({ ...config })
}

export const clear = async (initValues: TQueueForm, setValues: Dispatch<SetStateAction<TQueueForm>>) => {
  setValues({ ...initValues })
}