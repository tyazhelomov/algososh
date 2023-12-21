import { ReactElement } from "react";
import { CircleProps } from "../components/ui/circle/circle";
import { ColumnProps } from "../components/ui/column/column";
import { ElementStates } from "../types/element-states";
import { IStack } from "../components/stack-page/Stack";
import { IQueue } from "../components/queue-page/Queue";
import { ILinkedList } from "../components/list-page/LinkedList";

export enum Radio {
  Choice = 'choice',
  Bubble = 'bubble',
}

export type TSmallCircle = {
  state?: ElementStates;
  letter?: string;
}

export type TExtendedCircleProps = Omit<CircleProps, 'head' | 'tail'> & {
  head?: string | TSmallCircle | ReactElement;
  tail?: string | TSmallCircle | ReactElement;
}

export interface IBaseForm {
  text: string;
  circleElements: Array<CircleProps>;
}

export type TCircleForm = IBaseForm & {
  isButtonLoading: boolean;
  isInputDisabled: boolean;
}

export type TFibonacciForm = {
  circleElements: Array<string>;
  isButtonLoading: boolean;
  isInputDisabled: boolean;
  number: number;
}

export type TStackForm<T> = Omit<IBaseForm, 'circleElements'> & {
  circleElements: IStack<T>,
  isButtonAddDisabled: boolean;
  isInputDisabled: boolean;
  currentIndex: number;
}

export type TQueueForm<T> = Omit<IBaseForm, 'circleElements'> & {
  circleElements: IQueue<T>;
  isButtonAddDisabled: boolean;
  isButtonRemoveDisabled: boolean;
  isButtonClearDisabled: boolean;
  isInputDisabled: boolean;
  currentIndex: number;
}

export type TSortingForm = Omit<TCircleForm, 'circleElements' | 'text'> & {
  array: Array<ColumnProps>;
  isButtonDisabled: boolean;
  radioInput: Radio;
}

export type TLinkedListForm<T> = {
  text: string;
  circleElements: ILinkedList<T>;
  index: string;
  isButtonAddHeadDisabled: boolean;
  isButtonAddTailDisabled: boolean;
  isButtonRemoveHeadDisabled: boolean;
  isButtonRemoveTailDisabled: boolean;
  isButtonAddIndexDisabled: boolean;
  isButtonRemoveIndexDisabled: boolean;
  isButtonAddHeadLoading: boolean;
  isButtonAddTailLoading: boolean;
  isButtonRemoveHeadLoading: boolean;
  isButtonRemoveTailLoading: boolean;
  isButtonAddIndexLoading: boolean;
  isButtonRemoveIndexLoading: boolean;
  isInputDisabled: boolean;
  isInputIndexDisabled: boolean;
  circlesConfig: {
    [name: string]: {
      head?: CircleProps;
      tail?: CircleProps;
      state?: ElementStates;
    }
  };
}
