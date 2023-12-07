import { ReactElement } from "react";
import { CircleProps } from "../components/ui/circle/circle";
import { ColumnProps } from "../components/ui/column/column";
import { ElementStates } from "../types/element-states";

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

export type TFibonacciForm =  Omit<TCircleForm, 'text'> & {
  number: number;
}

export type TStackForm = IBaseForm & {
  isButtonAddDisabled: boolean;
  isInputDisabled: boolean;
}

export type TQueueForm = IBaseForm & {
  isButtonAddDisabled: boolean,
  isButtonRemoveDisabled: boolean,
  isButtonClearDisabled: boolean,
  isInputDisabled: boolean,
  head: number,
  tail: number,
}

export type TSortingForm = Omit<TCircleForm, 'circleElements' | 'text'> & {
  array: Array<ColumnProps>;
  isButtonDisabled: boolean;
  radioInput: Radio;
}

export type TLinkedListForm = {
  text: string;
  circleElements: Array<TExtendedCircleProps>;
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
  head: string;
  tail: string;
}
